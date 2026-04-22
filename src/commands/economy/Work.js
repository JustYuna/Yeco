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
    // Rarity roll (FAST)
    // -----------------------------
    const chances = config.ECONOMY.WORK.PERCENTAGES;

    const r = Math.random() * (
        chances.COMMON +
        chances.RARE +
        chances.EPIC +
        chances.LEGENDARY +
        chances.MYTHIC
    );

    let rarity;
    if (r < chances.COMMON) rarity = "COMMON";
    else if (r < chances.COMMON + chances.RARE) rarity = "RARE";
    else if (r < chances.COMMON + chances.RARE + chances.EPIC) rarity = "EPIC";
    else if (r < chances.COMMON + chances.RARE + chances.EPIC + chances.LEGENDARY) rarity = "LEGENDARY";
    else rarity = "MYTHIC";

    const list = workData.RESOURCES[rarity];
    const material = list[(Math.random() * list.length) | 0];

    // -----------------------------
    // Amount (simple & fast)
    // -----------------------------
    const baseAmount = config.PROGRESSION.REWARDS.WEIGHT.BASE_AMOUNT;
    const maxAmount = config.PROGRESSION.REWARDS.WEIGHT.MAX_AMOUNT;

    const amount = ((Math.random() * (maxAmount - baseAmount)) + baseAmount) | 0;

    // -----------------------------
    // Worth (simplified math)
    // -----------------------------
    const weightCut = config.PROGRESSION.REWARDS.WEIGHT.WORTH_WEIGHT_CUT_ABOVE;
    const baseWorth = config.PROGRESSION.REWARDS.WEIGHT.BASE_WORTH;

    let cut = 1;
    if (rarity === "LEGENDARY" || rarity === "MYTHIC") cut = weightCut.CUT;

    let finalWorth = (baseWorth / cut) * config.ECONOMY.WORK.MULTIPLIER[workData.MULTIPLIER || "LVL_0"].CASH;
    finalWorth = finalWorth | 0;

    // -----------------------------
    // XP (simplified)
    // -----------------------------
    const xpBase = config.PROGRESSION.REWARDS.WEIGHT.BASE_XP;

    let xpCut = 1;
    if (rarity === "LEGENDARY" || rarity === "MYTHIC") xpCut = config.PROGRESSION.REWARDS.WEIGHT.XP__WEIGHT_CUT_ABOVE.CUT;

    const finalXP = ((xpBase / xpCut) * config.ECONOMY.WORK.MULTIPLIER[workData.MULTIPLIER || "LVL_0"].EXPERIENCE) | 0;

    // -----------------------------
    // Level system
    // -----------------------------
    let level = levelData.LEVEL || 1;
    let xp = levelData.EXPERIENCE || 0;

    xp += finalXP;

    while (true) {
        const req = config.PROGRESSION.LEVELS.XP_TABLE[level];
        if (!req || xp < req) break;

        xp -= req;
        level++;
    }

    // -----------------------------
    // Tags
    // -----------------------------
    let finalMsgExtra = "";

    if (rarity === "MYTHIC") {
        finalWorth = 0;
    }

    if (rarity === "LEGENDARY") {
        finalMsgExtra += "\n✨ Lucky find!";
    }

    // -----------------------------
    // Save
    // -----------------------------
    await SetAsync(userID, { LEVEL: { LEVEL: level, EXPERIENCE: xp } });

    await AddToAsync(userID, {
        MAIN_CURRENCY: finalWorth,
        TOTAL_MAIN_CURRENCY: finalWorth
    });

    // -----------------------------
    // Message
    // -----------------------------
    const msg = ConfigManager.parseMsg(workData.ACTION_MESSAGE, {
        amount,
        material,
        totalValue: finalWorth,
        mainCurrency_name: config.CORE.THEMES[config.CORE.THEMES.ACTIVE].CURRENCY.MAIN.NAME,
        mainCurrency_emoji: config.CORE.THEMES[config.CORE.THEMES.ACTIVE].CURRENCY.MAIN.EMOJI
    });

    const xpMsg = ConfigManager.getMsg("ECONOMY.WORK.MESSAGES.EXPERIENCE_ATTACH", { xp: finalXP });

    let finalMessage = msg + finalMsgExtra + xpMsg;

    const levelUpMsg =
        level > levelData.LEVEL
            ? ConfigManager.getMsg("ECONOMY.WORK.MESSAGES.LEVEL_UP_ATTACH", { level })
            : "";

    return interaction.editReply({
        content: finalMessage + levelUpMsg
    });
}

module.exports = Work;