import { clubs } from "./data.js";

const clubsList = document.getElementById("clubs-list");
const searchBar = document.getElementById("search-bar");

// Create and append modal elements
const modal = document.createElement("div");
modal.classList.add("modal");

const overlay = document.createElement("div");
overlay.classList.add("overlay");

document.body.appendChild(modal);
document.body.appendChild(overlay);

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

    // Event listener for opening modal
    clubCard.addEventListener("click", () => openModal(club));

    clubsList.appendChild(clubCard);
  });
}

// Function to open modal with club details
function openModal(club) {
  modal.innerHTML = `
    <div class="modal-content">
      <img src="${club.img}" alt="${club.name}">
      <h3>${club.name}</h3>
      <p>${club.description || "No description available."}</p>
      <h4>President: ${club.president || "N/A"}</h4>
      <p>Contact: ${club.contact || "N/A"}</p>
      <p>Tags: ${club.tags.join(", ")}</p>
      <button class="close-modal">Back to Clubs</button>
    </div>
  `;
  modal.style.display = "block";
  overlay.style.display = "block";

  // Add event listener to close button
  modal.querySelector(".close-modal").addEventListener("click", closeModal);
}

// Function to close modal
function closeModal() {
  modal.style.display = "none";
  overlay.style.display = "none";
}

// Filter clubs by type
function filterClubsByType(type) {
  const filteredClubs = type === "all" ? clubs : clubs.filter((club) => club.type === type);
  displayClubs(filteredClubs);
  updateActiveTab(type);
}

// Function to filter clubs based on search input
function filterClubs() {
  const searchText = searchBar.value.toLowerCase();
  const activeType = document.querySelector(".tab-button.active").textContent.toLowerCase();

  const filteredClubs = clubs.filter((club) => {
    const matchesType = activeType === "all" || club.type === activeType;
    const matchesSearch = club.name.toLowerCase().includes(searchText) || club.tags.some((tag) => tag.toLowerCase().includes(searchText));
    return matchesType && matchesSearch;
  });

  displayClubs(filteredClubs);
}

// Event listeners
searchBar.addEventListener("input", filterClubs);
overlay.addEventListener("click", closeModal); // Close modal if overlay is clicked

// Initial display of all clubs
filterClubsByType("all");
