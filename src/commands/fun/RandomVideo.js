// RandomVideo.js
require("dotenv").config();
const { google } = require("googleapis");
const { EmbedBuilder } = require("discord.js");
const ConfigManager = require("../../Core/configManager")

const {
    VALID_TYPES,
    SEARCH_QUERIES
} = ConfigManager.raw.FUN.RANDOM_VIDEO;

const youtube = google.youtube({
    version: "v3",
    auth: process.env.YOUTUBE_DATA_API_V3,
});

// Track recent videos per user (prevents repeats)
const recentVideos = new Map();

function getRandomItem(array) {
    return array[Math.floor(Math.random() * array.length)];
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

async function searchYouTube(query, maxResults = 50) {
    const response = await youtube.search.list({
        part: ["snippet"],
        q: query,
        type: ["video"],
        maxResults,
        safeSearch: "strict",
        videoEmbeddable: "true",
    });

    return shuffleArray(response.data.items || []);
}

async function RandomVideo(interaction, client, { type = "normal", input = null }) {
    // Validate type
    if (!VALID_TYPES.includes(type)) {
        return interaction.editReply({  content: ConfigManager.getMsg("FUN.RANDOM_VIDEO.MESSAGES.INVALID_TYPE", { valid_types: VALID_TYPES.join(", ") }) });
    }

    // Check for API key
    if (!process.env.YOUTUBE_DATA_API_V3) {
            return interaction.editReply({  content: ConfigManager.getMsg("FUN.RANDOM_VIDEO.MESSAGES.NO_API_KEY") });
    }

    try {
        const userId = interaction.user.id;
        const userRecent = recentVideos.get(userId) || [];
        
        // Pick random sub-query for variety
        const queryList = SEARCH_QUERIES[type];
        const query = getRandomItem(queryList);
        
        // Search YouTube
        let results;
        if (input) {
            results = await searchYouTube(input, 50);
        } else {
            results = await searchYouTube(query, 50);
        }
        
        if (!results.length) {
            return interaction.editReply({  content: ConfigManager.getMsg("FUN.RANDOM_VIDEO.MESSAGES.NO_VIDEO") });
        }

        let randomVideo = null;
        for (const video of results) {
            if (!userRecent.includes(video.id.videoId)) {
                randomVideo = video;
                break;
            }
        }

        if (!randomVideo) {
            randomVideo = getRandomItem(results);
        }

        const videoId = randomVideo.id.videoId;
        const title = randomVideo.snippet.title;
        const channel = randomVideo.snippet.channelTitle;
        const url = `https://www.youtube.com/watch?v=${videoId}`;

        const newRecent = [videoId, ...userRecent].slice(0, 15);
        recentVideos.set(userId, newRecent);

        const msg = ConfigManager.getMsg("FUN.RANDOM_VIDEO.MESSAGES.VIDEO_FOUND", {
            type: type.charAt(0).toUpperCase() + type.slice(1),
            title: title,
            channel: channel,
            link: url
        });
        
        await interaction.editReply({ content: msg });
        
    } catch (error) {
        console.error("RandomVideo error:", error);

        if (error.code === 403 && error.message.includes("quota")) {
            return interaction.editReply({  content: ConfigManager.getMsg("FUN.RANDOM_VIDEO.MESSAGES.API_QUOTA_EXCEEDED") });
        }
        
        return interaction.editReply({  content: ConfigManager.getMsg("FUN.RANDOM_VIDEO.MESSAGES.FETCH_ERROR") });
    }
}

module.exports = RandomVideo;