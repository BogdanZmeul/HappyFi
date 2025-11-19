// Search Friends Page JavaScript - Tinder Style Swiping

// Sample friends data
const friendsData = [
    {
        id: 1,
        name: "Sarah Martinez",
        age: 28,
        location: "New York, NY",
        bio: "Coffee enthusiast, bookworm, and adventure seeker. Love meeting new people and exploring the city!",
        interests: ["music", "reading", "travel", "coffee"],
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah&backgroundColor=b6e3f4",
        events: 12,
        friends: 45,
        online: true
    },
    {
        id: 2,
        name: "Mike Johnson",
        age: 32,
        location: "Los Angeles, CA",
        bio: "Fitness coach and outdoor enthusiast. Always up for a hike or trying new restaurants.",
        interests: ["sports", "fitness", "cooking", "outdoor"],
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mike&backgroundColor=c0aede",
        events: 8,
        friends: 67,
        online: false
    },
    {
        id: 3,
        name: "Emily Chen",
        age: 25,
        location: "San Francisco, CA",
        bio: "Tech enthusiast and art lover. Enjoy gaming, painting, and meeting creative minds.",
        interests: ["gaming", "art", "music", "tech"],
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emily&backgroundColor=ffd5dc",
        events: 15,
        friends: 89,
        online: true
    },
    {
        id: 4,
        name: "David Rodriguez",
        age: 30,
        location: "Chicago, IL",
        bio: "Musician and food lover. Play guitar in a local band and love discovering new cuisines.",
        interests: ["music", "cooking", "travel", "social"],
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=David&backgroundColor=d1d4f9",
        events: 20,
        friends: 103,
        online: true
    },
    {
        id: 5,
        name: "Jessica Taylor",
        age: 27,
        location: "Austin, TX",
        bio: "Yoga instructor and wellness advocate. Looking for friends who value mindfulness and healthy living.",
        interests: ["fitness", "reading", "outdoor", "wellness"],
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jessica&backgroundColor=e8f5e9",
        events: 18,
        friends: 56,
        online: false
    },
    {
        id: 6,
        name: "Alex Kim",
        age: 29,
        location: "Seattle, WA",
        bio: "Software developer and board game enthusiast. Love strategy games and tech meetups.",
        interests: ["gaming", "tech", "social", "learning"],
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex&backgroundColor=fff9c4",
        events: 10,
        friends: 42,
        online: true
    },
    {
        id: 7,
        name: "Maria Garcia",
        age: 26,
        location: "Miami, FL",
        bio: "Travel blogger and photography lover. Always planning the next adventure!",
        interests: ["travel", "art", "outdoor", "photography"],
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Maria&backgroundColor=f3e5f5",
        events: 22,
        friends: 134,
        online: true
    },
    {
        id: 8,
        name: "Tom Wilson",
        age: 31,
        location: "Boston, MA",
        bio: "History teacher and jazz enthusiast. Love deep conversations and live music.",
        interests: ["music", "reading", "learning", "social"],
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Tom&backgroundColor=e1f5fe",
        events: 14,
        friends: 78,
        online: false
    }
];

document.addEventListener('DOMContentLoaded', function() {
    const friendsGrid = document.getElementById('friendsGrid');
    const noResults = document.getElementById('noResults');
    const friendSearch = document.getElementById('friendSearch');
    const tagButtons = document.querySelectorAll('.tag-btn');
    const btnSearch = document.querySelector('.btn-search');
    
    // Modal handling
    const loginModal = document.getElementById('loginModal');
    const signupModal = document.getElementById('signupModal');
    const btnLoginSearch = document.getElementById('btnLoginSearch');
    const btnSignupSearch = document.getElementById('btnSignupSearch');
    const closeButtons = document.querySelectorAll('.close-modal');
    const switchModalButtons = document.querySelectorAll('.switch-modal');

    let selectedInterests = [];
    let searchTerm = '';
    let connectedFriends = new Set();

    // Initialize friends display
    displayFriends();

    // Interest tag handlers
    tagButtons.forEach(button => {
        button.addEventListener('click', function() {
            const interest = this.getAttribute('data-interest');
            
            if (this.classList.contains('active')) {
                this.classList.remove('active');
                selectedInterests = selectedInterests.filter(i => i !== interest);
            } else {
                this.classList.add('active');
                selectedInterests.push(interest);
            }
            
            displayFriends();
        });
    });

    // Search handler
    if (friendSearch) {
        friendSearch.addEventListener('input', function() {
            searchTerm = this.value.toLowerCase();
            displayFriends();
        });
    }

    if (btnSearch) {
        btnSearch.addEventListener('click', displayFriends);
    }

    // Display friends function
    function displayFriends() {
        let filteredFriends = friendsData.filter(friend => {
            const matchesSearch = searchTerm === '' || 
                                  friend.name.toLowerCase().includes(searchTerm) ||
                                  friend.bio.toLowerCase().includes(searchTerm) ||
                                  friend.location.toLowerCase().includes(searchTerm);
            
            const matchesInterests = selectedInterests.length === 0 || 
                                     selectedInterests.some(interest => 
                                         friend.interests.includes(interest));
            
            return matchesSearch && matchesInterests;
        });

        if (filteredFriends.length === 0) {
            friendsGrid.style.display = 'none';
            noResults.style.display = 'block';
        } else {
            friendsGrid.style.display = 'grid';
            noResults.style.display = 'none';
            
            friendsGrid.innerHTML = '';
            filteredFriends.forEach((friend, index) => {
                const friendCard = createFriendCard(friend, index);
                friendsGrid.appendChild(friendCard);
            });
        }
    }

    // Create friend card (Tinder-style)
    function createFriendCard(friend, index) {
        const card = document.createElement('div');
        card.className = 'friend-card';
        card.style.animationDelay = `${index * 0.1}s`;
        
        const isConnected = connectedFriends.has(friend.id);
        
        const interestsHTML = friend.interests.slice(0, 4).map(interest => 
            `<span class="interest-tag">${getInterestIcon(interest)} ${interest}</span>`
        ).join('');
        
        card.innerHTML = `
            <div class="friend-card-header">
                <div class="friend-avatar-wrapper">
                    <img src="${friend.avatar}" alt="${friend.name}" class="friend-avatar">
                    ${friend.online ? '<span class="online-badge"></span>' : ''}
                </div>
            </div>
            <div class="friend-card-body">
                <h3 class="friend-name">${friend.name}, ${friend.age}</h3>
                <p class="friend-location">📍 ${friend.location}</p>
                <p class="friend-bio">${friend.bio}</p>
                <div class="friend-interests">
                    ${interestsHTML}
                </div>
                <div class="friend-stats">
                    <div class="stat">
                        <span class="stat-value">${friend.events}</span>
                        <span class="stat-label">Events</span>
                    </div>
                    <div class="stat">
                        <span class="stat-value">${friend.friends}</span>
                        <span class="stat-label">Friends</span>
                    </div>
                </div>
                <div class="friend-actions">
                    <button class="btn-connect ${isConnected ? 'connected' : ''}" data-friend-id="${friend.id}">
                        ${isConnected ? '✓ Connected' : '+ Connect'}
                    </button>
                    <button class="btn-message" data-friend-id="${friend.id}">
                        💬 Message
                    </button>
                </div>
            </div>
        `;

        // Add connect button handler
        const connectBtn = card.querySelector('.btn-connect');
        connectBtn.addEventListener('click', function() {
            handleConnect(friend.id, friend.name, this);
        });

        // Add message button handler
        const messageBtn = card.querySelector('.btn-message');
        messageBtn.addEventListener('click', function() {
            handleMessage(friend.name);
        });

        return card;
    }

    // Get interest icon
    function getInterestIcon(interest) {
        const icons = {
            music: '🎵',
            sports: '⚽',
            gaming: '🎮',
            art: '🎨',
            reading: '📚',
            cooking: '🍳',
            travel: '✈️',
            fitness: '💪',
            coffee: '☕',
            outdoor: '🌲',
            tech: '💻',
            wellness: '🧘',
            photography: '📷',
            social: '🤝',
            learning: '📖'
        };
        return icons[interest] || '⭐';
    }

    // Handle connect
    function handleConnect(friendId, friendName, button) {
        if (connectedFriends.has(friendId)) {
            connectedFriends.delete(friendId);
            button.textContent = '+ Connect';
            button.classList.remove('connected');
        } else {
            connectedFriends.add(friendId);
            button.textContent = '✓ Connected';
            button.classList.add('connected');
            
            // Show success message
            showNotification(`You're now connected with ${friendName}!`);
        }
    }

    // Handle message
    function handleMessage(friendName) {
        showNotification(`Opening chat with ${friendName}...`);
        setTimeout(() => {
            window.location.href = 'chat.html';
        }, 1000);
    }

    // Show notification
    function showNotification(message) {
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background-color: var(--color-primary);
            color: white;
            padding: 16px 24px;
            border-radius: 12px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.2);
            z-index: 10000;
            animation: slideIn 0.3s ease;
        `;
        notification.textContent = message;
        document.body.appendChild(notification);

        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }, 2000);
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

    if (btnLoginSearch) {
        btnLoginSearch.addEventListener('click', () => openModal(loginModal));
    }

    if (btnSignupSearch) {
        btnSignupSearch.addEventListener('click', () => openModal(signupModal));
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

    // Add CSS animations
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from {
                transform: translateX(400px);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        @keyframes slideOut {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(400px);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);

    console.log('Search Friends page initialized successfully!');
});