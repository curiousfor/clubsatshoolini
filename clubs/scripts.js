const clubs = [
    { name: 'Football Club', type: 'sports', tags: ['outdoor', 'team', 'active'] },
    { name: 'Painting Club', type: 'arts', tags: ['creative', 'indoor', 'expressive'] },
    { name: 'Robotics Club', type: 'tech', tags: ['innovation', 'programming', 'engineering'] },
    { name: 'Social Service Club', type: 'community', tags: ['helping', 'social work', 'volunteering'] },
    { name: 'Photography Club', type: 'arts', tags: ['camera', 'creativity', 'outdoor'] },
    { name: 'Basketball Club', type: 'sports', tags: ['outdoor', 'team', 'active'] },
    { name: 'Chess Club', type: 'tech', tags: ['strategy', 'indoor', 'intellect'] },
    { name: 'Coding Club', type: 'tech', tags: ['programming', 'coding', 'hackathons'] },
    { name: 'Drama Club', type: 'arts', tags: ['acting', 'stage', 'performance'] },
    { name: 'Music Club', type: 'arts', tags: ['instruments', 'vocals', 'performance'] },
    { name: 'Hiking Club', type: 'sports', tags: ['outdoor', 'nature', 'adventure'] },
    { name: 'Debate Club', type: 'community', tags: ['speaking', 'logic', 'debate'] },
    { name: 'Environment Club', type: 'community', tags: ['nature', 'environment', 'activism'] },
    { name: 'Gaming Club', type: 'tech', tags: ['video games', 'competitive', 'fun'] },
    { name: 'Dance Club', type: 'arts', tags: ['choreography', 'performance', 'creative'] },
    { name: 'Yoga Club', type: 'sports', tags: ['wellness', 'meditation', 'health'] },
    { name: 'Martial Arts Club', type: 'sports', tags: ['self-defense', 'training', 'discipline'] },
    { name: 'Fashion Design Club', type: 'arts', tags: ['clothing', 'design', 'creative'] },
    { name: 'Literature Club', type: 'arts', tags: ['reading', 'writing', 'poetry'] },
    { name: 'Astronomy Club', type: 'tech', tags: ['stars', 'space', 'science'] },
    { name: 'Movie Club', type: 'community', tags: ['films', 'reviews', 'cinema'] },
    { name: 'Swimming Club', type: 'sports', tags: ['water', 'fitness', 'team'] },
    { name: 'Cycling Club', type: 'sports', tags: ['fitness', 'outdoor', 'cycling'] },
    { name: 'Charity Club', type: 'community', tags: ['helping', 'fundraising', 'social work'] },
    { name: 'Math Club', type: 'tech', tags: ['numbers', 'problem-solving', 'science'] },
    { name: 'Book Club', type: 'community', tags: ['reading', 'discussion', 'literature'] },
    { name: 'Science Club', type: 'tech', tags: ['experiments', 'research', 'discovery'] },
    { name: 'Art Appreciation Club', type: 'arts', tags: ['gallery', 'critique', 'creativity'] },
    { name: 'Baking Club', type: 'community', tags: ['food', 'recipes', 'cooking'] },
    { name: 'Public Speaking Club', type: 'community', tags: ['speech', 'confidence', 'leadership'] },
    { name: 'Table Tennis Club', type: 'sports', tags: ['indoor', 'competitive', 'fitness'] },
    { name: 'Volleyball Club', type: 'sports', tags: ['outdoor', 'team', 'fitness'] },
    { name: 'Badminton Club', type: 'sports', tags: ['indoor', 'team', 'fitness'] },
    { name: 'Engineering Club', type: 'tech', tags: ['projects', 'innovation', 'building'] },
    { name: 'Economics Club', type: 'tech', tags: ['money', 'business', 'finance'] },
    { name: 'AI & ML Club', type: 'tech', tags: ['AI', 'machine learning', 'data'] },
    { name: 'Guitar Club', type: 'arts', tags: ['music', 'performance', 'instrument'] },
    { name: 'Piano Club', type: 'arts', tags: ['music', 'piano', 'performance'] },
    { name: 'Singing Club', type: 'arts', tags: ['vocals', 'music', 'performance'] },
    { name: 'Animation Club', type: 'tech', tags: ['art', 'design', 'tech'] },
    { name: 'Ethics Club', type: 'community', tags: ['debate', 'morality', 'philosophy'] },
    { name: 'Gardening Club', type: 'community', tags: ['plants', 'outdoor', 'nature'] },
    { name: 'History Club', type: 'community', tags: ['historical', 'events', 'learning'] },
    { name: 'Volunteer Club', type: 'community', tags: ['helping', 'activism', 'service'] },
    { name: 'Networking Club', type: 'tech', tags: ['communication', 'connections', 'tech'] },
    { name: 'Podcasting Club', type: 'tech', tags: ['audio', 'broadcast', 'media'] },
    { name: 'Marketing Club', type: 'tech', tags: ['business', 'advertising', 'campaigns'] },
    { name: '3D Printing Club', type: 'tech', tags: ['innovation', 'printing', 'design'] },
    { name: 'Culinary Club', type: 'community', tags: ['food', 'cooking', 'recipes'] },
    { name: 'Graphic Design Club', type: 'tech', tags: ['art', 'design', 'creativity'] }
];

const clubsList = document.getElementById('clubs-list');
const searchBar = document.getElementById('search-bar');

// Function to display clubs
function displayClubs(filteredClubs) {
    clubsList.innerHTML = '';
    filteredClubs.forEach(club => {
        const clubCard = document.createElement('div');
        clubCard.classList.add('club-card');
        clubCard.innerHTML = `
            <h3>${club.name}</h3>
            <p>Tags: ${club.tags.join(', ')}</p>
            <div class="club-type">${club.type}</div>
        `;
        clubsList.appendChild(clubCard);
    });
}

// Filter clubs by type
function filterClubsByType(type) {
    const filteredClubs = type === 'all' ? clubs : clubs.filter(club => club.type === type);
    displayClubs(filteredClubs);
    updateActiveTab(type);
}

// Update active tab styling
function updateActiveTab(selectedType) {
    document.querySelectorAll('.tab-button').forEach(button => {
        button.classList.remove('active');
        if (button.textContent.toLowerCase() === selectedType) {
            button.classList.add('active');
        }
    });
}

// Function to filter clubs based on search input
function filterClubs() {
    const searchText = searchBar.value.toLowerCase();
    const activeType = document.querySelector('.tab-button.active').textContent.toLowerCase();
    
    const filteredClubs = clubs.filter(club => {
        const matchesType = activeType === 'all' || club.type === activeType;
        const matchesSearch = club.name.toLowerCase().includes(searchText) ||
                              club.tags.some(tag => tag.toLowerCase().includes(searchText));
        return matchesType && matchesSearch;
    });

    displayClubs(filteredClubs);
}

// Event listeners for search and filter
searchBar.addEventListener('input', filterClubs);

// Initial display of all clubs
filterClubsByType('all');
