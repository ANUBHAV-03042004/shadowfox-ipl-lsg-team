const mongoose = require('mongoose');
const PlayerProfile = require('../../db/player_profile');
const Player = require('../../db/players');

mongoose.connect('mongodb://localhost:27017/ipl_team', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("MongoDB Connected"))
  .catch(err => console.error("MongoDB Connection Error:", err));

function generateBiography(player) {
    const roles = {
        "Batsman": "Known for his aggressive batting style and ability to score quick runs, ",
        "Bowler": "A talented bowler with great control over line and length, ",
        "All-Rounder": "A versatile all-rounder who contributes with both bat and ball, ",
        "Wicket-Keeper": "A sharp wicket-keeper with lightning-fast reflexes, "
    };

    return `${roles[player.role] || "An outstanding player, "} ${player.name || "This player"} has played ${player.matches} matches and scored ${player.runs} runs. 
    His dedication and consistency make him a crucial part of his team. Over the years, he has demonstrated remarkable skills in ${player.role.toLowerCase()}, 
    adapting to different game situations. Whether leading a run chase or defending a low total, ${player.name || "he"} has proven his mettle under pressure. 
    Fans admire his ability to perform in high-stake matches, making him one of the most valuable players in the IPL.`;
}
// Function to calculate overall stats
const calculateOverallStats = (stats) => {
    let total = stats.reduce((sum, match) => {
        Object.keys(match).forEach(key => {
            if (typeof match[key] === 'number') {
                sum[key] = (sum[key] || 0) + match[key];
            }
        });
        return sum;
    }, {});

    // Calculate overall batting average (avoid division by zero)
    total.average = total.innings > total.not_outs 
        ? (total.runs / Math.max(1, (total.innings - total.not_outs))).toFixed(2) 
        : 0;  // Ensure it's a number

    // Calculate overall strike rate (avoid division by zero)
    total.strike_rate = total.balls_faced > 0 
        ? ((total.runs / total.balls_faced) * 100).toFixed(2) 
        : 0;  // Ensure it's a number

    return total;
};

// Function to generate match stats
function generateMatchStats(player) {
    let matches = [];
    const numMatches = Math.floor(Math.random() * 2) + 10;

    for (let i = 0; i < numMatches; i++) {
        let match = {       
            matches: Math.floor(Math.random() * player.matches) + 2,
            innings: player.matches - Math.floor(Math.random() * 10),
            not_outs: Math.floor(Math.random() * 20),
            runs: Math.floor(Math.random() * player.runs),
            highest_score: Math.round(player.runs / player.matches + Math.random() * 20),
            hundreds: Math.floor(Math.random() * 3),
            fifties: Math.floor(Math.random() * 10),
            fours: Math.floor(Math.random() * 200),
            sixes: Math.floor(Math.random() * 100),
            balls_faced: player.runs + Math.floor(Math.random() * 12) * 25,
            wickets: Math.floor(Math.random() * 50),
            dot_balls: Math.floor(Math.random() * 300),
            maidens: Math.floor(Math.random() * 10),
            catches: Math.floor(Math.random() * 50),
            run_outs: Math.floor(Math.random() * 20),
            stumpings: Math.floor(Math.random() * 5),
        };

        // Calculate average (avoid division by zero)
        match.average = match.innings > match.not_outs 
            ? (match.runs / Math.max(1, (match.innings - match.not_outs))).toFixed(2) 
            : 0;  // Ensure it's a number

        // Calculate strike rate (avoid division by zero)
        match.strike_rate = match.balls_faced > 0 
            ? ((match.runs / match.balls_faced) * 100).toFixed(2) 
            : 0;  // Ensure it's a number

        matches.push(match);
    }
    return matches;
}


async function insertPlayerProfiles() {
    try {
        const players = await Player.find();
        if (!players.length) {
            console.error("No players found! Make sure Player collection is populated.");
            return;
        }
        
        const profiles = players.map(player => {
            // Generate match stats first
            const ipl_stats = generateMatchStats(player);
            const t20_stats = generateMatchStats(player);

            // Calculate overall IPL & T20 stats
            const overall_ipl_stats = calculateOverallStats(ipl_stats);
            const overall_t20_stats = calculateOverallStats(t20_stats);

            return {
                player_id: player._id,
                born: `October ${Math.floor(Math.random() * 30 + 1)}, 19${Math.floor(Math.random() * 30 + 70)}`,
                ipl_debut: 2010 + Math.floor(Math.random() * 10),
                role: player.role,
                batting_style: ["Right Handed", "Left Handed"][Math.floor(Math.random() * 2)],
                bowling_style: ["Off Spin", "Leg Spin", "Fast", "Medium Fast", "-"][Math.floor(Math.random() * 5)],
                nationality: ["India", "Australia", "South Africa", "England", "New Zealand", "West Indies"][Math.floor(Math.random() * 6)],
                biography: generateBiography(player),
                ipl_stats,  // Store IPL stats array
                t20_stats,  // Store T20 stats array
                overall_ipl_stats,  // Store overall IPL stats sum (including avg & SR)
                overall_t20_stats   // Store overall T20 stats sum (including avg & SR)
            };
        });

        await PlayerProfile.insertMany(profiles);
        console.log("Player profiles inserted successfully!");
        mongoose.connection.close();
    } catch (error) {
        console.error("Error inserting player profiles:", error);
    }
}

insertPlayerProfiles();
