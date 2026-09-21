/* ============================================================
   TALENTIQ — PRELOADER, SCROLL REVEAL & COUNTER ANIMATIONS
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  initPreloader();
  initScrollReveals();
  initScoreCircle();
  initFAQAccordion();
});

/* 1. AI Preloader Sequence */
function initPreloader() {
  const preloader = document.getElementById('preloader');
  const fill = document.getElementById('preloaderFill');
  const percent = document.getElementById('preloaderPercent');
  const status = document.getElementById('preloaderStatus');

  if (!preloader) return;

  // Prevent background scrolling during preloader
  document.body.classList.add('scroll-locked');

  const steps = [
    { pct: 0, text: 'AI SYSTEM INITIALIZING...' },
    { pct: 35, text: 'AI SCANNING PROFILE DATA...' },
    { pct: 70, text: 'MATCHING TALENT PIPELINE...' },
    { pct: 92, text: 'SYSTEM READY' },
    { pct: 100, text: 'TALENTIQ ACTIVE' }
  ];

  let currentStep = 0;
  const interval = setInterval(() => {
    if (currentStep < steps.length) {
      const { pct, text } = steps[currentStep];
      if (fill) fill.style.width = `${pct}%`;
      if (percent) percent.textContent = `${pct}%`;
      if (status) status.textContent = text;
      currentStep++;
    } else {
      clearInterval(interval);
      setTimeout(() => {
        preloader.classList.add('hidden');
        document.body.classList.remove('scroll-locked');
        // Trigger initial reveal animations
        triggerScrollReveals();
      }, 300);
    }
  }, 220);
}

/* 2. Scroll Reveals (IntersectionObserver) */
function initScrollReveals() {
  const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');
  if (!revealElements.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        
        // If element contains counters, trigger counter animation
        const counters = entry.target.querySelectorAll('.counter-num');
        counters.forEach(counter => animateCounter(counter));

        // Unobserve after animating once
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -40px 0px'
  });

  revealElements.forEach(el => observer.observe(el));
}

function triggerScrollReveals() {
  const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');
  revealElements.forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight) {
      el.classList.add('revealed');
      const counters = el.querySelectorAll('.counter-num');
      counters.forEach(counter => animateCounter(counter));
    }
  });
}

/* 3. Number Counter Animation */
function animateCounter(counterEl) {
  if (counterEl.dataset.animated) return;
  counterEl.dataset.animated = "true";

  const target = parseInt(counterEl.dataset.target || counterEl.textContent.replace(/[^0-9]/g, ''), 10);
  const suffix = counterEl.dataset.suffix || '';
  const prefix = counterEl.dataset.prefix || '';
  const duration = 1800; // ms
  const stepTime = 20;
  const steps = duration / stepTime;
  const increment = target / steps;

  let current = 0;
  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      current = target;
      clearInterval(timer);
    }
    counterEl.textContent = `${prefix}${Math.floor(current).toLocaleString()}${suffix}`;
  }, stepTime);
}

/* 4. Score SVG Ring Animation */
function initScoreCircle() {
  const scoreCircle = document.querySelector('.score-circle-fill');
  if (!scoreCircle) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        scoreCircle.classList.add('animated');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  observer.observe(scoreCircle);
}

/* 5. FAQ Accordion Animation */
function initFAQAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const header = item.querySelector('.faq-question');
    if (!header) return;

    header.addEventListener('click', () => {
      const isOpen = item.classList.contains('active');
      
      // Close all other items
      faqItems.forEach(other => other.classList.remove('active'));

      if (!isOpen) {
        item.classList.add('active');
      }
    });
  });
}
