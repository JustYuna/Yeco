const ConfigManager = require("../Core/configManager");
const { editCooldown } = require("./Cooldown");

async function PLURALIZE(string, number) {
    if (number > 1) {
        return string + "s";
    }

    return string;
};

module.exports = PLURALIZE;