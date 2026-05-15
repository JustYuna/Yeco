// Vote.js

require("dotenv").config();

const { Api } = require("@top-gg/sdk");
const CacheMaid = require("../../Utilities/CacheMaid");
const ConfigManager = require("../../Core/configManager");
const { SetAsync } = require("../../DataStorage/Datastore");

const boostConfig = ConfigManager.raw.OTHER.TOPGG;

const topgg = new Api(process.env.TOPGG_TOKEN);
const claimedCache = CacheMaid.new("command_vote").map;

async function Vote(interaction) {
    const userId = interaction.user.id;

    const hasVoted = await topgg.hasVoted(userId);

    // User has not voted yet
    if (!hasVoted) {
        claimedCache.delete(userId);

        const msg = ConfigManager.getMsg("OTHER.TOPGG.MESSAGES.GO_VOTE");
        return interaction.editReply({ content: msg });
    }

    // User has voted, but already claimed this vote reward
    if (claimedCache.has(userId)) {
        const msg = ConfigManager.getMsg("OTHER.TOPGG.MESSAGES.CLAIMED_REWARD");
        return interaction.editReply({ content: msg });
    }

    // First claim for the current vote
    claimedCache.set(userId, true);

    const boostEndDate = Date.now() + (boostConfig.BOOST.NUMBER); // 2 hours from now
    await SetAsync(userId, { VOTE_BOOST: boostEndDate });

    const msg = ConfigManager.getMsg("OTHER.TOPGG.MESSAGES.REWARD_APPLIED", { duration: boostConfig.BOOST.TEXT });
    return interaction.editReply({ content: msg });
}

module.exports = Vote;