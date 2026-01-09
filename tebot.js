// I-Bot Kit JavaScript functionality
document.addEventListener('DOMContentLoaded', function() {
    console.log('I-Bot page loaded successfully');
    
    // Get main elements
    const root = document.getElementById('root');
    const projectsContainer = document.getElementById('projects-scroll');
    const heroImage = document.querySelector('.image-section img');
    const heroTitle = document.querySelector('.info-section h1');
    const heroButton = document.querySelector('.btn-secondary');

    // Enhanced smooth scrolling function
    function smoothScrollTo(element, duration = 1000) {
        const targetPosition = element.offsetTop - 20; // 20px offset
        const startPosition = window.pageYOffset;
        const distance = targetPosition - startPosition;
        let startTime = null;

        function animation(currentTime) {
            if (startTime === null) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const run = easeInOutCubic(timeElapsed, startPosition, distance, duration);
            window.scrollTo(0, run);
            if (timeElapsed < duration) requestAnimationFrame(animation);
        }

        // Easing function for smooth animation
        function easeInOutCubic(t, b, c, d) {
            t /= d / 2;
            if (t < 1) return c / 2 * t * t * t + b;
            t -= 2;
            return c / 2 * (t * t * t + 2) + b;
        }

        requestAnimationFrame(animation);
    }

    // Hero section interactions with no zoom effects
    if (heroImage) {
        heroImage.addEventListener('mouseenter', function() {
            this.style.filter = 'drop-shadow(0 15px 40px rgba(0,0,0,0.6))';
        });
        
        heroImage.addEventListener('mouseleave', function() {
            this.style.filter = 'drop-shadow(0 10px 30px rgba(0,0,0,0.5))';
        });
        
        heroImage.addEventListener('click', function() {
            // Simple click feedback without zoom
            this.style.filter = 'drop-shadow(0 20px 50px rgba(0,0,0,0.7))';
            setTimeout(() => {
                this.style.filter = 'drop-shadow(0 10px 30px rgba(0,0,0,0.5))';
            }, 300);
        });
    }
    
    if (heroTitle) {
        heroTitle.addEventListener('mouseenter', function() {
            this.style.color = '#00d4ff';
            this.style.textShadow = '0 0 20px rgba(0, 212, 255, 0.5)';
        });
        
        heroTitle.addEventListener('mouseleave', function() {
            this.style.color = 'rgb(255, 153, 0)';
            this.style.textShadow = 'none';
        });
    }
    
    if (heroButton) {
        heroButton.addEventListener('click', function(e) {
            e.preventDefault();
            this.style.transform = 'translateY(-1px)'; // No scale, just slight movement
            setTimeout(() => {
                this.style.transform = 'translateY(-2px)';
                // Enhanced smooth scroll to introduction section
                const introSection = document.getElementById('introduction');
                if (introSection) {
                    smoothScrollTo(introSection, 1200);
                }
            }, 150);
        });
    }

    // Enhanced smooth scroll for anchor links
    const handleAnchorClick = (e) => {
        const target = e.target.closest('a[href^="#"]');
        if (target && root && root.contains(target)) {
            e.preventDefault();
            const selector = target.getAttribute('href');
            const element = selector ? document.querySelector(selector) : null;
            if (element) {
                smoothScrollTo(element, 1000);
            }
        }
    };

    if (root) {
        root.addEventListener('click', handleAnchorClick);
    }

    // Enhanced Intersection Observer for smoother fade-in animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Stagger animations for better visual effect
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100);
                observer.unobserve(entry.target);
            }
        });
    }, { 
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px' // Trigger animation earlier
    });

    // Apply enhanced fade-in animation to elements
    const elements = document.querySelectorAll('.feature-item, .tech-card, .project-card');
    elements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
        observer.observe(el);
    });

    // Enhanced auto-scroll function with smoother animation
    const createAutoScroll = (container, pixelsPerSecond = 30) => {
        if (!container) return null;

        let lastTimestamp = 0;
        let animationId = null;
        let stopped = false;
        let isPaused = false;

        // Pause on hover
        container.addEventListener('mouseenter', () => isPaused = true);
        container.addEventListener('mouseleave', () => isPaused = false);

        const scroll = (timestamp) => {
            if (stopped) return;

            if (!lastTimestamp) lastTimestamp = timestamp;
            const delta = timestamp - lastTimestamp;
            lastTimestamp = timestamp;

            if (!isPaused) {
                const increment = (pixelsPerSecond / 1000) * delta;
                container.scrollLeft += increment;

                const singleSetWidth = container.scrollWidth / 2;
                if (container.scrollLeft >= singleSetWidth) {
                    container.scrollLeft -= singleSetWidth;
                }
            }

            animationId = requestAnimationFrame(scroll);
        };

        animationId = requestAnimationFrame(scroll);

        return () => {
            stopped = true;
            if (animationId) cancelAnimationFrame(animationId);
        };
    };

    // Start enhanced auto-scroll for projects after delay
    let stopFns = [];
    
    setTimeout(() => {
        if (projectsContainer) {
            const stopProjects = createAutoScroll(projectsContainer, 40);
            if (stopProjects) stopFns.push(stopProjects);
        }
    }, 2000);

    // Enhanced form submission handler
    const form = document.getElementById('inquiry-form');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Enhanced form validation with smooth animations
            const inputs = form.querySelectorAll('input[required], select[required], textarea[required]');
            let isValid = true;
            
            inputs.forEach((input, index) => {
                setTimeout(() => {
                    if (!input.value.trim()) {
                        input.style.borderColor = '#ff4444';
                        input.style.boxShadow = '0 0 10px rgba(255, 68, 68, 0.3)';
                        isValid = false;
                    } else {
                        input.style.borderColor = '#4caf50';
                        input.style.boxShadow = '0 0 10px rgba(76, 175, 80, 0.3)';
                        setTimeout(() => {
                            input.style.borderColor = '#e0e0e0';
                            input.style.boxShadow = 'none';
                        }, 1000);
                    }
                }, index * 50);
            });
            
            setTimeout(() => {
                if (isValid) {
                    const button = form.querySelector('.form-btn');
                    const originalText = button.textContent;
                    button.style.transform = 'translateY(-1px)'; // No scale, just slight movement
                    setTimeout(() => {
                        button.textContent = '✅ Inquiry Sent!';
                        button.style.background = 'linear-gradient(135deg, #4caf50 0%, #45a049 100%)';
                        button.style.transform = 'translateY(-2px)';
                    }, 150);
                    
                    setTimeout(() => {
                        button.textContent = originalText;
                        button.style.background = 'linear-gradient(135deg, #1976d2 0%, #1565c0 100%)';
                        form.reset();
                    }, 3000);
                } else {
                    // Shake animation for invalid form
                    form.style.animation = 'shake 0.5s ease-in-out';
                    setTimeout(() => {
                        form.style.animation = '';
                    }, 500);
                }
            }, inputs.length * 50 + 100);
        });
    }

    // Enhanced loading animation for content
    const contentLayout = document.querySelector('.content-layout');
    if (contentLayout) {
        contentLayout.style.opacity = '0';
        contentLayout.style.transform = 'translateY(50px)';
        
        setTimeout(() => {
            contentLayout.style.transition = 'all 1.2s cubic-bezier(0.4, 0, 0.2, 1)';
            contentLayout.style.opacity = '1';
            contentLayout.style.transform = 'translateY(-40px)';
        }, 300);
    }

    // Enhanced keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' && e.target === heroButton) {
            heroButton.click();
        }
        
        // Enhanced easter egg: Press 'R' to rotate the robot without zoom
        if (e.key.toLowerCase() === 'r' && heroImage) {
            heroImage.style.transition = 'transform 1s cubic-bezier(0.4, 0, 0.2, 1)';
            heroImage.style.transform = 'rotate(360deg)'; // No scale, just rotation
            setTimeout(() => {
                heroImage.style.transform = 'rotate(0deg)';
                setTimeout(() => {
                    heroImage.style.transition = 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
                }, 1000);
            }, 1000);
        }
    });

    // Enhanced touch support for mobile without zoom
    if (heroImage && 'ontouchstart' in window) {
        heroImage.addEventListener('touchstart', function() {
            this.style.filter = 'drop-shadow(0 15px 40px rgba(0,0,0,0.6))';
        });
        
        heroImage.addEventListener('touchend', function() {
            this.style.filter = 'drop-shadow(0 10px 30px rgba(0,0,0,0.5))';
        });
    }

    // Cleanup function
    window.cleanupIBot = () => {
        stopFns.forEach(stop => stop());
        if (root) {
            root.removeEventListener('click', handleAnchorClick);
        }
        observer.disconnect();
    };
});