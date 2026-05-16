// Onboarding.js

const { GetAsync, SetAsync } = require("../../DataStorage/Datastore");
const ConfigManager = require("../../Core/configManager");
const {
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle,
    EmbedBuilder
} = require("discord.js");

/**
 * Generates the "Success" embed once they are verified.
 * @param {string} header - Custom title for the embed.
 */
function VerifiedEmbed(header = "Registration Complete! 🎉") {
    return new EmbedBuilder()
        .setColor(ConfigManager.getColor())
        .setTitle(header)
        .setDescription(`
Welcome to the inner circle! Your economy profile is now officially active. 

**How to start your empire:**
🌱 **Step 1:** Use \`/farm\` to get those first few coins. It's honest work!
📈 **Step 2:** Level up to unlock heavier machinery like \`/extract\` and \`/craft\`.
🎲 **Step 3:** Feeling lucky? \`/coinflip\` is right there... but don't say I didn't warn you.
🏦 **Step 4:** Use \`/bank\` to hide your cash from prying eyes (and me).

*I'm legally required to tell you that I am an AI, not a toaster, though I can still make your wallet feel a bit toasty.*
        `)
        .addFields(
            { name: "✨ Top Tip", value: "Voting for the bot gives you a **Vote Boost**, doubling your gains. Use \`/vote\` to speed things up!" }
        )
        .setTimestamp();
}

async function Onboarding(interaction, client) {
    const userID = interaction.user.id;

    // Check if the user is already verified before doing anything
    const isVerified = await GetAsync(userID, "ONBOARDING_COMPLETED") || false;

    if (isVerified) {
        return interaction.editReply({
            embeds: [VerifiedEmbed("You're already one of us! ✨")],
            components: []
        });
    }

    const welcomeEmbed = new EmbedBuilder()
        .setColor(ConfigManager.getColor())
        .setTitle("Welcome to Yeco 🌱")
        .setDescription(`
Before you can start printing money (legally, of course), I need you to look over the important stuff.

**By clicking the button below, you confirm you've read and agreed to:**
📜 [Terms of Service](https://github.com/JustYuna/Yeco/blob/main/ToS.md)
🔒 [Privacy Policy](https://github.com/JustYuna/Yeco/blob/main/PrivacyPolicy.md)

*Failure to follow the rules might result in me turning back into a toaster. Nobody wants that.*
        `)
        .addFields(
            { name: "🚀 Getting Started", value: "You'll start with \`/farm\`. Simple, classic, effective." },
            { name: "⚠️ Heads Up", value: "Need a refresher later? Use \`/tos\` or \`/privacy\` anytime." }
        )
        .setFooter({ text: "This invitation expires in 5 minutes. Don't leave me hanging!" })
        .setTimestamp();

    const row = new ActionRowBuilder().addComponents(
        new ButtonBuilder()
            .setCustomId(`onboarding_accept_${userID}`)
            .setLabel("Accept & Start Journey")
            .setStyle(ButtonStyle.Success)
            .setEmoji("✅")
    );

    const msg = await interaction.editReply({
        embeds: [welcomeEmbed],
        components: [row]
    });

    // Create the collector to listen for the button press
    const collector = msg.createMessageComponentCollector({
        filter: i => i.user.id === userID && i.customId === `onboarding_accept_${userID}`,
        time: 300000, // 5 minutes
        max: 1
    });

    collector.on("collect", async i => {
        // Update database
        await SetAsync(userID, { ONBOARDING_COMPLETED: true });

        // Update the interaction to the success screen
        await i.update({
            embeds: [VerifiedEmbed("Thanks for joining Yeco! 🌿")],
            components: []
        });
    });

    collector.on("end", async (collected, reason) => {
        // If the user didn't click the button within the time limit
        if (reason === "time" && collected.size === 0) {
            const disabledRow = new ActionRowBuilder().addComponents(
                new ButtonBuilder()
                    .setCustomId(`onboarding_expired_${userID}`)
                    .setLabel("Interaction Timed Out")
                    .setStyle(ButtonStyle.Secondary)
                    .setDisabled(true)
            );

            await interaction.editReply({
                content: "Time's up! Use `/onboarding` again when you're ready to commit. 🏃‍♂️",
                embeds: [],
                components: [disabledRow]
            }).catch(() => {});
        }
    });
}

module.exports = Onboarding;