module.exports = {
    REWARDS: {
        WEIGHT: {
            BASE_WORTH: 10_000,
            WORTH_WEIGHT_CUT_ABOVE: { VALUE: 30, CUT: 3 },

            BASE_XP: 12_500,
            XP__WEIGHT_CUT_ABOVE: { VALUE: 30, CUT: 4 },

            BASE_AMOUNT: 1,
            MAX_AMOUNT: 25,
            AMOUNT_MAX_WEIGHT: 50,
            AMOUNT_VARIANCE: 0.1,
        }
    },
    LEVELS: {
        INCOME_MULTIPLIER_PER_LEVEL: 0.05,
        XP_NEEDED_PER_LEVEL: 10_000,
        XP_MULTIPLIER_PER_LEVEL: 0.25,
    },
    LEVEL_LOCKS: {
            FARM: 0,

            FISHING: 5,
            HUNTING: 5,

            MINING: 10,
            CHOP: 10,

            COOKING: 15,
            SMITH: 15,

            FACTORY: 20,

            FALLBACK: 20,
    }
}