// Factory.js

const { GetAsync, SetAsync, AddToAsync } = require("../../../DataStorage/Datastore");
const ConfigManger = require("../../../Core/configManager");
const CommandHelper = require("../../../Utilities/CommandHelper");

const FactoryConfig = ConfigManger.raw.ECONOMY.FACTORY;

async function Factory(interaction, client, { type }) {
    const userID = interaction.user.id;
    const currency = GetAsync(userID, "MAIN_CURRENCY") || 0;
    const factoryData = GetAsync(userID, "FACTORY") || { LEVEL: 1, LAST_CLAIM: new Date() };
    const levelData = GetAsync(userID, "LEVEL") || { LEVEL: 1, EXPERIENCE: 0 };

    if (levelData.LEVEL < FactoryConfig.LEVEL_LOCK) {
        return interaction.editReply({
            content: ConfigManager.getMsg(
                "CORE.MESSAGES.COMMAND_NOT_HIGH_ENOUGH_LEVEL",
                { level: workSettings.LEVEL_LOCK }
            )
        });
    }

    const factoryLevelData = FactoryConfig.LEVELS_MAP[factoryData.LEVEL] || null; // INCOME_PER_MINUTE, UPGRADE_PRICE, MAX_AWAY_TIME
    const expansionLevelData = FactoryConfig.LEVELS_MAP[factoryData.LEVEL + 1] || null; // INCOME_PER_MINUTE, UPGRADE_PRICE, MAX_AWAY_TIME

    switch(type) {
        case "claim_income": {

        }

        case "upgrade": {
            if (!expansionLevelData) {
                interaction.editReply({ content = ConfigManger.getMsg("ECONOMY.FACTORY.MESSAGES.UPGRADE_MAXED") });
            };

            if (expansionLevelData.UPGRADE_PRICE > currency) {
                interaction.editReply({ content = ConfigManger.getMsg("ECONOMY.FACTORY.MESSAGES.UPGRADE_CANT_AFFORD") });
            };

            await AddToAsync(userID, -expansionLevelData.UPGRADE_PRICE);
            await SetAsync(userID, { FACTORY: { LEVEL: factoryData.LEVEL + 1, LAST_CLAIM: factoryData.LAST_CLAIM } });

            interaction.editReply({
                embeds: [
                    ConfigManger.getEmbed("ECONOMY.FACTORY.VIEW", {
                        new_level: factoryData.LEVEL + 1,
                        income: expansionLevelData.INCOME_PER_MINUTE,
                        maxAway: expansionLevelData.MAX_AWAY_TIME,
                        cost: expansionLevelData.UPGRADE_PRICE
                    }
                )]
            })
        };

        case "view": {
            interaction.editReply({
                embeds: [
                    ConfigManger.getEmbed("ECONOMY.FACTORY.VIEW", {
                        level: factoryData.LEVEL,
                        income: factoryLevelData.INCOME_PER_MINUTE,
                        maxAway: factoryLevelData.MAX_AWAY_TIME,
                        cost: factoryLevelData.UPGRADE_PRICE
                    }
                )]
            })
        }

        default: {

        };
    }
}

module.exports = Factory;