/* ==========================================================================
   DEVELOPER PORTFOLIO INTERACTIONS & ANIMATIONS ENGINE (VANILLA JS)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    // Initialize components
    initNavbar();
    initTypewriter();
    initScrollReveal();
    initActiveNavObserver();
    initProjectFilters();
});

/* --- NAVBAR ACTIONS & RESPONSIVENESS --- */
function initNavbar() {
    const navbar = document.getElementById('navbar');
    const mobileToggle = document.getElementById('mobile-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Sticky glass header on scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Mobile Hamburger Toggle
    mobileToggle.addEventListener('click', () => {
        navMenu.classList.toggle('open');
        const icon = mobileToggle.querySelector('i');
        if (navMenu.classList.contains('open')) {
            icon.className = 'fa-solid fa-xmark';
        } else {
            icon.className = 'fa-solid fa-bars';
        }
    });

    // Close menu when clicking link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('open');
            mobileToggle.querySelector('i').className = 'fa-solid fa-bars';
        });
    });
}

/* --- HERO TYPEWRITER ANIMATION --- */
function initTypewriter() {
    const textElement = document.getElementById('typewriter-text');
    if (!textElement) return;

    const words = [
        "Engineering Student",
        "Python & C++ Developer",
        "Self-Study Explorer",
        "Research Enthusiast"
    ];
    
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let delay = 150; // Typing speed

    function type() {
        const currentWord = words[wordIndex];
        
        if (isDeleting) {
            textElement.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
            delay = 50; // Deleting speed
        } else {
            textElement.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
            delay = 120; // Typing speed
        }

        // Word finished typing
        if (!isDeleting && charIndex === currentWord.length) {
            delay = 1800; // Pause at the end of word
            isDeleting = true;
        } 
        // Word finished deleting
        else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            delay = 400; // Pause before typing next word
        }

        setTimeout(type, delay);
    }

    // Start typing loop
    setTimeout(type, 800);
}

/* --- SCROLL REVEAL (INTERSECTION OBSERVER) --- */
function initScrollReveal() {
    const revealElements = document.querySelectorAll('.scroll-reveal');
    
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target); // Reveal once
            }
        });
    }, {
        threshold: 0.12,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(element => {
        observer.observe(element);
    });
}

/* --- TRACK ACTIVE SECTION FOR NAVBAR INDICATORS --- */
function initActiveNavObserver() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    const observerOptions = {
        root: null,
        threshold: 0.3,
        rootMargin: '-10% 0px -40% 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const activeId = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    if (link.getAttribute('href') === `#${activeId}`) {
                        link.classList.add('active');
                    } else {
                        link.classList.remove('active');
                    }
                });
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        observer.observe(section);
    });
}

/* --- PROJECT PORTFOLIO FILTERING --- */
function initProjectFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active from all
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active to current
            button.classList.add('active');
            
            const filterValue = button.getAttribute('data-filter');

            projectCards.forEach(card => {
                const category = card.getAttribute('data-category');
                
                // Add exit transition scale effect
                card.style.transform = 'scale(0.85)';
                card.style.opacity = '0';
                
                setTimeout(() => {
                    if (filterValue === 'all' || category === filterValue) {
                        card.style.display = 'flex';
                        setTimeout(() => {
                            card.style.transform = 'scale(1)';
                            card.style.opacity = '1';
                        }, 50);
                    } else {
                        card.style.display = 'none';
                    }
                }, 300);
            });
        });
    });
}

/* --- PROJECT CASE STUDY DETAILS DATA --- */
const projectDetailsData = {
    'research-pipeline': {
        category: 'Python & Research',
        title: 'Automated Research Document Parser',
        description: 'An automation pipeline that reads academic papers (PDF format), extracts text blocks, structures sections using keyword classifiers, and builds a JSON output containing metadata, indexable sections, citation counts, and bibtex references. Designed to aid research workflows by automating paper ingestion.',
        client: 'Self-Directed Research Project',
        tech: 'Python, PyPDF2, Re (Regex), NLTK, JSON',
        link: 'https://github.com/hafeezmuhammedn/research-parser',
        bodyText: 'This script utilizes regular expressions and lexical patterns to segment research documents. In validation tests, it parsed cross-references and structure with 92% accuracy, sorting bibliography details and building unified indexes for researchers to search locally.'
    },
    'data-structures': {
        category: 'C++',
        title: 'Visualizing Complex Graph Algorithms',
        description: 'A modular, high-performance C++ program demonstrating advanced graph representations (adjacency lists, matrices) and visual pathfinding. It includes custom implementations of Dijkstra\'s algorithm, Breadth-First Search, A*, and Prim\'s Minimum Spanning Tree (MST). Designed to focus on optimization and low-level memory usage.',
        client: 'University Engineering Coursework',
        tech: 'C++, Standard Template Library (STL), OOP principles',
        link: 'https://github.com/hafeezmuhammedn/cpp-graph-viz',
        bodyText: 'Created with object-oriented paradigms, classes are designed to scale. The algorithms run within optimal complexity boundaries, utilizing custom min-priority queues and optimized hash maps. Detailed time-complexity analyses are outputted alongside search progress logs.'
    },
    'web-portfolio': {
        category: 'HTML & CSS',
        title: 'Glassmorphism UI/UX Workspace',
        description: 'A UI toolkit demonstrating clean glassmorphism aesthetics. Utilizing high-end CSS parameters such as backdrop-filter, linear gradient borders, variable customization, and responsive flexboxes to construct a dashboard containing customizable charts, interactive alerts, and theme selectors.',
        client: 'Visual UI Practice',
        tech: 'HTML5, CSS Variables, Vanilla JS, Google Fonts',
        link: 'https://github.com/hafeezmuhammedn/glassmorphism-workspace',
        bodyText: 'This project highlights how fluid grid configurations and CSS transition keyframes can create a native app-like experience in standard browsers without using bulky frontend frameworks. Completely optimized for mobile viewports and high-DPI displays.'
    },
    'system-monitor': {
        category: 'Python / C Integration',
        title: 'System Core Performance Monitor',
        description: 'A hybrid utility displaying server/system hardware utilization stats in real-time. Features a lightweight C backend module retrieving low-level CPU registers and memory allocations directly, linked to a user-friendly Python wrapper that handles visualization and logging commands.',
        client: 'System Engineering Exploration',
        tech: 'Python, C Programming, ctypes, System APIs, IPC',
        link: 'https://github.com/hafeezmuhammedn/core-monitor',
        bodyText: 'Using Python\'s ctypes library, this project links dynamic C library exports (.dll/.so) into scripts, minimizing monitoring overhead to under 0.5% CPU resources. Includes log rotate features and alerts for anomalous temperature jumps.'
    }
};

/* --- DYNAMIC MODAL ACTIONS --- */
function openProjectModal(projectId) {
    const modal = document.getElementById('project-modal');
    const detailsContainer = document.getElementById('modal-project-details');
    const project = projectDetailsData[projectId];

    if (!project) return;

    detailsContainer.innerHTML = `
        <div class="modal-header-section">
            <span>${project.category}</span>
            <h2>${project.title}</h2>
        </div>
        <div class="modal-body-section">
            <p>${project.description}</p>
            
            <div class="modal-meta-box">
                <div class="modal-meta-item">
                    <h4>Focus / Context</h4>
                    <p>${project.client}</p>
                </div>
                <div class="modal-meta-item">
                    <h4>Tech Stack</h4>
                    <p>${project.tech}</p>
                </div>
            </div>
            
            <p>${project.bodyText}</p>
            
            <div class="modal-actions">
                <a href="${project.link}" target="_blank" rel="noopener noreferrer" class="btn btn-primary">
                    <i class="fa-brands fa-github"></i>
                    <span>Source Repository</span>
                </a>
                <button onclick="closeProjectModal()" class="btn btn-secondary">Close Details</button>
            </div>
        </div>
    `;

    modal.classList.add('active');
    document.body.style.overflow = 'hidden'; // Stop page scroll
}

function closeProjectModal(event) {
    const modal = document.getElementById('project-modal');
    modal.classList.remove('active');
    document.body.style.overflow = 'auto'; // Re-enable scroll
}

/* --- CONTACT FORM HANDLER --- */
function handleFormSubmit(event) {
    event.preventDefault();
    const form = document.getElementById('contact-form');
    const successMsg = document.getElementById('form-success-msg');
    
    // Animate form departure
    form.style.opacity = '0.3';
    form.style.pointerEvents = 'none';

    // Simulate server call
    setTimeout(() => {
        form.classList.add('hidden');
        successMsg.classList.remove('hidden');
        successMsg.style.opacity = '0';
        setTimeout(() => {
            successMsg.style.transition = 'opacity 0.5s ease';
            successMsg.style.opacity = '1';
        }, 50);
    }, 1000);
}
