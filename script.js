// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, checking elements...');
    
    // Mobile Navigation Toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    console.log('Navigation elements:', { hamburger, navMenu });

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }

    // Close mobile menu when clicking on a link
    const navLinks = document.querySelectorAll('.nav-link');
    console.log('Nav links found:', navLinks.length);
    
    if (navLinks.length > 0) {
        navLinks.forEach(n => n.addEventListener('click', () => {
            if (hamburger && navMenu) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            }
        }));
    }

    // Smooth scrolling for navigation links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    console.log('Anchor links found:', anchorLinks.length);
    
    if (anchorLinks.length > 0) {
        anchorLinks.forEach(anchor => {
            anchor.addEventListener('click', function (e) {
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
    }

    // Menu Filter Functionality
    const categoryButtons = document.querySelectorAll('.category-btn');
    const menuItems = document.querySelectorAll('.menu-item');
    
    console.log('Menu elements:', {
        categoryButtons: categoryButtons.length,
        menuItems: menuItems.length
    });

    if (categoryButtons.length > 0) {
        categoryButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Remove active class from all buttons
                categoryButtons.forEach(btn => btn.classList.remove('active'));
                // Add active class to clicked button
                button.classList.add('active');
                
                const category = button.getAttribute('data-category');
                
                if (menuItems.length > 0) {
                    menuItems.forEach(item => {
                        if (category === 'all' || item.getAttribute('data-category') === category) {
                            item.style.display = 'block';
                            item.style.animation = 'fadeIn 0.5s ease-in-out';
                        } else {
                            item.style.display = 'none';
                        }
                    });
                }
            });
        });
    }

    // Contact Form Handling - Removed since no form exists in HTML

    // Chatbot functionality
    const chatbotButton = document.getElementById('chatbotButton');
    const chatbotContainer = document.getElementById('chatbotContainer');
    const chatbotClose = document.getElementById('chatbotClose');
    const chatbotMessages = document.getElementById('chatbotMessages');
    const chatbotInput = document.getElementById('chatbotInput');
    const chatbotSend = document.getElementById('chatbotSend');
    
    console.log('Chatbot elements:', {
        button: chatbotButton,
        container: chatbotContainer,
        close: chatbotClose,
        messages: chatbotMessages,
        input: chatbotInput,
        send: chatbotSend
    });

    // Force chatbot position with JavaScript
    function forceChatbotPosition() {
        if (chatbotButton) {
            chatbotButton.style.position = 'fixed';
            chatbotButton.style.bottom = '30px';
            chatbotButton.style.right = '30px';
            chatbotButton.style.zIndex = '999999';
            chatbotButton.style.transform = 'none';
            chatbotButton.style.top = 'auto';
            chatbotButton.style.left = 'auto';
            chatbotButton.style.margin = '0';
            chatbotButton.style.padding = '0';
            chatbotButton.style.pointerEvents = 'auto';
            chatbotButton.style.opacity = '1';
            
            // Don't override visibility if chatbot is open
            if (!chatbotContainer || !chatbotContainer.classList.contains('active')) {
                chatbotButton.style.visibility = 'visible';
                chatbotButton.style.display = 'flex';
            }
        }
        
        if (chatbotContainer) {
            chatbotContainer.style.position = 'fixed';
            chatbotContainer.style.bottom = '100px';
            chatbotContainer.style.right = '30px';
            chatbotContainer.style.zIndex = '1000000';
            chatbotContainer.style.transform = 'none';
            chatbotContainer.style.top = 'auto';
            chatbotContainer.style.left = 'auto';
            chatbotContainer.style.margin = '0';
            chatbotContainer.style.padding = '0';
            chatbotContainer.style.pointerEvents = 'auto';
            chatbotContainer.style.visibility = 'visible';
            chatbotContainer.style.opacity = '1';
        }
    }

    // Force position immediately
    forceChatbotPosition();
    
    // Ensure chatbot is closed by default
    if (chatbotContainer) {
        chatbotContainer.classList.remove('active');
        chatbotContainer.style.display = 'none';
    }
    
    // Force position on scroll
    window.addEventListener('scroll', forceChatbotPosition);
    
    // Force position on resize
    window.addEventListener('resize', forceChatbotPosition);
    
    // Force position continuously
    setInterval(forceChatbotPosition, 100);

    if (chatbotButton && chatbotContainer && chatbotClose && chatbotMessages && chatbotInput && chatbotSend) {
        // Generate unique session ID for this chat session
        const sessionId = 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
        
        // API configuration - will be automatically set based on environment
        const API_BASE_URL = window.location.hostname === 'localhost' 
            ? 'http://localhost:3000/api' 
            : '/api';

        // Toggle chatbot
        function openChatbot() {
            chatbotContainer.classList.add('active');
            chatbotButton.style.display = 'none';
            chatbotButton.style.visibility = 'hidden';
            chatbotButton.style.opacity = '0';
        }

        function closeChatbot() {
            chatbotContainer.classList.remove('active');
            chatbotButton.style.display = 'flex';
            chatbotButton.style.visibility = 'visible';
            chatbotButton.style.opacity = '1';
        }

        chatbotButton.addEventListener('click', openChatbot);
        chatbotClose.addEventListener('click', closeChatbot);

        // Send message function
        async function sendMessage() {
            const message = chatbotInput.value.trim();
            if (message === '') return;

            // Add user message immediately
            addMessage(message, 'user');
            chatbotInput.value = '';

            // Show typing indicator
            const typingIndicator = addTypingIndicator();

            try {
                // Call OpenAI API
                const response = await fetch(`${API_BASE_URL}/chat`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        message: message,
                        sessionId: sessionId
                    })
                });

                if (!response.ok) {
                    throw new Error('API request failed');
                }

                const data = await response.json();
                
                // Remove typing indicator
                removeTypingIndicator(typingIndicator);
                
                // Add AI response
                setTimeout(() => {
                    addMessage(data.response, 'bot');
                }, 500);

            } catch (error) {
                console.error('Error calling API:', error);
                
                // Remove typing indicator
                removeTypingIndicator(typingIndicator);
                
                // Show error message
                setTimeout(() => {
                    addMessage('Sorry, I\'m having trouble connecting right now. Please try again later! 😔', 'bot');
                }, 500);
            }
        }

        // Add message to chat
        function addMessage(text, sender) {
            const messageDiv = document.createElement('div');
            messageDiv.className = `message ${sender}-message`;
            
            const contentDiv = document.createElement('div');
            contentDiv.className = 'message-content';
            contentDiv.textContent = text;
            
            messageDiv.appendChild(contentDiv);
            chatbotMessages.appendChild(messageDiv);
            chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
        }



        // Add typing indicator
        function addTypingIndicator() {
            const typingDiv = document.createElement('div');
            typingDiv.className = 'message bot-message typing-indicator';
            typingDiv.innerHTML = `
                <div class="message-content">
                    <div class="typing-dots">
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </div>
            `;
            chatbotMessages.appendChild(typingDiv);
            chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
            return typingDiv;
        }

        // Remove typing indicator
        function removeTypingIndicator(typingIndicator) {
            if (typingIndicator && typingIndicator.parentNode) {
                typingIndicator.remove();
            }
        }

        // Event listeners
        chatbotSend.addEventListener('click', sendMessage);
        chatbotInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                sendMessage();
            }
        });
    }

    // Scroll Animation
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in', 'visible');
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.menu-item, .feature, .contact-item');
    if (animatedElements.length > 0) {
        animatedElements.forEach(el => {
            el.classList.add('fade-in');
            observer.observe(el);
        });
    }

    // Navbar background on scroll
    window.addEventListener('scroll', () => {
        const navbar = document.querySelector('.navbar');
        if (navbar) {
            if (window.scrollY > 100) {
                navbar.style.background = 'rgba(255, 255, 255, 0.98)';
                navbar.style.boxShadow = '0 2px 20px rgba(0,0,0,0.1)';
            } else {
                navbar.style.background = 'rgba(255, 255, 255, 0.95)';
                navbar.style.boxShadow = 'none';
            }
        }
    });

    // Add some interactive effects
    const menuItemsForEffects = document.querySelectorAll('.menu-item');
    if (menuItemsForEffects.length > 0) {
        menuItemsForEffects.forEach(item => {
            item.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-10px) scale(1.02)';
            });
            
            item.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) scale(1)';
            });
        });
    }

    // Add parallax effect to hero section
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        const heroBg = document.querySelector('.hero-bg');
        
        if (hero && heroBg) {
            const rate = scrolled * -0.5;
            heroBg.style.transform = `translateY(${rate}px)`;
        }
    });

    console.log('Restaurant website loaded successfully! 🍜');
});

// Notification System
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#4CAF50' : type === 'error' ? '#f44336' : '#2196F3'};
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 10000;
        max-width: 400px;
        animation: slideIn 0.3s ease-out;
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.remove();
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.animation = 'slideOut 0.3s ease-in';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    @keyframes slideIn {
        from {
            transform: translateX(100%);
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
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    .notification-content {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    
    .notification-close {
        background: none;
        border: none;
        color: white;
        font-size: 20px;
        cursor: pointer;
        margin-left: 10px;
        padding: 0;
        width: 20px;
        height: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    
    .notification-close:hover {
        opacity: 0.8;
    }
    
    .menu-item {
        animation: fadeIn 0.5s ease-in-out;
    }
`;

document.head.appendChild(style);

// Loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});
