/* ============================================================
   ATIF PORTFOLIO — script.js
   ============================================================ */

/* ── MODAL SYSTEM ──────────────────────────────────────────────
   Fix: modals now use the `.open` CSS class (display:flex)
   instead of toggling inline display style, which was causing
   the "modal not working" bug on some browsers/interactions.
   ──────────────────────────────────────────────────────────── */

/**
 * Open a modal by ID.
 * @param {string} id - The id of the modal element.
 */
function openModal(id) {
    const modal = document.getElementById(id);
    if (!modal) return;

    modal.classList.add('open');
    document.body.style.overflow = 'hidden'; // Prevent background scroll

    // Trap focus: focus the close button inside the modal
    const closeBtn = modal.querySelector('.modal-close');
    if (closeBtn) setTimeout(() => closeBtn.focus(), 50);
}

/**
 * Close a modal by ID.
 * @param {string} id - The id of the modal element.
 */
function closeModal(id) {
    const modal = document.getElementById(id);
    if (!modal) return;

    modal.classList.remove('open');
    document.body.style.overflow = ''; // Restore scroll
}

/** Close any open modal when pressing Escape */
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        document.querySelectorAll('.modal.open').forEach(modal => {
            modal.classList.remove('open');
        });
        document.body.style.overflow = '';
    }
});

/** Allow keyboard activation of project cards (Enter / Space) */
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            card.click();
        }
    });
});

/* ── NAVBAR: shrink on scroll + active link highlight ────────── */
const navbar = document.getElementById('navbar');
const sections = document.querySelectorAll('section[id], header.hero');
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    // Shrink navbar when scrolled down
    if (window.scrollY > 60) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    // Highlight the active nav link based on scroll position
    let currentSection = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        if (window.scrollY >= sectionTop) {
            currentSection = section.getAttribute('id') || '';
        }
    });

    navLinks.forEach(link => {
        link.style.color = '';
        link.style.background = '';
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.style.color = 'var(--text)';
            link.style.background = 'var(--surface)';
        }
    });
}, { passive: true });

/* ── MOBILE MENU ─────────────────────────────────────────────── */
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

hamburger.addEventListener('click', () => {
    const isOpen = mobileMenu.classList.toggle('open');
    // Animate hamburger → X
    hamburger.setAttribute('aria-expanded', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
});

/** Called from onclick in mobile menu links */
function closeMobileMenu() {
    mobileMenu.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
}

/* ── SCROLL FADE-UP ANIMATION ────────────────────────────────── */
const fadeUpObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Stop observing once visible (one-shot animation)
                fadeUpObserver.unobserve(entry.target);
            }
        });
    },
    { threshold: 0.12 }
);

document.querySelectorAll('.fade-up').forEach(el => fadeUpObserver.observe(el));