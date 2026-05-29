const { GetAsync, SetAsync, AddToAsync } = require('../../../DataStorage/Datastore');
const { EmbedBuilder } = require("discord.js");
const ConfigManager = require("../../../Core/configManager");

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
    if (!DailyData || typeof DailyData.LAST !== "string" || typeof DailyData.STREAK !== "number") {
        DailyData = { LAST: "1999-01-01", STREAK: 0 };
    }

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
    DailyData.LAST = todayStr;
    DailyData.STREAK = streak;
    let reward = Math.floor(Math.random() * REWARD.MIN) + REWARD.MAX;

    const isWeekend = (dayName === 'Saturday' || dayName === 'Sunday');
    if (isWeekend) reward *= REWARD.WEEKEND_MULTIPLIER;
    reward = Math.floor(reward);

    const embed = ConfigManager.getEmbed("ECONOMY.DAILY.MESSAGES.RECIEVED");
    console.log(embed);
    if (!embed) return;
    await interaction.editReply({ embeds: [embed] });

    await SetAsync(userId, { DAILY: DailyData });
    await AddToAsync(userId, {
        MAIN_CURRENCY: reward,
        TOTAL_MAIN_CURRENCY: reward,
    })
};

module.exports = daily;