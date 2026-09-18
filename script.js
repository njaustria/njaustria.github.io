const progressIndicator = document.querySelector('.progress-indicator');
let themeToggles = document.querySelectorAll('.theme-toggle');
const typedText = document.querySelector('.typed-text');
let sidebarLinks = document.querySelectorAll('.sidebar-nav a');
let mobileLinks = document.querySelectorAll('.mobile-nav a');
let sectionLinks = [...sidebarLinks, ...mobileLinks];

let activeLinkLockUntil = 0;

class CustomSidebar extends HTMLElement {
    connectedCallback() {
        const isSubFolder = window.location.pathname.includes('/pages/');
        const basePrefix = isSubFolder ? '../' : './';
        const pagePrefix = isSubFolder ? '' : 'pages/';

        this.innerHTML = `
        <aside class="sidebar d-none d-lg-flex">
            <div class="sidebar-inner">
                <a class="brand" href="${basePrefix}index.html">
                    <span>Neian Austria</span>
                </a>

                <nav class="sidebar-nav" aria-label="Sidebar navigation">
                    <a href="${basePrefix}index.html">Home</a>
                    <a href="${pagePrefix}education.html">Education</a>
                    <a href="${pagePrefix}skills.html">Skills</a>
                    <a href="${pagePrefix}projects.html">Projects</a>
                </nav>

                <div class="sidebar-footer">
                    <button class="theme-toggle" type="button" aria-label="Toggle dark mode">
                        <i class="bi bi-moon-stars"></i>
                    </button>
                </div>
            </div>
        </aside>
        `;

        const mobileNavContainer = document.querySelector('.mobile-nav');
        if (mobileNavContainer) {
            mobileNavContainer.innerHTML = `
                <a href="${basePrefix}index.html">Home</a>
                <a href="${pagePrefix}education.html">Education</a>
                <a href="${pagePrefix}skills.html">Skills</a>
                <a href="${pagePrefix}projects.html">Projects</a>
            `;
        }

        themeToggles = document.querySelectorAll('.theme-toggle');
        sidebarLinks = document.querySelectorAll('.sidebar-nav a');
        mobileLinks = document.querySelectorAll('.mobile-nav a');
        sectionLinks = [...sidebarLinks, ...mobileLinks];

        const currentPath = window.location.pathname;
        sectionLinks.forEach((link) => {
            const href = link.getAttribute('href');
            if (
                currentPath.endsWith(href) ||
                (href && href.endsWith('index.html') && (currentPath === '/' || currentPath.endsWith('/') || currentPath.endsWith('/index.html')))
            ) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });

        bindThemeToggles();
        syncThemeIcons();
    }
}
customElements.define('custom-sidebar', CustomSidebar);

const updateScrollProgress = () => {
    if (!progressIndicator) return;
    const scrollTop = window.scrollY;
    const height = document.documentElement.scrollHeight - window.innerHeight;
    const progress = height > 0 ? (scrollTop / height) * 100 : 0;
    progressIndicator.style.width = `${Math.min(progress, 100)}%`;
};

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.15 });

const initRevealAnimations = () => {
    const animatableItems = document.querySelectorAll('.reveal, .fade-in');
    animatableItems.forEach((item) => revealObserver.observe(item));
};

const animateCounters = () => {
    const counters = document.querySelectorAll('[data-counter]');

    counters.forEach((counter) => {
        const target = Number(counter.dataset.counter);
        const duration = 1400;

        const counterObserver = new IntersectionObserver((entries, obs) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const start = performance.now();
                    const step = (now) => {
                        const progress = Math.min((now - start) / duration, 1);
                        const value = Math.floor(progress * target);
                        counter.textContent = value;

                        if (progress < 1) {
                            requestAnimationFrame(step);
                        } else {
                            counter.textContent = target;
                        }
                    };
                    requestAnimationFrame(step);
                    obs.disconnect();
                }
            });
        }, { threshold: 0.7 });

        counterObserver.observe(counter);
    });
};

let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;

const typeLoop = () => {
    if (!typedText || !typedText.dataset.typed) return;

    let typeWords = [];
    try {
        typeWords = JSON.parse(typedText.dataset.typed);
    } catch (e) {
        return;
    }

    const currentWord = typeWords[wordIndex];
    if (!currentWord) return;

    typedText.textContent = currentWord.slice(0, charIndex);

    if (!isDeleting && charIndex < currentWord.length) {
        charIndex += 1;
    } else if (isDeleting && charIndex > 0) {
        charIndex -= 1;
    } else {
        isDeleting = !isDeleting;
        if (!isDeleting) {
            wordIndex = (wordIndex + 1) % typeWords.length;
        }
    }

    const typingSpeed = isDeleting ? 60 : 100;
    setTimeout(typeLoop, typingSpeed);
};

const setActiveLink = (activeLink) => {
    sectionLinks.forEach((link) => {
        link.classList.toggle('active', link === activeLink);
    });
    activeLinkLockUntil = performance.now() + 1000;
};

const updateActiveLinkOnScroll = () => {
    if (performance.now() < activeLinkLockUntil) return;

    const scrollPosition = window.scrollY + 140;
    const sections = document.querySelectorAll('main section[id]');

    if (sections.length === 0) return;

    sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        const sectionBottom = sectionTop + section.offsetHeight;

        if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
            sectionLinks.forEach((link) => {
                const targetId = link.getAttribute('href');
                if (targetId && targetId.startsWith('#')) {
                    link.classList.toggle('active', targetId === `#${section.id}`);
                }
            });
        }
    });
};

document.addEventListener('click', (event) => {
    const mobileLink = event.target.closest('.mobile-nav a');
    if (mobileLink) {
        const offcanvasEl = document.getElementById('mobileMenu');
        if (offcanvasEl && typeof bootstrap !== 'undefined') {
            const bsOffcanvas = bootstrap.Offcanvas.getInstance(offcanvasEl);
            if (bsOffcanvas) bsOffcanvas.hide();
        }
    }

    const anchor = event.target.closest('a[href^="#"]');
    if (!anchor) return;

    const targetId = anchor.getAttribute('href');
    if (!targetId || targetId === '#') return;

    const target = document.querySelector(targetId);
    if (!target) return;

    event.preventDefault();
    setActiveLink(anchor);
    target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    });
});

const syncThemeIcons = () => {
    const isDark = document.body.classList.contains('dark-mode');
    themeToggles.forEach((btn) => {
        const icon = btn.querySelector('i');
        if (icon) {
            icon.className = isDark ? 'bi bi-sun' : 'bi bi-moon-stars';
        }
    });
};

const initTheme = () => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
    } else {
        document.body.classList.remove('dark-mode');
    }
    syncThemeIcons();
};

const bindThemeToggles = () => {
    themeToggles.forEach((btn) => {
        btn.onclick = () => {
            document.body.classList.toggle('dark-mode');
            const isDark = document.body.classList.contains('dark-mode');
            localStorage.setItem('theme', isDark ? 'dark' : 'light');
            syncThemeIcons();
        };
    });
};

window.addEventListener('scroll', () => {
    updateScrollProgress();
    updateActiveLinkOnScroll();
});

window.addEventListener('DOMContentLoaded', () => {
    initTheme();
    bindThemeToggles();
    initRevealAnimations();
    animateCounters();
    typeLoop();
    updateScrollProgress();
    updateActiveLinkOnScroll();
});