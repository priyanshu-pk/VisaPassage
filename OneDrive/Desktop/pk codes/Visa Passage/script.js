document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    mobileMenuBtn.addEventListener('click', function() {
        navLinks.classList.toggle('active');
        document.body.classList.toggle('menu-open');
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!event.target.closest('.nav-links') && !event.target.closest('.mobile-menu-btn')) {
            navLinks.classList.remove('active');
            document.body.classList.remove('menu-open');
        }
    });

    // Toggle dropdowns in mobile view
    const dropdowns = document.querySelectorAll('.dropdown');
    dropdowns.forEach(dropdown => {
        dropdown.addEventListener('click', function(e) {
            if (window.innerWidth <= 768) {
                e.preventDefault();
                this.classList.toggle('active');
            }
        });
    });

    // Image carousel
    const carousel = document.querySelector('.image-carousel');
    if (carousel) {
        const images = carousel.querySelectorAll('img');
        const dotsContainer = carousel.querySelector('.carousel-dots');
        let currentImage = 0;

        // Create carousel dots
        images.forEach((_, index) => {
            const dot = document.createElement('div');
            dot.classList.add('carousel-dot');
            dot.addEventListener('click', () => setActiveImage(index));
            dotsContainer.appendChild(dot);
        });

        const dots = dotsContainer.querySelectorAll('.carousel-dot');

        function setActiveImage(index) {
            images[currentImage].classList.remove('active');
            dots[currentImage].classList.remove('active');
            currentImage = index;
            images[currentImage].classList.add('active');
            dots[currentImage].classList.add('active');
        }

        function changeImage() {
            setActiveImage((currentImage + 1) % images.length);
        }

        setInterval(changeImage, 5000);
        setActiveImage(0);
    }

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Service and Reason cards hover effect
    const cards = document.querySelectorAll('.service-card, .reason-card');
    cards.forEach(card => {
        const cardContent = card.querySelector('.card-content');
        const cardOverlay = card.querySelector('.card-overlay');

        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            cardContent.style.opacity = '0';
            cardOverlay.style.opacity = '1';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = '';
            cardContent.style.opacity = '1';
            cardOverlay.style.opacity = '0';
        });
    });

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

    // Contact form submission
    // const contactForm = document.getElementById('contact-form');
    // if (contactForm) {
    //     contactForm.addEventListener('submit', function(e) {
    //         e.preventDefault();
            
    //         const formData = new FormData(contactForm);
    //         const formObject = Object.fromEntries(formData);

    //         // Here you would typically send the form data to your server
    //         console.log('Form submitted:', formObject);

    //         // Clear form fields after submission
    //         contactForm.reset();

    //         alert('Thank you for contacting us! We will get back to you soon.');
    //     });
    // }

    // Popup functionality
    const openPopup = document.getElementById('open-popup');
    const closePopup = document.getElementById('close-popup');
    const popup = document.getElementById('contact-popup');

    if (openPopup && closePopup && popup) {
        openPopup.addEventListener('click', () => {
            popup.style.display = 'block';
        });

        closePopup.addEventListener('click', () => {
            popup.style.display = 'none';
        });

        window.addEventListener('click', (e) => {
            if (e.target === popup) {
                popup.style.display = 'none';
            }
        });
    }

    // Footer links hover effect
    const footerLinks = document.querySelectorAll('.footer-column a');
    footerLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.color = '#fff';
        });
        link.addEventListener('mouseleave', function() {
            this.style.color = '#ccc';
        });
    });

    // Social icons hover effect
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

