// JavaScript to Handle Switching Between IPL & T20 Stats
let iplStats = JSON.parse('<%- JSON.stringify(profile.overall_ipl_stats || {}) %>');
let t20Stats = JSON.parse('<%- JSON.stringify(profile.overall_t20_stats || {}) %>');
let role = "<%= player.role ? player.role.trim().toLowerCase() : '' %>";

function showStats(type) {
// Show/Hide Tables
document.getElementById("iplTable").style.display = (type === "ipl") ? "table" : "none";
document.getElementById("t20Table").style.display = (type === "t20") ? "table" : "none";
document.getElementById("iplHeading").style.display = (type === "ipl") ? "block" : "none";
document.getElementById("t20Heading").style.display = (type === "t20") ? "block" : "none";

// Get Stats Object
let stats = (type === "ipl") ? iplStats : t20Stats;

// Update Stat-Box Values
document.getElementById("matchesStat").innerText = stats.matches || "N/A";
document.getElementById("runsStat").innerText = stats.runs || "N/A";

// Update Third Stat Based on Player Role
let thirdStatTitle = document.getElementById("thirdStatTitle");
let thirdStatValue = document.getElementById("thirdStatValue");

if (role.includes("wicket")) {
    thirdStatTitle.innerText = "Stumpings";
    thirdStatValue.innerText = stats.stumpings || "N/A";
} else if (role.includes("batsman")) {
    thirdStatTitle.innerText = "Hi.Score";
    thirdStatValue.innerText = stats.highest_score || "N/A";
} else if (role.includes("all-rounder")) {
    thirdStatTitle.innerText = "St.Rate";
    thirdStatValue.innerText = stats.strike_rate || "N/A";
} else if (role.includes("bowler")) {
    thirdStatTitle.innerText = "Wickets";
    thirdStatValue.innerText = stats.wickets || "N/A";
}
}

// Show IPL stats by default
showStats("ipl");
