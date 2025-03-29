const express = require('express');
const app = express();
const cors= require('cors');
const path= require('path');
app.use(cors());
const Player = require("./db/players");
const Staff = require("./db/supporting_staff");
const PlayerProfile = require('./db/player_profile');
const Match= require('./db/matches');
const Standings= require('./db/standings');
app.set('view engine','ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname,'public')));
const port=2500;
const axios = require("axios");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const vs_Match = require("./db/vs_match");
const Auction=require("./db/auction");

const { SupportPlayer, FanPoll, PollOption, Comment } = require('./db/support');
const TELEGRAM_BOT_TOKEN = "7987417040:AAFdVWp4GzpbgMSyOBmGHUI03tdcHy4PDVg";
const TELEGRAM_CHAT_ID = "5360379087";
const mongoose = require("mongoose");

// mongodb://localhost:27017/ipl_team
mongoose.connect("mongodb+srv://ipl_lsg_team:S9n2k%40sh58@akscluster.z0f9q.mongodb.net/ipl_lsg_team?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log("✅ MongoDB Connected"))
.catch(err => console.error("❌ MongoDB Connection Error:", err));
app.get("/proxy-rss-feed", async (req, res) => {
    try {
        const rssUrl = "https://news.google.com/rss/search?q=Lucknow+Super+Giants+cricket&hl=en-US&gl=US&ceid=US:en";
        const response = await axios.get(rssUrl, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
            }
        });
        res.send(response.data);
    } catch (error) {
        console.error("Error fetching RSS feed in proxy:", error.message);
        res.status(500).send("Error fetching RSS feed");
    }
});
app.get('/',(req,res)=>{
    res.render('home');
});
app.get('/team', async (req, res) => {
    try {
        const players = await Player.find(); // Fetch players
        const staff = await Staff.find(); // Fetch supporting staff

        res.render('team', { players, staff }); // Pass both to EJS
    } catch (error) {
        console.error("Error fetching data:", error);
        res.status(500).send("Error loading team page");
    }
});

app.get('/players/:profile_link', async (req, res) => {
    try {
        const player = await Player.findOne({ profile_link: `/players/${req.params.profile_link}` });
        if (!player) return res.status(404).send("Player not found");

        const profile = await PlayerProfile.findOne({ player_id: player._id });

        res.render('player_profile', { player, profile });
    } catch (error) {
        console.error("Error fetching player profile:", error);
        res.status(500).send("Error loading profile");
    }
});

app.get('/matches',async(req,res)=>{
    try {
        const match = await Match.find(); // Fetch players
        res.render('matches', { match }); // Pass both to EJS
    } catch (error) {
        console.error("Error fetching data:", error);
        res.status(500).send("Error loading team page");
    }
});
app.get('/matches/:match_id', async (req, res) => {
    try {
        const matchId = parseInt(req.params.match_id); // Convert to integer

        // Fetch match details
        const match = await Match.findOne({ match_id: matchId });
        const vs_match = await vs_Match.findOne({ match_id: matchId });

        if (!match || !vs_match) {
            return res.status(404).send("Match not found");
        }
        res.render('v_s_match', { match, vs_match });
    } catch (error) {
        console.error("❌ Error fetching match data:", error);
        res.status(500).send("Error loading match page");
    }
});

app.get('/standings', async (req, res) => {
    try {
        const year = req.query.year || 2024; // Default to 2024 if no year is selected
        const standings = await Standings.findOne({ year }); // Fetch standings for selected year
        const allYears = await Standings.distinct("year"); // Get all years for dropdown

        res.render('standings', { standings, allYears, selectedYear: year });
    } catch (error) {
        console.error("Error fetching data:", error);
        res.status(500).send("Error loading standings page");
    }
});

app.get('/auction', async (req, res) => {
    const auctions = await Auction.find();
    
    // Find LSG data by default
    const defaultTeam = auctions.find(team => team.team_name === "Lucknow Super Giants");

    res.render('auction', { auctions, defaultTeam });
});





app.get('/support-player', async (req, res) => {
    try {
        const supportPlayers = await SupportPlayer.find().populate('player').exec();
        const fanPolls = await FanPoll.find().populate('options').exec();

        res.render('support-player', {
            supportPlayers,
            fanPolls
        });
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).send('Server Error');
    }
});

// Route to rate a player
app.post('/rate-player/:playerId', async (req, res) => {
    try {
        const { playerId } = req.params;
        const { rating } = req.body;

        const supportPlayer = await SupportPlayer.findById(playerId);
        if (!supportPlayer) {
            return res.status(404).json({ message: 'Player not found' });
        }

        supportPlayer.rating = rating;
        await supportPlayer.save();

        res.json({ message: 'Rating updated' });
    } catch (error) {
        console.error('Error rating player:', error);
        res.status(500).json({ message: 'Server Error' });
    }
});

// Route to like/dislike a player
app.post('/like-player/:playerId', async (req, res) => {
    try {
        const { playerId } = req.params;
        const { action } = req.body;
        const userId = req.ip;

        const supportPlayer = await SupportPlayer.findById(playerId);
        if (!supportPlayer) {
            return res.status(404).json({ message: 'Player not found' });
        }

        const existingVote = supportPlayer.votedUsers.find(vote => vote.userId === userId);
        if (existingVote) {
            const previousAction = existingVote.action;
            if (previousAction === 'like') {
                supportPlayer.likes -= 1;
            } else if (previousAction === 'dislike') {
                supportPlayer.dislikes -= 1;
            } else if (previousAction === 'neutral') {
                supportPlayer.neutral -= 1;
            }
            existingVote.action = action;
        } else {
            supportPlayer.votedUsers.push({ userId, action });
        }

        if (action === 'like') {
            supportPlayer.likes += 1;
        } else if (action === 'dislike') {
            supportPlayer.dislikes += 1;
        } else if (action === 'neutral') {
            supportPlayer.neutral += 1;
        }

        await supportPlayer.save();

        res.json({
            likes: supportPlayer.likes,
            dislikes: supportPlayer.dislikes,
            neutral: supportPlayer.neutral
        });
    } catch (error) {
        console.error('Error liking/disliking player:', error);
        res.status(500).json({ message: 'Server Error' });
    }
});


app.post('/create-poll', async (req, res) => {
    try {
        const { question, options } = req.body;

        const pollOptions = await Promise.all(options.map(async optionText => {
            const option = new PollOption({ option_text: optionText });
            await option.save();
            return option._id;
        }));

        const poll = new FanPoll({
            question,
            options: pollOptions
        });
        await poll.save();

        res.json({ message: 'Poll created' });
    } catch (error) {
        console.error('Error creating poll:', error);
        res.status(500).json({ message: 'Server Error' });
    }
});
// Route to handle voting
app.post('/vote/:pollId/:optionId', async (req, res) => {
    try {
        const { pollId, optionId } = req.params;

        const option = await PollOption.findById(optionId);
        if (!option) {
            return res.status(404).json({ message: 'Option not found' });
        }

        option.votes += 1;
        await option.save();

        res.json({ votes: option.votes });
    } catch (error) {
        console.error('Error voting:', error);
        res.status(500).json({ message: 'Server Error' });
    }
});

// Route to handle comment submission
app.post('/submit-comment', async (req, res) => {
    try {
        const { name, email, comment } = req.body;

        const newComment = new Comment({ name, email, comment });
        await newComment.save();

        const message = `New Comment:\nName: ${name}\nEmail: ${email}\nComment: ${comment}`;
        await axios.post(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
            chat_id: TELEGRAM_CHAT_ID,
            text: message
        });

        res.json({ message: 'Comment submitted' });
    } catch (error) {
        console.error('Error submitting comment:', error);
        res.status(500).json({ message: 'Server Error' });
    }
});

app.delete('/delete-poll/:pollId', async (req, res) => {
    try {
        const { pollId } = req.params;

        const poll = await FanPoll.findById(pollId);
        if (!poll) {
            return res.status(404).json({ message: 'Poll not found' });
        }

        // Delete associated poll options
        await PollOption.deleteMany({ _id: { $in: poll.options } });

        // Delete the poll
        await FanPoll.deleteOne({ _id: pollId });

        res.json({ message: 'Poll deleted successfully' });
    } catch (error) {
        console.error('Error deleting poll:', error);
        res.status(500).json({ message: 'Server Error' });
    }});
    app.get('/*',(req,res)=>{
res.render('error');
    });
app.listen(port, () => {
    console.log(`🚀 Server is running on http://localhost:${port}`);
});









