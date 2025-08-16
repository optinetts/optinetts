// Navigation Mobile Toggle
document.addEventListener('DOMContentLoaded', function() {
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Toggle mobile menu
    navToggle.addEventListener('click', function() {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 80; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Add animation classes to elements
    const animatedElements = document.querySelectorAll('.service-card, .feature-item, .stat, .contact-item');
    animatedElements.forEach((el, index) => {
        el.classList.add('fade-in');
        el.style.transitionDelay = `${index * 0.1}s`;
        observer.observe(el);
    });

    // Add slide animations to section content
    const slideLeftElements = document.querySelectorAll('.features-text, .about-text');
    slideLeftElements.forEach(el => {
        el.classList.add('slide-in-left');
        observer.observe(el);
    });

    const slideRightElements = document.querySelectorAll('.features-visual, .about-visual');
    slideRightElements.forEach(el => {
        el.classList.add('slide-in-right');
        observer.observe(el);
    });

    // Particle animation enhancement
    createFloatingParticles();

    // Contact form handling
    const contactForm = document.querySelector('.contact-form form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Redirect to phone call
            window.location.href = 'tel:8888112533';
        });
    }

    // Counter animation for stats
    function animateCounters() {
        const counters = document.querySelectorAll('.stat h3');
        const speed = 200; // Lower = faster

        counters.forEach(counter => {
            const updateCount = () => {
                const target = +counter.getAttribute('data-target') || parseInt(counter.innerText.replace(/\D/g, ''));
                const count = +counter.innerText.replace(/\D/g, '') || 0;

                if (!counter.getAttribute('data-target')) {
                    counter.setAttribute('data-target', target);
                }

                const inc = target / speed;

                if (count < target) {
                    const newCount = Math.ceil(count + inc);
                    const suffix = counter.innerText.replace(/[\d,]/g, '');
                    counter.innerText = newCount.toLocaleString() + suffix;
                    setTimeout(updateCount, 1);
                } else {
                    const suffix = counter.innerText.replace(/[\d,]/g, '');
                    counter.innerText = target.toLocaleString() + suffix;
                }
            };

            // Start animation when element is visible
            const statsObserver = new IntersectionObserver(function(entries) {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        updateCount();
                        statsObserver.unobserve(entry.target);
                    }
                });
            }, observerOptions);

            statsObserver.observe(counter);
        });
    }

    animateCounters();

    // Service card interactions
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Dynamic network animation
    function updateNetworkAnimation() {
        const sphere = document.querySelector('.sphere-inner');
        const lines = document.querySelectorAll('.line');
        
        if (sphere) {
            const hue = (Date.now() / 50) % 360;
            sphere.style.filter = `hue-rotate(${hue}deg)`;
        }

        lines.forEach((line, index) => {
            const delay = (Date.now() / 1000 + index) % 4;
            line.style.animationDelay = `${delay}s`;
        });
    }

    // Update network animation every 100ms
    setInterval(updateNetworkAnimation, 100);

    // Loading animation
    function initLoadingAnimations() {
        const elements = document.querySelectorAll('section > *');
        elements.forEach((el, index) => {
            el.classList.add('loading');
            setTimeout(() => {
                el.classList.add('loaded');
            }, index * 100);
        });
    }

    initLoadingAnimations();
});

// Create floating particles
function createFloatingParticles() {
    const particlesContainer = document.querySelector('.particles-container');
    if (!particlesContainer) return;

    // Add more dynamic particles
    for (let i = 0; i < 10; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 6 + 's';
        particle.style.animationDuration = (Math.random() * 4 + 4) + 's';
        particlesContainer.appendChild(particle);
    }
}

// Network visualization enhancement
function enhanceNetworkVisualization() {
    const networkSphere = document.querySelector('.network-sphere');
    if (!networkSphere) return;

    // Add interactive hover effects
    networkSphere.addEventListener('mousemove', function(e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        const rotateX = (y / rect.height) * 20;
        const rotateY = (x / rect.width) * 20;
        
        this.style.transform = `rotateX(${-rotateX}deg) rotateY(${rotateY}deg)`;
    });

    networkSphere.addEventListener('mouseleave', function() {
        this.style.transform = 'rotateX(0deg) rotateY(0deg)';
    });
}

// Initialize enhanced features
document.addEventListener('DOMContentLoaded', function() {
    enhanceNetworkVisualization();
    
    // Add scroll progress indicator
    const scrollProgress = document.createElement('div');
    scrollProgress.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: linear-gradient(90deg, #3b82f6, #f59e0b);
        z-index: 9999;
        transition: width 0.3s ease;
    `;
    document.body.appendChild(scrollProgress);

    window.addEventListener('scroll', function() {
        const scrolled = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
        scrollProgress.style.width = scrolled + '%';
    });

    // Add typing effect to hero title
    function typeWriter(element, text, speed = 100) {
        let i = 0;
        element.innerHTML = '';
        
        function type() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        
        type();
    }

    // Easter egg: Konami code
    let konamiCode = [];
    const konamiSequence = [
        'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
        'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
        'KeyB', 'KeyA'
    ];

    document.addEventListener('keydown', function(e) {
        konamiCode.push(e.code);
        konamiCode = konamiCode.slice(-10);

        if (JSON.stringify(konamiCode) === JSON.stringify(konamiSequence)) {
            // Activate special animation
            document.body.style.animation = 'rainbow 2s infinite';
            setTimeout(() => {
                document.body.style.animation = '';
            }, 5000);
        }
    });
});

// Add CSS for rainbow effect
const style = document.createElement('style');
style.textContent = `
    @keyframes rainbow {
        0% { filter: hue-rotate(0deg); }
        100% { filter: hue-rotate(360deg); }
    }
`;
document.head.appendChild(style);

// Performance optimization: Debounce scroll events
function debounce(func, wait, immediate) {
    let timeout;
    return function executedFunction() {
        const context = this;
        const args = arguments;
        
        const later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        
        if (callNow) func.apply(context, args);
    };
}

// Optimize scroll performance
const optimizedScrollHandler = debounce(function() {
    // Existing scroll logic
}, 10);

window.addEventListener('scroll', optimizedScrollHandler);

// Error handling for missing elements
function safeQuerySelector(selector, callback) {
    const element = document.querySelector(selector);
    if (element && callback) {
        callback(element);
    }
    return element;
}

// Use throughout the code for safer DOM manipulation
safeQuerySelector('.hero-title', (title) => {
    // Safe to manipulate title element
});