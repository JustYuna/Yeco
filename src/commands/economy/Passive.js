const { GetAsync, SetAsync, AddToAsync } = require('../../DataStorage/Datastore');
const ConfigManager = require('../../Core/configManager');

async function Passive(interaction) {
    const userID = interaction.user.id;
    const now = Date.now();

    let passiveData = await GetAsync(userID, "PASSIVE_WORK_COLLECTION") || {};

    let totalCurrency = 0;
    let collectedTypes = [];
    let notReadyTypes = [];
    let hasChanged = false;

    for (const type in passiveData) {
        const job = passiveData[type];
        if (!job) continue;

        // Check if the job is ready and has value
        if (job.READY_AT <= now && job.CURRENCY > 0) {
            totalCurrency += job.CURRENCY;
            collectedTypes.push(type);

            delete passiveData[type]; 
            hasChanged = true;
        } else {
            notReadyTypes.push(type);
        }
    }

    if (totalCurrency <= 0) {
        return interaction.editReply({
            content: "⏳ Nothing is ready to collect yet!"
        });
    }

    await AddToAsync(userID, {
        MAIN_CURRENCY: totalCurrency,
        TOTAL_MAIN_CURRENCY: totalCurrency
    });

    if (hasChanged) {
        await SetAsync(userID, {
            PASSIVE_WORK_COLLECTION: passiveData
        });
    }

    const collectedLine = collectedTypes.length > 0 ? `\`${collectedTypes.join(", ")}\`` : "";
    const remainingLine = notReadyTypes.length > 0 ? `\`${notReadyTypes.join(", ")}\`` : "";

    const msg = ConfigManager.getMsg("ECONOMY.WORK.MESSAGES.PASSIVE_COLLECTED", {
        total: totalCurrency.toLocaleString(),
        collected: collectedLine,
        remaining: remainingLine
    });

    return interaction.editReply({
        content: msg.trim()
    });

    return interaction.editReply({
        content: msg
    });
}

module.exports = Passive;