
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

        function registerForCourse(title, duration) {
            const courseSelect = document.getElementById('courseTitle');
            courseSelect.value = title;
            document.getElementById('registrationModal').style.display = 'flex';
        }

        function openRegistrationModal() {
            document.getElementById('courseTitle').selectedIndex = 0;
            document.getElementById('registrationModal').style.display = 'flex';
        }

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
                        const headerHeight = document.querySelector('header').offsetHeight;
                        const targetPosition = target.offsetTop - headerHeight - 20;
                        
                        window.scrollTo({
                            top: targetPosition,
                            behavior: 'smooth'
                        });
                        
                        const navLinks = document.querySelector('.nav-links');
                        const mobileMenu = document.querySelector('.mobile-menu');
                        if (navLinks.classList.contains('active')) {
                            navLinks.classList.remove('active');
                            mobileMenu.classList.remove('active');
                            document.body.style.overflow = '';
                        }
                    }
                });
            });
        }

        // Header scroll effect
        function initScrollEffects() {
            const header = document.querySelector('header');
            let lastScrollTop = 0;
            
            window.addEventListener('scroll', () => {
                const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
                
                if (window.innerWidth <= 768) {
                    if (scrollTop > lastScrollTop && scrollTop > 100) {
                        header.style.transform = 'translateY(-100%)';
                    } else {
                        header.style.transform = 'translateY(0)';
                    }
                } else {
                    header.style.transform = 'translateY(0)';
                }
                
                if (scrollTop > 100) {
                    header.classList.add('scrolled');
                } else {
                    header.classList.remove('scrolled');
                }
                
                lastScrollTop = scrollTop;
            });
        }

        // Counter Animation
        function animateCounter(element, target, duration = 2000, suffix = '') {
            let start = 0;
            const increment = target / (duration / 16);
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

        function initCounterAnimation() {
            const statNumbers = document.querySelectorAll('.stat-number');
            const stats = [
                { target: 40, suffix: '+' },
                { target: 18, suffix: '' },
                { target: 100, suffix: '%' }
            ];
            
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        statNumbers.forEach((element, index) => {
                            if (stats[index]) {
                                element.textContent = '0' + stats[index].suffix;
                                setTimeout(() => {
                                    animateCounter(element, stats[index].target, 2000, stats[index].suffix);
                                }, index * 200);
                            }
                        });
                        observer.unobserve(entry.target);
                    }
                });
            }, {
                threshold: 0.5
            });
            
            const statsSection = document.querySelector('.stats');
            if (statsSection) {
                observer.observe(statsSection);
            }
        }

        // Registration form validation and submission
const registrationForm = document.getElementById('registrationForm');
const registrationStatus = document.getElementById('registration-form-status');

const registrationFields = registrationForm.querySelectorAll('input, select');
registrationFields.forEach(field => {
    field.addEventListener('blur', () => validateField(field));
    field.addEventListener('input', () => {
        if (field.classList.contains('invalid')) {
            validateField(field);
        }
    });
});

registrationForm.addEventListener('submit', async function(e) {
    e.preventDefault();
    
    let isFormValid = true;
    registrationFields.forEach(field => {
        if (!validateField(field)) {
            isFormValid = false;
        }
    });

    if (!isFormValid) {
        registrationStatus.className = 'form-status error';
        registrationStatus.textContent = 'Please correct the errors above before submitting.';
        return;
    }

    const submitButton = this.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    submitButton.textContent = 'Submitting...';
    submitButton.disabled = true;
    
    registrationStatus.className = 'form-status loading';
    registrationStatus.textContent = 'Submitting your registration...';

    try {
        const formData = new FormData(this);
        formData.append('_subject', 'New Course Registration');
        
        const response = await fetch(this.action, {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        });

        if (response.ok) {
            registrationStatus.className = 'form-status success';
            registrationStatus.textContent = 'Registration submitted successfully! We will contact you with further details.';
            this.reset();
            registrationFields.forEach(field => {
                field.classList.remove('valid', 'invalid');
            });
            
            setTimeout(() => {
                closeModal();
            }, 2000);
        } else {
            throw new Error('Registration submission failed');
        }
    } catch (error) {
        registrationStatus.className = 'form-status error';
        registrationStatus.textContent = 'Sorry, there was an error submitting your registration. Please try again.';
    } finally {
        submitButton.textContent = originalText;
        submitButton.disabled = false;
    }
});

        // Form validation functions
        function validateEmail(email) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailRegex.test(email);
        }

        function validatePhone(phone) {
            if (!phone) return true;
            const phoneRegex = /^[\+]?[0-9\s\-\(\)]{10,}$/;
            return phoneRegex.test(phone);
        }

        function validateField(field, validationFn = null, customMessage = '') {
            const value = field.value.trim();
            const errorElement = document.getElementById(field.id + '-error');
            let isValid = true;
            let message = '';

            if (field.hasAttribute('required') && !value) {
                isValid = false;
                message = 'This field is required';
            } else if (validationFn && value && !validationFn(value)) {
                isValid = false;
                message = customMessage || 'Invalid format';
            } else if (field.type === 'email' && value && !validateEmail(value)) {
                isValid = false;
                message = 'Please enter a valid email address';
            } else if (field.type === 'tel' && value && !validatePhone(value)) {
                isValid = false;
                message = 'Please enter a valid phone number';
            }

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
            const contactForm = document.getElementById('contactForm');
            const formStatus = document.getElementById('form-status');
            
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

            document.getElementById('registrationForm').addEventListener('submit', function(e) {
                e.preventDefault();
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

        if (navLinks.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    });

    // MOVE THIS CODE INSIDE THE FUNCTION (it was outside before)
    const navLinkItems = document.querySelectorAll('.nav-links a:not([onclick*="Registration"])');
    navLinkItems.forEach(link => {
        link.addEventListener('click', function() {
            navLinks.classList.remove('active');
            mobileMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
            
            document.addEventListener('click', function(e) {
                if (!mobileMenu.contains(e.target) && !navLinks.contains(e.target)) {
                    navLinks.classList.remove('active');
                    mobileMenu.classList.remove('active');
                    document.body.style.overflow = '';
                }
            });
            
            window.addEventListener('resize', function() {
                if (window.innerWidth > 768) {
                    navLinks.classList.remove('active');
                    mobileMenu.classList.remove('active');
                    document.body.style.overflow = '';
                }
            });
            
            document.addEventListener('keydown', function(e) {
                if (e.key === 'Escape' && navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    mobileMenu.classList.remove('active');
                    document.body.style.overflow = '';
                }
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

            const cards = document.querySelectorAll('.feature-card, .course-card, .service-card');
            cards.forEach(card => {
                card.style.opacity = '0';
                card.style.transform = 'translateY(30px)';
                card.style.transition = 'all 0.6s ease';
                observer.observe(card);
            });
        }

        // Modal event listeners
       // Modal event listeners - ADD THIS
// Fixed Modal initialization
function initModal() {
    const modal = document.getElementById('registrationModal');
    // FIXED: Changed selector from '.registration-header .close' to just '.close'
    const closeBtn = document.querySelector('.close');

    // Close button click
    if (closeBtn) {
        closeBtn.addEventListener('click', function(e) {
            e.preventDefault();
            closeModal();
        });
    }
    
    // Click outside modal to close
    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeModal();
            }
        });
    }

    // Escape key to close
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal && modal.style.display === 'flex') {
            closeModal();
        }
    });
}

// Make sure closeModal function is properly defined
function closeModal() {
    const modal = document.getElementById('registrationModal');
    if (modal) {
        modal.style.display = 'none';
        // Reset form if needed
        const form = document.getElementById('registrationForm');
        if (form) {
            form.reset();
        }
    }
}

        function initTouchInteractions() {
            if ('ontouchstart' in window) {
                const courseCards = document.querySelectorAll('.course-card');
                courseCards.forEach(card => {
                    card.addEventListener('touchstart', function() {
                        this.style.transform = 'translateY(-5px)';
                    });
                    
                    card.addEventListener('touchend', function() {
                        setTimeout(() => {
                            this.style.transform = '';
                        }, 150);
                    });
                });
                
                const buttons = document.querySelectorAll('.btn');
                buttons.forEach(btn => {
                    btn.addEventListener('touchstart', function() {
                        this.style.transform = 'scale(0.95)';
                    });
                    
                    btn.addEventListener('touchend', function() {
                        setTimeout(() => {
                            this.style.transform = '';
                        }, 150);
                    });
                });
            }
        }

        // Initialize everything when DOM is loaded
        document.addEventListener('DOMContentLoaded', function() {
            initTouchInteractions();
            smoothScroll();
            initScrollEffects();
            initForms();
            initMobileMenu();
            initModal();
            
            setTimeout(() => {
                initAnimations();
                initCounterAnimation();
            }, 500);
        });

        // Loading animation
        window.addEventListener('load', function() {
            document.body.classList.add('loaded');
        });