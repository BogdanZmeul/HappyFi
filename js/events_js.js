// Events Page JavaScript

// Sample events data
const eventsData = [
    {
        id: 1,
        title: "Summer Music Festival",
        description: "Join us for an evening of live music and great company",
        date: "Nov 20, 2025",
        location: "Central Park",
        attendees: 24,
        image: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800&q=80",
        category: "music"
    },
    {
        id: 2,
        title: "Morning Workout Group",
        description: "Start your day with energy and make fitness friends",
        date: "Nov 22, 2025",
        location: "Community Gym",
        attendees: 12,
        image: "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=800&q=80",
        category: "sports"
    },
    {
        id: 3,
        title: "Personal Growth Seminar",
        description: "Learn, grow, and connect with inspiring individuals",
        date: "Nov 25, 2025",
        location: "Downtown Conference Center",
        attendees: 18,
        image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&q=80",
        category: "learning"
    },
    {
        id: 4,
        title: "Coffee & Conversations",
        description: "Casual meetup for meaningful chats over coffee",
        date: "Nov 27, 2025",
        location: "The Corner Café",
        attendees: 8,
        image: "https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&q=80",
        category: "social"
    },
    {
        id: 5,
        title: "Weekend Hiking Adventure",
        description: "Explore nature and bond with fellow adventurers",
        date: "Nov 30, 2025",
        location: "Mountain Trail",
        attendees: 15,
        image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&q=80",
        category: "outdoor"
    },
    {
        id: 6,
        title: "Jazz Night Live",
        description: "Smooth jazz and soulful performances",
        date: "Dec 2, 2025",
        location: "Blue Note Jazz Club",
        attendees: 30,
        image: "https://images.unsplash.com/photo-1415201364774-f6f0bb35f28f?w=800&q=80",
        category: "music"
    },
    {
        id: 7,
        title: "Yoga in the Park",
        description: "Morning yoga session with experienced instructors",
        date: "Dec 5, 2025",
        location: "Riverside Park",
        attendees: 20,
        image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&q=80",
        category: "sports"
    },
    {
        id: 8,
        title: "Book Club Meeting",
        description: "Discuss this month's bestseller with fellow readers",
        date: "Dec 8, 2025",
        location: "City Library",
        attendees: 14,
        image: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=800&q=80",
        category: "learning"
    },
    {
        id: 9,
        title: "Board Game Night",
        description: "Fun evening of board games and new friendships",
        date: "Dec 10, 2025",
        location: "Game Café",
        attendees: 16,
        image: "https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?w=800&q=80",
        category: "social"
    },
    {
        id: 10,
        title: "Beach Cleanup & Picnic",
        description: "Help clean the beach and enjoy a picnic together",
        date: "Dec 12, 2025",
        location: "Sunset Beach",
        attendees: 25,
        image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80",
        category: "outdoor"
    }
];

document.addEventListener('DOMContentLoaded', function() {
    const eventsGrid = document.getElementById('eventsGrid');
    const noEvents = document.getElementById('noEvents');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const eventSearch = document.getElementById('eventSearch');
    
    // Modal handling
    const loginModal = document.getElementById('loginModal');
    const signupModal = document.getElementById('signupModal');
    const btnLoginEvents = document.getElementById('btnLoginEvents');
    const btnSignupEvents = document.getElementById('btnSignupEvents');
    const closeButtons = document.querySelectorAll('.close-modal');
    const switchModalButtons = document.querySelectorAll('.switch-modal');

    let currentFilter = 'all';
    let searchTerm = '';
    let joinedEvents = new Set();

    // Initialize events
    displayEvents();

    // Filter button handlers
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            currentFilter = this.getAttribute('data-category');
            displayEvents();
        });
    });

    // Search handler
    if (eventSearch) {
        eventSearch.addEventListener('input', function() {
            searchTerm = this.value.toLowerCase();
            displayEvents();
        });
    }

    // Display events function
    function displayEvents() {
        const filteredEvents = eventsData.filter(event => {
            const matchesCategory = currentFilter === 'all' || event.category === currentFilter;
            const matchesSearch = event.title.toLowerCase().includes(searchTerm) || 
                                  event.description.toLowerCase().includes(searchTerm);
            return matchesCategory && matchesSearch;
        });

        if (filteredEvents.length === 0) {
            eventsGrid.style.display = 'none';
            noEvents.style.display = 'block';
        } else {
            eventsGrid.style.display = 'grid';
            noEvents.style.display = 'none';
            
            eventsGrid.innerHTML = '';
            filteredEvents.forEach((event, index) => {
                const eventCard = createEventCard(event, index);
                eventsGrid.appendChild(eventCard);
            });
        }
    }

    // Create event card
    function createEventCard(event, index) {
        const card = document.createElement('div');
        card.className = 'event-card';
        card.style.animationDelay = `${index * 0.1}s`;
        
        const isJoined = joinedEvents.has(event.id);
        
        card.innerHTML = `
            <div class="event-image">
                <img src="${event.image}" alt="${event.title}">
                <span class="event-category-badge">${getCategoryIcon(event.category)} ${event.category}</span>
            </div>
            <div class="event-content">
                <div class="event-date">${event.date}</div>
                <h3 class="event-title">${event.title}</h3>
                <p class="event-description">${event.description}</p>
                <div class="event-location">📍 ${event.location}</div>
                <div class="event-footer">
                    <span class="event-attendees">👥 ${event.attendees} attending</span>
                    <button class="btn-join ${isJoined ? 'joined' : ''}" data-event-id="${event.id}">
                        ${isJoined ? 'Joined!' : 'Join Event'}
                    </button>
                </div>
            </div>
        `;

        // Add join button handler
        const joinBtn = card.querySelector('.btn-join');
        joinBtn.addEventListener('click', function() {
            handleJoinEvent(event.id, this);
        });

        return card;
    }

    // Get category icon
    function getCategoryIcon(category) {
        const icons = {
            music: '🎵',
            sports: '🏃',
            learning: '📚',
            social: '☕',
            outdoor: '🌲'
        };
        return icons[category] || '📅';
    }

    // Handle join event
    function handleJoinEvent(eventId, button) {
        if (joinedEvents.has(eventId)) {
            joinedEvents.delete(eventId);
            button.textContent = 'Join Event';
            button.classList.remove('joined');
        } else {
            joinedEvents.add(eventId);
            button.textContent = 'Joined!';
            button.classList.add('joined');
            
            // Update attendee count
            const event = eventsData.find(e => e.id === eventId);
            if (event) {
                event.attendees++;
                const attendeesSpan = button.parentElement.querySelector('.event-attendees');
                attendeesSpan.textContent = `👥 ${event.attendees} attending`;
            }
        }
    }

    // Modal functionality
    function openModal(modal) {
        modal.classList.add('show');
        document.body.style.overflow = 'hidden';
    }

    function closeModal(modal) {
        modal.classList.remove('show');
        document.body.style.overflow = 'auto';
    }

    if (btnLoginEvents) {
        btnLoginEvents.addEventListener('click', () => openModal(loginModal));
    }

    if (btnSignupEvents) {
        btnSignupEvents.addEventListener('click', () => openModal(signupModal));
    }

    closeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const modalId = this.getAttribute('data-modal');
            const modal = document.getElementById(modalId);
            closeModal(modal);
        });
    });

    window.addEventListener('click', function(event) {
        if (event.target.classList.contains('modal')) {
            closeModal(event.target);
        }
    });

    switchModalButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const targetModalId = this.getAttribute('data-target');
            const targetModal = document.getElementById(targetModalId);
            
            closeModal(loginModal);
            closeModal(signupModal);
            
            setTimeout(() => openModal(targetModal), 300);
        });
    });

    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Login functionality will be implemented soon!');
            closeModal(loginModal);
        });
    }

    const signupForm = document.getElementById('signupForm');
    if (signupForm) {
        signupForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const password = document.getElementById('signupPassword').value;
            const confirmPassword = document.getElementById('signupConfirmPassword').value;
            
            if (password !== confirmPassword) {
                alert('Passwords do not match!');
                return;
            }
            
            alert('Sign up functionality will be implemented soon!');
            closeModal(signupModal);
        });
    }

    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeModal(loginModal);
            closeModal(signupModal);
        }
    });

    console.log('Events page initialized successfully!');
});