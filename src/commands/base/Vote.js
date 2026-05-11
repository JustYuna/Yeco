// Vote.js

require("dotenv").config();

const { Api } = require("@top-gg/sdk");
const CacheMaid = require("../../Utils/CacheMaid");
const ConfigManager = require("../../Core/configManager");

const topgg = new Api(process.env.TOPGG_TOKEN);
const claimedCache = CacheMaid.new("command_vote").map;

async function Vote(interaction) {
    const userId = interaction.user.id;

    const hasVoted = await topgg.hasVoted(userId);

    // User has not voted yet
    if (!hasVoted) {
        claimedCache.delete(userId);

        const msg = ConfigManager.getMsg("CORE.TOPGG.GO_VOTE");
        return interaction.editReply({ content: msg });
    }

    // User has voted, but already claimed this vote reward
    if (claimedCache.has(userId)) {
        const msg = ConfigManager.getMsg("CORE.TOPGG.CLAIMED_REWARD");
        return interaction.editReply({ content: msg });
    }

    // First claim for the current vote
    claimedCache.set(userId, true);

    const msg = ConfigManager.getMsg("CORE.TOPGG.REWARD_APPLIED");
    return interaction.editReply({ content: msg });
}

module.exports = Vote;