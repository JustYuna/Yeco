// src/commands/vote.js
require("dotenv").config();
const { Api } = require("@top-gg/sdk");
const { EmbedBuilder } = require("discord.js");
const emojis = require("../../stats/emojis");

const API_TOKEN = process.env.TOPGG_TOKEN?.trim();
const topgg = new Api(API_TOKEN);

const ConfigManager = require("../../Core/configManager")

// /vote command — embed version
async function Vote(interaction, client) {
  try {
    const stats = await topgg.getBot(client.user.id);
    const totalVotes = (stats.monthlyPoints ?? stats.points ?? 0);

    const embed = new EmbedBuilder()
      .setTitle("🌟 Vote for the Bot!")
      .setDescription(
        `Help us reach our community goal of **${goal} votes** for the next event!\n` +
        `[Click here to vote](https://top.gg/bot/${client.user.id}/vote)`
      )
      .addFields(
        { name: "Current Votes", value: `${totalVotes} / ${goal} (${progress}%)`, inline: true },
      )
      .setColor("#FFD700")
      .setTimestamp();

    await interaction.editReply({ embeds: [embed] });
  } catch (err) {
    console.error("Error fetching vote count:", err);

    const msg = ConfigManager.getMsg("CORE.MESSAGES.ACTION_UNAVAILABLE")
    await interaction.editReply({ content: msg });
  }
}

module.exports = Vote;