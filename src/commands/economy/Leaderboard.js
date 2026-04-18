const { GetTopAsync } = require('../../DataStorage/Datastore');
const { EmbedBuilder } = require('discord.js');
const colors = require('../../stats/colors');

const CONFIG = {
  REFRESH_COOLDOWN: 300000, // 5 min
  MAX_TOP_USERS: 10,
  VALID_TYPES: ["candy", "total_candy", "gambled"]
};

const MAP_pulls = new Map();

async function leaderboard(interaction, client, type) {
  const now = Date.now();
  let currentPull = MAP_pulls.get(type);

  if (!currentPull || (now - currentPull.date > CONFIG.REFRESH_COOLDOWN)) {
    let topUsers = await GetTopAsync(type.toUpperCase(), CONFIG.MAX_TOP_USERS);
    if (!topUsers) return interaction.editReply({ content: "Failed to fetch leaderboard." });

    topUsers = topUsers.slice(0, CONFIG.MAX_TOP_USERS);
    currentPull = { date: now, top: topUsers };
    MAP_pulls.set(type, currentPull);
  }

  // Build leaderboard description
  const lines = await Promise.all(
    currentPull.top.map(async (user, index) => {
      let username = user.id;
      try {
        const discordUser = await client.users.fetch(user.id);
        username = discordUser?.username || user.id;
      } catch {
        username = user.id;
      }
      return `**#${index + 1}**: ${username} - **${user.value ?? 0}**`;
    })
  );

  const embed = new EmbedBuilder()
    .setColor(colors.green)
    .setTitle(`${type.toUpperCase()} Leaderboard`)
    .setDescription(lines.join("\n"))
    .setFooter({ text: `• Last refresh: ${Math.floor((now - currentPull.date)/1000)}s ago`, iconURL: client.user.displayAvatarURL() });

  return interaction.editReply({ embeds: [embed] });
}

module.exports = leaderboard;