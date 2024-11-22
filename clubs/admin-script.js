// Admin page login handling
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
    .then(response => {
      if (response.status === 403) {
        loginError.textContent = "Session expired. Please log in again.";
        loginForm.style.display = 'block';
        clubMembersSection.style.display = 'none';
        return [];
      }
      return response.json();
    })
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
