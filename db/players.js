const mongoose = require("mongoose");



const playerSchema = new mongoose.Schema({
    name: String,
    role: String,
    image: String,
    matches: Number,
    runs: Number,
    stumpings: Number,
    profile_link: String
});

const Player = mongoose.model("Player", playerSchema);

// Check and Insert Players if not already in DB
async function seedDatabase() {
    const count = await Player.countDocuments();
    if (count === 0) {
        await Player.insertMany([
                { name: "Abdul Samad", role: "Batsman", image: "/players/abdul_samad.png", matches: 50, runs: 1200, stumpings: 0, profile_link: "/players/abdul_samad" },
                { name: "Ayush Badoni", role: "Batsman", image: "/players/ayush_badoni.png", matches: 40, runs: 900, stumpings: 0, profile_link: "/players/ayush_badoni" },
                { name: "David Miller", role: "Batsman", image: "/players/david_miller.png", matches: 150, runs: 3500, stumpings: 0, profile_link: "/players/david_miller" },
                { name: "Himmat Singh", role: "Batsman", image: "/players/himmat_singh.png", matches: 30, runs: 800, stumpings: 0, profile_link: "/players/himmat_singh" },
                { name: "Matthew Breetzke", role: "Batsman", image: "/players/matthew_breetzke.png", matches: 25, runs: 750, stumpings: 0, profile_link: "/players/matthew_breetzke" },
                
                { name: "Rishabh Pant", role: "Wicket-Keeper", image: "/players/rishabh_pant.png", matches: 100, runs: 2500, stumpings: 50, profile_link: "/players/rishabh_pant" },
                { name: "Nicholas Pooran", role: "Wicket-Keeper", image: "/players/nicholas_pooran.png", matches: 90, runs: 2300, stumpings: 40, profile_link: "/players/nicholas_pooran" },
                { name: "Aryan Juyal", role: "Wicket-Keeper", image: "/players/aryan_juyal.png", matches: 20, runs: 400, stumpings: 10, profile_link: "/players/aryan_juyal" },
            
                { name: "Aiden Markram", role: "All-Rounder", image: "/players/aiden_markram.png", matches: 80, runs: 2000, stumpings: 0, profile_link: "/players/aiden_markram" },
                { name: "Mitchell Marsh", role: "All-Rounder", image: "/players/mitchell_marsh.png", matches: 120, runs: 3000, stumpings: 0, profile_link: "/players/mitchell_marsh" },
                { name: "Shahbaz Ahmed", role: "All-Rounder", image: "/players/shahbaz_ahmed.png", matches: 50, runs: 1100, stumpings: 0, profile_link: "/players/shahbaz_ahmed" },
                { name: "Rajvardhan Hangargekar", role: "All-Rounder", image: "/players/rajvardhan_hangargekar.png", matches: 25, runs: 600, stumpings: 0, profile_link: "/players/rajvardhan_hangargekar" },
                { name: "Arshin Kulkarni", role: "All-Rounder", image: "/players/arshin_kulkarni.png", matches: 15, runs: 450, stumpings: 0, profile_link: "/players/arshin_kulkarni" },
                { name: "Yuvraj Chaudhary", role: "All-Rounder", image: "/players/yuvraj_chaudhary.png", matches: 20, runs: 550, stumpings: 0, profile_link: "/players/yuvraj_chaudhary" },
            
                { name: "Ravi Bishnoi", role: "Bowler", image: "/players/ravi_bishnoi.png", matches: 85, runs: 300, stumpings: 0, profile_link: "/players/ravi_bishnoi" },
                { name: "Mayank Yadav", role: "Bowler", image: "/players/mayank_yadav.png", matches: 30, runs: 150, stumpings: 0, profile_link: "/players/mayank_yadav" },
                { name: "Mohsin Khan", role: "Bowler", image: "/players/mohsin_khan.png", matches: 40, runs: 200, stumpings: 0, profile_link: "/players/mohsin_khan" },
                { name: "Avesh Khan", role: "Bowler", image: "/players/avesh_khan.png", matches: 60, runs: 250, stumpings: 0, profile_link: "/players/avesh_khan" },
                { name: "Akash Deep", role: "Bowler", image: "/players/akash_deep.png", matches: 35, runs: 180, stumpings: 0, profile_link: "/players/akash_deep" },
                { name: "Akash Singh", role: "Bowler", image: "/players/akash_singh.png", matches: 28, runs: 120, stumpings: 0, profile_link: "/players/akash_singh" },
                { name: "M. Siddharth", role: "Bowler", image: "/players/m_siddharth.png", matches: 20, runs: 100, stumpings: 0, profile_link: "/players/m_siddharth" },
                { name: "Digvesh Singh", role: "Bowler", image: "/players/digvesh_singh.png", matches: 15, runs: 80, stumpings: 0, profile_link: "/players/digvesh_singh" },
                { name: "Shamar Joseph", role: "Bowler", image: "/players/shamar_joseph.png", matches: 18, runs: 90, stumpings: 0, profile_link: "/players/shamar_joseph" },
                { name: "Prince Yadav", role: "Bowler", image: "/players/prince_yadav.png", matches: 10, runs: 60, stumpings: 0, profile_link: "/players/prince_yadav" }
            ]);
            
        console.log("✅ Players inserted successfully!");
    }
}

seedDatabase();

module.exports = Player;
