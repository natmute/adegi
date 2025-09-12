// Courses data
const courses = [
    { title: "Accounting, Auditing and Finance", duration: "12 Weeks", description: "Comprehensive accounting principles, auditing standards, and financial management for modern business environments." },
    { title: "Administration, Secretarial and Customer Service", duration: "9 Weeks", description: "Essential administrative skills, customer service excellence, and secretarial best practices." },
    { title: "Banking, Insurance and Financial Risk Management", duration: "9 Weeks", description: "Understanding banking operations, insurance principles, and financial risk assessment and management." },
    { title: "Career Development", duration: "12 Weeks", description: "Strategic career planning, professional development, and leadership skills for career advancement." },
    { title: "Environmental, Urban and Regional Planning", duration: "12 Weeks", description: "Sustainable development practices, urban planning principles, and environmental management strategies." },
    { title: "Event, Travel and Tourism Management", duration: "12 Weeks", description: "Comprehensive event planning, tourism industry insights, and hospitality management skills." },
    { title: "Executive Leadership and Management of Organisations", duration: "12 Weeks", description: "Advanced leadership strategies, organizational management, and executive decision-making skills." },
    { title: "Human Resource Management", duration: "12 Weeks", description: "Strategic HR practices, talent management, employee relations, and organizational development." },
    { title: "ICT and Security Management", duration: "12 Weeks", description: "Information technology management, cybersecurity principles, and digital infrastructure security." },
    { title: "Land, Agriculture and Food Sciences", duration: "12 Weeks", description: "Agricultural best practices, food science principles, and sustainable land management techniques." },
    { title: "NGO Management and Policy Development", duration: "12 Weeks", description: "Non-profit organization management, policy development, and community development strategies." },
    { title: "Oil and Gas Energy", duration: "12 Weeks", description: "Energy sector management, oil and gas operations, and sustainable energy practices." },
    { title: "Procurement and Supply Chain Management", duration: "12 Weeks", description: "Strategic procurement processes, supply chain optimization, and vendor management." },
    { title: "Project Management", duration: "12 Weeks", description: "Professional project management methodologies, planning, execution, and delivery excellence." },
    { title: "Rule of Law, Democracy & Human Rights", duration: "12 Weeks", description: "Legal frameworks, democratic principles, and human rights advocacy and protection." },
    { title: "Safety, Health and Environment (SHE)", duration: "12 Weeks", description: "Workplace safety standards, health management, and environmental compliance." },
    { title: "Sales, Marketing and Public Relations", duration: "12 Weeks", description: "Strategic marketing, sales excellence, and public relations management." },
    { title: "Supervisors and Managers", duration: "12 Weeks", description: "Leadership development, team management, and supervisory skills for effective management." }
];

/*
// Populate courses
function populateCourses() {
    const coursesGrid = document.getElementById('coursesGrid');
    courses.forEach(course => {
        const courseCard = document.createElement('div');
        courseCard.className = 'course-card';
        courseCard.innerHTML = `
            <div class="course-header">
                <h3>${course.title}</h3>
                <div class="course-duration">${course.duration}</div>
            </div>
            <div class="course-body">
                <p class="course-description">${course.description}</p>
                <button class="btn btn-primary" onclick="registerForCourse('${course.title}', '${course.duration}')">Register</button>
            </div>
        `;
        coursesGrid.appendChild(courseCard);
    });
}
*/
function registerForCourse(title, duration) {
    // Set the dropdown to the selected course
    const courseSelect = document.getElementById('courseTitle');
    courseSelect.value = title;
    document.getElementById('registrationModal').style.display = 'flex';
}

// New function for opening modal from navigation
function openRegistrationModal() {
    // Clear any pre-selected course
    document.getElementById('courseTitle').selectedIndex = 0;
    document.getElementById('registrationModal').style.display = 'flex';
}

// Close modal
function closeModal() {
    document.getElementById('registrationModal').style.display = 'none';
}

// Smooth scrolling for navigation links
function smoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
        link.addEventListener('click', function(e) {
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

// Header scroll effect
function initScrollEffects() {
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            header.style.background = 'rgba(255, 255, 255, 0.98)';
        } else {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
        }
    });
}

// Counter Animation for About Section Stats
function animateCounter(element, target, duration = 2000, suffix = '') {
    let start = 0;
    const increment = target / (duration / 16); // 60fps
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target + suffix;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(start) + suffix;
        }
    }, 16);
}

// Intersection Observer for triggering animations when section comes into view
function initCounterAnimation() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    // Define your target numbers and suffixes
    const stats = [
        { target: 40, suffix: '+' },    // Years Experience
        { target: 18, suffix: '' },   // Course categories  
        { target: 100, suffix: '%' }    // black ownership
    ];
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Start all counter animations
                statNumbers.forEach((element, index) => {
                    if (stats[index]) {
                        // Reset to 0 first
                        element.textContent = '0' + stats[index].suffix;
                        // Start animation with a slight delay for each counter
                        setTimeout(() => {
                            animateCounter(element, stats[index].target, 2000, stats[index].suffix);
                        }, index * 200); // 200ms delay between each counter
                    }
                });
                
                // Stop observing after animation starts (prevents re-triggering)
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.5 // Trigger when 50% of the about section is visible
    });
    
    // Start observing the about section
    const statsSection = document.querySelector('.stats');
    if (statsSection) {
        observer.observe(statsSection);
    }
}

// Initialize counter animation when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Wait a bit for other animations to settle
    setTimeout(initCounterAnimation, 500);
});

// Alternative: If you want to trigger on scroll instead of intersection observer
function initCounterOnScroll() {
    let hasAnimated = false;
    
    window.addEventListener('scroll', function() {
        if (hasAnimated) return; // Only animate once
        
        const statsSection = document.querySelector('.stats');
        const aboutTop = statsSection.offsetTop;
        const aboutHeight = statsSection.offsetHeight;
        const scrollTop = window.pageYOffset;
        const windowHeight = window.innerHeight;
        
        // Check if about section is in viewport
        if (scrollTop + windowHeight > aboutTop + 100) {
            hasAnimated = true;
            
            const statNumbers = document.querySelectorAll('.stat-number');
            const stats = [
                { target: 3, suffix: '+' },
                { target: 10, suffix: '+' },
                { target: 15, suffix: '+' }
            ];
            
            statNumbers.forEach((element, index) => {
                if (stats[index]) {
                    element.textContent = '0' + stats[index].suffix;
                    setTimeout(() => {
                        animateCounter(element, stats[index].target, 2000, stats[index].suffix);
                    }, index * 200);
                }
            });
        }
    });
}

// Enhanced counter with easing animation (more smooth)
function animateCounterEased(element, target, duration = 2000, suffix = '') {
    let start = 0;
    const startTime = performance.now();
    
    function easeOutQuart(t) {
        return 1 - (--t) * t * t * t;
    }
    
    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easedProgress = easeOutQuart(progress);
        
        const current = Math.floor(easedProgress * target);
        element.textContent = current + suffix;
        
        if (progress < 1) {
            requestAnimationFrame(update);
        } else {
            element.textContent = target + suffix;
        }
    }
    
    requestAnimationFrame(update);
}

// If you want to use the enhanced version, replace the animateCounter calls with:
// animateCounterEased(element, stats[index].target, 2000, stats[index].suffix);
const stats = [
    { target: 3, suffix: '+' },    // Change to your actual years
    { target: 10, suffix: '+' },   // Change to your project count
    { target: 15, suffix: '+' }    // Change to your tech count
];


/*
// Animate stats on scroll
        const observerOptions = {
            threshold: 0.5,
            rootMargin: '0px 0px -100px 0px'
        };

        const statsObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const statNumbers = entry.target.querySelectorAll('.stat-number');
                    statNumbers.forEach(stat => {
                        const finalValue = stat.textContent.trim();
                        // Extract numeric value and suffix
                        const numericMatch = finalValue.match(/(\d+)/);
                        if (numericMatch) {
                            const targetNumber = parseInt(numericMatch[1]);
                            const prefix = finalValue.substring(0, numericMatch.index);
                            const suffix = finalValue.substring(numericMatch.index + numericMatch[1].length);
                            
                            let currentNumber = 0;
                            stat.textContent = prefix + '0' + suffix;
                        const increment = () => {
                                if (currentNumber < targetNumber) {
                                    currentNumber = Math.min(currentNumber + Math.ceil(targetNumber / 30), targetNumber);
                                    stat.textContent = prefix + currentNumber + suffix;
                                    setTimeout(increment, 60);
                                } else {
                                    stat.textContent = finalValue; // Ensure final value is exactly what was intended
                                }
                            };
                            
                            setTimeout(increment, 200); // Small delay before starting animation
                        }
                    });
                    
                    statsObserver.unobserve(entry.target);
                }
            });
        }, observerOptions);

        const statsSection = document.querySelector('.stats');
        if (statsSection) {
            statsObserver.observe(statsSection);
        }
            */


        
// Form validation functions
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function validatePhone(phone) {
    if (!phone) return true; // Phone is optional
    const phoneRegex = /^[\+]?[0-9\s\-\(\)]{10,}$/;
    return phoneRegex.test(phone);
}

function validateField(field, validationFn = null, customMessage = '') {
    const value = field.value.trim();
    const errorElement = document.getElementById(field.id + '-error');
    let isValid = true;
    let message = '';

    // Check if required field is empty
    if (field.hasAttribute('required') && !value) {
        isValid = false;
        message = 'This field is required';
    }
    // Custom validation
    else if (validationFn && value && !validationFn(value)) {
        isValid = false;
        message = customMessage || 'Invalid format';
    }
    // Special checks for specific fields
    else if (field.type === 'email' && value && !validateEmail(value)) {
        isValid = false;
        message = 'Please enter a valid email address';
    }
    else if (field.type === 'tel' && value && !validatePhone(value)) {
        isValid = false;
        message = 'Please enter a valid phone number';
    }

    // Update UI
    if (isValid) {
        field.classList.remove('invalid');
        field.classList.add('valid');
        errorElement.textContent = '';
    } else {
        field.classList.remove('valid');
        field.classList.add('invalid');
        errorElement.textContent = message;
    }

    return isValid;
}

function initForms() {
    // Contact form
    const contactForm = document.getElementById('contactForm');
    const formStatus = document.getElementById('form-status');
    
    // Real-time validation
    const formFields = contactForm.querySelectorAll('input, textarea');
    formFields.forEach(field => {
        field.addEventListener('blur', () => validateField(field));
        field.addEventListener('input', () => {
            if (field.classList.contains('invalid')) {
                validateField(field);
            }
        });
    });

    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // Validate all fields
        let isFormValid = true;
        formFields.forEach(field => {
            if (!validateField(field)) {
                isFormValid = false;
            }
        });

        if (!isFormValid) {
            formStatus.className = 'form-status error';
            formStatus.textContent = 'Please correct the errors above before submitting.';
            return;
        }

        // Show loading state
        const submitButton = this.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        submitButton.textContent = 'Sending...';
        submitButton.disabled = true;
        
        formStatus.className = 'form-status loading';
        formStatus.textContent = 'Sending your message...';

        try {
            const formData = new FormData(this);
            const response = await fetch(this.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (response.ok) {
                formStatus.className = 'form-status success';
                formStatus.textContent = 'Thank you! Your message has been sent successfully.';
                this.reset();
                // Clear validation classes
                formFields.forEach(field => {
                    field.classList.remove('valid', 'invalid');
                });
            } else {
                throw new Error('Form submission failed');
            }
        } catch (error) {
            formStatus.className = 'form-status error';
            formStatus.textContent = 'Sorry, there was an error sending your message. Please try again.';
        } finally {
            submitButton.textContent = originalText;
            submitButton.disabled = false;
        }
    });

    // Registration form
    document.getElementById('registrationForm').addEventListener('submit', function(e) {
        e.preventDefault();
        const formData = new FormData(this);
        
        // Simulate form submission
        const submitButton = this.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        submitButton.textContent = 'Submitting...';
        submitButton.disabled = true;

        setTimeout(() => {
            alert('Registration submitted successfully! We will contact you with further details.');
            this.reset();
            closeModal();
            submitButton.textContent = originalText;
            submitButton.disabled = false;
        }, 2000);
    });
}

// Mobile menu toggle
function initMobileMenu() {
    const mobileMenu = document.querySelector('.mobile-menu');
    const navLinks = document.querySelector('.nav-links');
    
    mobileMenu.addEventListener('click', function() {
        navLinks.classList.toggle('active');
        this.classList.toggle('active');
    });
}

// Intersection Observer for animations
function initAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe cards
    const cards = document.querySelectorAll('.feature-card, .course-card, .service-card');
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'all 0.6s ease';
        observer.observe(card);
    });
}

// Modal event listeners
function initModal() {
    const modal = document.getElementById('registrationModal');
    const closeBtn = document.querySelector('.close');

    closeBtn.addEventListener('click', closeModal);
    
    window.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });

    // Close modal on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.style.display === 'flex') {
            closeModal();
        }
    });
}

// Parallax effect for hero section
function initParallax() {
    const hero = document.querySelector('.hero');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        if (hero) {
            hero.style.transform = `translateY(${rate}px)`;
        }
    });
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    //populateCourses();
    smoothScroll();
    initScrollEffects();
    initForms();
    initMobileMenu();
    initModal();
    initParallax();
    
    // Delay animations to ensure content is loaded
    setTimeout(() => {
        initAnimations();
    }, 500);
});

// Loading animation
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
});

// Additional mobile menu styles (add to existing CSS)
const additionalStyles = `
    .nav-links.active {
        display: flex !important;
        position: fixed;
        top: 80px;
        left: 0;
        right: 0;
        background: white;
        flex-direction: column;
        padding: 2rem;
        box-shadow: 0 5px 15px rgba(0,0,0,0.1);
        z-index: 999;
    }

    .mobile-menu.active span:nth-child(1) {
        transform: rotate(-45deg) translate(-5px, 6px);
    }

    .mobile-menu.active span:nth-child(2) {
        opacity: 0;
    }

    .mobile-menu.active span:nth-child(3) {
        transform: rotate(45deg) translate(-5px, -6px);
    }

    body.loaded {
        opacity: 1;
    }

    @media (max-width: 768px) {
        .nav-links {
            display: none;
        }
        
        .courses-grid {
            grid-template-columns: 1fr;
            gap: 1rem;
        }
        
        .course-search-section {
            flex-direction: column;
            align-items: stretch;
        }
        
        .search-bar {
            max-width: 100%;
        }
        
        .course-stats {
            justify-content: space-around;
            width: 100%;
        }
        
        .detailed-course-card {
            flex-direction: column;
        }
        
        .detailed-course-card:hover {
            transform: translateY(-5px);
        }
        
        .course-filters {
            justify-content: center;
        }
        
        .filter-btn {
            padding: 0.6rem 1rem;
            font-size: 0.9rem;
        }
        
        .hero h1 {
            font-size: 2.5rem;
        }
        
        .section-title {
            font-size: 2rem;
        }
        
        .course-actions {
            flex-direction: column;
            gap: 0.5rem;
        }
        
        .course-actions .btn {
            width: 100%;
            text-align: center;
        }
    }

    @media (max-width: 480px) {
        .container {
            padding: 0 15px;
        }
        
        .hero h1 {
            font-size: 2rem;
        }
        
        .hero-subtitle {
            font-size: 1rem;
        }
        
        .cta-buttons {
            flex-direction: column;
            gap: 1rem;
        }
        
        .btn {
            width: 100%;
            text-align: center;
        }
        
        .course-filters {
            gap: 0.5rem;
        }
        
        .filter-btn {
            padding: 0.5rem 0.8rem;
            font-size: 0.8rem;
        }
        
        .course-stats {
            flex-direction: column;
            gap: 1rem;
        }
        
        .detailed-course-card {
            margin: 0 -15px;
            border-radius: 0;
        }
        
        .course-content {
            padding: 1.5rem;
        }
        
        .course-title-detailed {
            font-size: 1.2rem;
        }
        
        .course-header-detailed {
            flex-direction: column;
            gap: 1rem;
        }
        
        .course-duration-badge {
            align-self: flex-start;
        }
    }

    /* Course categories color coding */
    .detailed-course-card[data-category="business"] .course-category-badge {
        background: #2563eb;
    }
    
    .detailed-course-card[data-category="finance"] .course-category-badge {
        background: #059669;
    }
    
    .detailed-course-card[data-category="technical"] .course-category-badge {
        background: #dc2626;
    }
    
    .detailed-course-card[data-category="governance"] .course-category-badge {
        background: #7c3aed;
    }
    
    .detailed-course-card[data-category="development"] .course-category-badge {
        background: #ea580c;
    }

    /* Course objectives styling */
    .course-objectives ul {
        padding-left: 1.2rem;
        margin-bottom: 1.5rem;
    }
    
    .course-objectives li {
        margin-bottom: 0.3rem;
        line-height: 1.4;
    }

    /* Enhanced hover effects */
    .course-card {
        position: relative;
        overflow: hidden;
    }
    
    .course-card::before {
        content: '';
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100%;
        background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
        transition: left 0.6s;
    }
    
    .course-card:hover::before {
        left: 100%;
    }

    /* Loading states */
    .course-card,
    .detailed-course-card {
        opacity: 0;
        transform: translateY(20px);
        animation: fadeInUp 0.6s ease forwards;
    }

    .course-card:nth-child(1) { animation-delay: 0.1s; }
    .course-card:nth-child(2) { animation-delay: 0.2s; }
    .course-card:nth-child(3) { animation-delay: 0.3s; }
    .course-card:nth-child(4) { animation-delay: 0.4s; }
    .course-card:nth-child(5) { animation-delay: 0.5s; }
    .course-card:nth-child(6) { animation-delay: 0.6s; }

    /* Search highlighting */
    .search-highlight {
        background: #fef3c7;
        padding: 0.1rem 0.2rem;
        border-radius: 3px;
    }

    /* Filter transition effects */
    .course-card {
        transition: all 0.3s ease;
    }

    .course-card.filtering {
        opacity: 0.5;
        transform: scale(0.95);
    }

    /* Scroll to top button for course sections */
    .scroll-to-top {
        position: fixed;
        bottom: 2rem;
        right: 2rem;
        background: var(--primary-color);
        color: white;
        border: none;
        border-radius: 50%;
        width: 50px;
        height: 50px;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 1000;
    }

    .scroll-to-top.visible {
        opacity: 1;
        visibility: visible;
    }

    .scroll-to-top:hover {
        transform: translateY(-3px);
        box-shadow: 0 5px 15px rgba(37, 99, 235, 0.3);
    }
`;

// Add scroll to top functionality
const scrollToTopBtn = document.createElement('button');
scrollToTopBtn.className = 'scroll-to-top';
scrollToTopBtn.innerHTML = '↑';
scrollToTopBtn.onclick = () => window.scrollTo({ top: 0, behavior: 'smooth' });
document.body.appendChild(scrollToTopBtn);

// Show/hide scroll to top button
window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
        scrollToTopBtn.classList.add('visible');
    } else {
        scrollToTopBtn.classList.remove('visible');
    }
});

