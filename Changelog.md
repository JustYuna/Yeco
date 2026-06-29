# 📦 Update Logs

All notable changes to this project will be documented in this file.

---
## [2026.06.2]

### ⚒️ Added
- **/delete-me** - has been added after the removal of **/me**

### 🔄 Changes
- **/wallet** - Now displays less information looking cleaner
- **/gift** - You cannot gift yourself anymore, you can now gift up to 100K and the reciever can now recieve up to 1M
- **/coinflip** - Now supports number abbreviation for large numbers
- **/heist** - Fully rewritten the heist system making rewards and fines dynamic + removing the Seek out + Difficulty
- Work commands now have diffrent level locks, read more via **/help**

- **Terms of Service / Privacy Policy** - Both have been updated and now include a "Agreement" section

### 🏦 Fixes

### 🚮 Removed
- **/onboarding**
- **/randomvideo**
- **/cooldowns**
- **/build-tower**
- **/reputation**
- **Minimum Guild Memember Requirement**

### 🛠 Tech Yap
- **change server lockout sizes**
- **added support for seperated dev commands via configs**
- **changed dev commands to only work on one selected dev server**
---
## [2026.06.1]

### ⚒️ Added
- **/daily** - tracks now your best daily streak

### 🏦 Fixes
- **/bank** - Object Promise errors within the command
- **/slots** - added missing emoji + saying null instead of head or tails
- **/factory** - Object Promise errors withing the command
- **/hug** - Removed falsly added bonk gifs
- **/info** - updated again ^^

### 🛠 Tech Yap
- **weebhook handler** - Templates for Yecos public server embeds have moved to its own seperate folder
- **cooldowns** - Cooldowns now automatically clear themself from the cache when finished to keep memory clean
---
## [2026.06]
> Gambling Factory

### ⚒️ Added
- **/randomvideo** - fetches a random video from a few presets
- **/factory** - Build and expand your factory to earn money offline!!!
- **/roulette** - Take a chance and bet on a roulette tabel!

### 🏦 Fixes
- **onboarding** - not resetting the command attempted to used cooldown
- **/daily** - not being buffed / not using the amounts set in config + added next claim timestamp when claimed
- **/info** - Fixed some links being wrong + remade half the layout ^^

### 🛠 Tech Yap
- **/randomvideo** - new field for this commands api was added to env "YOUTUBE_DATA_API_V3"
- **Datastore** - Testing a new lock method for ensuring correct data handling via datastore + The datastore now caps out at the 64bit limit
- **Utilities** - Added more utilities wich i will add more in the future to make new commands easier to make!!!
- **Number Abbreviation** - Added number abbreviation to way more commmands
- **Admin Commands** - I fixed up all admin commands for this update :3
- **Version Scheme** - Ive decided to change the version scheme from GrandUpdate . FeatureDrop . Hotfix to Year . Month . Patch
---
## [2.5.1]
> Forced Hotfix
> 22.05.2026

### :bank: Fixes
- **/coinflip** - validation being off
- **admin commands** - still wip
---
## [2.5]
> Temporary Update Title
> Released: 16.05.2026

### ⚒️ Added
- **/me** - View important data like: `Privacy Policy`, `Tearms of Service`, `Delete Data`
- **/onboarding** - Is now forced as a tutorial to make users read tos/privacy policy before starting the economy.
- **/laundry** - Can be used to launder `dirty` money earned from crime commands

### 🔄 Changes
- **/farm** – Lvl. 0
- **/gather** – Lvl. 2 - Merged `/fish` + `/hunt`
- **/extract** – Lvl. 5 - Merged `/mine` + `/chop`
- **/craft** – Lvl. 10 - Merged `/cook` + `/smith`
- **Max bets** - Gamble commands have now no max bet limitation
- **/daily** - Buffed reward to feel more rewarding
- **/ship** - Now is randomized between 0% - 100% instead of being userID based
- **/spin** - Fixed gifs breaking
- **Crime** - Now gives a secondary currency

### 🛠 Tech Yap
- **/work system rewrite** - Merged commands, Removed /passive [due to it not being user friendly]
- **Emojis** - Expanded custom emoji usage to replace default Discord styling  
---
## [2.4] - Work Commands Overhaul  
> Idle System Introduction + Major Economy Rework  
> Released: 24.04.2026

### ⚒️ Added
- **Passive Work System** – Certain work commands now store rewards over time and can be collected via `/passive`.
- **/passive command** – Collect all stored rewards in one place.
- **Expanded response system** – Added theme-aware and rarity-aware messages for all work commands.
- **Command descriptions** – Updated wording to be theme-friendly.
- **/cooldown** - Allows you to finaly view your current cooldowns.

### 🔄 Changes
- **Work commands** – Some commands are now passive to reduce spam and improve performance.
- **Minimum currency** – Lowered to allow smaller interactions (min = 1).
- **Increased variety** – Work commands now include default resources alongside the active theme.

### ⚙️ Tech
- **Even more emojis** - Replaced even more default emojis
- **Webhook support** – Added command to send updates via webhook  
  `!bot send_webhook update <message>`
- **Dev mode commands** – Commands remain accessible in development mode. / Ignores min member and other limitations
- **Performance improvements** – Reduced message spam and database writes through passive systems.
- **Crossmix Themes** – DEFAULT resources are mixed into active theme drops.

---
## [2.3] - Theme Change + New Tech  
> Quality of Life Update + Summer Theme ☀️  
> Released: 22.04.2026

### ⚒️ Added
- **/spin** - Spin till you’re dizzy  
- **/work** - Expanded response system  
- **DM Commands** - Selected commands now usable in DMs (use `/help` for details)  
- **/delete-data** - Fixed data deletion flow  
- **/report** - Send bug reports or feedback directly  
- **/setting** - Toggle personal preferences (e.g. leaderboard visibility)

### 🛠 Tech Yap
- **/work system rewrite** - New rarity system (Common → Mythic) with improved balancing and structure  
- **DM permission system** - Introduced tag-based command permissions for better control  
- **Emoji overhaul** - Expanded custom emoji usage to replace default Discord styling  
- **Leaderboard improvements** - Dynamic currency naming (e.g. `main_currency → Coin`)  
- **Dev mode support** - Separate bot configuration now supported via `.env.template`  
- **Leaderboard privacy setting** - Users can opt out of public leaderboards via `/setting`  
- **Memory optimizations** - Reduced runtime memory usage and improved cache handling for smoother performance on low-end hosting
- **Server size lockouts** - Large servers are now restricted to reduce load on low-end hosting (Pi-class hardware limits). Can be disabled in self-hosted setups or lifted via contributions

## [2.2] - QOL

### ⚒️ Added
- **/work** - Added more reponses
- **/gift** - Patched and added
- **/heist** - Fixed
- **New commands** - `/farm`, `/smith`, `/chop`

### 🛠 Tech Yap
- **/work*** - Added more responses, Added tags [WORTHLESS, e.g.] to add special events, new added work commands now also have a higher cooldown, higher output and a level requirement
- **Number abbreviation** - Fixed numbers like 100K being abbreviated to 0.1M

## [2.1] - The Theme Engine Update

### ⚒️ Added
- **/bank** - Deposit, withdraw, and upgrade your personal bank storage with full capacity tracking.
- **/rob** - Rob other users [buying shields to protect yourself is in work.]
- **/poke - /patpat** - Added more social commands.
- **Levels** - Working [`/mine`, `/cook`, `/fish`, `/hunt`] now give xp, locking further commands behind possible level walls to reduce data usage.

### 🛠 Tech Yap (Internal)
* **/ship** - Now uses user IDs instead of usernames → consistent results, no more reroll abuse via username changes
- **Number abbreviation** - Large numbers are now abbreviated for cleaner UX.
- **SyncUserData** – ensures missing fields are auto-added to the datastore to prevent lost values.
- **Social cleanup** - Social commands  [`/poke`, `/hug`, `/patpat`, `/bonk`] now use a single `socialAction` function, reducing clutter in the code


## [2.0] - The Theme Engine Update
> **Note:** This update includes a full economy reset to support the new global theme system.

### 🎭 Major Overhaul
- **Theme Engine:** Migrated from a seasonal "Candy" focus to a Global Bot architecture. The bot now supports dynamic themes (Halloween, Winter, Default).
- **Command Migration:** - Retired: `/trick-or-treat`, `/sugar-rush`
  - New: `/fish`, `/mine`, `/cook`, `/hunt`
- **Wallet System:** Updated `/basket` to `/wallet` to better reflect the new multi-currency support.

### 🛠 Tech Yap (Internal)
- **Security:** Critical code patches and data sanitization.
- **Improved Logic:** Reworked bot balance and configuration handling. [View Source](https://github.com/JustSnuv/Trickster/blob/main/SRC/config.js)
- **Performance:** Interaction handling is now significantly faster.
- **Smarter Captcha:** Integrated a new "Heat System" to detect automated botting more accurately while reducing friction for real users.

## [1.6]
### Reworked
- Improved performance across multiple commands.
- Reworked CAPTCHA system for improved stability.
- Increased **Rob** difficulty.

### 🎰 Improvements
- Global command deferring added for faster interaction handling.
- Better timeout protection and reduced API errors (10062).

## [1.5]
### ✨ New Features
- 👻 **/rob** has returned.

### 🎰 Improvements
- Recoded the command handler for better efficiency.
- Daily reward logic updated (item rewards coming soon).
- Added version selection to the log system.

### 🛠 Fixes
- Cooldown not resetting after captcha.
- Commands not replying correctly.
- Corrected **/sugar-hunt** rewards (150 instead of 30).
- Fixed false "broken" messages in sugar-hunt.
- General security patches.

## [1.4]
### ✨ New Features
- 🍪 Added **Cookies** as a second currency.
- 🎃 Expanded **trick-or-treat** responses.
- ➕ New **/vote** command with global rewards.
- ⭐ Added **Basket Item Inventory**.
- 🍬 Introduced **/sugar-hunt** minigame.
- 🗑️ Added Data Removal Request **/remove-data**.

### 🛠 Fixes
- Database sync issues.
- Resolved frequent interaction failures (10062 errors).
