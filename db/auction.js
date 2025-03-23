const mongoose = require("mongoose");
const fs = require("fs");
// const { dc_squad } = require("../public/js/squad.js");
const dc_squad = require("../public/js/squad.js");

// mongoose.connect("mongodb://localhost:27017/ipl_team", {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// })
// .then(() => console.log("✅ MongoDB Connected"))
// .catch(err => console.error("❌ MongoDB Connection Error:", err));

const auctionSchema = new mongoose.Schema({
    team_name: { type: String, required: true },
    team_img: { type: String, required: true },
    purse_amount: { type: String, required: true },
    amount_spent: { type: String, required: true },
    amount_remaining: { type: String, required: true },
    remaining_rtm: { type: Number, required: true },
    players: [{
        name: String,
        role: String,
        base_price: String,
        current_price: String,
        status: String // Retained or Bought
    }]
});

const Auction = mongoose.model("Auction", auctionSchema);

const teams = [
    { name: "Chennai Super Kings", img: "/players/match_logo/csk_logo.png" },
    { name: "Delhi Capitals", img: "/players/match_logo/dc_logo.png" },
    { name: "Gujarat Titans", img: "/players/match_logo/gt_logo.png" },
    { name: "Kolkata Knight Riders", img: "/players/match_logo/kkr_logo.png" },
    { name: "Lucknow Super Giants", img: "/players/match_logo/lsg_logo.png" },
    { name: "Kings XI Punjab", img: "/players/match_logo/kxip_logo.png" },
    { name: "Mumbai Indians", img: "/players/match_logo/mi_logo.png" },
    { name: "Royal Challengers Bangalore", img: "/players/match_logo/rcb_logo.png" },
    { name: "Rajasthan Royals", img: "/players/match_logo/rr_logo.png" },
    { name: "Sunrisers Hyderabad", img: "/players/match_logo/srh_logo.png" }
];

const basePrices = ["20 L", "50 L", "75 L", "1 Cr", "1.5 Cr", "2 Cr"];
const currentPrices = ["50 L", "75 L", "1 Cr", "2 Cr", "3 Cr", "5 Cr", "7 Cr", "10 Cr", "15 Cr"];
const roles = ["Batsman", "Bowler", "All-Rounder", "Wicket-Keeper"];

// Function to get random values
function getRandomValue(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

// Function to select 24 random players from dc_squad
function generatePlayers() {
    // const shuffledPlayers = dc_squad.sort(() => 0.5 - Math.random()).slice(0, 24);
    const shuffledPlayers = dc_squad.sort(() => 0.5 - Math.random()).slice(0, 24);
    return shuffledPlayers.map((player, index) => ({
        name: player.member_name,
        role: getRandomValue(roles),
        base_price: getRandomValue(basePrices),
        current_price: getRandomValue(currentPrices),
        status: index < 6 ? "Retained" : "Bought"
    }));
}

async function seedDatabase() {
    await Auction.deleteMany();
    const auctionData = teams.map(team => ({
        team_name: team.name,
        team_img: team.img,
        purse_amount: `${Math.floor(Math.random() * 20) + 100} Cr`,
        amount_spent: `${Math.floor(Math.random() * 20) + 100} Cr`,
        amount_remaining: `${Math.floor(Math.random() * 5) + 1} Cr`,
        remaining_rtm: Math.floor(Math.random() * 3),
        players: generatePlayers()
    }));
    await Auction.insertMany(auctionData);
    console.log("✅ Auction data inserted successfully!");
}

seedDatabase();

module.exports = Auction;
