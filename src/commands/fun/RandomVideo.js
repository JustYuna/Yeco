// RandomVideo.js
require("dotenv").config();
const { google } = require("googleapis");
const { EmbedBuilder } = require("discord.js");

const validTypes = [
    "normal",
    "cursed",
    "oldtube",
    "educate",
    "brainrot",
    "undertwo",
];

const searchQueries = {
    normal: [
        "interesting random video",
        "cool video you havent seen",
        "underrated youtube video",
        "hidden gem video",
        "fascinating video essay",
        "unique content video"
    ],
    cursed: [
        "weird cursed video",
        "disturbing animation",
        "unsettling youtube",
        "cursed memes compilation",
        "strange internet video",
        "deep web vibes video"
    ],
    oldtube: [
        "classic youtube 2008",
        "old youtube meme",
        "viral video 2009",
        "retro youtube",
        "early youtube classic",
        "youtube nostalgia 2007"
    ],
    educate: [
        "educational science video",
        "mind blowing facts",
        "interesting documentary short",
        "how it works explained",
        "fascinating history video",
        "cool science experiment"
    ],
    brainrot: [
        "absurd meme video",
        "tiktok brainrot compilation",
        "cursed meme",
        "chaotic funny video",
        "internet brainrot",
        "unhinged content"
    ],
    undertwo: [
        "under 2 minute funny video",
        "short comedy skit",
        "quick laugh video",
        "1 minute funny clip",
        "short viral video",
        "quick meme video"
    ],
};

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

async function RandomVideo(interaction, client, { type = "normal" }) {
    // Validate type
    if (!validTypes.includes(type)) {
        return interaction.editReply({
            content: `❌ Invalid type. Valid types: ${validTypes.join(", ")}`,
            ephemeral: true,
        });
    }

    // Check for API key
    if (!process.env.YOUTUBE_DATA_API_V3) {
        return interaction.editReply({
            content: "❌ Missing YouTube API key. Please contact the bot owner.",
            ephemeral: true,
        });
    }

    try {
        const userId = interaction.user.id;
        const userRecent = recentVideos.get(userId) || [];
        
        // Pick random sub-query for variety
        const queryList = searchQueries[type];
        const query = getRandomItem(queryList);
        
        // Search YouTube
        const results = await searchYouTube(query, 50);
        
        if (!results.length) {
            return interaction.editReply(
                "😔 I couldn't find a video right now. Please try again!"
            );
        }
        
        // Find a video not recently shown to this user
        let randomVideo = null;
        for (const video of results) {
            if (!userRecent.includes(video.id.videoId)) {
                randomVideo = video;
                break;
            }
        }
        
        // Fallback if all videos were recent
        if (!randomVideo) {
            randomVideo = getRandomItem(results);
        }
        
        const videoId = randomVideo.id.videoId;
        const title = randomVideo.snippet.title;
        const channel = randomVideo.snippet.channelTitle;
        const url = `https://www.youtube.com/watch?v=${videoId}`;
        
        // Update recent videos cache (keep last 15)
        const newRecent = [videoId, ...userRecent].slice(0, 15);
        recentVideos.set(userId, newRecent);
        
        // Create embed for better presentation
        const embed = new EmbedBuilder()
            .setTitle(`🎲 Random ${type.charAt(0).toUpperCase() + type.slice(1)} Video`)
            .setDescription(`**${title}**`)
            .addFields(
                { name: "👤 Channel", value: channel, inline: true },
                { name: "📺 Watch", value: `[Click Here](${url})`, inline: true }
            )
            .setColor(0xFF0000)
            .setURL(url)
            .setFooter({ 
                text: `Requested by ${interaction.user.username} • Type: ${type}`,
                iconURL: interaction.user.displayAvatarURL()
            })
            .setTimestamp();
        
        await interaction.editReply({ embeds: [embed] });
        
    } catch (error) {
        console.error("RandomVideo error:", error);
        
        // Handle quota exceeded specifically
        if (error.code === 403 && error.message.includes("quota")) {
            return interaction.editReply(
                "❌ YouTube API quota exceeded. Please try again later!"
            );
        }
        
        await interaction.editReply(
            "❌ Something went wrong while fetching a video. Please try again!"
        );
    }
}

module.exports = RandomVideo;