const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/ipl_team", {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log("✅ MongoDB Connected (Support)"))
.catch(err => console.error("❌ MongoDB Connection Error (Support):", err));

const Player = require("./players");

const supportPlayerSchema = new mongoose.Schema({
    player: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Player",
        required: true
    },
    rating: {
        type: Number,
        min: 0,
        max: 5,
        default: 0
    },
    likes: {
        type: Number,
        default: 0
    },
    dislikes: {
        type: Number,
        default: 0
    },
    neutral: {
        type: Number,
        default: 0
    },
    votedUsers: [{
        userId: String,
        action: {
            type: String,
            enum: ['like', 'dislike', 'neutral']
        }
    }]
});

const pollOptionSchema = new mongoose.Schema({
    option_text: {
        type: String,
        required: true,
        trim: true,
        maxlength: 255
    },
    votes: {
        type: Number,
        default: 0,
        min: 0
    }
});

const fanPollSchema = new mongoose.Schema({
    question: {
        type: String,
        required: true,
        trim: true
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    options: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "PollOption"
    }]
});

const commentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        maxlength: 100
    },
    email: {
        type: String,
        required: true,
        trim: true,
        match: [/^\S+@\S+\.\S+$/, "Please enter a valid email address"]
    },
    comment: {
        type: String,
        required: true,
        trim: true
    },
    created_at: {
        type: Date,
        default: Date.now
    }
});

const SupportPlayer = mongoose.model("SupportPlayer", supportPlayerSchema);
const FanPoll = mongoose.model("FanPoll", fanPollSchema);
const PollOption = mongoose.model("PollOption", pollOptionSchema);
const Comment = mongoose.model("Comment", commentSchema);

async function seedSupportPlayers() {
    const count = await SupportPlayer.countDocuments();
    if (count === 0) {
        const players = await Player.find(); // Remove the limit to include all players
        if (players.length > 0) {
            const supportPlayers = players.map(player => ({
                player: player._id,
                rating: 0,
                likes: 0,
                dislikes: 0,
                neutral: 0,
                votedUsers: []
            }));
            await SupportPlayer.insertMany(supportPlayers);
            console.log(`✅ ${players.length} Support Players inserted successfully!`);
        }
    }
}

seedSupportPlayers();

module.exports = { SupportPlayer, FanPoll, PollOption, Comment };