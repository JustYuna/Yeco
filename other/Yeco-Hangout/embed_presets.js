const { EmbedBuilder } = require("discord.js");

const Presets = {
    rules: new EmbedBuilder()
            .setColor('Aqua')
            .setTitle('📜 Server Rules')
            .setAuthor({
                name: 'Yuna',
            })
            .addFields(
                {
                    name: 'General Rules',
                    value: `
1. Be respectful — no harassment or personal attacks.
2. No NSFW or clearly offensive content.
3. Avoid spam, trolling, and disruptive behavior.
4. Don't impersonate others or misuse alt accounts.
5. Follow Discord's Terms of Service.
6. Use English in public channels, including voice channels.
7. Do not send AI-generated content.
8. Promotion of any kind is forbidden.
9. Sending scam or malicious content will result in a ban.
                `,
                },
                {
                    name: 'Regarding Yeco',
                    value: `
Terms of Service:
https://github.com/JustYuna/Yeco/blob/main/ToS.md

Privacy Policy:
https://github.com/JustYuna/Yeco/blob/main/PrivacyPolicy.md
                `,
                }),
};

module.exports = Presets;