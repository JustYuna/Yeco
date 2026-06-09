const { EmbedBuilder } = require("discord.js");

const Presets = {
    rules: new EmbedBuilder()
            .setColor([150, 100, 250])
            .setTitle('📜 Server Rules')
            .setDescription(`
📌 ~ General Rules ~

1. Be respectful.
2. No NSFW or clearly offensive content.
3. Don't impersonate others or misuse alt accounts.
4. Use English when chatting.
5. Do not hold full-on conversations in the economy chat.
6. Promotion of any kind is strictly forbidden.
7. Sending scam or malicious content will result in an immediate ban.
8. Use the designated channels for support requests. DMs to staff will be ignored.

🔗 ~ Other things to follow ~

Discord - Terms of Service:
https://discord.com/terms

⚙️ ~ For server owners using Yeco ~

Yeco - Terms of Service:
https://github.com/JustYuna/Yeco/blob/main/ToS.md

ℹ️ ~ Other information ~

Having problems using Yeco?
→ Use /report to submit an issue
→ Or use /onboarding for a quick tutorial

Yeco - Privacy Policy:
https://github.com/JustYuna/Yeco/blob/main/PrivacyPolicy.md`)
};

module.exports = Presets;