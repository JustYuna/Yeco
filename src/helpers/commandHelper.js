const ConfigManager = require("../Core/configManager");
const { editCooldown } = require("../Utils/Cooldown");

module.exports = {
    VALIDATE_CURRENCY: async (interaction, amount, { min, max, userBalance, command = "action" }) => {
        
        // 1. Check Minimum Requirement
        if (min && amount < min) {
            editCooldown(interaction, command, 10);
            return interaction.editReply({
                content: ConfigManager.getMsg("CORE.MESSAGES.MIN_CURRENCY_REQUIRED", { amount: min }),
                flags: 64
            });
        }

        // 2. Check Maximum Allowed
        if (max && amount > max) {
            editCooldown(interaction, command, 10);
            return interaction.editReply({
                content: ConfigManager.getMsg("CORE.MESSAGES.MAX_CURRENCY_ALLOWED", { amount: max }),
                flags: 64
            });
        }

        // 3. Check if User has enough
        if (amount > userBalance) {
            editCooldown(interaction, command, 10);
            return interaction.editReply({
                content: ConfigManager.getMsg("CORE.MESSAGES.NOT_ENOUGH_CURRENCY"),
                flags: 64
            });
        }

        return null; 
    },

    ABBREVIATE_NUMBER(number) {
        if (number < 1000) return number.toString();

        const suffixes = ["", "K", "M", "B", "T"];
        const suffixNum = Math.floor((String(Math.floor(number)).length - 1) / 3);

        const scaled = number / Math.pow(1000, suffixNum);

        let formatted = scaled.toPrecision(3);

        // Remove trailing zeros / unnecessary decimal
        formatted = parseFloat(formatted).toString();

        return formatted + suffixes[suffixNum];
    }
};