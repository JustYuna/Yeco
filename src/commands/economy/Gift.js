const { editCooldown } = require('../../Utils/Cooldown');
const { GetAsync, SetAsync, AddToAsync } = require('../../DataStorage/Datastore');
const ConfigManager = require("../../Core/configManager");
const CommandHelper = require("../../helpers/commandHelper")

const GIFT = ConfigManager.raw.ECONOMY.GIFT;
const { MIN, MAX, EXCLUDE, MESSAGES } = GIFT;

async function gift(interaction, client, user, amount) {
    const userId = interaction.user.id;
    const giftUserId = user.id;

    const userBalance = await GetAsync(interaction.user.id, "MAIN_CURRENCY")

    // Sanity check: prevent gifting to bots
    if (user.bot) {
        editCooldown(interaction, "gift", 10);
        return interaction.editReply({ 
            content: MESSAGES.TO_BOT,
            flags: 64
        });
    }

    // Check excluded users from config
    if (EXCLUDE.includes(giftUserId)) {
        editCooldown(interaction, "gift", 10);
        return interaction.editReply({ 
            content: MESSAGES.EXCLUDED,
            flags: 64
        });
    }

    // Finalize validation
    CommandHelper.VALIDATE_CURRENCY(interaction, amount, { min: MIN, max: MAX, userBalance: userBalance, command: "gift" });

    // Execute gift
    await AddToAsync(userId, { MAIN_CURRENCY: -amount });
    await AddToAsync(giftUserId, { MAIN_CURRENCY: amount });

    const msg = ConfigManager.getMsg("ECONOMY.GIFT.MESSAGES.SUCCESS", { amount: amount, username: `<@${giftUserId}>` });
    return interaction.editReply({ 
        content: msg
    });
}

module.exports = gift;