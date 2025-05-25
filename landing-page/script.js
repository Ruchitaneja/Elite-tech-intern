// Handle active state for navigation links
document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('.nav-links a');
    
    // Update active state on click
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            navLinks.forEach(a => a.classList.remove('active'));
            link.classList.add('active');
        });
    });

    // Update active state on scroll
    window.addEventListener('scroll', () => {
        const sections = document.querySelectorAll('section[id]');
        const scrollY = window.pageYOffset;

        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute('id');
            const navLink = document.querySelector(`.nav-links a[href="#${sectionId}"]`);

            if (navLink && scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLinks.forEach(a => a.classList.remove('active'));
                navLink.classList.add('active');
            }
        });
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const target = document.querySelector(targetId);
        const navbarHeight = document.querySelector('.navbar').offsetHeight;
        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navbarHeight;

        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    });
});

// Mobile menu functionality
document.addEventListener('DOMContentLoaded', () => {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const overlay = document.querySelector('.mobile-menu-overlay');
    const body = document.body;

    function toggleMenu(show) {
        mobileMenuToggle.classList.toggle('active', show);
        navLinks.classList.toggle('active', show);
        overlay.classList.toggle('active', show);
        body.style.overflow = show ? 'hidden' : '';
    }

    if (mobileMenuToggle && navLinks) {
        // Toggle menu when clicking the hamburger button
        mobileMenuToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            const isActive = navLinks.classList.contains('active');
            toggleMenu(!isActive);
        });

        // Close menu when clicking a link
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', (e) => {
                toggleMenu(false);
            });
        });

        // Close menu when clicking overlay
        overlay.addEventListener('click', () => {
            toggleMenu(false);
        });
    }
});

// Add hover effect to navigation
document.querySelector('.nav-links').addEventListener('mouseenter', function() {
    this.style.transform = 'translateY(-2px)';
});
document.querySelector('.nav-links').addEventListener('mouseleave', function() {
    this.style.transform = 'translateY(0)';
});
