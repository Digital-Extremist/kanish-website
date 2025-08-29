// Initialize EmailJS (simulation for this demo)
console.log('SparesConnect application initialized');

// DOM Elements
const navLinks = document.querySelectorAll('.nav-link');
const pages = document.querySelectorAll('.page');
const mechanicCTA = document.getElementById('mechanicCTA');
const supplierCTA = document.getElementById('supplierCTA');
const jobButtons = document.querySelectorAll('.job-button');
const modals = document.querySelectorAll('.modal');
const closeButtons = document.querySelectorAll('.close');
const faqItems = document.querySelectorAll('.faq-item');

// Navigation functionality - Fixed version
function showPage(targetId) {
    console.log('Showing page:', targetId);
    
    // Hide all pages
    pages.forEach(page => {
        page.classList.remove('active');
        page.style.display = 'none';
    });
    
    // Show target page
    const targetPage = document.getElementById(targetId);
    if (targetPage) {
        targetPage.style.display = 'block';
        targetPage.classList.add('active');
        
        // Smooth scroll to top
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
        
        // Update URL hash
        window.history.pushState(null, null, `#${targetId}`);
        
        // Keep nav in sync
        setActiveNavById(targetId);
    } else {
        console.error('Page not found:', targetId);
    }
}

// Initialize navigation
function initNavigation() {
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            showPage(targetId);
            
            // Update active nav link persistently
            navLinks.forEach(nav => nav.classList.remove('active'));
            link.classList.add('active');
        });
    });

    // Set initial active based on URL hash
    const initialId = window.location.hash.substring(1) || 'home';
    setActiveNavById(initialId);
}

function setActiveNavById(sectionId) {
    navLinks.forEach(nav => {
        const hrefId = nav.getAttribute('href').substring(1);
        if (hrefId === sectionId) {
            nav.classList.add('active');
        } else {
            nav.classList.remove('active');
        }
    });
}

// Modal functionality - Fixed version
function openModal(modalId) {
    console.log('Opening modal:', modalId);
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    } else {
        console.error('Modal not found:', modalId);
    }
}

function closeModal(modal) {
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
        
        // Reset form if exists
        const form = modal.querySelector('form');
        if (form) {
            form.reset();
        }
    }
}

// Initialize modal functionality
function initModals() {
    // Close button event listeners
    closeButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const modal = e.target.closest('.modal');
            closeModal(modal);
        });
    });

    // Close modal when clicking outside
    modals.forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal(modal);
            }
        });
    });

    // Mechanic CTA button
    if (mechanicCTA) {
        mechanicCTA.addEventListener('click', () => {
            openModal('mechanicModal');
        });
    }

    // Supplier CTA button
    if (supplierCTA) {
        supplierCTA.addEventListener('click', () => {
            openModal('supplierModal');
        });
    }

    // Job application buttons
    jobButtons.forEach(button => {
        button.addEventListener('click', () => {
            const jobTitle = button.getAttribute('data-job');
            document.getElementById('jobTitle').textContent = `Apply for ${jobTitle}`;
            document.getElementById('jobPosition').value = jobTitle;
            openModal('careerModal');
        });
    });
}

// Form submission functionality
function submitForm(formData, formType) {
    console.log('Submitting form:', formType, formData);
    
    // Get the submit button from the current active form
    const activeModal = document.querySelector('.modal[style*="block"]');
    const submitButton = activeModal ? activeModal.querySelector('button[type="submit"]') : null;
    
    if (submitButton) {
        const originalText = submitButton.textContent;
        submitButton.textContent = 'Sending...';
        submitButton.disabled = true;
        
        // Simulate email sending with timeout
        setTimeout(() => {
            console.log('Form submitted successfully:', formType);
            
            // Reset button
            submitButton.textContent = originalText;
            submitButton.disabled = false;
            
            // Close current modal
            closeModal(activeModal);
            
            // Show thank you modal
            openModal('thankYouModal');
        }, 1500);
    }
}

// Initialize form handlers
function initForms() {
    // Mechanic form submission
    const mechanicForm = document.getElementById('mechanicForm');
    if (mechanicForm) {
        mechanicForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const formData = {
                name: mechanicForm.name.value,
                mobile: mechanicForm.mobile.value,
                workshop: mechanicForm.workshop.value,
                city: mechanicForm.city.value,
                state: mechanicForm.state.value,
                pincode: mechanicForm.pincode.value
            };
            
            if (validateMechanicForm(formData)) {
                submitForm(formData, 'Mechanic Registration');
            }
        });
    }

    // Supplier form submission
    const supplierForm = document.getElementById('supplierForm');
    if (supplierForm) {
        supplierForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const formData = {
                name: supplierForm.name.value,
                mobile: supplierForm.mobile.value,
                shop: supplierForm.shop.value,
                city: supplierForm.city.value,
                state: supplierForm.state.value,
                pincode: supplierForm.pincode.value
            };
            
            if (validateSupplierForm(formData)) {
                submitForm(formData, 'Supplier Registration');
            }
        });
    }

    // Career form submission
    const careerForm = document.getElementById('careerForm');
    if (careerForm) {
        careerForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const formData = {
                position: careerForm.position.value,
                name: careerForm.name.value,
                mobile: careerForm.mobile.value,
                city: careerForm.city.value,
                state: careerForm.state.value,
                resume: careerForm.resume.value
            };
            
            if (validateCareerForm(formData)) {
                submitForm(formData, 'Job Application');
            }
        });
    }
}

// Form validation functions
function validateMechanicForm(data) {
    if (!data.name.trim()) {
        alert('Please enter your name');
        return false;
    }
    
    if (!data.mobile.trim() || !isValidMobile(data.mobile)) {
        alert('Please enter a valid mobile number');
        return false;
    }
    
    if (!data.workshop.trim()) {
        alert('Please enter workshop name');
        return false;
    }
    
    if (!data.city.trim()) {
        alert('Please enter city');
        return false;
    }
    
    if (!data.state.trim()) {
        alert('Please enter state');
        return false;
    }
    
    if (!data.pincode.trim() || !isValidPincode(data.pincode)) {
        alert('Please enter a valid pincode');
        return false;
    }
    
    return true;
}

function validateSupplierForm(data) {
    if (!data.name.trim()) {
        alert('Please enter your name');
        return false;
    }
    
    if (!data.mobile.trim() || !isValidMobile(data.mobile)) {
        alert('Please enter a valid mobile number');
        return false;
    }
    
    if (!data.shop.trim()) {
        alert('Please enter shop name');
        return false;
    }
    
    if (!data.city.trim()) {
        alert('Please enter city');
        return false;
    }
    
    if (!data.state.trim()) {
        alert('Please enter state');
        return false;
    }
    
    if (!data.pincode.trim() || !isValidPincode(data.pincode)) {
        alert('Please enter a valid pincode');
        return false;
    }
    
    return true;
}

function validateCareerForm(data) {
    if (!data.name.trim()) {
        alert('Please enter your name');
        return false;
    }
    
    if (!data.mobile.trim() || !isValidMobile(data.mobile)) {
        alert('Please enter a valid mobile number');
        return false;
    }
    
    if (!data.city.trim()) {
        alert('Please enter city');
        return false;
    }
    
    if (!data.state.trim()) {
        alert('Please enter state');
        return false;
    }
    
    if (!data.resume.trim() || !isValidURL(data.resume)) {
        alert('Please enter a valid resume link');
        return false;
    }
    
    return true;
}

// Utility validation functions
function isValidMobile(mobile) {
    const mobileRegex = /^[6-9]\d{9}$/;
    return mobileRegex.test(mobile.replace(/\D/g, ''));
}

function isValidPincode(pincode) {
    const pincodeRegex = /^[1-9][0-9]{5}$/;
    return pincodeRegex.test(pincode);
}

function isValidURL(url) {
    try {
        new URL(url);
        return url.includes('drive.google.com') || url.includes('docs.google.com');
    } catch {
        return false;
    }
}

// FAQ functionality
function initFAQ() {
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        if (!question) return;

        // Ensure answers start hidden
        item.classList.remove('active');

        question.addEventListener('click', () => {
            const wasActive = item.classList.contains('active');

            // Close all items in the same section
            const section = item.closest('.faq-section');
            const sectionItems = section ? section.querySelectorAll('.faq-item') : [];
            sectionItems.forEach(faqItem => faqItem.classList.remove('active'));

            // Toggle the clicked one
            if (!wasActive) item.classList.add('active');
        });
    });
}

// Advanced Animation System
function initAdvancedAnimations() {
    // Re-enable particle system for Home
    initParticleSystem();
    
    // Initialize scroll-triggered animations
    initScrollTriggeredAnimations();
    
    // Initialize loading states
    initLoadingStates();
    
    // Initialize micro-interactions
    initMicroInteractions();
}

// Particle System
function initParticleSystem() {
    const particlesContainer = document.getElementById('particles');
    if (!particlesContainer) return;
    particlesContainer.innerHTML = '';

    const particleCount = 60;
    const icons = [
  'fa-wrench',
  'fa-screwdriver-wrench',
  'fa-gears',
  'fa-car',
  'fa-truck-fast',
  'fa-gas-pump',
  'fa-battery-full',
  'fa-oil-can',
  'fa-motorcycle',
  'fa-hammer',
  'fa-toolbox',
  'fa-screwdriver',
  'fa-helmet-safety',
  'fa-car-battery',
  'fa-plug',
  'fa-bolt',
  'fa-fan',
  'fa-industry'
  
];

    const colors = [
        'rgba(10, 127, 122, 0.38)',
        'rgba(10, 127, 122, 0.28)',
        'rgba(245, 158, 11, 0.30)'
    ];

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('i');
        const icon = icons[Math.floor(Math.random() * icons.length)];
        particle.className = `fas ${icon} particle`;

        const size = Math.floor(Math.random() * 16 + 12);
        particle.style.fontSize = size + 'px';
        particle.style.color = colors[Math.floor(Math.random() * colors.length)];
        particle.style.top = '100%';
        particle.style.left = Math.random() * 100 + '%';
        const duration = Math.random() * 10 + 10;
        particle.style.animationDuration = duration + 's';
        particle.style.animationDelay = (-Math.random() * duration) + 's';
        if (Math.random() > 0.6) particle.classList.add('rotate-slow');
        particlesContainer.appendChild(particle);
    }
}

// Scroll-triggered animations
function initScrollTriggeredAnimations() {
    const scrollElements = document.querySelectorAll('.scroll-animate');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    scrollElements.forEach(element => {
        observer.observe(element);
    });
}

// Loading states
function initLoadingStates() {
    // Add loading skeleton to elements that might load content
    const loadingElements = document.querySelectorAll('.feature-card, .advantage-item');
    
    loadingElements.forEach(element => {
        element.classList.add('loading-skeleton');
        
        // Remove loading state after animation
        setTimeout(() => {
            element.classList.remove('loading-skeleton');
        }, 1500);
    });
}

// Micro-interactions
function initMicroInteractions() {
    // Add hover effects to interactive elements
    const interactiveElements = document.querySelectorAll('.nav-link, .cta-button, .job-button');
    
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            element.style.transform = 'scale(1.05)';
        });
        
        element.addEventListener('mouseleave', () => {
            element.style.transform = 'scale(1)';
        });
    });
    
    // Add click animations
    const clickableElements = document.querySelectorAll('.cta-button, .job-button, .nav-link');
    
    clickableElements.forEach(element => {
        element.addEventListener('click', () => {
            element.classList.add('shake');
            setTimeout(() => {
                element.classList.remove('shake');
            }, 500);
        });
    });
    
    // Floating Action Button
    const fab = document.getElementById('fab');
    if (fab) {
        fab.addEventListener('click', () => {
            // Scroll to top with smooth animation
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
            
            // Add bounce animation
            fab.classList.add('bounce');
            setTimeout(() => {
                fab.classList.remove('bounce');
            }, 1000);
        });
        
        // Show/hide FAB based on scroll position
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                fab.style.opacity = '1';
                fab.style.transform = 'scale(1)';
            } else {
                fab.style.opacity = '0';
                fab.style.transform = 'scale(0)';
            }
        });
        
        // Initially hide FAB
        fab.style.opacity = '0';
        fab.style.transform = 'scale(0)';
    }
}

// Enhanced scroll animations
function initScrollAnimations() {
    const elements = document.querySelectorAll('.feature-card, .process-step, .advantage-item, .how-step');
    
    elements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'all 0.6s ease';
    });
}

function animateOnScroll() {
    const elements = document.querySelectorAll('.feature-card, .process-step, .advantage-item, .how-step');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
}

// Counter animation for statistics
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    counters.forEach(counter => {
        if (counter.dataset.animated) return;
        
        const originalText = counter.textContent.trim();
        // Animate only if the text is a pure number or number with a trailing '+' or '%'
        const isAnimatable = /^\d+(?:[+%])?$/.test(originalText);
        if (!isAnimatable) {
            // Do not animate values like 24/7 – keep as-is
            counter.dataset.animated = 'true';
            counter.textContent = originalText;
            return;
        }
        
        const numericMatch = originalText.match(/\d+/);
        if (!numericMatch) return;
        const numericTarget = parseInt(numericMatch[0], 10);
        const suffix = originalText.slice(numericMatch[0].length);
        
        counter.dataset.animated = 'true';
        let current = 0;
        const steps = 50;
        const increment = Math.max(1, Math.floor(numericTarget / steps));
        const timer = setInterval(() => {
            current += increment;
            if (current >= numericTarget) {
                counter.textContent = numericTarget + suffix;
                clearInterval(timer);
            } else {
                counter.textContent = Math.floor(current) + suffix;
            }
        }, 30);
    });
}

// Mobile menu functionality
function initMobileMenu() {
    const navContainer = document.querySelector('.nav-container');
    const navMenu = document.querySelector('.nav-menu');
    
    // Create mobile menu toggle button
    const mobileToggle = document.createElement('div');
    mobileToggle.classList.add('mobile-toggle');
    mobileToggle.innerHTML = '☰';
    mobileToggle.style.cssText = `
        display: none;
        font-size: 1.5rem;
        cursor: pointer;
        color: #008080;
    `;
    
    // Add mobile styles
    const style = document.createElement('style');
    style.textContent = `
        @media (max-width: 768px) {
            .mobile-toggle { display: block !important; }
            .nav-menu { 
                display: none !important;
                flex-direction: column;
                position: absolute;
                top: 100%;
                left: 0;
                width: 100%;
                background: #ffffff;
                box-shadow: 0 2px 10px rgba(0,0,0,0.1);
                z-index: 1000;
            }
            .nav-menu.active { display: flex !important; }
        }
    `;
    document.head.appendChild(style);
    
    navContainer.appendChild(mobileToggle);
    
    // Toggle mobile menu
    mobileToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });
    
    // Close mobile menu when link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
        });
    });
}

// Handle browser back/forward buttons
window.addEventListener('popstate', () => {
    const currentHash = window.location.hash.substring(1) || 'home';
    showPage(currentHash);
    setActiveNavById(currentHash);
});

// Keyboard navigation for accessibility
document.addEventListener('keydown', (e) => {
    // Close modal with Escape key
    if (e.key === 'Escape') {
        const openModal = document.querySelector('.modal[style*="block"]');
        if (openModal) {
            closeModal(openModal);
        }
    }
});

// Initialize application
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM Content Loaded - Initializing application');
    
    // Initialize all functionality
    initNavigation();
    initModals();
    initForms();
    initFAQ();
    initMobileMenu();
    initScrollAnimations();
    initAdvancedAnimations();
    
    // Show home page by default
    showPage('home');
    
    // Add scroll event listener for animations
    window.addEventListener('scroll', animateOnScroll);
    
    // Animate counters when stats section is visible
    const statsSection = document.querySelector('.stats-section');
    if (statsSection) {
        const statsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounters();
                    statsObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        statsObserver.observe(statsSection);
    }
    
    console.log('Application initialized successfully');
});

// Error handling
window.addEventListener('error', (e) => {
    console.error('Application error:', e.error);
});

// Performance monitoring
if ('performance' in window) {
    window.addEventListener('load', () => {
        const perfData = performance.timing;
        const loadTime = perfData.loadEventEnd - perfData.navigationStart;
        console.log(`Page load time: ${loadTime}ms`);
    });
}