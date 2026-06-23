// Factory.js

const { GetAsync, SetAsync, AddToAsync } = require("../../../DataStorage/Datastore");
const ConfigManager = require("../../../Core/configManager");
const { GET_RESET_DATA, CHECK_MISSING_VALUES } = require("../../../Utilities/CommandHelper");
const AbbreviateNumber = require("../../../Utilities/Format/AbbreviateNumber");

const { FACTORY } = require("../../../Core/Configs/Economy");
const CommandHelper = require("../../../Utilities/CommandHelper");

const FactoryConfig = ConfigManager.raw.ECONOMY.FACTORY;

async function Factory(interaction, client, { type }) {
    const userID = interaction.user.id;
    const now = new Date();

    const currency = await GetAsync(userID, "MAIN_CURRENCY") || 0;
    let factoryData = await GetAsync(userID, "FACTORY");
    const levelData = await GetAsync(userID, "LEVEL");

    const levelValidationError = await CommandHelper.IS_LEVEL_LOCKED(interaction, { lockName: "FACTORY", levelData: levelData })
    if (levelValidationError) return;

    const factoryValidation = await CHECK_MISSING_VALUES(factoryData, {
        requiredProps: ["LEVEL", "LAST_CLAIM"],
        typeChecks: { LEVEL: "number" },
        minValues: [{ prop: "LEVEL", min: 1 }]
    });

    if (factoryValidation.needsReset) {
        console.log(`[Factory]: Resetting data for ${userID}: ${factoryValidation.reason}`);
        factoryData = { LEVEL: 1, LAST_CLAIM: now };
        await SetAsync(userID, { FACTORY: factoryData });
    };

    const factoryLevelData = FactoryConfig.LEVELS_MAP[factoryData.LEVEL] || null; // INCOME_PER_MINUTE, UPGRADE_PRICE, MAX_AWAY_TIME
    const expansionLevelData = FactoryConfig.LEVELS_MAP[factoryData.LEVEL + 1] || null; // INCOME_PER_MINUTE, UPGRADE_PRICE, MAX_AWAY_TIME

    if (!factoryLevelData && !expansionLevelData) return interaction.editReply("missing factory level data");

    const costString = await AbbreviateNumber(factoryLevelData.UPGRADE_PRICE);
    const incomeString = await AbbreviateNumber(factoryLevelData.INCOME_PER_MINUTE);

    switch (type) {
        case "claim_income": {
            if (factoryLevelData.INCOME_PER_MINUTE === 0) return interaction.editReply(ConfigManager.getEmbed("ECONOMY.FACTORY.MESSAGES.NO_INCOME"));
            const lastClaim = factoryData.LAST_CLAIM ? new Date(factoryData.LAST_CLAIM).getTime() : now;

            let timeElapsed = now - lastClaim;

            if (timeElapsed > factoryLevelData.MAX_AWAY_TIME) {
                timeElapsed = factoryLevelData.MAX_AWAY_TIME;
            }

            const minutesElapsed = Math.floor(timeElapsed / 1000 / 60);
            let totalIncome = minutesElapsed * factoryLevelData.INCOME_PER_MINUTE;
            const totalIncomeString = await AbbreviateNumber(totalIncome);

            if (minutesElapsed < 1) {
                return interaction.editReply({
                    embeds: [ConfigManager.getEmbed("ECONOMY.FACTORY.MESSAGES.CLAIM_TOO_SOON", {
                        minutes_left: Math.ceil((60000 - timeElapsed) / 1000 / 60)
                    })]
                });
            }

            factoryData.LAST_CLAIM = now;

            await AddToAsync(userID, { MAIN_CURRENCY: totalIncome });
            await SetAsync(userID, { FACTORY: factoryData });

            const claimEmbed = ConfigManager.getEmbed("ECONOMY.FACTORY.MESSAGES.CLAIM_SUCCESS", {
                income: totalIncomeString,
                level: factoryData.LEVEL,
                minutes: minutesElapsed,
                next_income: factoryLevelData.INCOME_PER_MINUTE
            });

            return interaction.editReply({ embeds: [claimEmbed] });
        }

        case "upgrade": {
            if (!expansionLevelData) {
                return interaction.editReply({ content: ConfigManager.getMsg("ECONOMY.FACTORY.MESSAGES.UPGRADE_MAXED") });
            };

            if (expansionLevelData.UPGRADE_PRICE > currency) {
                return interaction.editReply({ content: ConfigManager.getMsg("ECONOMY.FACTORY.MESSAGES.UPGRADE_CANT_AFFORD", { amount:  AbbreviateNumber(expansionLevelData.UPGRADE_PRICE - currency) }) });
            };

            await AddToAsync(userID, { MAIN_CURRENCY: -expansionLevelData.UPGRADE_PRICE });
            factoryData.LEVEL++;
            await SetAsync(userID, { FACTORY: { LEVEL:  factoryData.LEVEL, LAST_CLAIM: now } });
            const upgradeEmbed = ConfigManager.getEmbed("ECONOMY.FACTORY.MESSAGES.VIEW", {
                level: factoryData.LEVEL + 1,
                income: incomeString,
                max_away: `${expansionLevelData.MAX_AWAY_TIME / 1000 / 60}`,
                cost: costString
            });

            return interaction.editReply({ embeds: [upgradeEmbed] })
        };

        case "view": {
            const viewEmbed = ConfigManager.getEmbed("ECONOMY.FACTORY.MESSAGES.VIEW", {
                level: factoryData.LEVEL,
                income: incomeString,
                max_away: `${factoryLevelData.MAX_AWAY_TIME / 1000 / 60}`,
                cost: costString
            });

            return interaction.editReply({ embeds: [viewEmbed] })
        }

        default: {

        };
    }
}

module.exports = Factory;