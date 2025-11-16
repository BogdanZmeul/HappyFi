// Chat Page JavaScript

// Sample chat data
const chatData = {
    miru: {
        name: "Miru AI Companion",
        avatar: "https://api.dicebear.com/7.x/bottts/svg?seed=Miru&backgroundColor=FFB3D1",
        status: "Always here for you",
        online: true,
        messages: [
            { text: "Hello! I'm Miru, your AI companion. I'm here to chat, listen, and support you whenever you need a friend. 😊", sent: false, time: "10:30 AM" },
            { text: "How are you feeling today?", sent: false, time: "10:31 AM" },
            { text: "Hi Miru! I'm doing okay, thanks for asking.", sent: true, time: "10:35 AM", seen: true },
            { text: "That's wonderful to hear! Remember, I'm always here if you want to talk about anything - your day, your thoughts, or just chat about life. What's on your mind?", sent: false, time: "10:35 AM" }
        ]
    },
    user1: {
        name: "Sarah Johnson",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah&backgroundColor=b6e3f4",
        status: "Online",
        online: false,
        messages: [
            { text: "Hey! Are you excited for the concert tomorrow?", sent: false, time: "1:20 PM" },
            { text: "Yes! I can't wait! What time should we meet?", sent: true, time: "2:15 PM", seen: true },
            { text: "How about 6 PM at the venue entrance?", sent: false, time: "2:20 PM" },
            { text: "Perfect! See you there! 🎵", sent: true, time: "2:45 PM", seen: true },
            { text: "See you at the concert tomorrow! 🎵", sent: false, time: "2:45 PM" }
        ]
    },
    user2: {
        name: "Mike Chen",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mike&backgroundColor=c0aede",
        status: "Last seen yesterday",
        online: false,
        messages: [
            { text: "The hiking trip was amazing!", sent: false, time: "Yesterday" },
            { text: "I'm so glad you enjoyed it! We should plan another one soon.", sent: true, time: "Yesterday", seen: true },
            { text: "Definitely! Maybe next month?", sent: false, time: "Yesterday" }
        ]
    },
    user3: {
        name: "Emily Rodriguez",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emily&backgroundColor=ffd5dc",
        status: "Online",
        online: true,
        messages: [
            { text: "Thanks for inviting me to the seminar", sent: false, time: "Yesterday" },
            { text: "I learned so much!", sent: false, time: "Yesterday" },
            { text: "You're welcome! Glad you found it helpful!", sent: true, time: "Yesterday", seen: false }
        ]
    },
    user4: {
        name: "Alex Kim",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex&backgroundColor=d1d4f9",
        status: "Last seen Nov 14",
        online: false,
        messages: [
            { text: "Let's grab coffee this weekend", sent: false, time: "Nov 14" },
            { text: "Sounds good! Saturday afternoon?", sent: true, time: "Nov 14", seen: false }
        ]
    }
};

document.addEventListener('DOMContentLoaded', function() {
    const chatItems = document.querySelectorAll('.chat-item');
    const chatWindow = document.getElementById('chatWindow');
    const chatEmpty = document.getElementById('chatEmpty');
    const chatList = document.getElementById('chatList');
    const chatMessages = document.getElementById('chatMessages');
    const messageInput = document.getElementById('messageInput');
    const btnSend = document.getElementById('btnSend');
    const btnBackMobile = document.getElementById('btnBackMobile');
    const chatHeaderName = document.getElementById('chatHeaderName');
    const chatHeaderStatus = document.getElementById('chatHeaderStatus');
    const chatHeaderAvatar = document.getElementById('chatHeaderAvatar');
    
    // Get modal elements
    const loginModal = document.getElementById('loginModal');
    const signupModal = document.getElementById('signupModal');
    const btnLoginChat = document.getElementById('btnLoginChat');
    const btnSignupChat = document.getElementById('btnSignupChat');
    const closeButtons = document.querySelectorAll('.close-modal');
    const switchModalButtons = document.querySelectorAll('.switch-modal');
    
    // Function to open modal
    function openModal(modal) {
        modal.classList.add('show');
        document.body.style.overflow = 'hidden';
    }
    
    // Function to close modal
    function closeModal(modal) {
        modal.classList.remove('show');
        document.body.style.overflow = 'auto';
    }
    
    // Open login modal
    if (btnLoginChat) {
        btnLoginChat.addEventListener('click', function() {
            openModal(loginModal);
        });
    }
    
    // Open signup modal
    if (btnSignupChat) {
        btnSignupChat.addEventListener('click', function() {
            openModal(signupModal);
        });
    }
    
    // Close modal when clicking X button
    closeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const modalId = this.getAttribute('data-modal');
            const modal = document.getElementById(modalId);
            closeModal(modal);
        });
    });
    
    // Close modal when clicking outside
    window.addEventListener('click', function(event) {
        if (event.target.classList.contains('modal')) {
            closeModal(event.target);
        }
    });
    
    // Switch between login and signup modals
    switchModalButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const targetModalId = this.getAttribute('data-target');
            const targetModal = document.getElementById(targetModalId);
            
            // Close all modals
            closeModal(loginModal);
            closeModal(signupModal);
            
            // Open target modal
            setTimeout(() => {
                openModal(targetModal);
            }, 300);
        });
    });
    
    // Handle login form submission
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = document.getElementById('loginEmail').value;
            const password = document.getElementById('loginPassword').value;
            
            console.log('Login attempt:', { email, password });
            alert('Login functionality will be implemented soon!');
            closeModal(loginModal);
        });
    }
    
    // Handle signup form submission
    const signupForm = document.getElementById('signupForm');
    if (signupForm) {
        signupForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const name = document.getElementById('signupName').value;
            const email = document.getElementById('signupEmail').value;
            const password = document.getElementById('signupPassword').value;
            const confirmPassword = document.getElementById('signupConfirmPassword').value;
            
            if (password !== confirmPassword) {
                alert('Passwords do not match!');
                return;
            }
            
            console.log('Signup attempt:', { name, email, password });
            alert('Sign up functionality will be implemented soon!');
            closeModal(signupModal);
        });
    }
    
    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeModal(loginModal);
            closeModal(signupModal);
        }
    });

    let currentChatId = 'miru';

    // Load initial chat (Miru on desktop)
    if (window.innerWidth > 768) {
        loadChat('miru');
    }

    // Handle chat item clicks
    chatItems.forEach(item => {
        item.addEventListener('click', function() {
            const chatId = this.getAttribute('data-chat-id');
            
            // Update active state
            chatItems.forEach(ci => ci.classList.remove('active'));
            this.classList.add('active');
            
            // Load chat
            loadChat(chatId);
            
            // Mobile: Show chat window, hide list
            if (window.innerWidth <= 768) {
                chatList.classList.add('hidden');
                chatWindow.classList.add('active');
            }
        });
    });

    // Back button for mobile
    if (btnBackMobile) {
        btnBackMobile.addEventListener('click', function() {
            chatWindow.classList.remove('active');
            chatList.classList.remove('hidden');
        });
    }

    // Load chat function
    function loadChat(chatId) {
        currentChatId = chatId;
        const chat = chatData[chatId];
        
        if (!chat) return;

        // Update header
        chatHeaderName.textContent = chat.name;
        chatHeaderStatus.textContent = chat.status;
        chatHeaderAvatar.src = chat.avatar;
        
        // Update online indicator
        const onlineIndicator = document.querySelector('.chat-window-header .online-indicator');
        if (onlineIndicator) {
            onlineIndicator.style.display = chat.online ? 'block' : 'none';
        }

        // Load messages
        chatMessages.innerHTML = '';
        chat.messages.forEach(message => {
            const messageEl = createMessageElement(message, chat);
            chatMessages.appendChild(messageEl);
        });

        // Scroll to bottom
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    // Create message element
    function createMessageElement(message, chat) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${message.sent ? 'sent' : 'received'}`;

        if (!message.sent) {
            const avatar = document.createElement('img');
            avatar.src = chat.avatar;
            avatar.alt = chat.name;
            avatar.className = 'message-avatar';
            messageDiv.appendChild(avatar);
        }

        const contentDiv = document.createElement('div');
        contentDiv.className = 'message-content';

        const bubbleDiv = document.createElement('div');
        bubbleDiv.className = 'message-bubble';

        const textP = document.createElement('p');
        textP.className = 'message-text';
        textP.textContent = message.text;
        bubbleDiv.appendChild(textP);

        contentDiv.appendChild(bubbleDiv);

        const timeDiv = document.createElement('div');
        timeDiv.className = 'message-time';
        timeDiv.textContent = message.time;
        
        if (message.sent && message.seen !== undefined) {
            const seenSpan = document.createElement('span');
            seenSpan.textContent = message.seen ? '✓✓' : '✓';
            seenSpan.style.color = message.seen ? 'var(--color-secondary)' : 'rgba(255, 255, 255, 0.7)';
            timeDiv.appendChild(seenSpan);
        }
        
        contentDiv.appendChild(timeDiv);
        messageDiv.appendChild(contentDiv);

        if (message.sent) {
            const avatar = document.createElement('img');
            avatar.src = 'https://api.dicebear.com/7.x/avataaars/svg?seed=Machial&backgroundColor=e0e0e0';
            avatar.alt = 'You';
            avatar.className = 'message-avatar';
            messageDiv.appendChild(avatar);
        }

        return messageDiv;
    }

    // Send message
    function sendMessage() {
        const text = messageInput.value.trim();
        if (!text) return;

        const chat = chatData[currentChatId];
        const currentTime = new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });

        // Add user message
        const userMessage = {
            text: text,
            sent: true,
            time: currentTime,
            seen: false
        };
        
        chat.messages.push(userMessage);
        const messageEl = createMessageElement(userMessage, chat);
        chatMessages.appendChild(messageEl);

        // Clear input
        messageInput.value = '';

        // Scroll to bottom
        chatMessages.scrollTop = chatMessages.scrollHeight;

        // Simulate AI response for Miru
        if (currentChatId === 'miru') {
            setTimeout(() => {
                const aiResponses = [
                    "That's interesting! Tell me more about that.",
                    "I understand how you feel. It's important to acknowledge those emotions.",
                    "That sounds great! I'm happy for you.",
                    "I'm here to listen. What else is on your mind?",
                    "Thank you for sharing that with me. How does that make you feel?"
                ];
                
                const randomResponse = aiResponses[Math.floor(Math.random() * aiResponses.length)];
                const aiMessage = {
                    text: randomResponse,
                    sent: false,
                    time: new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })
                };
                
                chat.messages.push(aiMessage);
                const aiMessageEl = createMessageElement(aiMessage, chat);
                chatMessages.appendChild(aiMessageEl);
                chatMessages.scrollTop = chatMessages.scrollHeight;
                
                // Mark user message as seen
                userMessage.seen = true;
            }, 1000);
        }
    }

    // Send message on button click
    btnSend.addEventListener('click', sendMessage);

    // Send message on Enter key
    messageInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    });

    // Search functionality
    const searchInput = document.getElementById('searchChats');
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            chatItems.forEach(item => {
                const name = item.querySelector('.chat-name').textContent.toLowerCase();
                const message = item.querySelector('.chat-last-message').textContent.toLowerCase();
                
                if (name.includes(searchTerm) || message.includes(searchTerm)) {
                    item.style.display = 'flex';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    }

    console.log('Chat page initialized successfully!');
});