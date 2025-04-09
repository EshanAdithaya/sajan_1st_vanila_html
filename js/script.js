// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    const menuIcon = document.querySelector('.mobile-menu-icon');
    const mainMenu = document.querySelector('.main-menu');
    
    if (menuIcon) {
        menuIcon.addEventListener('click', function() {
            mainMenu.classList.toggle('show');
        });
    }
    
    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!event.target.closest('.mobile-menu-icon') && !event.target.closest('.main-menu')) {
            if (mainMenu.classList.contains('show')) {
                mainMenu.classList.remove('show');
            }
        }
    });
    
    // Testimonial Slider
    const testimonials = document.querySelectorAll('.testimonial');
    const dots = document.querySelectorAll('.dot');
    let currentTestimonial = 0;
    
    function showTestimonial(index) {
        testimonials.forEach(testimonial => testimonial.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        testimonials[index].classList.add('active');
        dots[index].classList.add('active');
        currentTestimonial = index;
    }
    
    // Automatically change testimonial every 5 seconds
    if (testimonials.length > 0) {
        setInterval(() => {
            let nextTestimonial = (currentTestimonial + 1) % testimonials.length;
            showTestimonial(nextTestimonial);
        }, 5000);
        
        // Add click event for dots
        dots.forEach(dot => {
            dot.addEventListener('click', function() {
                let index = parseInt(this.getAttribute('data-index'));
                showTestimonial(index);
            });
        });
    }
    
    // Login Modal
    const loginBtn = document.querySelector('.btn-login');
    const loginModal = document.getElementById('loginModal');
    const closeModal = document.querySelector('.close-modal');
    
    if (loginBtn && loginModal) {
        loginBtn.addEventListener('click', function(e) {
            e.preventDefault();
            loginModal.style.display = 'block';
            document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
        });
        
        closeModal.addEventListener('click', function() {
            loginModal.style.display = 'none';
            document.body.style.overflow = 'auto'; // Allow scrolling again
        });
        
        // Close modal when clicking outside
        window.addEventListener('click', function(event) {
            if (event.target === loginModal) {
                loginModal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });
    }
    
    // Login Form Submission
    const loginForm = document.getElementById('loginForm');
    
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            
            // Simple validation
            if (username && password) {
                // In a real application, this would send a request to a server
                alert('Login successful! (This is just a demo)');
                loginModal.style.display = 'none';
                document.body.style.overflow = 'auto';
            } else {
                alert('Please enter both username and password.');
            }
        });
    }
    
    // Loan Calculator
    const calculatorForm = document.getElementById('calculatorForm');
    const calculatorResult = document.getElementById('calculatorResult');
    
    if (calculatorForm) {
        calculatorForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const loanAmount = parseFloat(document.getElementById('loanAmount').value);
            const interestRate = parseFloat(document.getElementById('interestRate').value) / 100 / 12; // Monthly interest rate
            const loanTerm = parseInt(document.getElementById('loanTerm').value) * 12; // Term in months
            
            // Calculate monthly payment
            const monthlyPayment = (loanAmount * interestRate * Math.pow(1 + interestRate, loanTerm)) / 
                                (Math.pow(1 + interestRate, loanTerm) - 1);
            
            const totalPayment = monthlyPayment * loanTerm;
            const totalInterest = totalPayment - loanAmount;
            
            // Display results
            document.getElementById('monthlyPayment').textContent = '$' + monthlyPayment.toFixed(2);
            document.getElementById('totalPayment').textContent = '$' + totalPayment.toFixed(2);
            document.getElementById('totalInterest').textContent = '$' + totalInterest.toFixed(2);
            
            calculatorResult.style.display = 'block';
        });
    }
});

// Counter Animation for Stats
function animateCounter(element, target, duration) {
    let start = 0;
    let startTime = null;
    
    function animation(currentTime) {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const progress = Math.min(timeElapsed / duration, 1);
        
        const value = Math.floor(progress * target);
        element.textContent = value.toLocaleString();
        
        if (progress < 1) {
            requestAnimationFrame(animation);
        } else {
            element.textContent = target.toLocaleString();
        }
    }
    
    requestAnimationFrame(animation);
}

// Animate stats when they come into view
document.addEventListener('DOMContentLoaded', function() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    if (statNumbers.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const target = parseInt(entry.target.getAttribute('data-target'));
                    animateCounter(entry.target, target, 2000);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        statNumbers.forEach(stat => {
            const value = parseInt(stat.textContent);
            stat.setAttribute('data-target', value);
            stat.textContent = '0';
            observer.observe(stat);
        });
    }
});