
// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Set current year in footer
    document.getElementById('current-year').textContent = new Date().getFullYear();
    
    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    const navbarMobileToggle = document.querySelector('.navbar-mobile-toggle');
    const menuIcon = document.querySelector('.menu-icon');
    const navbarMobileMenu = document.querySelector('.navbar-mobile-menu');
    
    window.addEventListener('scroll', function() {
      if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    });
    
    // Mobile menu toggle
    navbarMobileToggle.addEventListener('click', function() {
      navbarMobileMenu.classList.toggle('open');
      menuIcon.classList.toggle('open');
    });
    
    // Dropdown toggles for mobile menu
    const mobileDropdownToggles = document.querySelectorAll('.mobile-dropdown-toggle');
    mobileDropdownToggles.forEach(toggle => {
      toggle.addEventListener('click', function() {
        const dropdownMenu = this.nextElementSibling;
        const dropdownArrow = this.querySelector('.dropdown-arrow');
        
        // Close all other dropdown menus
        document.querySelectorAll('.mobile-dropdown-menu').forEach(menu => {
          if (menu !== dropdownMenu) {
            menu.classList.remove('open');
          }
        });
        
        document.querySelectorAll('.mobile-dropdown-toggle .dropdown-arrow').forEach(arrow => {
          if (arrow !== dropdownArrow) {
            arrow.classList.remove('rotated');
          }
        });
        
        // Toggle the clicked dropdown menu
        dropdownMenu.classList.toggle('open');
        dropdownArrow.classList.toggle('rotated');
      });
    });
    
    // Desktop dropdown toggles
    const dropdownToggles = document.querySelectorAll('.dropdown-toggle');
    dropdownToggles.forEach(toggle => {
      toggle.addEventListener('click', function(e) {
        e.preventDefault();
        const dropdownMenu = this.nextElementSibling;
        const dropdownArrow = this.querySelector('.dropdown-arrow');
        
        // Close all other dropdown menus
        document.querySelectorAll('.dropdown-menu').forEach(menu => {
          if (menu !== dropdownMenu && menu.classList.contains('active')) {
            menu.classList.remove('active');
          }
        });
        
        document.querySelectorAll('.dropdown-toggle .dropdown-arrow').forEach(arrow => {
          if (arrow !== dropdownArrow) {
            arrow.classList.remove('rotated');
          }
        });
        
        // Toggle the clicked dropdown menu
        dropdownMenu.classList.toggle('active');
        dropdownArrow.classList.toggle('rotated');
      });
    });
    
    // Close dropdowns when clicking outside
    document.addEventListener('click', function(e) {
      if (!e.target.closest('.navbar-link-container')) {
        document.querySelectorAll('.dropdown-menu').forEach(menu => {
          menu.classList.remove('active');
        });
        
        document.querySelectorAll('.dropdown-arrow').forEach(arrow => {
          arrow.classList.remove('rotated');
        });
      }
    });
    
    // Add smooth scrolling to all links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Close mobile menu if open
        if (navbarMobileMenu.classList.contains('open')) {
          navbarMobileMenu.classList.remove('open');
          menuIcon.classList.remove('open');
        }
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          window.scrollTo({
            top: targetElement.offsetTop - 70, // Offset for navbar height
            behavior: 'smooth'
          });
        }
      });
    });
    
    // Hero slider functionality
    const heroSlides = document.querySelectorAll('.hero-slide');
    const heroDots = document.querySelectorAll('.hero-dot');
    const heroNextBtn = document.querySelector('.hero-arrow-next');
    const heroPrevBtn = document.querySelector('.hero-arrow-prev');
    let currentSlide = 0;
    let slideInterval;
    
    function showSlide(index) {
      // Hide all slides
      heroSlides.forEach(slide => {
        slide.classList.remove('active');
      });
      
      // Remove active class from all dots
      heroDots.forEach(dot => {
        dot.classList.remove('active');
      });
      
      // Show current slide and dot
      heroSlides[index].classList.add('active');
      heroDots[index].classList.add('active');
    }
    
    function nextSlide() {
      currentSlide = (currentSlide + 1) % heroSlides.length;
      showSlide(currentSlide);
    }
    
    function prevSlide() {
      currentSlide = (currentSlide - 1 + heroSlides.length) % heroSlides.length;
      showSlide(currentSlide);
    }
    
    function startSlideshow() {
      slideInterval = setInterval(nextSlide, 6000);
    }
    
    // Initialize hero slider
    startSlideshow();
    
    // Event listeners for hero controls
    heroNextBtn.addEventListener('click', function() {
      clearInterval(slideInterval);
      nextSlide();
      startSlideshow();
    });
    
    heroPrevBtn.addEventListener('click', function() {
      clearInterval(slideInterval);
      prevSlide();
      startSlideshow();
    });
    
    heroDots.forEach((dot, index) => {
      dot.addEventListener('click', function() {
        clearInterval(slideInterval);
        currentSlide = index;
        showSlide(currentSlide);
        startSlideshow();
      });
    });
    
    // Intersection Observer for animations
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-in');
          
          // Special animation for stats
          if (entry.target.classList.contains('stats-container')) {
            entry.target.classList.add('animate-reveal');
            // Start counter animations
            animateCounters();
          }
          
          // Special animation for values images
          if (entry.target.classList.contains('values-image-group')) {
            entry.target.classList.add('animate-scale-in');
          }
          
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);
    
    // Observe elements that need animation
    const animateElements = document.querySelectorAll('.opacity-0');
    animateElements.forEach(element => {
      observer.observe(element);
    });
    
    // Counter animation for statistics
    function animateCounters() {
      const counters = document.querySelectorAll('.stats-number');
      const speed = 200; // The lower the faster
      
      counters.forEach(counter => {
        const target = +counter.getAttribute('data-target');
        const increment = target / speed;
        let count = 0;
        
        const updateCount = () => {
          if (count < target) {
            count += increment;
            counter.textContent = Math.ceil(count);
            setTimeout(updateCount, 1);
          } else {
            counter.textContent = target;
          }
        };
        
        updateCount();
      });
    }
    
    // Blog carousel functionality
    const blogTrack = document.querySelector('.blog-carousel-track');
    const blogPosts = document.querySelectorAll('.blog-post');
    const blogDots = document.querySelectorAll('.blog-dot');
    const blogPrev = document.querySelector('.blog-carousel-prev');
    const blogNext = document.querySelector('.blog-carousel-next');
    
    if (blogTrack && blogPosts.length > 0) {
      let blogCurrentIndex = 0;
      
      function updateBlogCarousel() {
        let slideWidth;
        if (window.innerWidth >= 1024) {
          slideWidth = 33.333; // 3 posts per view
        } else if (window.innerWidth >= 640) {
          slideWidth = 50; // 2 posts per view
        } else {
          slideWidth = 100; // 1 post per view
        }
        
        const offset = -blogCurrentIndex * slideWidth;
        blogTrack.style.transform = `translateX(${offset}%)`;
        
        // Update active dot
        blogDots.forEach((dot, index) => {
          dot.classList.toggle('active', index === blogCurrentIndex);
        });
      }
      
      function nextBlogSlide() {
        const maxVisibleSlides = window.innerWidth >= 1024 ? 3 : window.innerWidth >= 640 ? 2 : 1;
        const maxIndex = Math.ceil(blogPosts.length / maxVisibleSlides) - 1;
        blogCurrentIndex = Math.min(blogCurrentIndex + 1, maxIndex);
        updateBlogCarousel();
      }
      
      function prevBlogSlide() {
        blogCurrentIndex = Math.max(blogCurrentIndex - 1, 0);
        updateBlogCarousel();
      }
      
      if (blogPrev && blogNext) {
        blogPrev.addEventListener('click', prevBlogSlide);
        blogNext.addEventListener('click', nextBlogSlide);
      }
      
      if (blogDots.length > 0) {
        blogDots.forEach((dot, index) => {
          dot.addEventListener('click', () => {
            blogCurrentIndex = index;
            updateBlogCarousel();
          });
        });
      }
      
      window.addEventListener('resize', updateBlogCarousel);
      updateBlogCarousel();
    }
    
    // Contact form submission
    const contactForm = document.getElementById('contactForm');
    const submitBtn = document.getElementById('submitBtn');
    
    if (contactForm) {
      contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Simulate form submission
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        
        setTimeout(() => {
          // Show success message
          alert('Your message has been sent successfully!');
          
          // Reset form
          contactForm.reset();
          
          // Reset button
          submitBtn.textContent = 'Send Message';
          submitBtn.disabled = false;
        }, 1500);
      });
    }
    
    // Back to top button
    const backToTopButton = document.querySelector('.back-to-top-button');
    
    if (backToTopButton) {
      window.addEventListener('scroll', function() {
        if (window.scrollY > 500) {
          backToTopButton.classList.add('visible');
        } else {
          backToTopButton.classList.remove('visible');
        }
      });
      
      backToTopButton.addEventListener('click', function() {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      });
    }
  });

  function startCounter() {
    const statsContainer = document.querySelector('.stats-container');
    statsContainer.style.opacity = '1';
    statsContainer.style.transform = 'translateY(0)';
    
    const counters = document.querySelectorAll('.stats-number');
    counters.forEach(counter => {
        let target = +counter.getAttribute('data-target');
        let count = 0;
        let increment = target / 100; // Speed control
        let duration = 2000; // 2 seconds
        let stepTime = duration / 100;

        function updateCounter() {
            if (count < target) {
                count += increment;
                counter.innerText = Math.floor(count);
                requestAnimationFrame(updateCounter);
            } else {
                counter.innerText = target;
            }
        }

        updateCounter();
    });
}

// Start animation when page loads
window.onload = () => {
    setTimeout(startCounter, 500);
};