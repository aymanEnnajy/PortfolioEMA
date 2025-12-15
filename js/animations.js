/**
 * GSAP Animations & Scroll Interactions
 * Handles all page animations, scroll triggers, and smooth transitions
 */

class AnimationController {
    constructor() {
        this.sections = document.querySelectorAll('.section');
        this.currentSection = 0;
        this.isScrolling = false;
        
        this.init();
    }
    
    init() {
        // Initialize GSAP ScrollTrigger
        gsap.registerPlugin(ScrollTrigger);
        
        // Setup animations
        this.setupHeroAnimations();
        this.setupScrollAnimations();
        this.setupAOS();
        this.animateSkillBars();
        this.animateCounters();
        
        // Typing effect
        this.typeWriter();
    }
    
    setupHeroAnimations() {
        const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
        
        tl.from('.hero-label', {
            opacity: 0,
            y: -30,
            duration: 0.8
        })
        .from('.hero-title', {
            opacity: 0,
            y: 50,
            duration: 1,
            stagger: 0.2
        }, '-=0.5')
        .from('.hero-subtitle-wrapper', {
            opacity: 0,
            x: -50,
            duration: 0.8
        }, '-=0.5')
        .from('.hero-description', {
            opacity: 0,
            y: 30,
            duration: 0.8
        }, '-=0.5')
        .from('.hero-cta .btn', {
            opacity: 0,
            y: 30,
            duration: 0.6,
            stagger: 0.2
        }, '-=0.5')
        .from('.hero-social .social-link', {
            opacity: 0,
            scale: 0,
            duration: 0.5,
            stagger: 0.1
        }, '-=0.4')
        .from('.floating-code-editor', {
            opacity: 0,
            scale: 0.8,
            rotateY: -90,
            duration: 1
        }, '-=1.5');
    }
    
    setupScrollAnimations() {
        // Sections fade in on scroll
        this.sections.forEach((section, index) => {
            if (index === 0) return; // Skip hero section
            
            gsap.from(section, {
                scrollTrigger: {
                    trigger: section,
                    start: 'top 80%',
                    end: 'top 20%',
                    toggleActions: 'play none none reverse'
                },
                opacity: 0,
                y: 100,
                duration: 1,
                ease: 'power3.out'
            });
        });
        
        // Navbar scroll effect
        ScrollTrigger.create({
            start: 'top -80',
            end: 99999,
            toggleClass: { className: 'scrolled', targets: '.navbar' }
        });
        
        // Parallax effects
        gsap.utils.toArray('.floating-code-editor').forEach(elem => {
            gsap.to(elem, {
                scrollTrigger: {
                    trigger: elem,
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: true
                },
                y: -100,
                ease: 'none'
            });
        });
    }
    
    setupAOS() {
        // Simple AOS (Animate On Scroll) implementation
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('aos-animate');
                }
            });
        }, observerOptions);
        
        document.querySelectorAll('[data-aos]').forEach(el => {
            observer.observe(el);
        });
    }
    
    animateSkillBars() {
        const skillBars = document.querySelectorAll('.skill-progress');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const progress = entry.target.getAttribute('data-progress');
                    gsap.to(entry.target, {
                        width: `${progress}%`,
                        duration: 1.5,
                        ease: 'power2.out',
                        delay: 0.2
                    });
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        skillBars.forEach(bar => observer.observe(bar));
    }
    
    animateCounters() {
        const counters = document.querySelectorAll('.stat-value');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const target = entry.target;
                    const count = parseInt(target.getAttribute('data-count'));
                    
                    gsap.to(target, {
                        innerHTML: count,
                        duration: 2,
                        ease: 'power1.out',
                        snap: { innerHTML: 1 },
                        onUpdate: function() {
                            target.innerHTML = Math.ceil(target.innerHTML);
                        }
                    });
                    
                    observer.unobserve(target);
                }
            });
        }, { threshold: 0.5 });
        
        counters.forEach(counter => observer.observe(counter));
    }
    
    typeWriter() {
        const roles = [
            'Full Stack Developer',
            'Web Developer',
            'React Specialist',
            'PHP Developer',
            'Python Programmer'
        ];
        
        let roleIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        const typingSpeed = 100;
        const deletingSpeed = 50;
        const pauseDuration = 2000;
        
        const typeElement = document.querySelector('.typing-text');
        if (!typeElement) return;
        
        const type = () => {
            const currentRole = roles[roleIndex];
            
            if (isDeleting) {
                typeElement.textContent = currentRole.substring(0, charIndex - 1);
                charIndex--;
            } else {
                typeElement.textContent = currentRole.substring(0, charIndex + 1);
                charIndex++;
            }
            
            let speed = isDeleting ? deletingSpeed : typingSpeed;
            
            if (!isDeleting && charIndex === currentRole.length) {
                speed = pauseDuration;
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                roleIndex = (roleIndex + 1) % roles.length;
                speed = 500;
            }
            
            setTimeout(type, speed);
        };
        
        // Start typing effect
        setTimeout(type, 1000);
    }
}

// Card hover animations
class CardAnimations {
    constructor() {
        this.init();
    }
    
    init() {
        this.setupCardHover('.project-card');
        this.setupCardHover('.experience-card');
        this.setupCardHover('.stat-card');
        this.setupCardHover('.skill-card');
    }
    
    setupCardHover(selector) {
        const cards = document.querySelectorAll(selector);
        
        cards.forEach(card => {
            card.addEventListener('mouseenter', (e) => {
                gsap.to(card, {
                    scale: 1.03,
                    duration: 0.3,
                    ease: 'power2.out'
                });
            });
            
            card.addEventListener('mouseleave', (e) => {
                gsap.to(card, {
                    scale: 1,
                    duration: 0.3,
                    ease: 'power2.out'
                });
            });
            
            // 3D tilt effect
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const rotateX = (y - centerY) / 20;
                const rotateY = (centerX - x) / 20;
                
                gsap.to(card, {
                    rotationX: rotateX,
                    rotationY: rotateY,
                    duration: 0.3,
                    ease: 'power2.out',
                    transformPerspective: 1000
                });
            });
            
            card.addEventListener('mouseleave', () => {
                gsap.to(card, {
                    rotationX: 0,
                    rotationY: 0,
                    duration: 0.5,
                    ease: 'power2.out'
                });
            });
        });
    }
}

// Particles.js configuration
function initParticles() {
    if (typeof particlesJS !== 'undefined') {
        particlesJS('particles-js', {
            particles: {
                number: {
                    value: 80,
                    density: {
                        enable: true,
                        value_area: 800
                    }
                },
                color: {
                    value: '#6366f1'
                },
                shape: {
                    type: 'circle',
                },
                opacity: {
                    value: 0.5,
                    random: true,
                    anim: {
                        enable: true,
                        speed: 1,
                        opacity_min: 0.1,
                        sync: false
                    }
                },
                size: {
                    value: 3,
                    random: true,
                    anim: {
                        enable: true,
                        speed: 2,
                        size_min: 0.1,
                        sync: false
                    }
                },
                line_linked: {
                    enable: true,
                    distance: 150,
                    color: '#6366f1',
                    opacity: 0.2,
                    width: 1
                },
                move: {
                    enable: true,
                    speed: 1,
                    direction: 'none',
                    random: false,
                    straight: false,
                    out_mode: 'out',
                    bounce: false,
                }
            },
            interactivity: {
                detect_on: 'canvas',
                events: {
                    onhover: {
                        enable: true,
                        mode: 'grab'
                    },
                    onclick: {
                        enable: true,
                        mode: 'push'
                    },
                    resize: true
                },
                modes: {
                    grab: {
                        distance: 140,
                        line_linked: {
                            opacity: 0.5
                        }
                    },
                    push: {
                        particles_nb: 4
                    }
                }
            },
            retina_detect: true
        });
    }
}

// Initialize animations when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    // Wait for fonts and images to load
    window.addEventListener('load', () => {
        // Initialize animation controllers
        const animationController = new AnimationController();
        const cardAnimations = new CardAnimations();
        
        // Initialize particles
        initParticles();
        
        // Expose to window for debugging
        window.animationController = animationController;
        window.cardAnimations = cardAnimations;
    });
});