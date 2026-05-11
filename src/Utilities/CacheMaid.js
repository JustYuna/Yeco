/**
 * CacheMaid.js
 * Keeps your bot’s caches tidy and memory usage under control.
 * Supports auto-eviction, scheduled cleanup, and freshness-aware sweeps.
 * 
 * Version - 1.2
 * Creator - @Snuv
 * Contributor - None
 */

const { warn } = require('node:console');
const Snowflake = require('nodejs-snowflake');

const GLOBAL_MAP = new Map();
const AUTOEVICT_MAP = new Map();
const CONFIG = {
    DEBUG: true,
};

module.exports = {
    /**
     * Generates a map that can be used to cache things and can be accessed via 
     * other maid commands using the assigned snowflake or included entryName.
     * @param {string} entryName
     */
    new: (entryName) => {
        const newID = entryName || Snowflake.nextId();
        const newMapEntry = {
            id: newID,
            ts: Date.now(),
            map: new Map()
        };
        GLOBAL_MAP.set(newID, newMapEntry);

        if (CONFIG.DEBUG) console.log(`Created entry with id-name: ${newID}`);
        return newMapEntry;
    },

    /**
     * Adds an existing map to the maid
     * @param {Map} map
     * @param {string} entryName
     */
    add: (map, entryName) => {
        const newID = entryName || Snowflake.nextId();
        const newMapEntry = {
            id: newID,
            ts: Date.now(),
            map: map
        };
        GLOBAL_MAP.set(newID, newMapEntry);

        if (CONFIG.DEBUG) console.log(`Added entry with id-name: ${newID}\nContent: ${map}`);
        return newMapEntry;
    },

    /**
     * Gets an existing map from the maid
     * @param {string} id
     */
    get: (id) => {
        const entry = GLOBAL_MAP.get(id);
        if (!entry) {
            console.warn(`[MAID] Attempted to update a map not in entry: ${id}`);
            return;
        };

        return entry;
    },

    /**
     * Update an existing map in the cache and refreshes its "freshness" timestamp
     * @param {string} id
     * @param {Map} map
     */
    update: (id, map) => {
        const entry = GLOBAL_MAP.get(id);
        if (!entry) {
            console.warn(`[MAID] Attempted to update a map not in entry: ${id}`);
            return;
        };

        entry.map = map;
        entry.ts = Date.now(); // Refresh timestamp so sweep() doesn't kill an active cache
    },

    /**
     * Updates multiple entries in a map (merge)
     * @param {string} id
     * @param {Object} updates
     */
    patch: (id, updates) => {
        const entry = GLOBAL_MAP.get(id);
        if (!entry) {
            console.warn(`[MAID] Attempted to patch a map not in entry: ${id}`);
            return;
        };

        for (const [key, value] of Object.entries(updates)) {
            entry.map.set(key, value);
        };

        entry.ts = Date.now();
    },

    /**
     * Advanced patch: allows functions for dynamic updates
     * @param {string} id
     * @param {Object} updates
     */
    patchAdvanced: (id, updates) => {
        const entry = GLOBAL_MAP.get(id);
        if (!entry) {
            console.warn(`[MAID] Attempted to patchAdvanced a map not in entry: ${id}`);
            return;
        }

        for (const [key, updater] of Object.entries(updates)) {
            const current = entry.map.get(key);

            if (typeof updater === "function") {
                try {
                    const result = updater(current);
                    entry.map.set(key, result);
                } catch (err) {
                    console.warn(`[MAID] patchAdvanced failed for key "${key}":`, err);
                }
            } else {
                // fallback to normal set
                entry.map.set(key, updater);
            }
        };

        entry.ts = Date.now();
    },
    
    /**
     * Allows you to check if a map exists in the entry
     * @param {string} id
     */
    exist: (id) => GLOBAL_MAP.has(id),

    /**
     * Clears one or more maps from entry
     * @param {string | string[]} ids - single Snowflake or array of Snowflakes
     */
    clear: (ids) => {
        const targetIds = Array.isArray(ids) ? ids : [ids];

        for (const id of targetIds) {
            const entry = GLOBAL_MAP.get(id);
            if (!entry) {
                console.warn(`[MAID] Attempted to clear a map not in entry: ${id}`);
                continue;
            }
            entry.map.clear();
        };
    },

    /**
     * Removes one or more maps from entry
     * @param {string | string[]} ids - single Snowflake or array of Snowflakes
     */
    remove: (ids) => {
        const targetIds = Array.isArray(ids) ? ids : [ids];

        for (const id of targetIds) {
            const entry = GLOBAL_MAP.get(id);
            if (!entry) {
                console.warn(`[MAID] Attempted to remove a map not in entry: ${id}`);
                continue;
            }
            entry.map.clear();
            GLOBAL_MAP.delete(id);
        }
    },

    /**
     * Removes one or more maps from entry after a set time
     * @param {string | string[]} ids - single Snowflake or array of Snowflakes
     * @param {number} time - delay in milliseconds
     */
    debris: (ids, time) => {
        const targetIds = Array.isArray(ids) ? ids : [ids];

        setTimeout(() => {
            for (const id of targetIds) {
                const entry = GLOBAL_MAP.get(id);
                if (entry) {
                    entry.map.clear();
                    GLOBAL_MAP.delete(id);
                }
            }
        }, time);
    },

    /**
     * Evicts the oldest entries in a Map if it exceeds a maximum size.
     * Uses Map's native insertion order for O(1) efficiency.
     * @param {string | string[]} ids - single Snowflake or array of Snowflakes
     * @param {number} maxSize - max map size
     */
    evict: (ids, maxSize) => {
        const targetIds = Array.isArray(ids) ? ids : [ids];

        for (const id of targetIds) {
            const entry = GLOBAL_MAP.get(id);
            if (!entry) {
                console.warn(`[MAID] Attempted to evict a map not in entry: ${id}`);
                continue;
            }

            const map = entry.map;
            let evictedCount = 0;

            // Maps iterate in insertion order. The first keys are the oldest.
            const iterator = map.keys();
            while (map.size > maxSize) {
                const oldestKey = iterator.next().value;
                map.delete(oldestKey);
                evictedCount++;
            }

            if (evictedCount > 0) {
                console.log(`[MAID] Evicted ${evictedCount} entries from map ${id}.`);
            }
        }
    },

    /**
     * Enables automatic eviction for a cache map
     * @param {string} id - the CacheMaid entry ID
     * @param {number} maxSize - max allowed size
     * @param {number} interval - how often to check in milliseconds
     */
    autoEvict: (id, maxSize, interval = 5000) => {
        if (!GLOBAL_MAP.has(id)) {
            console.warn(`[MAID] Attempted to auto-evict a map not in entry: ${id}`);
            return;
        }

        if (AUTOEVICT_MAP.has(id)) {
            clearInterval(AUTOEVICT_MAP.get(id));
        }

        const timer = setInterval(() => {
            const entry = GLOBAL_MAP.get(id);
            if (!entry) {
                clearInterval(timer);
                AUTOEVICT_MAP.delete(id);
                return;
            }

            const map = entry.map;
            while (map.size > maxSize) {
                const oldestKey = map.keys().next().value;
                map.delete(oldestKey);
            }
        }, interval);

        AUTOEVICT_MAP.set(id, timer);
    },

    /**
     * Stops automatic eviction for a cache map
     * @param {string} id
     */
    stopAutoEvict: (id) => {
        if (AUTOEVICT_MAP.has(id)) {
            clearInterval(AUTOEVICT_MAP.get(id));
            AUTOEVICT_MAP.delete(id);
        }
    },

    /**
     * Removes older sub-caches via age
     * @param {number} maxAge - max age for a cache in milliseconds
     */
    sweep: (maxAge) => {
        const now = Date.now();
        for (const [id, entry] of GLOBAL_MAP.entries()) {
            if (now - entry.ts > maxAge) {
                entry.map.clear(); // Help garbage collection
                GLOBAL_MAP.delete(id);
                console.log(`[MAID] Swept expired cache: ${id}`);
            }
        }
    }
};