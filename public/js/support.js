document.addEventListener("DOMContentLoaded", () => {
    // Support Players Scroll
    const supportPlayersContainer = document.getElementById("support-players-container");
    const supportScrollLeftBtn = document.querySelector(".support-content .support-scroll-left");
    const supportScrollRightBtn = document.querySelector(".support-content .support-scroll-right");

    // Fan Polls Scroll
    const fanPollsContainer = document.getElementById("fan-polls-container");
    const pollScrollLeftBtn = document.querySelector(".support-content .poll-scroll-left");
    const pollScrollRightBtn = document.querySelector(".support-content .poll-scroll-right");

    // Dynamically calculate the number of visible cards
    const supportCardWidth = 180 + 20; // Updated max-width: 180px + margin-right: 20px
    const pollCardWidth = 250 + 20; // Updated max-width: 250px + margin-right: 20px

    // Calculate how many cards are visible in the container
    const supportVisibleCards = Math.floor(supportPlayersContainer.clientWidth / supportCardWidth) || 1;
    const pollVisibleCards = Math.floor(fanPollsContainer.clientWidth / pollCardWidth) || 1;

    // Log for debugging
    console.log("Support Players Container Width:", supportPlayersContainer.clientWidth);
    console.log("Support Card Width:", supportCardWidth);
    console.log("Support Visible Cards:", supportVisibleCards);
    console.log("Poll Container Width:", fanPollsContainer.clientWidth);
    console.log("Poll Card Width:", pollCardWidth);
    console.log("Poll Visible Cards:", pollVisibleCards);

    // Scroll by 2 cards at a time for smoother scrolling
    const supportCardsToScroll = Math.max(1, Math.floor(supportVisibleCards / 1));
    const pollCardsToScroll = Math.max(1, Math.floor(pollVisibleCards / 1));

    const supportScrollAmount = supportCardWidth * supportCardsToScroll;
    const pollScrollAmount = pollCardWidth * pollCardsToScroll;

    console.log("Support Cards to Scroll:", supportCardsToScroll);
    console.log("Support Scroll Amount:", supportScrollAmount);
    console.log("Poll Cards to Scroll:", pollCardsToScroll);
    console.log("Poll Scroll Amount:", pollScrollAmount);

    // Support Players Scroll Handlers
    supportScrollLeftBtn.addEventListener("click", () => {
        supportPlayersContainer.scrollBy({ left: -supportScrollAmount, behavior: "smooth" });
    });

    supportScrollRightBtn.addEventListener("click", () => {
        supportPlayersContainer.scrollBy({ left: supportScrollAmount, behavior: "smooth" });
    });

    function updateSupportScrollButtons() {
        const maxScroll = supportPlayersContainer.scrollWidth - supportPlayersContainer.clientWidth;
        const tolerance = 5;
        supportScrollLeftBtn.style.display = supportPlayersContainer.scrollLeft > 0 ? "block" : "none";
        supportScrollRightBtn.style.display = supportPlayersContainer.scrollLeft < maxScroll - tolerance ? "block" : "none";
    }

    supportPlayersContainer.addEventListener("scroll", updateSupportScrollButtons);
    updateSupportScrollButtons();

    // Fan Polls Scroll Handlers
    pollScrollLeftBtn.addEventListener("click", () => {
        fanPollsContainer.scrollBy({ left: -pollScrollAmount, behavior: "smooth" });
    });

    pollScrollRightBtn.addEventListener("click", () => {
        fanPollsContainer.scrollBy({ left: pollScrollAmount, behavior: "smooth" });
    });

    function updatePollScrollButtons() {
        const maxScroll = fanPollsContainer.scrollWidth - fanPollsContainer.clientWidth;
        const tolerance = 5;
        pollScrollLeftBtn.style.display = fanPollsContainer.scrollLeft > 0 ? "block" : "none";
        pollScrollRightBtn.style.display = fanPollsContainer.scrollLeft < maxScroll - tolerance ? "block" : "none";
    }

    fanPollsContainer.addEventListener("scroll", updatePollScrollButtons);
    updatePollScrollButtons();

    // Star Rating Functionality
    const starRatings = document.querySelectorAll(".star-rating");
    starRatings.forEach(ratingDiv => {
        const stars = ratingDiv.querySelectorAll(".fas.fa-star");
        const playerId = ratingDiv.dataset.playerId;

        stars.forEach(star => {
            star.addEventListener("click", async () => {
                const rating = star.dataset.rating;
                try {
                    const response = await fetch(`/rate-player/${playerId}`, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({ rating })
                    });

                    if (response.ok) {
                        stars.forEach(s => s.classList.remove("filled"));
                        for (let i = 0; i < rating; i++) {
                            stars[i].classList.add("filled");
                        }
                    } else {
                        alert("Error rating player. Please try again.");
                    }
                } catch (error) {
                    console.error("Error rating player:", error);
                    alert("Error rating player. Please try again.");
                }
            });
        });
    });

    // Like/Dislike Functionality
    const likeDislikeDivs = document.querySelectorAll(".like-dislike");
    likeDislikeDivs.forEach(div => {
        const playerId = div.dataset.playerId;
        const buttons = div.querySelectorAll(".fas");

        buttons.forEach(button => {
            button.addEventListener("click", async () => {
                const action = button.dataset.action;
                try {
                    const response = await fetch(`/like-player/${playerId}`, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({ action })
                    });

                    if (response.ok) {
                        const data = await response.json();
                        div.querySelector("span:nth-child(2)").textContent = data.likes;
                        div.querySelector("span:nth-child(4)").textContent = data.dislikes;
                        div.querySelector("span:nth-child(6)").textContent = data.neutral;
                    } else {
                        alert("Error liking/disliking player. Please try again.");
                    }
                } catch (error) {
                    console.error("Error liking/disliking player:", error);
                    alert("Error liking/disliking player. Please try again.");
                }
            });
        });
    });

    // Voting Functionality for Polls
    const pollOptions = document.querySelectorAll(".poll-option");
    pollOptions.forEach(option => {
        option.addEventListener("click", async () => {
            const pollId = option.dataset.pollId;
            const optionId = option.dataset.optionId;

            try {
                const response = await fetch(`/vote/${pollId}/${optionId}`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    }
                });

                if (response.ok) {
                    const data = await response.json();
                    option.querySelector(".float-end").textContent = `Votes: ${data.votes}`;
                    const voteModal = new bootstrap.Modal(document.getElementById('voteSubmittedModal'));
                    voteModal.show();
                } else {
                    alert("Error voting. Please try again.");
                }
            } catch (error) {
                console.error("Error voting:", error);
                alert("Error voting. Please try again.");
            }
        });
    });

    // Delete Poll Functionality
    const deletePollButtons = document.querySelectorAll(".delete-poll-btn");
    let pollIdToDelete = null;

    deletePollButtons.forEach(button => {
        button.addEventListener("click", () => {
            pollIdToDelete = button.dataset.pollId;
            const deleteModal = new bootstrap.Modal(document.getElementById('deleteConfirmModal'));
            deleteModal.show();
        });
    });

    document.getElementById("confirmDeleteBtn").addEventListener("click", async () => {
        if (pollIdToDelete) {
            try {
                const response = await fetch(`/delete-poll/${pollIdToDelete}`, {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json"
                    }
                });

                if (response.ok) {
                    const deleteModal = new bootstrap.Modal(document.getElementById('pollDeletedModal'));
                    deleteModal.show();
                    setTimeout(() => location.reload(), 2000);
                } else {
                    alert("Error deleting poll. Please try again.");
                }
            } catch (error) {
                console.error("Error deleting poll:", error);
                alert("Error deleting poll. Please try again.");
            }
        }
        pollIdToDelete = null;
        const confirmModal = bootstrap.Modal.getInstance(document.getElementById('deleteConfirmModal'));
        confirmModal.hide();
    });

    // Add Option to Poll Form
    const addOptionBtn = document.getElementById("add-option-btn");
    const pollOptionsDiv = document.getElementById("poll-options");
    let optionCount = 2;

    addOptionBtn.addEventListener("click", () => {
        optionCount++;
        const newOption = document.createElement("div");
        newOption.classList.add("form-group");
        newOption.innerHTML = `
            <input type="text" class="form-control bg-dark text-white border-white option-input" name="options[]" placeholder="Option ${optionCount}" required>
        `;
        pollOptionsDiv.appendChild(newOption);
    });

    // Create Poll Form Submission
    const createPollForm = document.getElementById("create-poll-form");
    createPollForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        const question = document.getElementById("poll-question").value;
        const options = Array.from(document.querySelectorAll(".option-input")).map(input => input.value);

        try {
            const response = await fetch("/create-poll", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ question, options })
            });

            if (response.ok) {
                const pollModal = new bootstrap.Modal(document.getElementById('pollCreatedModal'));
                pollModal.show();
                createPollForm.reset();
                setTimeout(() => location.reload(), 2000);
            } else {
                alert("Error creating poll. Please try again.");
            }
        } catch (error) {
            console.error("Error creating poll:", error);
            alert("Error creating poll. Please try again.");
        }
    });

    // Comment Form Submission
    const commentForm = document.getElementById("comment-form");
    commentForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        const name = document.getElementById("comment-name").value;
        const email = document.getElementById("comment-email").value;
        const comment = document.getElementById("comment-text").value;

        try {
            const response = await fetch("/submit-comment", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ name, email, comment })
            });

            if (response.ok) {
                const commentModal = new bootstrap.Modal(document.getElementById('commentSubmittedModal'));
                commentModal.show();
                commentForm.reset();
            } else {
                alert("Error submitting comment. Please try again.");
            }
        } catch (error) {
            console.error("Error submitting comment:", error);
            alert("Error submitting comment. Please try again.");
        }
    });
});