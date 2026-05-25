// Factory.js

const { GetAsync, SetAsync, AddToAsync } = require("../../../DataStorage/Datastore");
const ConfigManager = require("../../../Core/configManager");
const CommandHelper = require("../../../Utilities/CommandHelper");

const FactoryConfig = ConfigManager.raw.ECONOMY.FACTORY;

async function Factory(interaction, client, { type }) {
    const userID = interaction.user.id;
    const currency = await GetAsync(userID, "MAIN_CURRENCY") || 0;
    const factoryData = await GetAsync(userID, "FACTORY") || { LEVEL: 1, LAST_CLAIM: new Date() };
    const levelData = await GetAsync(userID, "LEVEL") || { LEVEL: 1, EXPERIENCE: 0 };

    if (levelData.LEVEL < FactoryConfig.LEVEL_LOCK) {
        return interaction.editReply({
            content: ConfigManager.getMsg(
                "CORE.MESSAGES.COMMAND_NOT_HIGH_ENOUGH_LEVEL",
                { level: FactoryConfig.LEVEL_LOCK }
            )
        });
    }

    const factoryLevelData = FactoryConfig.LEVELS_MAP[factoryData.LEVEL] || null; // INCOME_PER_MINUTE, UPGRADE_PRICE, MAX_AWAY_TIME
    const expansionLevelData = FactoryConfig.LEVELS_MAP[factoryData.LEVEL + 1] || null; // INCOME_PER_MINUTE, UPGRADE_PRICE, MAX_AWAY_TIME
    if (!factoryLevelData && !expansionLevelData) return interaction.editReply("missing factory level data");

    switch(type) {
        case "claim_income": {

        };

        case "upgrade": {
            if (!expansionLevelData) {
                return interaction.editReply({ content: ConfigManager.getMsg("ECONOMY.FACTORY.MESSAGES.UPGRADE_MAXED") });
            };

            if (expansionLevelData.UPGRADE_PRICE > currency) {
                return interaction.editReply({ content: ConfigManager.getMsg("ECONOMY.FACTORY.MESSAGES.UPGRADE_CANT_AFFORD", { amount: expansionLevelData.UPGRADE_PRICE - currency }) });
            };

            await AddToAsync(userID, -expansionLevelData.UPGRADE_PRICE);
            factoryData.LEVEL ++;
            await SetAsync(userID, { FACTORY: factoryData });
            const upgradeEmbed = ConfigManager.getEmbed("ECONOMY.FACTORY.MESSAGES.VIEW", {
                new_level: factoryData.LEVEL + 1,
                income: expansionLevelData.INCOME_PER_MINUTE,
                max_away: `${expansionLevelData.MAX_AWAY_TIME / 1000 / 60}`,
                cost: expansionLevelData.UPGRADE_PRICE
            });

            interaction.editReply({ embeds: [ upgradeEmbed ] })
        };

        case "view": {
            const viewEmbed = ConfigManager.getEmbed("ECONOMY.FACTORY.MESSAGES.VIEW", {
                level: factoryData.LEVEL,
                income: factoryLevelData.INCOME_PER_MINUTE,
                max_away: `${factoryLevelData.MAX_AWAY_TIME / 1000 / 60}`,
                cost: factoryLevelData.UPGRADE_PRICE
            });

            interaction.editReply({ embeds: [ viewEmbed ] })
        }

        default: {

        };
    }
}

module.exports = Factory;