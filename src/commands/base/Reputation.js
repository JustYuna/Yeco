// Reputation.js

const ConfigManager = require("../../Core/configManager");
const { GetAsync, AddToAsync } = require("../../DataStorage/Datastore");

async function Reputation(interaction, client, { target, action }) {
    const cooldown = await GetAsync(interaction.user.id, "REPUTATION_COOLDOWN") || 0;

    const targetOnboarding = await GetAsync(target.id, "ONBOARDING_COMPLETED") || false;
    if (!targetOnboarding) {
        interaction.editReply({ content: ConfigManager.getMsg("CORE.MESSAGES.TARGET_ONBOARDIN") })
    }
}

module.exports = Reputation;