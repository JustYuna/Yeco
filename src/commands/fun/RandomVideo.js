// RandomVideo.js
require("dotenv").config();
const { google } = require("googleapis");
const ConfigManager = require("../../Core/configManager");

const {
    VALID_TYPES,
    SEARCH_QUERIES,
    SETTINGS
} = ConfigManager.raw.FUN.RANDOM_VIDEO;

const BLOCK_SHORTS = SETTINGS.BLOCK_SHORTS;
const BLACKLIST = SETTINGS.BLACKLIST;

const youtube = google.youtube({
    version: "v3",
    auth: process.env.YOUTUBE_DATA_API_V3,
});

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

async function getVideoDuration(videoId) {
    const response = await youtube.videos.list({
        part: ["contentDetails"],
        id: [videoId],
    });

    return response.data.items?.[0]?.contentDetails?.duration || null;
}

function parseISODuration(duration) {
    const match = duration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);

    const hours = parseInt(match?.[1] || "0", 10);
    const minutes = parseInt(match?.[2] || "0", 10);
    const seconds = parseInt(match?.[3] || "0", 10);

    return (hours * 3600) + (minutes * 60) + seconds;
}

async function isValidVideo(video, userRecent = []) {
    const videoId = video.id.videoId;
    const title = (video.snippet.title || "").toLowerCase();
    const description = (video.snippet.description || "").toLowerCase();

    if (userRecent.includes(videoId)) {
        return false;
    }

    if (Array.isArray(BLACKLIST) && BLACKLIST.length > 0) {
        for (const keyword of BLACKLIST) {
            const lowerKeyword = String(keyword).toLowerCase();

            if (
                title.includes(lowerKeyword) ||
                description.includes(lowerKeyword)
            ) {
                return false;
            }
        }
    }

    if (BLOCK_SHORTS) {
        const duration = await getVideoDuration(videoId);

        if (duration) {
            const totalSeconds = parseISODuration(duration);

            if (totalSeconds <= 60) {
                return false;
            }
        }
    }

    return true;
}

async function RandomVideo(interaction, client, { type = "normal" }) {
    if (!VALID_TYPES.includes(type)) {
        return interaction.editReply({
            content: ConfigManager.getMsg(
                "FUN.RANDOM_VIDEO.MESSAGES.INVALID_TYPE",
                { valid_types: VALID_TYPES.join(", ") }
            )
        });
    }

    if (!process.env.YOUTUBE_DATA_API_V3) {
        return interaction.editReply({
            content: ConfigManager.getMsg(
                "FUN.RANDOM_VIDEO.MESSAGES.NO_API_KEY"
            )
        });
    }

    try {
        const userId = interaction.user.id;
        const userRecent = recentVideos.get(userId) || [];

        const queryList = SEARCH_QUERIES[type];
        const query = getRandomItem(queryList);

        const results = await searchYouTube(query, 50);

        if (!results.length) {
            return interaction.editReply({
                content: ConfigManager.getMsg(
                    "FUN.RANDOM_VIDEO.MESSAGES.NO_VIDEO"
                )
            });
        }

        let randomVideo = null;

        for (const video of results) {
            if (await isValidVideo(video, userRecent)) {
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

        const msg = ConfigManager.getMsg(
            "FUN.RANDOM_VIDEO.MESSAGES.VIDEO_FOUND",
            {
                type: type.charAt(0).toUpperCase() + type.slice(1),
                title,
                channel,
                link: url
            }
        );

        await interaction.editReply({
            content: msg
        });

    } catch (error) {
        console.error("RandomVideo error:", error);

        if (
            error.code === 403 &&
            error.message?.toLowerCase().includes("quota")
        ) {
            return interaction.editReply({
                content: ConfigManager.getMsg(
                    "FUN.RANDOM_VIDEO.MESSAGES.API_QUOTA_EXCEEDED"
                )
            });
        }

        return interaction.editReply({
            content: ConfigManager.getMsg(
                "FUN.RANDOM_VIDEO.MESSAGES.FETCH_ERROR"
            )
        });
    }
}

module.exports = RandomVideo;