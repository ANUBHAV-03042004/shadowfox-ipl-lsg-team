const mongoose = require("mongoose");

const matchSchema = new mongoose.Schema({
    match_id: {type:Number,required:true},
    match_number: { type: String, required: true }, // Example: "Match 1", "Qualifier 1"
    status: { type: String, enum: ["Upcoming", "Completed"], required: true }, // Match status
    date: { type: String, required: true }, // Format: "DD/MM/YYYY"
    time_IST: { type: String, required: true }, // Format: "HH:MM AM/PM IST"
    team1: { type: String, required: true }, // Example: "Mumbai Indians"
    team2: { type: String, required: true }, // Example: "Chennai Super Kings"
    location: { type: String, required: true }, // Example: "Wankhede Stadium, Mumbai"
    team1_img: { type: String, required: true }, // Example: "Mumbai Indians"
    team2_img: { type: String, required: true },
    match_info: {
      series: { type: String, default: "Indian Premier League, 2025" },
      details: {
          weather: { type: String },
          toss: { type: String },
          umpires: { type: String },
          referee: { type: String },
          player_of_the_match: { type: String }
      }
  },
   
});

const Match = mongoose.model("Match", matchSchema);

async function seedDatabase() {
    const count = await Match.countDocuments();
    if (count === 0) {
        await Match.insertMany([
                {
                    "match_id":1,
                    "match_number": "Match 1",
                    "status": "Upcoming",
                    "date": "23/03/2025",
                    "time_IST": "07:30 PM IST",
                    "team1": "Mumbai Indians",
                    "team2": "Chennai Super Kings",
                    "location": "Wankhede Stadium, Mumbai",
                    "team1_img":"/players/match_logo/mi_logo.png",
                    "team2_img":"/players/match_logo/csk_logo.png",
                    "match_info": {
                      "series": "Indian Premier League, 2025",
                      "details": {
                        "weather": "Partly Cloudy, 28°C",
                        "toss": "Mumbai Indians won the toss and chose to bat",
                        "umpires": "Nitin Menon, Anil Chaudhary",
                        "referee": "Javagal Srinath",
                        "player_of_the_match": "Rohit Sharma"
                      }
                    }
                },
                {
                    "match_id":2,
                    "match_number": "Match 2",
                    "status": "Upcoming",
                    "date": "24/03/2025",
                    "time_IST": "07:30 PM IST",
                    "team1": "Royal Challengers Bangalore",
                    "team2": "Delhi Capitals",
                    "location": "M. Chinnaswamy Stadium, Bengaluru",
                    "team1_img":"/players/match_logo/rcb_logo.png",
                    "team2_img":"/players/match_logo/dc_logo.png",
                    "match_info": {
                      "series": "Indian Premier League, 2025",
                      "details": {
                        "weather": "Cloudy, 25°C",
                        "toss": "Delhi Capitals won the toss and chose to bowl",
                        "umpires": "Sundaram Ravi, Rod Tucker",
                        "referee": "Chris Broad",
                        "player_of_the_match": "Virat Kohli"
                      }
                    }
                },
                {
                    "match_id":3,
                    "match_number": "Match 3",
                    "status": "Upcoming",
                    "date": "25/03/2025",
                    "time_IST": "07:30 PM IST",
                    "team1": "Kolkata Knight Riders",
                    "team2": "Sunrisers Hyderabad",
                    "location": "Eden Gardens, Kolkata",
                   "team1_img":"/players/match_logo/kkr_logo.png",
                    "team2_img":"/players/match_logo/srh_logo.png",
                    "match_info": {
                      "series": "Indian Premier League, 2025",
                      "details": {
                        "weather": "Light Rain, 27°C",
                        "toss": "Kolkata Knight Riders won the toss and chose to bat",
                        "umpires": "Paul Reiffel, Kumar Dharmasena",
                        "referee": "Andy Pycroft",
                        "player_of_the_match": "Andre Russell"
                      }
                    }
                },
                {
                    "match_id":4,
                    "match_number": "Match 4",
                    "status": "Upcoming",
                    "date": "26/03/2025",
                    "time_IST": "03:30 PM IST",
                    "team1": "Lucknow Super Giants",
                    "team2": "Kings XI Punjab",
                    "location": "BRSABV Ekana Cricket Stadium, Lucknow",
                     "team1_img":"/players/match_logo/lsg_logo.png",
                      "team2_img":"/players/match_logo/kxip_logo.png",
                      "match_info": {
                        "series": "Indian Premier League, 2025",
                        "details": {
                          "weather": "Sunny, 30°C",
                          "toss": "Kings XI Punjab won the toss and chose to bowl",
                          "umpires": "Richard Illingworth, Bruce Oxenford",
                          "referee": "David Boon",
                          "player_of_the_match": "KL Rahul"
                        }
                      }
                },
                {
                    "match_id":5,
                    "match_number": "Match 5",
                    "status": "Upcoming",
                    "date": "26/03/2025",
                    "time_IST": "07:30 PM IST",
                    "team1": "Rajasthan Royals",
                    "team2": "Gujarat Titans",
                    "location": "Sawai Mansingh Stadium, Jaipur",
                       "team1_img":"/players/match_logo/rr_logo.png",
                      "team2_img":"/players/match_logo/gt_logo.png",
                      "match_info": {
                        "series": "Indian Premier League, 2025",
                        "details": {
                          "weather": "Clear, 29°C",
                          "toss": "Gujarat Titans won the toss and chose to bat",
                          "umpires": "Aleem Dar, Michael Gough",
                          "referee": "Jeff Crowe",
                          "player_of_the_match": "Sanju Samson"
                        }
                      }
                },
                {
                    "match_id":6,
                    "match_number": "Match 6",
                    "status": "Upcoming",
                    "date": "27/03/2025",
                    "time_IST": "07:30 PM IST",
                    "team1": "Delhi Capitals",
                    "team2": "Mumbai Indians",
                    "location": "Arun Jaitley Stadium, Delhi",
                     "team1_img":"/players/match_logo/dc_logo.png",
                      "team2_img":"/players/match_logo/mi_logo.png",
                      "match_info": {
                    "series": "Indian Premier League, 2025",
                    "details": {
                      "weather": "Hazy, 28°C",
                      "toss": "Mumbai Indians won the toss and chose to bowl",
                      "umpires": "Marais Erasmus, Chris Gaffaney",
                      "referee": "Ranjan Madugalle",
                      "player_of_the_match": "Ishan Kishan"
                    }
                  }
                },
                {
                    "match_id":7,
                    "match_number": "Match 7",
                    "status": "Upcoming",
                    "date": "28/03/2025",
                    "time_IST": "07:30 PM IST",
                    "team1": "Chennai Super Kings",
                    "team2": "Royal Challengers Bangalore",
                    "location": "MA Chidambaram Stadium, Chennai",
                     "team1_img":"/players/match_logo/csk_logo.png",
                      "team2_img":"/players/match_logo/rcb_logo.png",
                      "match_info": {
                        "series": "Indian Premier League, 2025",
                        "details": {
                          "weather": "Humid, 31°C",
                          "toss": "Chennai Super Kings won the toss and chose to bat",
                          "umpires": "Nigel Llong, Joel Wilson",
                          "referee": "Javagal Srinath",
                          "player_of_the_match": "MS Dhoni"
                        }
                      }
                },
                {
                    "match_id":8,
                    "match_number": "Match 8",
                    "status": "Upcoming",
                    "date": "29/03/2025",
                    "time_IST": "03:30 PM IST",
                    "team1": "Kings XI Punjab",
                    "team2": "Kolkata Knight Riders",
                    "location": "IS Bindra Stadium, Mohali",
                      "team1_img":"/players/match_logo/kxip_logo.png",
                      "team2_img":"/players/match_logo/kkr_logo.png",
                      "match_info": {
                        "series": "Indian Premier League, 2025",
                        "details": {
                          "weather": "Sunny, 32°C",
                          "toss": "Kolkata Knight Riders won the toss and chose to bat",
                          "umpires": "Paul Reiffel, Rod Tucker",
                          "referee": "Chris Broad",
                          "player_of_the_match": "Shreyas Iyer"
                        }
                      }
                },
                {
                    "match_id":9,
                    "match_number": "Match 9",
                    "status": "Upcoming",
                    "date": "29/03/2025",
                    "time_IST": "07:30 PM IST",
                    "team1": "Gujarat Titans",
                    "team2": "Sunrisers Hyderabad",
                    "location": "Narendra Modi Stadium, Ahmedabad",
                    "team1_img":"/players/match_logo/gt_logo.png",
                      "team2_img":"/players/match_logo/srh_logo.png",
                      "match_info": {
                        "series": "Indian Premier League, 2025",
                        "details": {
                          "weather": "Clear, 30°C",
                          "toss": "Sunrisers Hyderabad won the toss and chose to bowl",
                          "umpires": "Nitin Menon, Richard Illingworth",
                          "referee": "David Boon",
                          "player_of_the_match": "Hardik Pandya"
                        }
                      }
                },
                {
                    "match_id":10,
                    "match_number": "Match 10",
                    "status": "Upcoming",
                    "date": "30/03/2025",
                    "time_IST": "07:30 PM IST",
                    "team1": "Lucknow Super Giants",
                    "team2": "Rajasthan Royals",
                    "location": "BRSABV Ekana Cricket Stadium, Lucknow",
                      "team1_img":"/players/match_logo/lsg_logo.png",
                      "team2_img":"/players/match_logo/rr_logo.png",
                      "match_info": {
                        "series": "Indian Premier League, 2025",
                        "details": {
                          "weather": "Warm, 29°C",
                          "toss": "Rajasthan Royals won the toss and chose to bat",
                          "umpires": "Bruce Oxenford, Michael Gough",
                          "referee": "Jeff Crowe",
                          "player_of_the_match": "Jos Buttler"
                        }
                      }
                },
                {
                    "match_id":11,
                    "match_number": "Match 11",
                    "status": "Upcoming",
                    "date": "31/03/2025",
                    "time_IST": "07:30 PM IST",
                    "team1": "Mumbai Indians",
                    "team2": "Royal Challengers Bangalore",
                    "location": "Wankhede Stadium, Mumbai",
                    "team1_img":"/players/match_logo/mi_logo.png",
                      "team2_img":"/players/match_logo/rcb_logo.png",
                      "match_info": {
                        "series": "Indian Premier League, 2025",
                        "details": {
                          "weather": "Clear, 28°C",
                          "toss": "Royal Challengers Bangalore won the toss and chose to bowl",
                          "umpires": "Marais Erasmus, Kumar Dharmasena",
                          "referee": "Andy Pycroft",
                          "player_of_the_match": "Faf du Plessis"
                        }
                      }
                },
                {
                    "match_id":12,
                    "match_number": "Match 12",
                    "status": "Upcoming",
                    "date": "01/04/2025",
                    "time_IST": "07:30 PM IST",
                    "team1": "Chennai Super Kings",
                    "team2": "Kolkata Knight Riders",
                    "location": "MA Chidambaram Stadium, Chennai",
                      "team1_img":"/players/match_logo/csk_logo.png",
                      "team2_img":"/players/match_logo/kkr_logo.png",
                      "match_info": {
                        "series": "Indian Premier League, 2025",
                        "details": {
                          "weather": "Hot, 32°C",
                          "toss": "Chennai Super Kings won the toss and chose to bat",
                          "umpires": "Nigel Llong, Chris Gaffaney",
                          "referee": "Ranjan Madugalle",
                          "player_of_the_match": "Ravindra Jadeja"
                        }
                      }
                },
                {
                    "match_id":13,
                    "match_number": "Match 13",
                    "status": "Upcoming",
                    "date": "02/04/2025",
                    "time_IST": "07:30 PM IST",
                    "team1": "Sunrisers Hyderabad",
                    "team2": "Delhi Capitals",
                    "location": "Rajiv Gandhi International Stadium, Hyderabad",
                       "team1_img":"/players/match_logo/srh_logo.png",
                      "team2_img":"/players/match_logo/dc_logo.png",
                      "match_info": {
                        "series": "Indian Premier League, 2025",
                        "details": {
                          "weather": "Cloudy, 27°C",
                          "toss": "Delhi Capitals won the toss and chose to bowl",
                          "umpires": "Sundaram Ravi, Aleem Dar",
                          "referee": "David Boon",
                          "player_of_the_match": "David Warner"
                        }
                      }
                },
                {
                    "match_id":14,
                    "match_number": "Match 14",
                    "status": "Upcoming",
                    "date": "03/04/2025",
                    "time_IST": "07:30 PM IST",
                    "team1": "Kings XI Punjab",
                    "team2": "Gujarat Titans",
                    "location": "IS Bindra Stadium, Mohali",
                      "team1_img":"/players/match_logo/kxip_logo.png",
                      "team2_img":"/players/match_logo/gt_logo.png",
                      "match_info": {
                        "series": "Indian Premier League, 2025",
                        "details": {
                          "weather": "Partly Cloudy, 30°C",
                          "toss": "Gujarat Titans won the toss and chose to bat",
                          "umpires": "Richard Kettleborough, Bruce Oxenford",
                          "referee": "Chris Broad",
                          "player_of_the_match": "Shubman Gill"
                        }
                      }
                },
                {
                    "match_id":15,
                    "match_number": "Match 15",
                    "status": "Upcoming",
                    "date": "04/04/2025",
                    "time_IST": "07:30 PM IST",
                    "team1": "Rajasthan Royals",
                    "team2": "Lucknow Super Giants",
                    "location": "Sawai Mansingh Stadium, Jaipur",
                      "team1_img":"/players/match_logo/rr_logo.png",
                      "team2_img":"/players/match_logo/lsg_logo.png",
                      "match_info": {
                        "series": "Indian Premier League, 2025",
                        "details": {
                          "weather": "Warm, 31°C",
                          "toss": "Lucknow Super Giants won the toss and chose to bowl",
                          "umpires": "Paul Reiffel, Joel Wilson",
                          "referee": "Jeff Crowe",
                          "player_of_the_match": "Marcus Stoinis"
                        }
                      }
                }
            
            ]);
            
        console.log("✅ Staff inserted successfully!");
    }
}

seedDatabase();
module.exports = Match;


