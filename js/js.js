// js/js.js

document.addEventListener('DOMContentLoaded', function() {
    // Set current year in footer
    document.getElementById('current-year').textContent = new Date().getFullYear();
    
    // Mobile menu toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mobileMenu = document.querySelector('.mobile-menu');
    
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            mobileMenu.classList.toggle('active');
            
            // Change icon
            const icon = mobileMenuBtn.querySelector('i');
            if (icon.classList.contains('fa-bars')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }
    
    // Tabs functionality
    const tabBtns = document.querySelectorAll('.tab-btn');
    
    if (tabBtns.length > 0) {
        tabBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                // Remove active class from all buttons and contents
                document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
                document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
                
                // Add active class to clicked button
                this.classList.add('active');
                
                // Show corresponding content
                const tabId = this.getAttribute('data-tab');
                document.getElementById(tabId).classList.add('active');
            });
        });
    }
    
    // Accordion functionality
    const accordionBtns = document.querySelectorAll('.accordion-btn, .faq-btn');
    
    if (accordionBtns.length > 0) {
        accordionBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                this.classList.toggle('active');
                
                // Toggle content visibility
                const content = this.closest('.accordion-item, .faq-item').querySelector('.accordion-content, .faq-answer');
                if (content.style.display === 'block') {
                    content.style.display = 'none';
                } else {
                    content.style.display = 'block';
                }
            });
        });
    }
    
    // Slider functionality (if exists)
    const sliders = document.querySelectorAll('.slider');
    
    if (sliders.length > 0) {
        sliders.forEach(slider => {
            const slides = slider.querySelectorAll('.slide');
            const prevBtn = slider.querySelector('.prev-slide');
            const nextBtn = slider.querySelector('.next-slide');
            let currentSlide = 0;
            
            // Show first slide
            if (slides.length > 0) {
                slides[0].classList.add('active');
            }
            
            // Function to show slide
            function showSlide(n) {
                // Hide all slides
                slides.forEach(slide => slide.classList.remove('active'));
                
                // Reset index if out of bounds
                if (n >= slides.length) {
                    currentSlide = 0;
                } else if (n < 0) {
                    currentSlide = slides.length - 1;
                } else {
                    currentSlide = n;
                }
                
                // Show current slide
                slides[currentSlide].classList.add('active');
            }
            
            // Event listeners for buttons
            if (prevBtn) {
                prevBtn.addEventListener('click', () => {
                    showSlide(currentSlide - 1);
                });
            }
            
            if (nextBtn) {
                nextBtn.addEventListener('click', () => {
                    showSlide(currentSlide + 1);
                });
            }
            
            // Auto slide (optional)
            if (slider.hasAttribute('data-auto-slide')) {
                setInterval(() => {
                    showSlide(currentSlide + 1);
                }, 5000); // Change slide every 5 seconds
            }
        });
    }
    
    // Initialize any other interactive elements
    
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Close mobile menu if open
                if (mobileMenu && mobileMenu.classList.contains('active')) {
                    mobileMenu.classList.remove('active');
                    const icon = mobileMenuBtn.querySelector('i');
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            }
        });
    });
});