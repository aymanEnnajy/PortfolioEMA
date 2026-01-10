/**
 * Main Application Logic
 * Handles navigation, theme switching, form submission, and general interactions
 */

class PortfolioApp {
    constructor() {
        this.navbar = document.getElementById('navbar');
        this.navToggle = document.getElementById('nav-toggle');
        this.navMenu = document.getElementById('nav-menu');
        this.navLinks = document.querySelectorAll('.nav-link');
        this.themeToggle = document.getElementById('theme-toggle');
        this.sections = document.querySelectorAll('.section');
        this.preloader = document.getElementById('preloader');
        this.contactForm = document.getElementById('contact-form');

        this.init();
    }

    init() {
        this.setupPreloader();
        this.setupNavigation();
        this.setupTheme();
        this.setupSmoothScroll();
        this.setupContactForm();
        this.setupScrollSpy();
        this.setupMobileMenu();
    }

    // === PRELOADER ===
    setupPreloader() {
        let progress = 0;
        const percentageEl = document.querySelector('.loader-percentage');

        const interval = setInterval(() => {
            progress += Math.random() * 15;
            if (progress >= 100) {
                progress = 100;
                clearInterval(interval);

                setTimeout(() => {
                    this.preloader.classList.add('hide');
                    document.body.style.overflow = 'visible';
                }, 500);
            }

            if (percentageEl) {
                percentageEl.textContent = Math.floor(progress) + '%';
            }
        }, 200);
    }

    // === NAVIGATION ===
    setupNavigation() {
        // Active link on scroll
        window.addEventListener('scroll', () => {
            this.updateActiveLink();
        });

        // Click navigation
        this.navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                const targetId = link.getAttribute('href');

                // Only intercept internal anchor links for smooth scroll
                if (targetId && targetId.startsWith('#')) {
                    e.preventDefault();
                    const targetSection = document.querySelector(targetId);

                    if (targetSection) {
                        this.scrollToSection(targetSection);

                        // Close mobile menu
                        if (this.navMenu.classList.contains('active')) {
                            this.toggleMobileMenu();
                        }
                    }
                }
                // Links to other pages (e.g. index.html) will work normally
            });
        });
    }

    setupMobileMenu() {
        if (this.navToggle) {
            this.navToggle.addEventListener('click', () => {
                this.toggleMobileMenu();
            });
        }

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (this.navMenu.classList.contains('active') &&
                !this.navMenu.contains(e.target) &&
                !this.navToggle.contains(e.target)) {
                this.toggleMobileMenu();
            }
        });
    }

    toggleMobileMenu() {
        this.navToggle.classList.toggle('active');
        this.navMenu.classList.toggle('active');
        document.body.style.overflow = this.navMenu.classList.contains('active') ? 'hidden' : 'visible';
    }

    scrollToSection(section) {
        const navHeight = this.navbar.offsetHeight;
        const targetPosition = section.offsetTop - navHeight;

        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    }

    updateActiveLink() {
        let current = '';
        const scrollPosition = window.pageYOffset;

        this.sections.forEach(section => {
            const sectionTop = section.offsetTop - this.navbar.offsetHeight - 100;
            const sectionHeight = section.offsetHeight;

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        this.navLinks.forEach(link => {
            const href = link.getAttribute('href');
            // Only update active state for internal anchor links
            if (href && href.startsWith('#')) {
                link.classList.remove('active');
                if (href === `#${current}`) {
                    link.classList.add('active');
                }
            }
        });
    }

    // === SMOOTH SCROLL ===
    setupSmoothScroll() {
        // Handle all anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                const href = anchor.getAttribute('href');
                if (href !== '#' && href.length > 1) {
                    const target = document.querySelector(href);
                    if (target && !anchor.classList.contains('nav-link')) {
                        e.preventDefault();
                        this.scrollToSection(target);
                    }
                }
            });
        });
    }

    // === SCROLL SPY ===
    setupScrollSpy() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                }
            });
        }, {
            threshold: 0.2,
            rootMargin: '-100px'
        });

        this.sections.forEach(section => {
            observer.observe(section);
        });
    }

    // === THEME SWITCHING ===
    setupTheme() {
        // Load saved theme
        const savedTheme = localStorage.getItem('portfolio-theme') || 'dark';
        document.body.setAttribute('data-theme', savedTheme);

        // Theme toggle
        if (this.themeToggle) {
            this.themeToggle.addEventListener('click', () => {
                this.toggleTheme();
            });
        }

        // Detect system theme preference
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
        if (!localStorage.getItem('portfolio-theme')) {
            document.body.setAttribute('data-theme', prefersDark.matches ? 'dark' : 'light');
        }

        prefersDark.addEventListener('change', (e) => {
            if (!localStorage.getItem('portfolio-theme')) {
                document.body.setAttribute('data-theme', e.matches ? 'dark' : 'light');
            }
        });
    }

    toggleTheme() {
        const currentTheme = document.body.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

        // Add transition class
        document.body.style.transition = 'background 0.5s ease, color 0.5s ease';

        // Change theme
        document.body.setAttribute('data-theme', newTheme);
        localStorage.setItem('portfolio-theme', newTheme);

        // Animate theme toggle button
        if (this.themeToggle) {
            gsap.to(this.themeToggle, {
                rotation: 360,
                duration: 0.5,
                ease: 'power2.out',
                onComplete: () => {
                    gsap.set(this.themeToggle, { rotation: 0 });
                }
            });
        }

        // Remove transition after animation
        setTimeout(() => {
            document.body.style.transition = '';
        }, 500);
    }

    // === CONTACT FORM ===
    setupContactForm() {
        if (!this.contactForm) return;

        this.contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleFormSubmission();
        });

        // Input animations
        const inputs = this.contactForm.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('focus', (e) => {
                gsap.to(e.target, {
                    scale: 1.02,
                    duration: 0.3,
                    ease: 'power2.out'
                });
            });

            input.addEventListener('blur', (e) => {
                gsap.to(e.target, {
                    scale: 1,
                    duration: 0.3,
                    ease: 'power2.out'
                });
            });
        });
    }

    handleFormSubmission() {
        const formData = new FormData(this.contactForm);
        const data = Object.fromEntries(formData);

        // Show loading state
        const submitBtn = this.contactForm.querySelector('.btn-submit');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Envoi...';
        submitBtn.disabled = true;

        // Simulate form submission (replace with actual API call)
        setTimeout(() => {
            console.log('Form submitted:', data);

            // Show success message
            this.showFormSuccess();

            // Reset form
            this.contactForm.reset();
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }, 2000);
    }

    showFormSuccess() {
        const form = document.querySelector('.contact-form');
        const success = document.getElementById('form-success');

        gsap.to(form, {
            opacity: 0,
            scale: 0.9,
            duration: 0.3,
            onComplete: () => {
                form.style.display = 'none';
                success.classList.add('show');
                success.style.display = 'block';

                gsap.from(success, {
                    opacity: 0,
                    scale: 0.9,
                    duration: 0.5,
                    ease: 'back.out(1.7)'
                });

                // Reset after 5 seconds
                setTimeout(() => {
                    this.hideFormSuccess();
                }, 5000);
            }
        });
    }

    hideFormSuccess() {
        const form = document.querySelector('.contact-form');
        const success = document.getElementById('form-success');

        gsap.to(success, {
            opacity: 0,
            scale: 0.9,
            duration: 0.3,
            onComplete: () => {
                success.classList.remove('show');
                success.style.display = 'none';
                form.style.display = 'block';

                gsap.to(form, {
                    opacity: 1,
                    scale: 1,
                    duration: 0.5,
                    ease: 'back.out(1.7)'
                });
            }
        });
    }
}

// === UTILITY FUNCTIONS ===

// Cursor trail effect (optional)
class CursorTrail {
    constructor() {
        this.coords = [];
        this.circles = [];
        this.colors = ['#6366f1', '#8b5cf6', '#a78bfa', '#c4b5fd'];

        // Only enable on desktop
        if (window.innerWidth > 768) {
            this.init();
        }
    }

    init() {
        // Create circles
        for (let i = 0; i < 12; i++) {
            const circle = document.createElement('div');
            circle.style.cssText = `
                position: fixed;
                width: 10px;
                height: 10px;
                border-radius: 50%;
                background: ${this.colors[i % this.colors.length]};
                pointer-events: none;
                z-index: 9999;
                opacity: 0;
                transition: opacity 0.3s;
                mix-blend-mode: screen;
            `;
            document.body.appendChild(circle);
            this.circles.push(circle);
            this.coords.push({ x: 0, y: 0 });
        }

        // Track mouse
        document.addEventListener('mousemove', (e) => {
            this.coords[0] = { x: e.clientX, y: e.clientY };
        });

        // Animate
        this.animate();
    }

    animate() {
        let x = this.coords[0].x;
        let y = this.coords[0].y;

        this.circles.forEach((circle, index) => {
            circle.style.left = x - 5 + 'px';
            circle.style.top = y - 5 + 'px';
            circle.style.opacity = (12 - index) / 12;
            circle.style.transform = `scale(${(12 - index) / 12})`;

            if (index < this.coords.length - 1) {
                const next = this.coords[index + 1] || this.coords[0];
                x += (next.x - x) * 0.3;
                y += (next.y - y) * 0.3;
                this.coords[index + 1] = { x, y };
            }
        });

        requestAnimationFrame(() => this.animate());
    }
}

// Performance optimization
const optimizePerformance = () => {
    // Lazy load images
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));

    // Debounce scroll and resize events
    let scrollTimeout;
    let resizeTimeout;

    window.addEventListener('scroll', () => {
        if (scrollTimeout) clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
            // Scroll event logic
        }, 50);
    });

    window.addEventListener('resize', () => {
        if (resizeTimeout) clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            // Resize event logic
        }, 150);
    });
};

// Console signature
const consoleSignature = () => {
    const styles = [
        'color: #6366f1',
        'font-size: 20px',
        'font-weight: bold',
        'text-shadow: 2px 2px 4px rgba(99, 102, 241, 0.3)'
    ].join(';');

    console.log('%c🚀 Portfolio by Mohamed Ayman Ennajy', styles);
    console.log('%cFull Stack Developer | JavaScript | React | PHP | Python', 'color: #8b5cf6; font-size: 12px;');
    console.log('%c💼 Looking for opportunities? Let\'s connect!', 'color: #10b981; font-size: 12px;');
    console.log('%c📧 aymanennajy@gmail.com', 'color: #f59e0b; font-size: 12px;');
};

// === INITIALIZE APP ===
document.addEventListener('DOMContentLoaded', () => {
    // Initialize main app
    const app = new PortfolioApp();

    // Optional: Initialize cursor trail (can be disabled for performance)
    // const cursorTrail = new CursorTrail();

    // Optimize performance
    optimizePerformance();

    // Console signature
    consoleSignature();

    // Expose to window for debugging
    window.portfolioApp = app;

    // Add keyboard navigation
    document.addEventListener('keydown', (e) => {
        // ESC to close mobile menu
        if (e.key === 'Escape' && app.navMenu.classList.contains('active')) {
            app.toggleMobileMenu();
        }
    });

    // Prevent right-click on images (optional)
    // document.querySelectorAll('img').forEach(img => {
    //     img.addEventListener('contextmenu', (e) => e.preventDefault());
    // });
});



const scrollTopBtn = document.getElementById("scrollTopBtn");

window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
        scrollTopBtn.classList.add("show");
    } else {
        scrollTopBtn.classList.remove("show");
    }
});

scrollTopBtn.addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});

//Cache 
