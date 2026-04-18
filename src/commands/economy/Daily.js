const { GetAsync, SetAsync, AddToAsync } = require('../../DataStorage/Datastore');
const Config = require("../../Core/config");
const ConfigManager = require("../../Core/configManager");
const { EmbedBuilder } = require("discord.js");

const DAILY = Config.ECONOMY.DAILY;
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

    if (DailyData.LAST === todayStr) {
        const msg = ConfigManager.parseMsg(MESSAGES.ALREADY_CLAIMED)
        return interaction.editReply({
            content: msg,
            flags: 64
        });
    }

    let streak = (DailyData.LAST === yesterdayStr) ? DailyData.STREAK + 1 : 1;
    DailyData.LAST = todayStr;
    DailyData.STREAK = streak;
    let reward = Math.floor(Math.random() * 200) + 400;

    const isWeekend = (dayName === 'Saturday' || dayName === 'Sunday');
    if (isWeekend) reward *= REWARD.WEEKEND_MULTIPLIER;
    reward = Math.floor(reward);

    const msg = ConfigManager.parseMsg(MESSAGES.RECIEVED, { reward: reward })
    const embed = new EmbedBuilder()
        .setColor("Green")
        .setTitle("🎁 Daily Reward Claimed!")
        .setDescription(msg)
        .addFields(
            { name: "🔥 Streak", value: `**${streak} day(s)**`, inline: true },
        )

    await interaction.editReply({ embeds: [embed] });

    AddToAsync(userId, {
        MAIN_CURRENCY: reward,
        TOTAL_MAIN_CURRENCY: reward,
    })
    SetAsync(userId, { DAILY: DailyData });
};

module.exports = daily;