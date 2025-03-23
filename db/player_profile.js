const mongoose = require('mongoose');

const MatchStatsSchema = new mongoose.Schema({
    matches: Number,
    innings: Number,
    not_outs: Number,
    runs: Number,
    highest_score: Number,
    average: Number,
    strike_rate: Number,
    hundreds: Number,
    fifties: Number,
    fours: Number,
    sixes: Number,
    balls_faced: Number,
    wickets: Number,
    dot_balls: Number,
    maidens: Number,
    catches: Number,
    run_outs: Number,
    stumpings: Number,
});

const PlayerProfileSchema = new mongoose.Schema({
    player_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Player' }, 
    born: String,
    ipl_debut: Number,
    role: String,
    batting_style: String,
    bowling_style: String,
    nationality: String,
    biography: String,
    ipl_stats: [MatchStatsSchema],  // Storing multiple match records
    t20_stats: [MatchStatsSchema],  // Storing multiple match records
    overall_ipl_stats: MatchStatsSchema, // Store as an object instead of Number
    overall_t20_stats: MatchStatsSchema, // Store as an object instead of Number
});

const PlayerProfile = mongoose.model('PlayerProfile', PlayerProfileSchema);
module.exports = PlayerProfile;
