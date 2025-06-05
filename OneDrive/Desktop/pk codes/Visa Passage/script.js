document.addEventListener('DOMContentLoaded', function() {
    // Theme Toggle
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = themeToggle.querySelector('i');
    const html = document.documentElement;
    
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme') || 'light';
    html.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);

    themeToggle.addEventListener('click', () => {
        const currentTheme = html.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        html.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
    });

    function updateThemeIcon(theme) {
        themeIcon.className = theme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
    }

    // Navbar scroll effect
    const navbar = document.getElementById('navbar');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        lastScroll = currentScroll;
    });

    // Intersection Observer for scroll animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Add animation classes to elements
    document.querySelectorAll('.info-card, .service-card, .reason-card, .section-heading').forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });

    // Mobile menu improvements
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');  
        this.setAttribute('aria-expanded', 
            this.getAttribute('aria-expanded') === 'true' ? 'false' : 'true'
        );
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!event.target.closest('.nav-links') && !event.target.closest('.mobile-menu-btn')) {
            navLinks.classList.remove('active');
            body.classList.remove('menu-open');
            mobileMenuBtn.setAttribute('aria-expanded', 'false');
        }
    });

    // Improved dropdown functionality
    const dropdowns = document.querySelectorAll('.dropdown');
    dropdowns.forEach(dropdown => {
        const link = dropdown.querySelector('a');
        const content = dropdown.querySelector('.dropdown-content');
        
        if (window.innerWidth <= 768) {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                dropdown.classList.toggle('active');
            });
        }
    });

    // Enhanced image carousel
    const carousel = document.querySelector('.image-carousel');
    if (carousel) {
        const images = carousel.querySelectorAll('img');
        const dotsContainer = carousel.querySelector('.carousel-dots');
        let currentImage = 0;
        let autoplayInterval;

        function createDots() {
            images.forEach((_, index) => {
                const dot = document.createElement('div');
                dot.classList.add('carousel-dot');
                dot.setAttribute('aria-label', `Go to slide ${index + 1}`);
                dot.addEventListener('click', () => {
                    clearInterval(autoplayInterval);
                    setActiveImage(index);
                    startAutoplay();
                });
                dotsContainer.appendChild(dot);
            });
        }

        function setActiveImage(index) {
            images[currentImage].classList.remove('active');
            dotsContainer.children[currentImage].classList.remove('active');
            currentImage = index;
            images[currentImage].classList.add('active');
            dotsContainer.children[currentImage].classList.add('active');
        }

        function startAutoplay() {
            autoplayInterval = setInterval(() => {
                setActiveImage((currentImage + 1) % images.length);
            }, 5000);
        }

        createDots();
        startAutoplay();

        // Pause autoplay on hover
        carousel.addEventListener('mouseenter', () => clearInterval(autoplayInterval));
        carousel.addEventListener('mouseleave', startAutoplay);
    }

    // Smooth scroll with improved behavior
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Close mobile menu if open
                navLinks.classList.remove('active');
                body.classList.remove('menu-open');
                
                const headerOffset = 100;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Enhanced card hover effects
    const cards = document.querySelectorAll('.service-card, .reason-card');
    cards.forEach(card => {
        const content = card.querySelector('.card-content');
        const overlay = card.querySelector('.card-overlay');

        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px)';
            if (content) content.style.opacity = '0';
            if (overlay) overlay.style.opacity = '1';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = '';
            if (content) content.style.opacity = '1';
            if (overlay) overlay.style.opacity = '0';
        });
    });

    // Form validation and submission
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            // Basic form validation
            const requiredFields = form.querySelectorAll('[required]');
            let isValid = true;
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.classList.add('error');
                } else {
                    field.classList.remove('error');
                }
            });

            if (!isValid) {
                alert('Please fill in all required fields');
                return;
            }

            // Show loading state
            const submitButton = form.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;
            submitButton.disabled = true;
            submitButton.textContent = 'Sending...';
            submitButton.classList.add('loading');

            try {
                // Simulate form submission (replace with actual API call)
                await new Promise(resolve => setTimeout(resolve, 1000));
                
                form.reset();
                alert('Thank you for your message! We will get back to you soon.');
            } catch (error) {
                alert('Sorry, there was an error sending your message. Please try again.');
            } finally {
                submitButton.disabled = false;
                submitButton.textContent = originalText;
                submitButton.classList.remove('loading');
            }
        });
    });

    // Popup improvements
    const openPopup = document.getElementById('open-popup');
    const closePopup = document.getElementById('close-popup');
    const popup = document.getElementById('contact-popup');

    if (openPopup && closePopup && popup) {
        openPopup.addEventListener('click', () => {
            popup.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        });

        const closePopupHandler = () => {
            popup.style.display = 'none';
            document.body.style.overflow = '';
        };

        closePopup.addEventListener('click', closePopupHandler);
        
        window.addEventListener('click', (e) => {
            if (e.target === popup) {
                closePopupHandler();
            }
        });

        // Close popup on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && popup.style.display === 'flex') {
                closePopupHandler();
            }
        });
    }

    // Country flags hover effect
    const countryFlags = document.querySelectorAll('.country-flags img');

    countryFlags.forEach(flag => {
        const countryName = document.createElement('span');
        countryName.className = 'country-name';
        countryName.textContent = flag.alt;
        flag.parentNode.insertBefore(countryName, flag.nextSibling);

        flag.addEventListener('mouseenter', () => {
            flag.style.opacity = '0.8';
            countryName.style.opacity = '1';
        });

        flag.addEventListener('mouseleave', () => {
            flag.style.opacity = '1';
            countryName.style.opacity = '0';
        });
    });

    // Testimonial carousel
    const testimonialCarousel = document.querySelector('.testimonial-carousel');
    if (testimonialCarousel) {
        let testimonialIndex = 0;
        const testimonials = testimonialCarousel.querySelectorAll('.testimonial');

        function showNextTestimonial() {
            testimonialIndex = (testimonialIndex + 1) % testimonials.length;
            testimonialCarousel.scrollTo({
                left: testimonials[testimonialIndex].offsetLeft,
                behavior: 'smooth'
            });
        }

        setInterval(showNextTestimonial, 5000);
    }

    const footerLinks = document.querySelectorAll('.footer-column a');
    footerLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.color = '#fff';
        });
        link.addEventListener('mouseleave', function() {
            this.style.color = '#ccc';
        });
    });

    
    const socialIcons = document.querySelectorAll('.social-icons a');
    socialIcons.forEach(icon => {
        icon.addEventListener('mouseenter', function() {
            this.style.color = '#fff';
        });
        icon.addEventListener('mouseleave', function() {
            this.style.color = '#ccc';
        });
    });
});

