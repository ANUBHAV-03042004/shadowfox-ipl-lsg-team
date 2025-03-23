const mongoose = require("mongoose");
const dc_squad = require("../public/js/squad"); 

// mongoose.connect("mongodb://localhost:27017/ipl_team", {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// })
// .then(() => console.log("✅ MongoDB Connected"))
// .catch(err => console.error("❌ MongoDB Connection Error:", err));

const vs_matchSchema = new mongoose.Schema({
    match_id: Number,
    team1_short: { type: String, required: true },
    team2_short: { type: String, required: true },
    status_match_centre: { type: String, enum: ["Yet To Begin", "Completed"], required: true },
    squad_stats: Object 
});

const vs_Match = mongoose.model("vs_match", vs_matchSchema); // ✅ lowercase model name

function getRandomPlayers(count) {
    return [...dc_squad].sort(() => 0.5 - Math.random()).slice(0, count);
}

const predefinedMatches = [
    { match_id: 1, team1_short: "MI", team2_short: "CSK" },
    { match_id: 2, team1_short: "RCB", team2_short: "DC" },
    { match_id: 3, team1_short: "KKR", team2_short: "SRH" },
    { match_id: 4, team1_short: "LSG", team2_short: "KXIP" },
    { match_id: 5, team1_short: "RR", team2_short: "GT" },
    { match_id: 6, team1_short: "DC", team2_short: "MI" },
    { match_id: 7, team1_short: "CSK", team2_short: "RCB" },
    { match_id: 8, team1_short: "KXIP", team2_short: "KKR" },
    { match_id: 9, team1_short: "GT", team2_short: "SRH" },
    { match_id: 10, team1_short: "LSG", team2_short: "RR" },
    { match_id: 11, team1_short: "MI", team2_short: "RCB" },
    { match_id: 12, team1_short: "CSK", team2_short: "KKR" },
    { match_id: 13, team1_short: "SRH", team2_short: "DC" },
    { match_id: 14, team1_short: "KXIP", team2_short: "GT" },
    { match_id: 15, team1_short: "RR", team2_short: "LSG" }
];

async function insertMatches() {
    try {
        const count = await vs_Match.countDocuments();
        if (count === 0) {
            console.log("🆕 Inserting matches...");
            const newMatches = predefinedMatches.map(match => ({
                ...match,
                status_match_centre: "Yet To Begin",
                squad_stats: {
                    [match.team1_short]: getRandomPlayers(24),
                    [match.team2_short]: getRandomPlayers(24)
                }
            }));

            await vs_Match.insertMany(newMatches);
            console.log("✅ Matches inserted successfully.");
        } else {
            console.log("⚠️ Matches already exist.");
        }
    } catch (err) {
        console.error("❌ Error inserting matches:", err);
    }
}

// Run insert function
insertMatches();

module.exports = vs_Match;