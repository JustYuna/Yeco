const { GetAsync, AddToAsync, SetAsync } = require('../../../DataStorage/Datastore');
const ConfigManager = require('../../../Core/configManager');

const config = ConfigManager.raw;
const theme = config.CORE.THEMES[config.CORE.THEMES.ACTIVE];

async function Work(interaction, client, type) {
    if (!interaction || !type) return;

    const userID = interaction.user.id;

    const workData = theme.COMMANDS[type];
    if (!workData) return interaction.editReply({ content: "Work type not found in theme config, use /report to get this resolved." });

    const workSettings = config.ECONOMY.WORK.COMMAND_SETTINGS[type];
    if (!workSettings) return interaction.editReply({ content: "Work type not found in work config, use /report to get this resolved." });

    // -----------------------------
    // Level check
    // -----------------------------
    let levelData = await GetAsync(userID, "LEVEL") || { LEVEL: 1, EXPERIENCE: 0 };

    if (levelData.LEVEL < workSettings.LEVEL_LOCK) {
        return interaction.editReply({
            content: ConfigManager.getMsg(
                "CORE.MESSAGES.COMMAND_NOT_HIGH_ENOUGH_LEVEL",
                { level: workSettings.LEVEL_LOCK }
            )
        });
    }

    // -----------------------------
    // Rarity roll
    // -----------------------------
    const rarities = config.ECONOMY.WORK.RARITIES;

    const totalWeight = Object.values(rarities)
        .reduce((sum, r) => sum + r.PERCENTAGE, 0);

    let roll = Math.random() * totalWeight;

    let rarity = "COMMON";
    for (const key in rarities) {
        roll -= rarities[key].PERCENTAGE;
        if (roll <= 0) {
            rarity = key;
            break;
        }
    }

    const rarityData = rarities[rarity];

    // -----------------------------
    // Pick material (Crossmix Themes)
    // -----------------------------
    const defaultWorkData =
        config.CORE.THEMES["DEFAULT"]?.COMMANDS?.[type];

    const themedList = workData.RESOURCES[rarity] || [];
    const defaultList = defaultWorkData?.RESOURCES?.[rarity] || [];

    const combinedList = [...themedList, ...defaultList];
    const finalList = combinedList.length > 0 ? combinedList : themedList;

    const material = finalList[(Math.random() * finalList.length) | 0];

    // -----------------------------
    // Amount (biased low)
    // -----------------------------
    const amount = (Math.random() * Math.random() * rarityData.AMOUNT_MAX) | 0;
    const finalAmount = amount <= 0 ? 1 : amount;

    // -----------------------------
    // Worth + Experience
    // -----------------------------
    const currencyFinal =
        finalAmount * rarityData.WORTH * workSettings.MULTIPLIER.CURRENCY;
    const xpFinal =
        finalAmount * rarityData.WORTH * workSettings.MULTIPLIER.EXPERIENCE;
    const cooldownFinal =
        rarityData.COOLDOWN * workSettings.MULTIPLIER.COOLDOWN;

    // -----------------------------
    // Level system
    // -----------------------------
    let level = levelData.LEVEL || 1;
    let xp = levelData.EXPERIENCE || 0;

    xp += xpFinal;

    while (true) {
        const req = config.PROGRESSION.LEVELS.XP_TABLE[level];
        if (!req || xp < req) break;

        xp -= req;
        level++;
    }

    // -----------------------------
    // Flavor
    // -----------------------------
    let finalMsgExtra = "";

    if (rarity === "LEGENDARY") {
        finalMsgExtra += "\n✨ Lucky find!";
    }

    if (rarity === "MYTHIC") {
        finalMsgExtra += "\n☢️ Crazy, i was crazy once... but not this lucky to get a mythic.";
    }

    // -----------------------------
    // Save
    // -----------------------------
    await SetAsync(userID, { LEVEL: { LEVEL: level, EXPERIENCE: xp } });
    await AddToAsync(userID, {
        MAIN_CURRENCY: currencyFinal,
        TOTAL_MAIN_CURRENCY: currencyFinal
    });

    // -----------------------------
    // Message
    // -----------------------------
    
    // We use the same 'type' (e.g., FISHING, MINING) 
    // and the active theme (e.g., SUMMER, DEFAULT)
    let msg = ConfigManager.getMsg(
        `ECONOMY.WORK.MESSAGES.ACTION.${type}.${config.CORE.THEMES.ACTIVE}`,
        {
            // The tags we defined in the messages:
            amount: currencyFinal.toLocaleString(), // The money earned
            material_amount: finalAmount,           // The number of items found
            material: material,                     // The name of the item
            rarity: rarity,                         // COMMON, RARE, etc.
            cooldownTime: `${cooldownFinal}s`,      // Formatted cooldown string
            
            // Keeping these for safety in case other messages use them:
            mainCurrency_name: theme.CURRENCY.MAIN.NAME,
            mainCurrency_emoji: theme.CURRENCY.MAIN.EMOJI
        }
    );

    if (!msg) {
        // Fallback to DEFAULT if the seasonal theme message is missing
        msg = ConfigManager.getMsg(`ECONOMY.WORK.MESSAGES.ACTION.${type}.DEFAULT`, {
            amount: currencyFinal.toLocaleString(),
            material_amount: finalAmount,
            material: material,
            rarity: rarity,
            cooldownTime: `${cooldownFinal}s`
        });
    }

    if (!msg) msg = "No work message could be fetched, work reward was still applied! use /report to get this resolved.";

    const xpMsg = ConfigManager.getMsg(
        "ECONOMY.WORK.MESSAGES.EXPERIENCE_ATTACH",
        { xp: xpFinal }
    );

    let finalMessage = msg + finalMsgExtra + xpMsg;

    const levelUpMsg =
        level > levelData.LEVEL
            ? ConfigManager.getMsg(
                  "ECONOMY.WORK.MESSAGES.LEVEL_UP_ATTACH",
                  { level }
              )
            : "";

    return interaction.editReply({
        content: finalMessage + levelUpMsg
    });
}

module.exports = Work;