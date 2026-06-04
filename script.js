/**
   Search Traffic & Local SEO Portfolio - Interaction Logic
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. Preloader & Logo Animation Sequence ---
    const preloader = document.getElementById('preloader');
    const animatedLogo = document.getElementById('animated-logo');
    const targetLogo = document.getElementById('header-logo-target');
    const header = document.getElementById('header');
    const mainContent = document.getElementById('main-content');
    const body = document.body;

    // Start Intro Sequence
    setTimeout(() => {
        // Step 1: Fade in and scale down slightly
        animatedLogo.style.transition = 'opacity 1s ease, transform 1s cubic-bezier(0.19, 1, 0.22, 1)';
        animatedLogo.style.opacity = '1';
        animatedLogo.style.transform = 'scale(1)';

        setTimeout(() => {
            // Step 2: Fade Out Logo
            animatedLogo.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            animatedLogo.style.opacity = '0';
            animatedLogo.style.transform = 'scale(0.9)';
            
            setTimeout(() => {
                // Step 3: Fade in main site elements and rise up
                targetLogo.style.opacity = '1';
                header.classList.add('visible');
                mainContent.classList.add('visible');
                preloader.classList.add('fade-bg');
                body.classList.remove('no-scroll');

                setTimeout(() => {
                    preloader.style.display = 'none';
                    // Trigger KPI Counters after intro finishes
                    animateKPIs();
                }, 1000);
            }, 600); // Wait for logo to fade out
        }, 1200); // Hold time for reading the logo
    }, 100);


    // --- 2. IntersectionObserver (Scroll Reveals) ---
    const revealElements = document.querySelectorAll('.reveal');
    const revealOptions = {
        threshold: 0.1,
        rootMargin: "0px"
    };

    const scrollObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target); // Trigger only once
            }
        });
    }, revealOptions);

    revealElements.forEach(el => scrollObserver.observe(el));


    // --- 3. Magnetic Button Hover Effect ---
    const magneticElements = document.querySelectorAll('.magnetic');

    magneticElements.forEach(elem => {
        elem.addEventListener('mousemove', (e) => {
            const rect = elem.getBoundingClientRect();
            // Calculate distance from center of element
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            // Apply magnetic pull (0.3 intensity multiplier)
            elem.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
        });

        elem.addEventListener('mouseleave', () => {
            // Snap back smoothly
            elem.style.transform = `translate(0px, 0px)`;
            elem.style.transition = `transform 0.5s cubic-bezier(0.19, 1, 0.22, 1)`;
        });

        elem.addEventListener('mouseenter', () => {
            // Remove transition for instant drag tracking
            elem.style.transition = `none`;
        });
    });


    // --- 4. Dynamic KPI Counters ---
    function animateKPIs() {
        const kpiNumbers = document.querySelectorAll('.kpi-number');
        
        kpiNumbers.forEach(kpi => {
            const target = parseInt(kpi.getAttribute('data-target'), 10);
            let current = 0;
            const duration = 1500; // 1.5 seconds animation
            const stepTime = Math.max(Math.floor(duration / target), 15);
            
            const timer = setInterval(() => {
                current += Math.ceil(target / (duration / stepTime));
                if (current >= target) {
                    kpi.textContent = target;
                    clearInterval(timer);
                } else {
                    kpi.textContent = current;
                }
            }, stepTime);
        });
    }


    // --- 5. Mobile Navigation Toggle ---
    const hamburger = document.querySelector('.header__hamburger');
    const navList = document.querySelector('.header__nav-list');
    
    if (hamburger) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navList.classList.toggle('nav-open');
            
            // Prevent scrolling when menu is open
            if (navList.classList.contains('nav-open')) {
                body.style.overflow = 'hidden';
            } else {
                body.style.overflow = '';
            }
        });

        // Close menu on link click
        document.querySelectorAll('.header__nav-link').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navList.classList.remove('nav-open');
                body.style.overflow = '';
            });
        });
    }

    // --- 6. Deep-Dive Modal Logic ---
    const caseStudiesData = [
        {
            title: "Search Feed Arbitrage Spec",
            challenge: "Identifying and capturing profitable click monetization spreads between programmatic traffic channels (Taboola, MGID) and search networks (System1, Tonic) while optimizing bid metrics to prevent budget decay.",
            solution: "Designed and configured Voluum trackers to separate fake traffic, monitor CPC-to-RPC fluctuations in real-time, and set up dynamic Lander tests. Kept ad sets tuned to maximize positive net margins down to geo-placement coordinates.",
            deliverables: ["Lander Split Testing", "Voluum Postback Configuration", "Taboola Media Buying Bids"],
            tech: ["Voluum Tracker", "Taboola Ads Manager", "MGID Native Exchange", "System1 Feeds"]
        },
        {
            title: "Local SEO & GBP Map Pack Specs",
            challenge: "A service business operating in highly competitive local niches was losing high-value inbound calls due to complete absence from the Google Map Pack and inconsistent online listing states.",
            solution: "Performed complete Google Business Profile optimization. Established 30+ verified directory citations with 100% NAP profile compliance. Leveraged semantic local markup and custom FAQs targeting Google AI Overview placements.",
            deliverables: ["Google Business Profile Optimization", "NAP Citation Synced across 30+ sites", "Geo-targeted FAQ Schema Coding"],
            tech: ["BrightLocal Listing Auditor", "Whitespark Link Generator", "GBP Admin Panel", "FAQ Schema"]
        },
        {
            title: "Franchise Local SEO Structure Specs",
            challenge: "A home services brand with multiple location pages faced severe ranking blocks because corporate brand controls disabled root domain edit scopes for individual branches.",
            solution: "Architected a distinct local directory folder hierarchy (/location/city) paired with localized schemas. Mapped local GBP listings directly to specific landing page files to bypass central domain limitations.",
            deliverables: ["Directory Folder Mapping", "Local Google Business Link Setup", "Local Landing Page Tuning"],
            tech: ["Google Search Console", "Ahrefs Domain Auditor", "BrightLocal Citation Hub"]
        }
    ];

    const modal = document.getElementById('project-modal');
    const modalCloseBtn = document.getElementById('modal-close');
    const modalOverlay = document.getElementById('modal-overlay');
    const caseStudyBtns = document.querySelectorAll('.case-study__btn');
    const modalCtaBtn = document.getElementById('modal-cta-btn');
    
    // Elements to populate
    const modalTitle = document.querySelector('.modal__title');
    const modalChallenge = document.getElementById('modal-challenge');
    const modalSolution = document.getElementById('modal-solution');
    const modalDeliverables = document.getElementById('modal-deliverables');
    const modalTech = document.getElementById('modal-tech');

    function populateModal(index) {
        if(!caseStudiesData[index]) return;
        const data = caseStudiesData[index];
        modalTitle.textContent = data.title;
        modalChallenge.textContent = data.challenge;
        modalSolution.textContent = data.solution;
        
        modalDeliverables.innerHTML = '';
        data.deliverables.forEach(item => {
            const li = document.createElement('li');
            li.textContent = item;
            modalDeliverables.appendChild(li);
        });

        modalTech.innerHTML = '';
        data.tech.forEach(item => {
            const li = document.createElement('li');
            li.textContent = item;
            modalTech.appendChild(li);
        });
    }

    function openModal() {
        if(modal) {
            modal.classList.add('modal--open');
            document.body.style.overflow = 'hidden'; // Scroll lock
        }
    }

    function closeModal() {
        if(modal) {
            modal.classList.remove('modal--open');
            document.body.style.overflow = ''; // Release scroll lock
        }
    }

    // Open modal on any button click
    caseStudyBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const index = btn.getAttribute('data-index');
            populateModal(index);
            openModal();
        });
    });

    // Close modal on 'X' or overlay click
    if(modalCloseBtn) modalCloseBtn.addEventListener('click', closeModal);
    if(modalOverlay) modalOverlay.addEventListener('click', closeModal);
    
    if(modalCtaBtn) {
        modalCtaBtn.addEventListener('click', () => {
            closeModal();
        });
    }

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal && modal.classList.contains('modal--open')) {
            closeModal();
        }
    });


    // --- 7. Interactive Project Discovery Questionnaire ---
    const discoveryForm = document.getElementById('discovery-form');
    if (discoveryForm) {
        const steps = document.querySelectorAll('.discovery-step');
        const nextBtns = document.querySelectorAll('.discovery-next');
        const prevBtns = document.querySelectorAll('.discovery-prev');
        const progressFill = document.getElementById('progress-fill');
        const stepIndicator = document.getElementById('step-indicator');
        
        let currentStep = 1;
        const totalSteps = steps.length;

        function updateUI() {
            // Update progress bar
            const percentage = (currentStep / totalSteps) * 100;
            progressFill.style.width = `${percentage}%`;
            
            // Update indicator
            stepIndicator.textContent = `Step ${currentStep} of ${totalSteps}`;

            // Update steps classes for smooth transition
            steps.forEach((step, index) => {
                const stepNum = index + 1;
                step.classList.remove('active', 'exit-left');
                
                if (stepNum === currentStep) {
                    step.classList.add('active');
                } else if (stepNum < currentStep) {
                    step.classList.add('exit-left');
                }
            });

            // Scroll wrapper into view
            const wrapper = discoveryForm.closest('.discovery-wrapper');
            if (wrapper) {
                setTimeout(() => {
                    wrapper.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }, 80);
            }
        }

        function validateStep() {
            const currentStepEl = document.querySelector(`.discovery-step[data-step="${currentStep}"]`);
            const errorEl = document.getElementById(`error-step-${currentStep}`);
            let isValid = false;

            if (currentStep === 1) {
                const checked = currentStepEl.querySelector('input[name="focus"]:checked');
                isValid = !!checked;
            } else if (currentStep === 2) {
                const checked = currentStepEl.querySelector('input[name="stage"]:checked');
                isValid = !!checked;
            } else if (currentStep === 3) {
                const inputs = currentStepEl.querySelectorAll('input[required], textarea[required]');
                isValid = Array.from(inputs).every(input => input.value.trim() !== '');
            }

            if (!isValid && errorEl) {
                errorEl.classList.add('visible');
            } else if (errorEl) {
                errorEl.classList.remove('visible');
            }

            return isValid;
        }

        nextBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                if (validateStep()) {
                    currentStep++;
                    updateUI();
                }
            });
        });

        prevBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                currentStep--;
                updateUI();
            });
        });

        // Hide error message as soon as user makes a selection or types
        const formInputs = discoveryForm.querySelectorAll('input, textarea');
        formInputs.forEach(input => {
            input.addEventListener('input', () => {
                const errorEl = document.getElementById(`error-step-${currentStep}`);
                if (errorEl) errorEl.classList.remove('visible');
            });
        });
        
        discoveryForm.addEventListener('submit', (e) => {
            if (!validateStep()) {
                e.preventDefault();
            }
        });
    }

});
