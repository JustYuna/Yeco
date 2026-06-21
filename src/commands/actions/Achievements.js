const AchievementData = {
    HAVE_MONEY: {
        100_000: "1/10 Millionair",
        250_000: "1/4 Millionair",
        500_000: "Half a Millionair",
        1_000_000: "Millionair"
    },

    GAMBLE_MONEY: {
        100_000: "High Roller",
        250_000: "High Steaks",
        500_000: "Are you winning son?",
        1_000_000: "Addicted",
    },

    STEAK: {
        3: "3 Days",
        7: "1 Week",
        30: "1 Month",
        365: "I am addicted"
    }
}

async function Achievement(interaction, { type, target, mode }) {
    switch (type) {
        case "view":
            return

        case "add":
            return
    }
}

module.exports = Achievement;