// Laundry.js

const { EmbedBuilder } = require("discord.js");
const { GetAsync, AddToAsync } = require("../../../DataStorage/Datastore");
const CommandHelper = require("../../../Utilities/CommandHelper");
const ConfigManager = require("../../../Core/configManager");
const CacheMaid = require("../../../Utilities/CacheMaid");
const Cache = CacheMaid.new("command_laundry");
Cache.map.set("lastUpdate", 0);
Cache.map.set("rate", 15);
Cache.map.set("catchRate", 15);

const LaundryConfig = ConfigManager.raw.CRIME.LAUNDRY;

async function Laundry(interaction, client, { type, amount = 0 }) {
    const userID = interaction.user.id;
    const lastUpdate = Cache.map.get("lastUpdate");
    const shouldUpdate = lastUpdate < Date.now() - LaundryConfig.UPDATE_AFTER;
    
    if (shouldUpdate) {
        const newRate = Math.round(Math.random() * (LaundryConfig.RATE_MAX - LaundryConfig.RATE_LOWEST + 1)) + LaundryConfig.RATE_LOWEST;
        Cache.map.set("rate", newRate);
        Cache.map.set("lastUpdate", Date.now());
        Cache.map.set("catchRate", LaundryConfig.CATCH_CHANCE_BASE - newRate);
    };

    const currentRate = Cache.map.get("rate") || 15;
    const currentCatchRate = Cache.map.get("catchRate") || 15;

    switch (type) {
        case "view":
            const viewEmbed = ConfigManager.getEmbed("CRIME.LAUNDRY.MESSAGES.VIEW", {
                wash_rate: currentRate,
                chance: currentCatchRate
            });

            return interaction.editReply({ embeds: [viewEmbed] });

        case "wash":
            const roll = Math.random() * 100;
            const catchRate = currentCatchRate;
            const currency = await GetAsync(userID, "SECOND_CURRENCY");

            const validateError = CommandHelper.VALIDATE_CURRENCY(interaction, amount, { userBalance: currency, command: "laundry" });
            if (validateError) return;

            await AddToAsync(userID, { "SECOND_CURRENCY": -amount });

            if (roll < catchRate) {
                const catchedEmbed = ConfigManager.getEmbed("CRIME.LAUNDRY.MESSAGES.CATCHED", {
                    amount: amount
                });

                return interaction.editReply({ embeds: [catchedEmbed] });
            } else {
                const washedAmount = Math.round(amount * (1 - currentRate / 100));
                await AddToAsync(userID, { "MAIN_CURRENCY": washedAmount });

                const washEmbed = ConfigManager.getEmbed("CRIME.LAUNDRY.MESSAGES.WASHED", {
                    recieved: washedAmount,
                    wash_rate: currentRate,
                    washed: amount
                });

                return interaction.editReply({ embeds: [washEmbed] });
            }

        default:
            return interaction.editReply({ content: "Invalid interaction." });
    }
}

module.exports = Laundry;