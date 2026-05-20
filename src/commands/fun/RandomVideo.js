// RandomVideo.js

require("dotenv").config();
const { google } = require("googleapis");

const validTypes = [
    "normal",
    "cursed",
    "oldtube",
    "educate",
    "brainrot",
    "undertwo",
];

const searchQueries = {
    normal: "interesting random video",
    cursed: "weird cursed video",
    oldtube: "before:2010 classic youtube video",
    educate: "educational science video",
    brainrot: "absurd meme video",
    undertwo: "funny video",
};

const youtube = google.youtube({
    version: "v3",
    auth: process.env.YOUTUBE_DATA_API_V3,
});

function getRandomItem(array) {
    return array[Math.floor(Math.random() * array.length)];
}

async function searchYouTube(query, maxResults = 25) {
    const response = await youtube.search.list({
        part: ["snippet"],
        q: query,
        type: ["video"],
        maxResults,
        safeSearch: "strict",
        videoEmbeddable: "true",
    });

    return response.data.items || [];
}

async function RandomVideo(interaction, client, { type = "normal" }) {
    if (!validTypes.includes(type)) {
        return interaction.reply({
            content: `❌ Invalid type. Valid types: ${validTypes.join(", ")}`,
            ephemeral: true,
        });
    }

    if (!process.env.YOUTUBE_API_KEY) {
        return interaction.reply({
            content: "❌ Missing YOUTUBE_API_KEY.",
            ephemeral: true,
        });
    }

    await interaction.deferReply();

    try {
        const query = searchQueries[type];
        const results = await searchYouTube(query);

        if (!results.length) {
            return interaction.editReply(
                "😔 I couldn't find a video right now."
            );
        }

        const randomVideo = getRandomItem(results);
        const videoId = randomVideo.id.videoId;
        const title = randomVideo.snippet.title;
        const channel = randomVideo.snippet.channelTitle;

        const url = `https://www.youtube.com/watch?v=${videoId}`;

        await interaction.editReply(
            `🎲 **Random ${type} video**\n` +
            `📺 **${title}**\n` +
            `👤 ${channel}\n` +
            `${url}`
        );
    } catch (error) {
        console.error("RandomVideo error:", error);

        await interaction.editReply(
            "❌ Something went wrong while fetching a video."
        );
    }
}

module.exports = RandomVideo;