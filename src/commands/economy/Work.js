const { GetAsync, AddToAsync, SetAsync } = require('../../DataStorage/Datastore');
const ConfigManager = require('../../Core/configManager');

const CONFIG_PROGRESSION = ConfigManager.raw.PROGRESSION;
const { REWARDS, LEVELS } = CONFIG_PROGRESSION;
const { CASH, XP, AMOUNT, HIGHEST } = REWARDS.WEIGHT;

async function Work(interaction, client, type) {
    if (!interaction || !type) return;

    const userID = interaction.user.id;
    const config = ConfigManager.raw;
    const activeTheme = config.CORE.THEMES[config.CORE.THEMES.ACTIVE];

    const workLevelRequirement = config.CORE.COMMAND_LEVEL_REQUIREMENT[type] || 0;
    const workData = activeTheme.COMMANDS[type];
    const workMultiplier = workData.MULTIPLIERS || { CASH: 1, XP: 1 };
    const actionMsg = workData.ACTION_MESSAGE;

    // -----------------------------
    // Enforce Level Requirement
    // -----------------------------
    let levelData = await GetAsync(userID, "LEVEL") || { LEVEL: 1, EXPERIENCE: 0 };
    if (levelData.LEVEL < workLevelRequirement) {
        const msg = ConfigManager.getMsg("CORE.MESSAGES.COMMAND_NOT_HIGH_ENOUGH_LEVEL", { level: workLevelRequirement });
        return interaction.editReply({ content: msg });
    }

    // -----------------------------
    // 🎲 Weighted Random Resource
    // -----------------------------
    const totalWeight = workData.RESOURCES.reduce((acc, res) => acc + res.WEIGHT, 0);
    let random = Math.random() * totalWeight;

    let selectedResource = null;
    for (const resource of workData.RESOURCES) {
        if (random < resource.WEIGHT) {
            selectedResource = resource;
            break;
        }
        random -= resource.WEIGHT;
    }

    if (!selectedResource) return;

    // -----------------------------
    // 📦 Amount (Scaled by Weight)
    // -----------------------------
    const baseAmount = REWARDS.WEIGHT.BASE_AMOUNT;
    const maxAmount = REWARDS.WEIGHT.MAX_AMOUNT;

    const maxWeight = REWARDS.WEIGHT.AMOUNT_MAX_WEIGHT;
    let weight = selectedResource.WEIGHT;

    weight = Math.max(0, Math.min(weight, maxWeight));

    const t = weight / maxWeight;
    let amount = baseAmount + (maxAmount - baseAmount) * t;
    const variance = REWARDS.WEIGHT.AMOUNT_VARIANCE;
    const randomFactor = 1 + (Math.random() * 2 - 1) * variance;

    amount *= randomFactor;
    amount = Math.max(baseAmount, Math.min(amount, maxAmount));
    const finalAmount = Math.round(amount);

    // -----------------------------
    // 💰 Rewards (Worth Scaled Inversely by Weight)
    // -----------------------------
    const baseWorth = REWARDS.WEIGHT.BASE_WORTH;
    const worthCut = REWARDS.WEIGHT.WORTH_WEIGHT_CUT_ABOVE;
    let cutMultiplier = 1;

    if (weight > worthCut.VALUE)
        cutMultiplier = worthCut.CUT;

    
    let finalWorth = baseWorth / (weight * cutMultiplier);
    finalWorth = Math.round(finalWorth * workMultiplier.CASH);

    // -----------------------------
    // 📈 Level Handling
    // -----------------------------
    const baseXP = REWARDS.WEIGHT.BASE_XP;
    const xpCut = REWARDS.WEIGHT.XP__WEIGHT_CUT_ABOVE;
    cutMultiplier = 1; // reset cut

    if (weight > xpCut.VALUE)
        cutMultiplier = xpCut.CUT;

    const finalXP = Math.round(baseXP / (weight * cutMultiplier) * workMultiplier.XP);

    let level = levelData.LEVEL || 0;
    let experience = levelData.EXPERIENCE || 0;
    let leveledUp = false;

    // Add XP
    experience += finalXP;

    // Multi-level support
    while (true) {
        const xpNeeded = LEVELS.XP_TABLE[level];
        if (!xpNeeded) break;

        if (experience >= xpNeeded) {
            experience -= xpNeeded;
            level++;
            leveledUp = true;
        } else break;
    }

    // -----------------------------
    // Tag Handling
    // -----------------------------
    const tags = selectedResource.TAG || [];
    let tagMsg = "";

    if (tags.includes("WORTHLESS")) {
        finalWorth = 0;
    }

    if (tags.includes("LUCKY")) {
        tagMsg += ConfigManager.getMsg("ECONOMY.WORK.MESSAGES.LUCKY_ATTACH");
    }

    // -----------------------------
    // 💾 Save Stats
    // -----------------------------
    await SetAsync(userID, { LEVEL: { LEVEL: level, EXPERIENCE: experience } });   
    await AddToAsync(userID, {
        MAIN_CURRENCY: finalWorth,
        TOTAL_MAIN_CURRENCY: finalWorth
    });

    // -----------------------------
    // 📩 Messages
    // -----------------------------
    const baseMsg = ConfigManager.parseMsg(actionMsg, {
        amount: finalAmount,
        material: selectedResource.MATERIAL,
        totalValue: finalWorth
    });

    const xpMsg = ConfigManager.getMsg("ECONOMY.WORK.MESSAGES.EXPERIENCE_ATTACH", {
        xp: finalXP
    });

    let finalMsg = baseMsg + tagMsg + xpMsg;

    if (leveledUp) {
        const levelMsg = ConfigManager.getMsg("ECONOMY.WORK.MESSAGES.LEVEL_UP_ATTACH", {
            level: level
        });

        finalMsg += levelMsg;
    }

    return interaction.editReply({
        content: finalMsg
    });
}

module.exports = Work;