const mongoose = require("mongoose");


const standingsSchema = new mongoose.Schema({
    year: { type: Number, required: true },
    teams: [
        {
            position: { type: Number },
            team_name: { type: String },
            team_img: { type: String }, // Added team image field
            matches: { type: Number, default: 14 },
            wins: { type: Number },
            losses: { type: Number },
            no_result: { type: Number, default: 0 },
            net_rr: { type: String },
            points: { type: Number },
            form_guide: { type: [String] },
        },
    ],
});

const Standings = mongoose.model("Standings", standingsSchema);

// Function to shuffle array (Fisher-Yates algorithm)
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Function to generate random stats
function generateRandomStats() {
    const wins = Math.floor(Math.random() * (12 - 5 + 1)) + 5; // Wins: 5-12
    const losses = 14 - wins;
    const points = wins * 2;
    const form_guide = Array.from({ length: 5 }, () =>
        Math.random() > 0.5 ? "W" : "L"
    ); // Last 5 matches (W/L)

    // Generate Net Run Rate (NRR) with explicit + or - sign
    let net_rr_value = (Math.random() * 1.5).toFixed(3); // Random between 0.000 and 1.500
    let net_rr = wins >= losses ? `+${net_rr_value}` : `-${net_rr_value}`;

    return { wins, losses, net_rr, points, form_guide };
}

// IPL teams with their respective logos
const originalTeams = [
    { name: "Gujarat Titans", logo: "/players/match_logo/gt_logo.png", },
    { name: "Rajasthan Royals", logo:"/players/match_logo/rr_logo.png", },
    { name: "Lucknow Super Giants", logo: "/players/match_logo/lsg_logo.png", },
    { name: "Royal Challengers Bengaluru", logo: "/players/match_logo/rcb_logo.png", },
    { name: "Delhi Capitals", logo: "/players/match_logo/dc_logo.png", },
    { name: "Kings XI Punjab", logo:"/players/match_logo/kxip_logo.png", },
    { name: "Kolkata Knight Riders", logo:"/players/match_logo/kkr_logo.png",  },
    { name: "Sunrisers Hyderabad", logo: "/players/match_logo/srh_logo.png", },
    { name: "Chennai Super Kings", logo: "/players/match_logo/csk_logo.png", },
    { name: "Mumbai Indians", logo: "/players/match_logo/mi_logo.png", },
];

async function seedDatabase() {
    const count = await Standings.countDocuments();
    if (count === 0) {
        const years = [2022, 2023, 2024];

        const data = years.map((year) => {
            const shuffledTeams = shuffleArray([...originalTeams]); // Shuffle team order
            return {
                year,
                teams: shuffledTeams.map((team, index) => ({
                    position: index + 1,
                    team_name: team.name,
                    team_img: team.logo, // Assign team logo
                    matches: 14,
                    ...generateRandomStats(),
                })),
            };
        });

        await Standings.insertMany(data);
        console.log("✅ Standings for 2022, 2023, and 2024 inserted with shuffled teams and team logos!");
    }
}

seedDatabase();

module.exports = Standings;
