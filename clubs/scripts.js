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
            <img src="${club.img}" alt="${club.name}" class="modal-image">
            <h3>${club.name}</h3>
            <p class="description">${club.description || "No description available."}</p>
            <div class="president-info">
                <h4>President:</h4>
                <p>${club.president || "N/A"}</p>
            </div>
            <div class="contact-info">
                <h4>Contact:</h4>
                <p>${club.contact || "N/A"}</p>
            </div>
            <div class="tags">
                <strong>Tags:</strong> ${club.tags.map(tag => `<span class="tag">${tag}</span>`).join(", ")}
            </div>
            <button class="join-club">Join</button>
        </div>
  `;
  modal.style.display = "block";
  overlay.style.display = "block";

  // Add event listener to close button
  modal.querySelector(".join-club").addEventListener("click", function() {
    window.location.href = "http://localhost:1000"; // Add full URL
  });
}

// Function to close modal
function closeModal() {
  modal.style.display = "none";
  overlay.style.display = "none";
}

// Filter clubs by type
function filterClubsByType(type) {
  console.log(`Filtering clubs by type: ${type}`); // Debugging line
  const filteredClubs = type === "all" 
      ? clubs 
      : clubs.filter((club) => club.type.toLowerCase() === type.toLowerCase());

  console.log(`Filtered Clubs:`, filteredClubs); // Debugging line
  displayClubs(filteredClubs);
  updateActiveTab(type);
}

// Function to update active tab styling
function updateActiveTab(activeType) {
  const tabButtons = document.querySelectorAll(".tab-button");
  tabButtons.forEach((button) => {
      if (button.textContent.toLowerCase() === activeType) {
          button.classList.add("active");
      } else {
          button.classList.remove("active");
      }
  });
}

// Event listeners for tab buttons
document.querySelectorAll(".tab-button").forEach(button => {
  button.addEventListener("click", () => {
      const type = button.textContent.toLowerCase();
      filterClubsByType(type);
  });
});

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

// New code to handle the admin page
const loginForm = document.getElementById('loginForm');
const membersContainer = document.getElementById('club-members-container');
const clubMembersSection = document.getElementById('club-members-section');
const loginError = document.getElementById('login-error');

if (loginForm) {
  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      const response = await fetch('/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      if (response.ok) {
        loginForm.style.display = 'none';
        clubMembersSection.style.display = 'block';
        fetchClubMembers();
      } else {
        const errorText = await response.text();
        loginError.textContent = errorText;
      }
    } catch (error) {
      console.error('Error during login:', error);
      loginError.textContent = 'Error during login';
    }
  });
}

function fetchClubMembers() {
  fetch('/club-members')
    .then(response => response.json())
    .then(data => {
      membersContainer.innerHTML = "";
      if (data.length > 0) {
        data.forEach(member => {
          const memberElement = document.createElement('div');
          memberElement.textContent = member.name;
          membersContainer.appendChild(memberElement);
        });
      } else {
        membersContainer.textContent = "No members found.";
      }
    })
    .catch(error => console.error('Error fetching club members:', error));
}
