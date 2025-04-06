document.addEventListener("DOMContentLoaded", function () {
    // Toggle between Players and Support Staff
    const playersBox = document.getElementById("playersBox");
    const staffBox = document.getElementById("staffBox");
    const option1 = document.getElementById("option1");
    const option2 = document.getElementById("option2");

    option1.addEventListener("change", function () {
        playersBox.classList.remove("d-none");
        staffBox.classList.add("d-none");
    });

    option2.addEventListener("change", function () {
        playersBox.classList.add("d-none");
        staffBox.classList.remove("d-none");
    });

    // Filter dropdown logic for player roles
    const dropdown = document.getElementById("filter-dropdown");
    const optionsContainer = document.getElementById("filter-options");
    const selectedText = document.getElementById("selected-option");
    const filterOptions = document.querySelectorAll(".filter-option");
    const resetButton = document.getElementById("reset-filter");
    const roleSections = document.querySelectorAll(".role-section");

    dropdown.addEventListener("click", function (event) {
        event.stopPropagation();
        optionsContainer.classList.toggle("show");
    });

    document.addEventListener("click", function (event) {
        if (!dropdown.contains(event.target)) {
            optionsContainer.classList.remove("show");
        }
    });

    function filterPlayers(role) {
        selectedText.innerText = role;
        optionsContainer.classList.remove("show");

        roleSections.forEach(section => {
            const sectionRole = section.getAttribute("data-role");
            if (role === "All" || sectionRole === role.toLowerCase()) {
                section.style.display = "block";
            } else {
                section.style.display = "none";
            }
        });
    }

    filterOptions.forEach(option => {
        option.addEventListener("click", function () {
            filterPlayers(this.getAttribute("data-txt"));
        });
    });

    resetButton.addEventListener("click", function () {
        filterPlayers("All");
    });

    // Initialize with all players visible
    filterPlayers("All");
});