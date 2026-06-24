const { GetAsync, SetAsync, AddToAsync } = require('../../../DataStorage/Datastore');
const { EmbedBuilder } = require("discord.js");
const ConfigManager = require("../../../Core/configManager");
const { CHECK_MISSING_VALUES } = require("../../../Utilities/CommandHelper");

const DAILY = ConfigManager.raw.ECONOMY.DAILY;
const { REWARD, MESSAGES } = DAILY;

function formatDate(date) {
    return date.toISOString().split('T')[0]; // "YYYY-MM-DD"
}

function getYesterdayStr() {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    return formatDate(yesterday);
}

async function daily(interaction, client) {
    const userId = interaction.user.id;

    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const today = new Date();
    const dayName = days[today.getDay()];
    const todayStr = formatDate(today);
    const yesterdayStr = getYesterdayStr();

    let DailyData = await GetAsync(userId, "DAILY");

    const dataValidation = await CHECK_MISSING_VALUES(DailyData, {
        requiredProps: ["STREAK", "BEST", "LAST"],
        typeChecks: { STREAK: "number", BEST: "number", LAST: "string" },
        minValues: [{ prop: "LEVEL", min: 1 }, { prop: "BEST", min: 1 }]
    });

    if (dataValidation.needsReset) {
        console.log(`[DAILY]: Resetting data for ${userId}: ${dataValidation.reason}`);
        DailyData = { STREAK: 0, BEST: 0, LAST: "1999-01-01" };
        await SetAsync(userId, { DAILY: DailyData });
    };

    const nextClaim = new Date(today);
    nextClaim.setHours(24, 0, 0, 0);
    const nextClaimTimestamp = Math.floor(nextClaim.getTime() / 1000);
    if (DailyData.LAST === todayStr) {
        const msg = ConfigManager.parseMsg(MESSAGES.ALREADY_CLAIMED, { next_claim: `<t:${nextClaimTimestamp}:F>` })
        return interaction.editReply({
            content: msg,
            flags: 64
        });
    }

    let streak = (DailyData.LAST === yesterdayStr) ? DailyData.STREAK + 1 : 1;
    let reward = Math.floor(Math.random() * REWARD.MIN) + REWARD.MAX;

    // Data
    DailyData.LAST = todayStr;
    DailyData.STREAK = streak;
    DailyData.BEST = DailyData.BEST < streak ? streak : DailyData.BEST

    const isWeekend = (dayName === 'Saturday' || dayName === 'Sunday');
    if (isWeekend) reward *= REWARD.WEEKEND_MULTIPLIER;
    reward = Math.floor(reward);

    const embed = ConfigManager.getEmbed("ECONOMY.DAILY.MESSAGES.RECIEVED", { reward: reward, streak: streak, next_claim: `<t:${nextClaimTimestamp}:F>` });
    await interaction.editReply({ embeds: [embed] });

    await SetAsync(userId, { DAILY: DailyData });
    await AddToAsync(userId, {
        MAIN_CURRENCY: reward,
        TOTAL_MAIN_CURRENCY: reward,
    })
};

module.exports = daily;