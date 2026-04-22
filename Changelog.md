# 📦 Update Logs

All notable changes to this project will be documented in this file.

---
## [2.3] - Theme Change + New Tech  
> Quality of Life Update + Summer Theme ☀️  
> Released: -

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
