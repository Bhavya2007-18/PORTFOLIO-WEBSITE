/* ════════════════════════════════════════════════════════
   BHAVYA PORWAL — Portfolio JS
   ════════════════════════════════════════════════════════ */

'use strict';

/* ── CUSTOM CURSOR ────────────────────────────────────── */
const cursor = document.getElementById('cursor');
const follower = document.getElementById('cursor-follower');

if (cursor && follower) {
  let mouseX = 0, mouseY = 0;
  let followerX = 0, followerY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursor.style.left = mouseX + 'px';
    cursor.style.top  = mouseY + 'px';
  });

  // Smooth follower
  function animateFollower() {
    followerX += (mouseX - followerX) * 0.12;
    followerY += (mouseY - followerY) * 0.12;
    follower.style.left = followerX + 'px';
    follower.style.top  = followerY + 'px';
    requestAnimationFrame(animateFollower);
  }
  animateFollower();

  // Cursor hover state on interactive elements
  const hoverEls = document.querySelectorAll('a, button, .build-card, .lab-card, .currently-item, .project-visual');
  hoverEls.forEach(el => {
    el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
    el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
  });

  // Hide cursor when leaving window
  document.addEventListener('mouseleave', () => {
    cursor.style.opacity = '0';
    follower.style.opacity = '0';
  });
  document.addEventListener('mouseenter', () => {
    cursor.style.opacity = '1';
    follower.style.opacity = '1';
  });
}

/* ── NAV SCROLL BEHAVIOUR ─────────────────────────────── */
const nav = document.getElementById('nav');

function handleNavScroll() {
  if (window.scrollY > 40) {
    nav.classList.add('scrolled');
  } else {
    nav.classList.remove('scrolled');
  }
}

window.addEventListener('scroll', handleNavScroll, { passive: true });
handleNavScroll();

/* ── MOBILE MENU ──────────────────────────────────────── */
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobile-menu');

if (hamburger && mobileMenu) {
  hamburger.addEventListener('click', () => {
    const isOpen = mobileMenu.classList.toggle('open');
    hamburger.classList.toggle('open', isOpen);
    hamburger.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  // Close on link click
  mobileMenu.querySelectorAll('.mobile-link').forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.remove('open');
      hamburger.classList.remove('open');
      hamburger.setAttribute('aria-label', 'Open menu');
      document.body.style.overflow = '';
    });
  });
}

/* ── INTERSECTION OBSERVER — REVEAL ANIMATIONS ────────── */
const revealObserverOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -60px 0px',
};

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, revealObserverOptions);

document.querySelectorAll('.reveal-up').forEach(el => revealObserver.observe(el));

/* Philosophy reveal with staggered delay */
const philObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const index = parseInt(entry.target.dataset.index, 10) || 0;
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, index * 140);
      philObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.reveal-philosophy').forEach(el => philObserver.observe(el));

/* ── HERO TEXT — STAGGERED ENTRY ──────────────────────── */
// Hero elements animate on load, not on scroll
function triggerHeroReveal() {
  const heroEls = document.querySelectorAll('.hero .reveal-up');
  heroEls.forEach(el => {
    const delay = parseFloat(el.dataset.delay || 0) * 120;
    setTimeout(() => el.classList.add('visible'), 300 + delay);
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', triggerHeroReveal);
} else {
  triggerHeroReveal();
}

// Remove hero elements from scroll observer (they animate on load)
document.querySelectorAll('.hero .reveal-up').forEach(el => {
  revealObserver.unobserve(el);
});

/* ── HORIZONTAL MARQUEE — CURRENTLY SECTION ──────────── */
// Subtle parallax on section numbers
function initParallaxNumbers() {
  const numbers = document.querySelectorAll('.section-number');

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    numbers.forEach(num => {
      const rect = num.parentElement.getBoundingClientRect();
      const centerOffset = (window.innerHeight / 2) - (rect.top + rect.height / 2);
      num.style.transform = `translateY(${centerOffset * 0.03}px)`;
    });
  }, { passive: true });
}

initParallaxNumbers();

/* ── SMOOTH ANCHOR SCROLLING ──────────────────────────── */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    const navH = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-h'), 10) || 72;
    const top = target.getBoundingClientRect().top + window.scrollY - navH;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});

/* ── PROJECT VISUAL — HOVER GLOW ─────────────────────── */
document.querySelectorAll('.project-visual-inner').forEach(visual => {
  visual.addEventListener('mousemove', (e) => {
    const rect = visual.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    visual.style.setProperty('--mx', `${x}%`);
    visual.style.setProperty('--my', `${y}%`);
  });
});

/* ── TERMINAL — TYPING ANIMATION ──────────────────────── */
function initTerminalTyping() {
  const terminal = document.querySelector('.terminal');
  if (!terminal) return;

  const rows = terminal.querySelectorAll('.t-row');

  const termObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      rows.forEach((row, i) => {
        row.style.opacity = '0';
        row.style.transform = 'translateX(-8px)';
        row.style.transition = 'opacity 0.35s ease, transform 0.35s ease';
        setTimeout(() => {
          row.style.opacity = '1';
          row.style.transform = 'translateX(0)';
        }, 600 + i * 120);
      });
      termObserver.unobserve(entry.target);
    });
  }, { threshold: 0.5 });

  termObserver.observe(terminal);
}

initTerminalTyping();

/* ── STACK — RANDOM HIGHLIGHT ─────────────────────────── */
function initStackHighlight() {
  const items = Array.from(document.querySelectorAll('.stack-col li'));
  if (items.length === 0) return;

  let currentIndex = -1;

  function highlight() {
    if (currentIndex >= 0) {
      items[currentIndex].style.color = '';
      items[currentIndex].style.paddingLeft = '';
    }
    currentIndex = Math.floor(Math.random() * items.length);
    items[currentIndex].style.color = 'var(--fg)';
    items[currentIndex].style.paddingLeft = '8px';
    setTimeout(highlight, 1200);
  }

  // Only start once the section is visible
  const stackSection = document.querySelector('.stack');
  if (!stackSection) return;

  const stackObserver = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      setTimeout(highlight, 800);
      stackObserver.disconnect();
    }
  }, { threshold: 0.3 });

  stackObserver.observe(stackSection);
}

initStackHighlight();

/* ── FOOTER HEADING — SCALE ON SCROLL ────────────────── */
function initFooterScale() {
  const heading = document.querySelector('.footer-heading');
  if (!heading) return;

  window.addEventListener('scroll', () => {
    const rect = heading.getBoundingClientRect();
    const progress = Math.max(0, Math.min(1, 1 - (rect.top / window.innerHeight)));
    const scale = 0.88 + progress * 0.12;
    heading.style.transform = `scale(${scale})`;
    heading.style.transformOrigin = 'left center';
  }, { passive: true });
}

initFooterScale();

/* ── ACTIVE NAV LINK ──────────────────────────────────── */
function initActiveNav() {
  const sections = document.querySelectorAll('section[id], footer[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          link.style.color = link.getAttribute('href') === `#${id}` ? 'var(--fg)' : '';
        });
      }
    });
  }, { threshold: 0.4 });

  sections.forEach(sec => observer.observe(sec));
}

initActiveNav();
