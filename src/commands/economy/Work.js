const { GetAsync, AddToAsync, SetAsync } = require('../../DataStorage/Datastore');
const ConfigManager = require('../../Core/configManager');

const config = ConfigManager.raw;
const theme = config.CORE.THEMES[config.CORE.THEMES.ACTIVE];

async function Work(interaction, client, type) {
    if (!interaction || !type) return;

    const userID = interaction.user.id;

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
    // Passive check
    // -----------------------------
    const isPassive = config.ECONOMY.WORK.IDLE_COMMANDS.includes(type);
    const passiveData = await GetAsync(userID, "PASSIVE_WORK_COLLECTION") || {};

    if (isPassive) {
        if (type in passiveData) {
            const remaining = passiveData[type].READY_AT - Date.now();
            const secondsRemaining = Math.ceil(remaining / 1000);

            if (remaining > 0) {
                const msg = ConfigManager.getMsg(
                    "ECONOMY.WORK.MESSAGES.PASSIVE_NOT_READY",
                    { time: secondsRemaining }
                );
                return interaction.editReply({ content: msg });
            } else {
                const msg = ConfigManager.getMsg(
                    "ECONOMY.WORK.MESSAGES.PASSIVE_READY"
                );
                return interaction.editReply({ content: msg });
            }
        }
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
    const workMultiplier =
        config.ECONOMY.WORK.MULTIPLIER[workData.MULTIPLIER || "LVL_0"];

    const currencyFinal =
        finalAmount * rarityData.WORTH * workMultiplier.CASH;

    const xpFinal =
        finalAmount * rarityData.WORTH * workMultiplier.EXPERIENCE;

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

    if (!isPassive) {
        await AddToAsync(userID, {
            MAIN_CURRENCY: currencyFinal,
            TOTAL_MAIN_CURRENCY: currencyFinal
        });
    } else {
        const passiveData =
            (await GetAsync(userID, "PASSIVE_WORK_COLLECTION")) || {};

        passiveData[type] = passiveData[type] || {
            READY_AT: 0,
            CURRENCY: 0
        };

        passiveData[type].CURRENCY += currencyFinal;
        passiveData[type].READY_AT =
            Date.now() + rarityData.COOLDOWN * 1000;

        await SetAsync(userID, {
            PASSIVE_WORK_COLLECTION: passiveData
        });
    }

    // -----------------------------
    // Message
    // -----------------------------
    let msg = ConfigManager.getMsg(
        `ECONOMY.WORK.MESSAGES.ACTION.${type}.${config.CORE.THEMES.ACTIVE}`,
        {
            amount: finalAmount,
            material,
            rarity,
            time: rarityData.COOLDOWN,
            totalValue: currencyFinal,
            mainCurrency_name: theme.CURRENCY.MAIN.NAME,
            mainCurrency_emoji: theme.CURRENCY.MAIN.EMOJI
        }
    );

    if (!msg) msg = "No work message could be fetched.";

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