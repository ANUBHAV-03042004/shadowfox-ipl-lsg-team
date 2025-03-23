document.addEventListener("DOMContentLoaded", () => {
    const teamLogos = document.querySelectorAll(".auction-content .team-logo");
    const purseAmountEl = document.getElementById("purse-amount");
    const amountSpentEl = document.getElementById("amount-spent");
    const amountRemainingEl = document.getElementById("amount-remaining");
    const remainingRtmEl = document.getElementById("remaining-rtm");
    const playersContainer = document.getElementById("players-container");
    const boughtPlayersContainer = document.getElementById("bought-players-container");
    const scrollLeftBtn = document.querySelector(".auction-content .scroll-left");
    const scrollRightBtn = document.querySelector(".auction-content .scroll-right");
    const boughtScrollLeftBtn = document.querySelector(".auction-content .bought-scroll-left");
    const boughtScrollRightBtn = document.querySelector(".auction-content .bought-scroll-right");

    const auctionData = JSON.parse(document.getElementById("auction-data").dataset.auctions);

    // Define team colors (using the exact colors you provided)
    const teamColors = {
        "Chennai Super Kings": "#FFD700", 
        "Delhi Capitals": "#D3D3D3",
        "Gujarat Titans": "#B8860B",
        "Kolkata Knight Riders": "#4B0082", 
        "Lucknow Super Giants": "#1e3c72",
        "Kings XI Punjab": "#8B0000",
        "Mumbai Indians": "#00008B", 
        "Royal Challengers Bangalore": "#1C2526", 
        "Rajasthan Royals": "#C71585", 
        "Sunrisers Hyderabad": "#FF4500"
    };

    // Set default team and colors
    let defaultTeam = auctionData.find(team => team.team_name === "Lucknow Super Giants");
    if (defaultTeam) {
        updateTeamData(defaultTeam);
        updateRetainedPlayers(defaultTeam);
        updateBoughtPlayers(defaultTeam);
        updatePlayerCardColors(defaultTeam.team_name);
    }

    teamLogos.forEach((logo) => {
        logo.addEventListener("click", () => {
            teamLogos.forEach(l => l.classList.remove("selected"));
            logo.classList.add("selected");

            const selectedTeamName = logo.dataset.team;
            const selectedTeam = auctionData.find(team => team.team_name === selectedTeamName);
            if (selectedTeam) {
                updateTeamData(selectedTeam);
                updateRetainedPlayers(selectedTeam);
                updateBoughtPlayers(selectedTeam);
                updatePlayerCardColors(selectedTeamName);
            }
        });
    });

    function updateTeamData(team) {
        purseAmountEl.textContent = team.purse_amount || "0";
        amountSpentEl.textContent = team.amount_spent || "0";
        amountRemainingEl.textContent = team.amount_remaining || "0";
        remainingRtmEl.textContent = team.remaining_rtm || "0";
    }

    function updateRetainedPlayers(team) {
        let playerHTML = '';
        if (team && team.players && team.players.length > 0) {
            team.players.forEach(player => {
                if (player.status === "Retained") {
                    playerHTML += `
                        <div class="player-card" data-team="${team.team_name}">
                            <span class="player-name">${player.name}</span>
                            <span class="player-role">${player.role}</span>
                            <span class="player-price">Base Price: <span>${player.base_price || "N/A"}</span></span>
                            <span class="player-price">Current Price: <span>${player.current_price || "N/A"}</span></span>
                        </div>
                    `;
                }
            });
        } else {
            playerHTML = `<div class="player-card text-center" data-team="${team.team_name}">No Retained Players</div>`;
        }
        playersContainer.innerHTML = playerHTML;
        updateScrollButtons();
    }

    function updateBoughtPlayers(team) {
        let playerHTML = '';
        if (team && team.players && team.players.length > 0) {
            team.players.forEach(player => {
                if (player.status === "Bought") {
                    playerHTML += `
                        <div class="bought-player-card" data-team="${team.team_name}">
                            <span class="bought-player-name">${player.name}</span>
                            <span class="bought-player-role">${player.role}</span>
                            <span class="bought-player-price">Base Price: <span>${player.base_price || "N/A"}</span></span>
                            <span class="bought-player-price">Current Price: <span>${player.current_price || "N/A"}</span></span>
                        </div>
                    `;
                }
            });
        } else {
            playerHTML = `<div class="bought-player-card text-center" data-team="${team.team_name}">No Bought Players</div>`;
        }
        boughtPlayersContainer.innerHTML = playerHTML;
        updateBoughtScrollButtons();
    }

    function updatePlayerCardColors(teamName) {
        const playerCards = document.querySelectorAll(".auction-content .player-card");
        const boughtPlayerCards = document.querySelectorAll(".auction-content .bought-player-card");
        const teamColor = teamColors[teamName] || "#006400"; // Fallback to LSG color

        // Update Retained Players cards
        playerCards.forEach(card => {
            card.style.background = `linear-gradient(45deg, ${teamColor}, ${teamColor}CC)`;
        });

        // Update Bought Players cards
        boughtPlayerCards.forEach(card => {
            card.style.background = `linear-gradient(135deg, ${teamColor}33, rgba(0, 0, 0, 0.8))`; // Slightly different gradient for bought players
        });
    }

    const scrollAmount = 300;
    scrollLeftBtn.addEventListener("click", () => {
        playersContainer.scrollBy({ left: -scrollAmount, behavior: "smooth" });
    });

    scrollRightBtn.addEventListener("click", () => {
        playersContainer.scrollBy({ left: scrollAmount, behavior: "smooth" });
    });

    boughtScrollLeftBtn.addEventListener("click", () => {
        boughtPlayersContainer.scrollBy({ left: -scrollAmount, behavior: "smooth" });
    });

    boughtScrollRightBtn.addEventListener("click", () => {
        boughtPlayersContainer.scrollBy({ left: scrollAmount, behavior: "smooth" });
    });

    function updateScrollButtons() {
        const maxScroll = playersContainer.scrollWidth - playersContainer.clientWidth;
        const tolerance = 5;
        scrollLeftBtn.style.display = playersContainer.scrollLeft > 0 ? "block" : "none";
        scrollRightBtn.style.display = playersContainer.scrollLeft < maxScroll - tolerance ? "block" : "none";
    }

    function updateBoughtScrollButtons() {
        const maxScroll = boughtPlayersContainer.scrollWidth - boughtPlayersContainer.clientWidth;
        const tolerance = 5;
        boughtScrollLeftBtn.style.display = boughtPlayersContainer.scrollLeft > 0 ? "block" : "none";
        boughtScrollRightBtn.style.display = boughtPlayersContainer.scrollLeft < maxScroll - tolerance ? "block" : "none";
    }

    playersContainer.addEventListener("scroll", updateScrollButtons);
    boughtPlayersContainer.addEventListener("scroll", updateBoughtScrollButtons);
    updateScrollButtons();
    updateBoughtScrollButtons();
});