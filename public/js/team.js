
document.getElementById("option1").addEventListener("change", function () {
 document.getElementById("playersBox").classList.remove("d-none");
 document.getElementById("staffBox").classList.add("d-none");
});

document.getElementById("option2").addEventListener("change", function () {
 document.getElementById("playersBox").classList.add("d-none");
 document.getElementById("staffBox").classList.remove("d-none");
});
document.addEventListener("DOMContentLoaded", function () {
 const dropdown = document.getElementById("filter-dropdown");
 const optionsContainer = document.getElementById("filter-options");
 const selectedText = document.getElementById("selected-option");
 const filterOptions = document.querySelectorAll(".filter-option");
 const resetButton = document.getElementById("reset-filter");
 const roleSections = document.querySelectorAll(".role-section");

 // Toggle dropdown visibility
 dropdown.addEventListener("click", function (event) {
     event.stopPropagation();
     optionsContainer.classList.toggle("show");
 });

 // Close dropdown when clicking outside
 document.addEventListener("click", function (event) {
     if (!dropdown.contains(event.target)) {
         optionsContainer.classList.remove("show");
     }
 });

 function filterPlayers(role) {
     selectedText.innerText = role; // Update dropdown text
     optionsContainer.classList.remove("show"); // Close dropdown

     roleSections.forEach(section => {
         const sectionRole = section.getAttribute("data-role");
         if (role === "All" || sectionRole === role.toLowerCase()) {
             section.style.display = "block";
         } else {
             section.style.display = "none";
         }
     });
 }

 // Apply filter when selecting an option
 filterOptions.forEach(option => {
     option.addEventListener("click", function () {
         filterPlayers(this.getAttribute("data-txt"));
     });
 });

 // Reset filter
 resetButton.addEventListener("click", function () {
     filterPlayers("All");
 });

 // Initialize with all players visible
 filterPlayers("All");
});





