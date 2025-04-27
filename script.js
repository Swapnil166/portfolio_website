document.addEventListener('DOMContentLoaded', () => {
    // Initialize particles
    initParticles();

    // Mobile navigation toggle
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');
    
    burger.addEventListener('click', () => {
        // Toggle nav
        nav.classList.toggle('nav-active');
        
        // Animate links
        navLinks.forEach((link, index) => {
            if (link.style.animation) {
                link.style.animation = '';
            } else {
                link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
            }
        });
        
        // Burger animation
        burger.classList.toggle('toggle');
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Close mobile menu if open
            if (nav.classList.contains('nav-active')) {
                nav.classList.remove('nav-active');
                burger.classList.remove('toggle');
                navLinks.forEach(link => {
                    link.style.animation = '';
                });
            }
            
            const target = document.querySelector(this.getAttribute('href'));
            
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Scroll reveal animation
    const revealElements = document.querySelectorAll('.section-title, .about-content, .skills-container, .project-card, .timeline-item, .contact-container');
    
    const revealOnScroll = () => {
        const triggerBottom = window.innerHeight * 0.8;
        
        revealElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            
            if (elementTop < triggerBottom) {
                element.classList.add('reveal');
            }
        });
    };
    
    window.addEventListener('scroll', revealOnScroll);
    
    // Add reveal class to CSS
    const style = document.createElement('style');
    style.textContent = `
        .section-title, .about-content, .skills-container, .project-card, .timeline-item, .contact-container {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        .reveal {
            opacity: 1;
            transform: translateY(0);
        }
    `;
    document.head.appendChild(style);
    
    // Trigger initial reveal
    revealOnScroll();
    
    // Initialize skill animation on scroll
    initSkillsAnimation();
    
    // Initialize EmailJS
    (function() {
        // EmailJS public key
        emailjs.init("qfPD_ht-MJOoDw5rT");
    })();
    
    // Form handling
    const contactForm = document.getElementById('contactForm');
    const submitBtn = document.getElementById('submitBtn');
    const submitBtnText = submitBtn ? submitBtn.querySelector('span') : null;
    const submitBtnLoader = submitBtn ? submitBtn.querySelector('.loader') : null;
    const formStatus = document.getElementById('formStatus');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            // Simple form validation
            if (!name || !email || !subject || !message) {
                showFormStatus('Please fill in all fields', 'error');
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showFormStatus('Please enter a valid email address', 'error');
                return;
            }
            
            // Show loading state
            if (submitBtn && submitBtnText && submitBtnLoader) {
                submitBtn.disabled = true;
                submitBtnText.style.opacity = '0.5';
                submitBtnLoader.style.display = 'inline-block';
            }
            
            // Prepare template parameters
            const templateParams = {
                to_email: 'swapnilkadav16062000@gmail.com',
                from_name: name,
                from_email: email,
                subject: subject,
                message: message
            };
            
            // Send email using EmailJS with provided credentials
            emailjs.send('service_kzehuch', 'template_v1w33dh', templateParams)
                .then(function(response) {
                    console.log('SUCCESS!', response.status, response.text);
                    showFormStatus('Your message has been sent successfully! I\'ll get back to you soon.', 'success');
                    contactForm.reset();
                }, function(error) {
                    console.log('FAILED...', error);
                    showFormStatus('Failed to send message. Please try again later.', 'error');
                })
                .finally(function() {
                    // Reset button state
                    if (submitBtn && submitBtnText && submitBtnLoader) {
                        submitBtn.disabled = false;
                        submitBtnText.style.opacity = '1';
                        submitBtnLoader.style.display = 'none';
                    }
                });
        });
    }
    
    // Helper function to show form status
    function showFormStatus(message, type) {
        if (formStatus) {
            formStatus.textContent = message;
            formStatus.className = 'form-status';
            formStatus.classList.add(type);
            
            // Hide status message after 5 seconds
            setTimeout(() => {
                formStatus.style.display = 'none';
                formStatus.className = 'form-status';
            }, 5000);
        }
    }
    
    // Dynamic year for footer copyright
    const yearSpan = document.querySelector('footer .container p');
    if (yearSpan) {
        const currentYear = new Date().getFullYear();
        yearSpan.innerHTML = yearSpan.innerHTML.replace('2025', currentYear);
    }
    
    // Add active class to navigation based on scroll position
    const sections = document.querySelectorAll('section');
    const navItems = document.querySelectorAll('.nav-links a');
    
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.scrollY >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });
        
        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href').slice(1) === current) {
                item.classList.add('active');
            }
        });
    });
    
    // Add active class styling
    const styleActive = document.createElement('style');
    styleActive.textContent = `
        .nav-links a.active::after {
            width: 100%;
        }
        .nav-links a.active {
            font-weight: 700;
        }
    `;
    document.head.appendChild(styleActive);
    
    // Burger animation styles
    const styleBurger = document.createElement('style');
    styleBurger.textContent = `
        .toggle .line1 {
            transform: rotate(-45deg) translate(-5px, 6px);
        }
        .toggle .line2 {
            opacity: 0;
        }
        .toggle .line3 {
            transform: rotate(45deg) translate(-5px, -6px);
        }
    `;
    document.head.appendChild(styleBurger);
    
    // Function to initialize the floating particles animation
    function initParticles() {
        const circles = document.querySelector('.circles');
        if (!circles) return;
        
        // The animation is already in CSS, this is just a placeholder for future enhancements
    }
    
    // Function to handle the skill bar animations when they come into view
    function initSkillsAnimation() {
        const skills = document.querySelectorAll('.skill-progress');
        const skillsSection = document.querySelector('.skills-section');
        
        if (!skillsSection || skills.length === 0) return;
        
        const animateSkills = () => {
            const sectionTop = skillsSection.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (sectionTop < windowHeight * 0.8) {
                skills.forEach(skill => {
                    // Reset animation to ensure it plays every time
                    skill.style.animation = 'none';
                    // Trigger reflow to restart animation
                    void skill.offsetWidth;
                    skill.style.animation = 'growSkill 1.5s var(--animation-timing) forwards';
                });
                
                // Remove the scroll listener after animation has played
                window.removeEventListener('scroll', animateSkills);
            }
        };
        
        // Add scroll listener
        window.addEventListener('scroll', animateSkills);
        
        // Check initial state
        animateSkills();
    }
    
    // Add interactive hover effect to project cards
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function(e) {
            // Create a ripple effect
            const ripple = document.createElement('div');
            ripple.className = 'ripple';
            ripple.style.cssText = `
                position: absolute;
                width: 10px;
                height: 10px;
                background: rgba(78, 84, 200, 0.4);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 1s linear;
                top: ${e.offsetY}px;
                left: ${e.offsetX}px;
                pointer-events: none;
            `;
            
            card.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 1000);
        });
    });
    
    // Add ripple effect keyframe
    const rippleStyle = document.createElement('style');
    rippleStyle.textContent = `
        @keyframes ripple {
            from {
                transform: scale(0);
                opacity: 1;
            }
            to {
                transform: scale(40);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(rippleStyle);
    
    // Add 3D tilt effect to project cards
    projectCards.forEach(card => {
        card.addEventListener('mousemove', function(e) {
            const width = this.offsetWidth;
            const height = this.offsetHeight;
            const xVal = e.offsetX;
            const yVal = e.offsetY;
            
            const xRotation = 20 * ((yVal - height / 2) / height);
            const yRotation = -20 * ((xVal - width / 2) / width);
            
            const transform = `perspective(500px) scale(1.05) rotateX(${xRotation}deg) rotateY(${yRotation}deg)`;
            
            this.style.transform = transform;
        });
        
        card.addEventListener('mouseout', function() {
            this.style.transform = 'perspective(500px) scale(1) rotateX(0) rotateY(0)';
        });
    });
});