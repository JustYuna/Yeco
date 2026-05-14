// Reputation.js

const ConfigManager = require("../../Core/configManager");
const { editCooldown } = require("../../Utilities/Cooldown");
const { GetAsync, AddToAsync } = require("../../DataStorage/Datastore");

async function Reputation(interaction, client, { target, action }) {
    // Precheck
    if (interaction.user.id === target.id) {
        editCooldown(interaction, "reputation", 10);
        return interaction.editReply({ content: ConfigManager.getMsg("OTHER.REPUTATION.MESSAGES.IS_YOU") });
    };

    if (target.bot) {
        editCooldown(interaction, "reputation", 10);
        return interaction.editReply({ content: ConfigManager.getMsg("OTHER.REPUTATION.MESSAGES.IS_BOT") });
    }

    const targetOnboarding = await GetAsync(target.id, "ONBOARDING_COMPLETED") || false;
    if (!targetOnboarding) {
        return interaction.editReply({ content: ConfigManager.getMsg("CORE.MESSAGES.TARGET_ONBOARDIN") })
    };

    const cooldown = await GetAsync(interaction.user.id, "REPUTATION_COOLDOWN") || 0;
    const targetReputation = await GetAsync(target.id, "REPUTATION_COUNT") || 0;
    let msg = ConfigManager.raw.OTHER.REPUTATION.MESSAGES.NO_INPUT;
    let reputationAdd = 0;

    switch (action) {
        case "like": {
            msg = ConfigManager.raw.OTHER.REPUTATION.MESSAGES.LIKE;
            reputationAdd = ConfigManager.raw.OTHER.REPUTATION.LIKE_ADDS;
            await AddToAsync(target.id, { REPUTATION_COUNT: reputationAdd })
            return interaction.editReply({ content: ConfigManager.parseMsg(msg, { target: target, new_rep: targetReputation + reputationAdd }) });
        };

        case "dislike": {
            msg = ConfigManager.raw.OTHER.REPUTATION.MESSAGES.DISLIKE;
            reputationAdd = -ConfigManager.raw.OTHER.REPUTATION.DISLIKE_REMOVES;
            await AddToAsync(target.id, { REPUTATION_COUNT: reputationAdd })
            return interaction.editReply({ content: ConfigManager.parseMsg(msg, { target: target, new_rep: targetReputation + reputationAdd }) });
        };
        
        default: {
            return interaction.editReply({ content: ConfigManager.parseMsg(msg) });
        }
    };
}

module.exports = Reputation;