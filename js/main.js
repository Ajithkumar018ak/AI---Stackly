/* ============================================================
   TALENTIQ — MAIN INITIALIZATION & UI INTERACTION SYSTEM
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  initScrollProgress();
  initBackToTop();
  initCustomCursor();
  initMagneticButtons();
  initRippleEffect();
});

/* 1. Scroll Progress Bar */
function initScrollProgress() {
  const progressBar = document.getElementById('scrollProgressFill');
  if (!progressBar) return;

  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const progress = (scrollTop / docHeight) * 100;
    progressBar.style.width = `${Math.min(100, Math.max(0, progress))}%`;
  });
}

/* 2. Back To Top Button */
function initBackToTop() {
  const backBtn = document.getElementById('backToTopBtn');
  if (!backBtn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      backBtn.classList.add('active');
    } else {
      backBtn.classList.remove('active');
    }
  });

  backBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

/* 3. Custom Cursor System (Desktop Only) */
function initCustomCursor() {
  if (window.matchMedia('(max-width: 1024px)').matches || 'ontouchstart' in window) return;

  let cursorDot = document.querySelector('.custom-cursor-dot');
  let cursorCircle = document.querySelector('.custom-cursor-circle');

  if (!cursorDot) {
    cursorDot = document.createElement('div');
    cursorDot.className = 'custom-cursor-dot';
    document.body.appendChild(cursorDot);
  }

  if (!cursorCircle) {
    cursorCircle = document.createElement('div');
    cursorCircle.className = 'custom-cursor-circle';
    cursorCircle.innerHTML = '<span>View</span>';
    document.body.appendChild(cursorCircle);
  }

  let mouseX = 0, mouseY = 0;
  let circleX = 0, circleY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursorDot.style.left = `${mouseX}px`;
    cursorDot.style.top = `${mouseY}px`;
  });

  function animateCircle() {
    circleX += (mouseX - circleX) * 0.15;
    circleY += (mouseY - circleY) * 0.15;
    cursorCircle.style.left = `${circleX}px`;
    cursorCircle.style.top = `${circleY}px`;
    requestAnimationFrame(animateCircle);
  }
  animateCircle();

  // Hover States
  const interactiveElements = document.querySelectorAll('a, button, input, select, textarea, .btn, .hover-lift');
  interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
    el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
  });

  const imageWrappers = document.querySelectorAll('.image-cursor-wrapper, .hero-image-frame, img');
  imageWrappers.forEach(img => {
    img.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover-image'));
    img.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover-image'));
  });
}

/* 4. Magnetic Buttons */
function initMagneticButtons() {
  if (window.innerWidth <= 1024) return;

  const magneticBtns = document.querySelectorAll('.magnetic-btn');
  magneticBtns.forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      btn.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
    });

    btn.addEventListener('mouseleave', () => {
      btn.style.transform = 'translate(0px, 0px)';
    });
  });
}

/* 5. Click Ripple Effect */
function initRippleEffect() {
  const rippleElements = document.querySelectorAll('.btn, .auth-tab, .drawer-menu-item a');

  rippleElements.forEach(el => {
    el.addEventListener('click', function (e) {
      const rect = this.getBoundingClientRect();
      const ripple = document.createElement('span');
      ripple.className = 'ripple';
      
      const diameter = Math.max(rect.width, rect.height);
      const radius = diameter / 2;

      ripple.style.width = ripple.style.height = `${diameter}px`;
      ripple.style.left = `${e.clientX - rect.left - radius}px`;
      ripple.style.top = `${e.clientY - rect.top - radius}px`;

      const existing = this.querySelector('.ripple');
      if (existing) existing.remove();

      this.appendChild(ripple);
    });
  });
}
