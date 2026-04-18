const { editCooldown } = require('../../Utils/Cooldown');
const { GetAsync, SetAsync, AddToAsync } = require('../../DataStorage/Datastore');
const ConfigManager = require("../../Core/configManager");

const GIFT = ConfigManager.raw.ECONOMY.GIFT;
const { MIN, MAX, EXCLUDE, MESSAGES } = GIFT;

async function gift(interaction, client, user, amount) {
    const userId = interaction.user.id;
    const giftUserId = user.id;

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

    // Min/max checks
    if (amount < MIN) {
        editCooldown(interaction, "gift", 10);
        return interaction.editReply({ 
            content: MESSAGES.MIN_CANDY_REQUIRED({ amount: MIN }),
            flags: 64
        });
    }

    if (amount > MAX) {
        editCooldown(interaction, "gift", 10);
        return interaction.editReply({ 
            content: MESSAGES.MAX_CANDY_ALLOWED({ amount: MAX }),
            flags: 64
        });
    }

    // Check sender balance
    const candy = await GetAsync(userId, "MAIN_CURRENCY") || 0;
    if (amount > candy) {
        editCooldown(interaction, "gift", 10);
        return interaction.editReply({ 
            content: MESSAGES.NOT_ENOUGH_CANDY,
            flags: 64
        });
    }

    // Execute gift
    await AddToAsync(userId, { MAIN_CURRENCY: -amount });
    await AddToAsync(giftUserId, { MAIN_CURRENCY: amount });

    const msg = ConfigManager.getMsg("ECONOMY.GIFT.MESSAGES.SUCCESS", { amount: amount, username: `<@${giftUserId}>` });
    return interaction.editReply({ 
        content: msg
    });
}

module.exports = gift;