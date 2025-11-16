// HappyFi Main JavaScript

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // Navigation active state handling
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Remove active class from all links
            navLinks.forEach(l => l.classList.remove('active'));
            // Add active class to clicked link
            this.classList.add('active');
        });
    });

    // Login button handler
    const loginBtn = document.querySelector('.btn-login');
    if (loginBtn) {
        loginBtn.addEventListener('click', function() {
            console.log('Login button clicked');
            // Future implementation: redirect to login page or show login modal
        });
    }

    // Sign Up button handler
    const signupBtn = document.querySelector('.btn-signup');
    if (signupBtn) {
        signupBtn.addEventListener('click', function() {
            console.log('Sign Up button clicked');
            // Future implementation: redirect to signup page or show signup modal
        });
    }

    // Join Event button handlers
    const joinButtons = document.querySelectorAll('.btn-join');
    joinButtons.forEach(button => {
        button.addEventListener('click', function() {
            const eventCard = this.closest('.event-card');
            const eventTitle = eventCard.querySelector('.event-title').textContent;
            console.log(`Join Event clicked for: ${eventTitle}`);
            // Future implementation: handle event joining logic
            
            // Visual feedback
            this.textContent = 'Joined!';
            this.style.backgroundColor = '#4CAF50';
            this.style.color = 'white';
            
            setTimeout(() => {
                this.textContent = 'Join Event';
                this.style.backgroundColor = '';
                this.style.color = '';
            }, 2000);
        });
    });

    // Smooth scroll for navigation (if implementing anchor links)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Add animation on scroll for event cards
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '0';
                entry.target.style.transform = 'translateY(20px)';
                
                setTimeout(() => {
                    entry.target.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, 100);
                
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all event cards
    const eventCards = document.querySelectorAll('.event-card');
    eventCards.forEach(card => {
        observer.observe(card);
    });

    console.log('HappyFi website initialized successfully!');
});

// Function to update event image (you can call this to change images)
function updateEventImage(eventNumber, imageUrl) {
    const img = document.getElementById(`event-img-${eventNumber}`);
    if (img) {
        img.src = imageUrl;
        console.log(`Event ${eventNumber} image updated to: ${imageUrl}`);
    } else {
        console.error(`Event image ${eventNumber} not found`);
    }
}

// Example usage (uncomment to test):
// updateEventImage(1, 'path/to/your/local/image.jpg');