import { clubs } from "./data.js";



const clubsList = document.getElementById("clubs-list");
const searchBar = document.getElementById("search-bar");

// Function to display clubs
function displayClubs(filteredClubs) {
  clubsList.innerHTML = "";
  filteredClubs.forEach((club) => {
    const clubCard = document.createElement("div");
    clubCard.classList.add("club-card");
    clubCard.innerHTML = `
            <img src="${club.img}" alt="${club.name}">
            <h3>${club.name}</h3>
            <p>Tags: ${club.tags.join(", ")}</p>
            <div class="club-type">${club.type}</div>
        `;
    clubsList.appendChild(clubCard);
  });
}

// Filter clubs by type
function filterClubsByType(type) {
  const filteredClubs =
    type === "all" ? clubs : clubs.filter((club) => club.type === type);
  displayClubs(filteredClubs);
  updateActiveTab(type);
}

// Update active tab styling
function updateActiveTab(selectedType) {
  document.querySelectorAll(".tab-button").forEach((button) => {
    button.classList.remove("active");
    if (button.textContent.toLowerCase() === selectedType) {
      button.classList.add("active");
    }
  });
}

// Function to filter clubs based on search input
function filterClubs() {
  const searchText = searchBar.value.toLowerCase();
  const activeType = document
    .querySelector(".tab-button.active")
    .textContent.toLowerCase();

  const filteredClubs = clubs.filter((club) => {
    const matchesType = activeType === "all" || club.type === activeType;
    const matchesSearch =
      club.name.toLowerCase().includes(searchText) ||
      club.tags.some((tag) => tag.toLowerCase().includes(searchText));
    return matchesType && matchesSearch;
  });

  displayClubs(filteredClubs);
}

// Event listeners for search and filter
searchBar.addEventListener("input", filterClubs);

// Initial display of all clubs
filterClubsByType("all");
