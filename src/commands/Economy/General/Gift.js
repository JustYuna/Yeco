const { editCooldown } = require('../../../Utilities/Cooldown');
const { GetAsync, SetAsync, AddToAsync } = require('../../../DataStorage/Datastore');
const ConfigManager = require("../../../Core/configManager");
const CommandHelper = require("../../..//Utilities/CommandHelper");
const AbbreviateNumber = require("../../../Utilities/Format/AbbreviateNumber");

const GIFT = ConfigManager.raw.ECONOMY.GIFT;
const { MIN, MAX, EXCLUDE, MESSAGES } = GIFT;

async function gift(interaction, client, user, amount) {
    const userId = interaction.user.id;
    const giftUserId = user.id;

    const userBalance = await GetAsync(userId, "MAIN_CURRENCY");
    const giftedUserBalance = await GetAsync(giftUserId, "MAIN_CURRENCY");

    // Sanity check: prevent gifting to bots
    if (user.bot) {
        editCooldown(interaction, "gift", 10);
        return interaction.editReply({ 
            content: MESSAGES.TO_BOT,
        });
    }

    if (userId === giftUserId) {
        editCooldown(interaction, "gift", 10);
        return interaction.editReply({ 
            content: MESSAGES.IS_YOU,
        });
    }

    // Finalize validation
    const validateError = await CommandHelper.VALIDATE_CURRENCY(interaction, amount, { min: MIN, max: MAX, userBalance: userBalance, command: "gift" });
    if (validateError) return;

    if (giftedUserBalance > GIFT.MAX_RECIEVER)
        return interaction.editReply(ConfigManager.getMsg("ECONOMY.GIFT.MESSAGES.TOO_RICH"));

    // Execute gift
    await AddToAsync(userId, { MAIN_CURRENCY: -amount });
    await AddToAsync(giftUserId, { MAIN_CURRENCY: amount });

    const abbreviated = await AbbreviateNumber(amount);

    const msg = ConfigManager.getMsg("ECONOMY.GIFT.MESSAGES.SUCCESS", { amount: abbreviated, username: `<@${giftUserId}>` });
    return interaction.editReply({ 
        content: msg
    });
}

module.exports = gift;