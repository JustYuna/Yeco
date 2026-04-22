const { GetAsync, AddToAsync, SetAsync } = require('../../DataStorage/Datastore');
const ConfigManager = require('../../Core/configManager');

const CONFIG = ConfigManager.raw;

async function Work(interaction, client, type) {
    if (!interaction || !type) return;

    const userID = interaction.user.id;
    const config = CONFIG;
    const theme = config.CORE.THEMES[config.CORE.THEMES.ACTIVE];

    const workData = theme.COMMANDS[type];
    if (!workData) return;

    const workLevelRequirement = config.CORE.COMMAND_LEVEL_REQUIREMENT[type] || 0;

    // -----------------------------
    // Level check
    // -----------------------------
    let levelData = await GetAsync(userID, "LEVEL") || { LEVEL: 1, EXPERIENCE: 0 };

    if (levelData.LEVEL < workLevelRequirement) {
        return interaction.editReply({
            content: ConfigManager.getMsg(
                "CORE.MESSAGES.COMMAND_NOT_HIGH_ENOUGH_LEVEL",
                { level: workLevelRequirement }
            )
        });
    }

    // -----------------------------
    // Rarity roll (NEW SYSTEM)
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
    // Pick material
    // -----------------------------
    const list = workData.RESOURCES[rarity];
    const material = list[(Math.random() * list.length) | 0];

    // -----------------------------
    // Amount (biased → more low rolls)
    // -----------------------------
    const amount = (Math.random() * Math.random() * rarityData.AMOUNT_MAX) | 0;

    // prevent 0 drops feeling bad
    const finalAmount = amount <= 0 ? 1 : amount;

    // -----------------------------
    // Worth + Experience
    // -----------------------------
    const workMultiplier = config.ECONOMY.WORK.MULTIPLIER[workData.MULTIPLIER || "LVL_0"];

    const currencyFinal = (finalAmount * rarityData.WORTH * workMultiplier.CASH);
    const xpFinal = (finalAmount * rarityData.WORTH * workMultiplier.EXPERIENCE);

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
    // Tags / Flavor
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
    const msg = ConfigManager.parseMsg(workData.ACTION_MESSAGE, {
        amount: finalAmount,
        material,
        totalValue: currencyFinal,
        mainCurrency_name: theme.CURRENCY.MAIN.NAME,
        mainCurrency_emoji: theme.CURRENCY.MAIN.EMOJI
    });

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