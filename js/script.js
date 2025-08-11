// Greek Chapter Bulk Benefits - Premium JavaScript
document.addEventListener('DOMContentLoaded', function() {
    
    // ===== Mobile Menu =====
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileMenuLinks = document.querySelectorAll('.mobile-menu-link');
    
    mobileMenuBtn?.addEventListener('click', function() {
        const isActive = this.classList.contains('active');
        this.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        
        // Update ARIA attributes
        this.setAttribute('aria-expanded', !isActive);
        mobileMenu.setAttribute('aria-hidden', isActive);
    });
    
    mobileMenuLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenuBtn.classList.remove('active');
            mobileMenu.classList.remove('active');
            // Update ARIA attributes
            mobileMenuBtn.setAttribute('aria-expanded', 'false');
            mobileMenu.setAttribute('aria-hidden', 'true');
        });
    });
    
    // ===== Smooth Scrolling =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // ===== Counter Animation =====
    const counter = document.querySelector('.counter');
    if (counter) {
        const target = parseInt(counter.getAttribute('data-target'));
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;
        
        const updateCounter = () => {
            current += increment;
            if (current < target) {
                counter.textContent = Math.floor(current);
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target;
            }
        };
        
        // Start counter when visible
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    updateCounter();
                    observer.unobserve(entry.target);
                }
            });
        });
        
        observer.observe(counter);
    }
    
    // ===== Scroll Animations =====
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Use requestAnimationFrame for smoother animations
                requestAnimationFrame(() => {
                    entry.target.classList.add('visible');
                });
                scrollObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe elements with performance optimization
    const animatedElements = document.querySelectorAll('.reveal-text, .process-step, .pricing-card, .fade-in');
    
    // Only observe if elements exist
    if (animatedElements.length > 0) {
        // Use passive event listeners for better scroll performance
        const passiveSupported = (() => {
            let passive = false;
            try {
                const options = {
                    get passive() {
                        passive = true;
                        return false;
                    }
                };
                window.addEventListener('test', null, options);
                window.removeEventListener('test', null, options);
            } catch (err) {
                passive = false;
            }
            return passive;
        })();
        
        animatedElements.forEach(el => {
            scrollObserver.observe(el);
        });
    }
    
    // ===== Floating Action Button =====
    const fab = document.getElementById('fab');
    if (fab) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 500) {
                fab.classList.add('visible');
            } else {
                fab.classList.remove('visible');
            }
        });
    }
    
    // ===== Review Carousel =====
    const reviewCards = document.querySelectorAll('.review-card');
    const dots = document.querySelectorAll('.dot');
    let currentReview = 0;
    let reviewInterval;
    
    function showReview(index) {
        reviewCards.forEach(card => card.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        if (reviewCards[index] && dots[index]) {
            reviewCards[index].classList.add('active');
            dots[index].classList.add('active');
        }
    }
    
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentReview = index;
            showReview(currentReview);
            // Reset auto-rotation timer
            clearInterval(reviewInterval);
            startReviewRotation();
        });
    });
    
    // Start auto-rotation
    function startReviewRotation() {
        if (reviewCards.length > 0) {
            reviewInterval = setInterval(() => {
                currentReview = (currentReview + 1) % reviewCards.length;
                showReview(currentReview);
            }, 5000);
        }
    }
    
    startReviewRotation();
    
    // ===== FAQ Accordion =====
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Close all
            faqItems.forEach(faq => faq.classList.remove('active'));
            
            // Toggle current
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });
    
    // ===== Email Support Banner =====
    const emailBanner = document.getElementById('email-support-banner');
    const bannerClose = document.getElementById('banner-close');
    
    // Show banner and add body class
    if (emailBanner) {
        document.body.classList.add('has-banner');
    }
    
    bannerClose?.addEventListener('click', () => {
        emailBanner.classList.add('hidden');
        document.body.classList.remove('has-banner');
    });
    
    // ===== Social Proof Notifications =====
    const socialProofContainer = document.getElementById('social-proof');
    const notifications = [
        { name: 'John', org: 'UCLA', action: 'just requested a quote' },
        { name: 'Sarah', org: 'Ohio State', action: 'ordered 45 hoodies' },
        { name: 'Mike', org: 'Texas A&M', action: 'saved $650 on their order' },
        { name: 'Emily', org: 'Florida State', action: 'customized 30 shirts' },
        { name: 'Alex', org: 'Georgia Tech', action: 'received their order' }
    ];
    
    function showNotification() {
        const notification = notifications[Math.floor(Math.random() * notifications.length)];
        const notificationEl = document.createElement('div');
        notificationEl.className = 'social-proof-notification';
        notificationEl.innerHTML = `
            <i class="fas fa-bell"></i>
            <div class="social-proof-text">
                <strong>${notification.name}</strong> from ${notification.org} ${notification.action}
            </div>
        `;
        
        socialProofContainer.appendChild(notificationEl);
        
        setTimeout(() => notificationEl.classList.add('show'), 100);
        
        setTimeout(() => {
            notificationEl.classList.remove('show');
            setTimeout(() => notificationEl.remove(), 500);
        }, 5000);
    }
    
    // Show notifications periodically with cleanup
    let notificationInterval;
    if (socialProofContainer) {
        // Initial notification after 3 seconds
        const initialTimeout = setTimeout(showNotification, 3000);
        
        // Regular notifications every 15 seconds
        notificationInterval = setInterval(showNotification, 15000);
        
        // Clean up on page unload
        window.addEventListener('beforeunload', () => {
            clearTimeout(initialTimeout);
            clearInterval(notificationInterval);
        });
    }
    
    // ===== Form Handling =====
    const form = document.getElementById('bulk-quote-form');
    if (!form) return;
    
    // TEMPORARY: Skip complex form handling to test basic submission
    const skipComplexHandling = false;
    if (skipComplexHandling) {
        console.log('Using simple form submission for testing');
        return;
    }
    
    // Form elements
    const quantityTiers = document.querySelectorAll('input[name="quantity_tier"]');
    const sizeCheckboxes = document.querySelectorAll('input[name="sizes"]');
    const sizeQuantities = document.querySelectorAll('.size-quantity');
    const totalItemsSpan = document.getElementById('total-items');
    const progressBar = document.getElementById('progress-bar');
    const submitButton = form.querySelector('.submit-button');
    const orderTypeRadios = document.querySelectorAll('input[name="order_type"]');
    const orderTypeContent = document.getElementById('order-type-content');
    
    // Calculate form progress
    function updateProgress() {
        const requiredFields = form.querySelectorAll('[required]');
        const filledFields = Array.from(requiredFields).filter(field => {
            if (field.type === 'radio') {
                return form.querySelector(`input[name="${field.name}"]:checked`);
            }
            return field.value.trim() !== '';
        });
        
        const progress = (filledFields.length / requiredFields.length) * 100;
        progressBar.style.width = `${progress}%`;
    }
    
    // Update progress on input
    form.addEventListener('input', updateProgress);
    form.addEventListener('change', updateProgress);
    
    // Dynamic order type content
    orderTypeRadios.forEach(radio => {
        radio.addEventListener('change', function() {
            orderTypeContent.innerHTML = '';
            
            if (this.value === 'existing') {
                orderTypeContent.innerHTML = `
                    <div class="form-group fade-in">
                        <label>Product Links</label>
                        <p style="margin-bottom: 0.5rem; color: var(--text-secondary); font-size: 0.875rem;">
                            Browse our website at ireishprint.com and paste product links below
                        </p>
                        <textarea name="product_links" rows="4" 
                            placeholder="https://ireishprint.com/product/example1&#10;https://ireishprint.com/product/example2&#10;Include as many products as you need!"></textarea>
                    </div>
                `;
            } else if (this.value === 'custom') {
                orderTypeContent.innerHTML = `
                    <div class="form-group fade-in">
                        <label for="design_description">Design Description</label>
                        <textarea id="design_description" name="design_description" rows="4" 
                            placeholder="Describe your design ideas, colors, text, logos, etc."></textarea>
                    </div>
                    <div class="form-group fade-in">
                        <label for="design_files">Upload Design Files (Optional)</label>
                        <input type="file" id="design_files" name="design_files" 
                            accept="image/*,.pdf,.ai,.eps,.psd" multiple>
                        <p style="margin-top: 0.5rem; color: var(--text-secondary); font-size: 0.875rem;">
                            Upload design files, logos, or inspiration images
                        </p>
                    </div>
                `;
            }
            
            // Re-apply fade-in animation
            orderTypeContent.querySelectorAll('.fade-in').forEach(el => {
                el.style.animationDelay = '0.1s';
            });
        });
    });
    
    // Size selection and total calculation
    function updateTotal() {
        let total = 0;
        sizeQuantities.forEach(input => {
            const quantity = parseInt(input.value) || 0;
            total += quantity;
        });
        totalItemsSpan.textContent = total;
        
        // Auto-check size if quantity entered
        sizeQuantities.forEach(input => {
            const checkbox = input.closest('.size-option').querySelector('input[type="checkbox"]');
            if (parseInt(input.value) > 0) {
                checkbox.checked = true;
            } else {
                checkbox.checked = false;
            }
        });
    }
    
    sizeQuantities.forEach(input => {
        input.addEventListener('input', updateTotal);
    });
    
    // Tier selection from pricing cards
    document.querySelectorAll('.select-tier-btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Scroll to form
            document.getElementById('quote-form').scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            
            // Select the appropriate tier
            const card = this.closest('.pricing-card');
            const tierTitle = card.querySelector('.tier-title').textContent;
            
            if (tierTitle.includes('10-24')) {
                document.querySelector('input[value="10-24"]').checked = true;
            } else if (tierTitle.includes('25-49')) {
                document.querySelector('input[value="25-49"]').checked = true;
            } else if (tierTitle.includes('50+')) {
                document.querySelector('input[value="50+"]').checked = true;
            }
            
            updateProgress();
        });
    });
    
    // Phone number formatting
    const phoneInput = document.getElementById('phone');
    phoneInput?.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, '');
        let formattedValue = '';
        
        if (value.length > 0) {
            if (value.length <= 3) {
                formattedValue = value;
            } else if (value.length <= 6) {
                formattedValue = `(${value.slice(0, 3)}) ${value.slice(3)}`;
            } else if (value.length <= 10) {
                formattedValue = `(${value.slice(0, 3)}) ${value.slice(3, 6)}-${value.slice(6)}`;
            } else {
                formattedValue = `(${value.slice(0, 3)}) ${value.slice(3, 6)}-${value.slice(6, 10)}`;
            }
        }
        
        e.target.value = formattedValue;
    });
    
    // Form validation
    function validateForm() {
        let isValid = true;
        const requiredFields = form.querySelectorAll('[required]');
        
        // Clear any previous error messages
        const existingError = form.querySelector('.form-error-message');
        if (existingError) {
            existingError.remove();
        }
        
        requiredFields.forEach(field => {
            const errorMessage = field.closest('.form-group')?.querySelector('.error-message');
            
            if (!field.value.trim() && field.type !== 'radio') {
                isValid = false;
                field.classList.add('error');
                if (errorMessage) {
                    errorMessage.textContent = 'This field is required';
                    errorMessage.setAttribute('role', 'alert');
                }
            } else if (field.type === 'email' && !isValidEmail(field.value)) {
                isValid = false;
                field.classList.add('error');
                if (errorMessage) {
                    errorMessage.textContent = 'Please enter a valid email address';
                    errorMessage.setAttribute('role', 'alert');
                }
            } else if (field.type === 'tel' && field.value && !isValidPhone(field.value)) {
                isValid = false;
                field.classList.add('error');
                if (errorMessage) {
                    errorMessage.textContent = 'Please enter a valid phone number';
                    errorMessage.setAttribute('role', 'alert');
                }
            } else {
                field.classList.remove('error');
                if (errorMessage) {
                    errorMessage.textContent = '';
                    errorMessage.removeAttribute('role');
                }
            }
        });
        
        // Check radio groups
        const radioGroups = ['order_type', 'quantity_tier'];
        radioGroups.forEach(groupName => {
            const radios = form.querySelectorAll(`input[name="${groupName}"]`);
            const isChecked = Array.from(radios).some(radio => radio.checked);
            const errorMessage = radios[0]?.closest('.form-group')?.querySelector('.error-message');
            
            if (!isChecked) {
                isValid = false;
                if (errorMessage) {
                    errorMessage.textContent = 'Please select an option';
                    errorMessage.setAttribute('role', 'alert');
                }
            } else if (errorMessage) {
                errorMessage.textContent = '';
                errorMessage.removeAttribute('role');
            }
        });
        
        // Validate size selection
        const totalItems = parseInt(totalItemsSpan.textContent);
        const sizeError = document.querySelector('.size-selection .error-message');
        if (totalItems === 0) {
            isValid = false;
            if (sizeError) {
                sizeError.textContent = 'Please select at least one size and quantity';
                sizeError.setAttribute('role', 'alert');
            }
        } else if (sizeError) {
            sizeError.textContent = '';
            sizeError.removeAttribute('role');
        }
        
        // Validate quantity against tier
        const selectedTier = form.querySelector('input[name="quantity_tier"]:checked');
        if (selectedTier && totalItems > 0) {
            const min = parseInt(selectedTier.dataset.min);
            const max = selectedTier.dataset.max ? parseInt(selectedTier.dataset.max) : null;
            
            if (totalItems < min || (max && totalItems > max)) {
                isValid = false;
                if (sizeError) {
                    sizeError.textContent = max 
                        ? `Total quantity must be between ${min} and ${max}` 
                        : `Total quantity must be at least ${min}`;
                    sizeError.setAttribute('role', 'alert');
                }
            }
        }
        
        return isValid;
    }
    
    // Email validation
    function isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }
    
    // Phone validation
    function isValidPhone(phone) {
        const digitsOnly = phone.replace(/\D/g, '');
        return digitsOnly.length === 10;
    }
    
    // Real-time validation
    form.addEventListener('input', function(e) {
        const field = e.target;
        const errorMessage = field.closest('.form-group')?.querySelector('.error-message');
        
        if (field.hasAttribute('required')) {
            // Clear error when user starts typing
            if (field.value.trim()) {
                field.classList.remove('error');
                if (errorMessage) {
                    errorMessage.textContent = '';
                }
            }
            
            // Validate on blur for better UX
            if (e.type === 'blur' || field.value.length > 3) {
                validateField(field);
            }
        }
        
        // Live email validation
        if (field.type === 'email' && field.value.length > 5) {
            if (isValidEmail(field.value)) {
                field.classList.remove('error');
                field.classList.add('valid');
                if (errorMessage) {
                    errorMessage.textContent = '';
                }
            } else {
                field.classList.add('error');
                field.classList.remove('valid');
                if (errorMessage) {
                    errorMessage.textContent = 'Please enter a valid email address';
                }
            }
        }
        
        // Live phone validation (optional field)
        if (field.type === 'tel' && field.value) {
            const digitsOnly = field.value.replace(/\D/g, '');
            if (digitsOnly.length === 10) {
                field.classList.remove('error');
                field.classList.add('valid');
                if (errorMessage) {
                    errorMessage.textContent = '';
                }
            }
        }
    });
    
    // Add blur event for validation
    form.addEventListener('blur', function(e) {
        if (e.target.tagName === 'INPUT' || e.target.tagName === 'SELECT' || e.target.tagName === 'TEXTAREA') {
            validateField(e.target);
        }
    }, true);
    
    // Validate individual field
    function validateField(field) {
        const errorMessage = field.closest('.form-group')?.querySelector('.error-message');
        let isValid = true;
        
        if (field.hasAttribute('required') && !field.value.trim() && field.type !== 'radio') {
            isValid = false;
            field.classList.add('error');
            field.classList.remove('valid');
            if (errorMessage) {
                errorMessage.textContent = 'This field is required';
            }
        } else if (field.type === 'email' && field.value && !isValidEmail(field.value)) {
            isValid = false;
            field.classList.add('error');
            field.classList.remove('valid');
            if (errorMessage) {
                errorMessage.textContent = 'Please enter a valid email address';
            }
        } else if (field.type === 'tel' && field.value && !isValidPhone(field.value)) {
            isValid = false;
            field.classList.add('error');
            field.classList.remove('valid');
            if (errorMessage) {
                errorMessage.textContent = 'Please enter a valid 10-digit phone number';
            }
        } else if (field.hasAttribute('required') && field.value.trim()) {
            field.classList.remove('error');
            field.classList.add('valid');
            if (errorMessage) {
                errorMessage.textContent = '';
            }
        }
        
        return isValid;
    }
    
    // Form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (!validateForm()) {
            // Scroll to first error
            const firstError = form.querySelector('.error');
            if (firstError) {
                firstError.scrollIntoView({
                    behavior: 'smooth',
                    block: 'center'
                });
                firstError.focus();
            }
            return;
        }
        
        // Show loading state
        submitButton.classList.add('loading');
        submitButton.disabled = true;
        
        // Create FormData and submit
        const formData = new FormData(form);
        
        // Add size quantities to form data
        sizeQuantities.forEach(input => {
            if (parseInt(input.value) > 0) {
                formData.append(input.name, input.value);
            }
        });
        
        // Debug: Log form data
        console.log('Submitting form with data:');
        for (let [key, value] of formData.entries()) {
            console.log(`${key}: ${value}`);
        }
        
        // Store form data for thank you page
        const orderData = {
            organization: formData.get('organization'),
            orderType: formData.get('order_type'),
            productType: formData.get('product_type'),
            totalItems: totalItemsSpan.textContent,
            name: formData.get('name'),
            email: formData.get('email'),
            phone: formData.get('phone'),
            deliveryTimeline: formData.get('delivery_timeline')
        };
        localStorage.setItem('orderData', JSON.stringify(orderData));
        
        // Submit to Formspree
        const formspreeUrl = 'https://formspree.io/f/mrbkqkro';
        
        fetch(formspreeUrl, {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        })
        .then(response => {
            console.log('Response:', response);
            
            if (response.ok) {
                // Success! Show message and redirect
                console.log('Form submitted successfully!');
                
                const successDiv = document.createElement('div');
                successDiv.className = 'form-success-message';
                successDiv.innerHTML = `
                    <i class="fas fa-check-circle"></i>
                    <p>Success! Redirecting to confirmation page...</p>
                `;
                form.appendChild(successDiv);
                
                // Hide the submit button
                submitButton.style.display = 'none';
                
                // Redirect after a short delay
                setTimeout(() => {
                    window.location.href = 'thank-you.html';
                }, 1500);
            } else {
                // Handle error
                throw new Error(`Submission failed with status: ${response.status}`);
            }
        })
        .catch(error => {
            console.error('Form submission error:', error);
            
            // Reset button state
            submitButton.classList.remove('loading');
            submitButton.disabled = false;
            
            // Show error message
            const errorDiv = document.createElement('div');
            errorDiv.className = 'form-error-message';
            errorDiv.innerHTML = `
                <i class="fas fa-exclamation-circle"></i>
                <p>There was an error submitting your request. Please try again or contact us directly at <a href="tel:+13074290147">+1 (307) 429-0147</a></p>
                <button class="dismiss-error">Dismiss</button>
            `;
            
            form.appendChild(errorDiv);
            
            // Scroll to error message
            errorDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
            
            // Dismiss error handler
            errorDiv.querySelector('.dismiss-error').addEventListener('click', () => {
                errorDiv.remove();
            });
            
            // Auto-dismiss after 10 seconds
            setTimeout(() => {
                if (errorDiv.parentNode) {
                    errorDiv.remove();
                }
            }, 10000);
            
            // Reset button state
            submitButton.classList.remove('loading');
            submitButton.disabled = false;
        });
    });
    
    // ===== Parallax Effects =====
    let ticking = false;
    function updateParallax() {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.hero-particles');
        
        parallaxElements.forEach(el => {
            const speed = 0.5;
            el.style.transform = `translateY(${scrolled * speed}px)`;
        });
        
        ticking = false;
    }
    
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(updateParallax);
            ticking = true;
        }
    }, { passive: true });
    
    // ===== Header Scroll Effect =====
    const header = document.querySelector('.header');
    let lastScroll = 0;
    let headerTicking = false;
    
    function updateHeader() {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            header.style.background = 'rgba(0, 0, 0, 0.95)';
            header.style.backdropFilter = 'blur(10px)';
        } else {
            header.style.background = 'var(--primary-black)';
            header.style.backdropFilter = 'none';
        }
        
        lastScroll = currentScroll;
        headerTicking = false;
    }
    
    window.addEventListener('scroll', () => {
        if (!headerTicking) {
            window.requestAnimationFrame(updateHeader);
            headerTicking = true;
        }
    }, { passive: true });
    
    // ===== Add styles for error and valid states =====
    const style = document.createElement('style');
    style.textContent = `
        .form-group input.error,
        .form-group select.error,
        .form-group textarea.error {
            border-color: var(--error-red);
            animation: shake 0.3s ease;
        }
        
        .form-group input.valid,
        .form-group select.valid,
        .form-group textarea.valid {
            border-color: var(--success-green);
        }
        
        @keyframes shake {
            0%, 100% { transform: translateX(0); }
            25% { transform: translateX(-5px); }
            75% { transform: translateX(5px); }
        }
        
        .form-group input.error:focus,
        .form-group select.error:focus,
        .form-group textarea.error:focus {
            box-shadow: 0 0 0 4px rgba(239, 68, 68, 0.1);
        }
        
        .form-group input.valid:focus,
        .form-group select.valid:focus,
        .form-group textarea.valid:focus {
            box-shadow: 0 0 0 4px rgba(16, 185, 129, 0.1);
        }
        
        .form-group .error-message {
            color: var(--error-red);
            font-size: 0.875rem;
            margin-top: 0.25rem;
            min-height: 1.2rem;
            transition: all 0.3s ease;
        }
        
        .submit-button.loading {
            position: relative;
            color: transparent;
        }
        
        .submit-button.loading .loading-spinner {
            display: block;
        }
        
        .loading-spinner {
            display: none;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 24px;
            height: 24px;
            border: 3px solid rgba(255, 255, 255, 0.3);
            border-top-color: white;
            border-radius: 50%;
            animation: spin 0.8s linear infinite;
        }
        
        @keyframes spin {
            to { transform: translate(-50%, -50%) rotate(360deg); }
        }
        
        .form-error-message {
            background: var(--error-red);
            color: var(--white);
            padding: var(--spacing-lg);
            border-radius: var(--radius-md);
            margin-top: var(--spacing-xl);
            display: flex;
            align-items: center;
            gap: var(--spacing-md);
            animation: fadeInUp 0.3s ease;
        }
        
        .form-error-message i {
            font-size: 1.5rem;
            flex-shrink: 0;
        }
        
        .form-error-message p {
            margin: 0;
            flex: 1;
        }
        
        .form-error-message a {
            color: var(--white);
            text-decoration: underline;
        }
        
        .dismiss-error {
            background: rgba(255, 255, 255, 0.2);
            border: 1px solid rgba(255, 255, 255, 0.3);
            color: var(--white);
            padding: var(--spacing-sm) var(--spacing-md);
            border-radius: var(--radius-sm);
            cursor: pointer;
            transition: all var(--transition-base);
            flex-shrink: 0;
        }
        
        .dismiss-error:hover {
            background: rgba(255, 255, 255, 0.3);
            border-color: rgba(255, 255, 255, 0.5);
        }
        
        .form-success-message {
            background: var(--success-green);
            color: var(--white);
            padding: var(--spacing-lg);
            border-radius: var(--radius-md);
            margin-top: var(--spacing-xl);
            display: flex;
            align-items: center;
            gap: var(--spacing-md);
            animation: fadeInUp 0.3s ease;
        }
        
        .form-success-message i {
            font-size: 1.5rem;
            flex-shrink: 0;
        }
        
        .form-success-message p {
            margin: 0;
            flex: 1;
            font-weight: 500;
        }
    `;
    document.head.appendChild(style);
});