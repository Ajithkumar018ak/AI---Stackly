/* ============================================================
   TALENTIQ — FORM VALIDATION & AUTH REDIRECTION ENGINE
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  initPasswordToggle();
  initLoginFormValidation();
  initSignUpFormValidation();
  initForgotFormValidation();
  initNewsletterValidation();
  initContactFormValidation();
  initFooterNewsletter();
});

/* 1. Password Eye Toggle */
function initPasswordToggle() {
  const toggles = document.querySelectorAll('.password-toggle');
  toggles.forEach(toggle => {
    toggle.addEventListener('click', () => {
      const input = toggle.parentElement.querySelector('input');
      if (!input) return;

      if (input.type === 'password') {
        input.type = 'text';
        toggle.innerHTML = '👁️';
      } else {
        input.type = 'password';
        toggle.innerHTML = '🔒';
      }
    });
  });
}

/* 2. Login Form Submissions & Demo Redirects */
function initLoginFormValidation() {
  const userLoginForm = document.getElementById('userLoginForm');
  const loginSubmitBtn = document.getElementById('loginSubmitBtn');
  const adminSubmitBtn = document.getElementById('adminSubmitBtn');

  if (loginSubmitBtn) {
    loginSubmitBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const email = document.getElementById('loginEmail')?.value.trim();
      const password = document.getElementById('loginPassword')?.value.trim();

      if (!email || !password) {
        showFormMessage('loginError', 'Please fill in both email and password.');
        return;
      }

      // Demo User Login Redirect
      window.location.href = 'user-dashboard.html';
    });
  }

  if (adminSubmitBtn) {
    adminSubmitBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const email = document.getElementById('loginEmail')?.value.trim();
      const password = document.getElementById('loginPassword')?.value.trim();

      if (!email || !password) {
        showFormMessage('loginError', 'Please fill in both admin email and password.');
        return;
      }

      // Demo Admin Login Redirect
      window.location.href = 'admin-dashboard.html';
    });
  }
}

/* 3. Sign Up Form Validation */
function initSignUpFormValidation() {
  const signUpBtn = document.getElementById('signUpSubmitBtn');
  const nameInput = document.getElementById('signUpName');
  const phoneInput = document.getElementById('signUpPhone');

  // Enforce input rules live
  if (nameInput) {
    nameInput.addEventListener('input', () => {
      nameInput.value = nameInput.value.replace(/[^A-Za-z\s]/g, '');
    });
  }

  if (phoneInput) {
    phoneInput.addEventListener('input', () => {
      phoneInput.value = phoneInput.value.replace(/\D/g, '').slice(0, 10);
    });
  }

  if (signUpBtn) {
    signUpBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const name = nameInput?.value.trim();
      const email = document.getElementById('signUpEmail')?.value.trim();
      const phone = phoneInput?.value.trim();
      const password = document.getElementById('signUpPassword')?.value.trim();
      const confirmPassword = document.getElementById('signUpConfirmPassword')?.value.trim();

      if (!name || !email || !phone || !password || !confirmPassword) {
        showFormMessage('signUpError', 'Please complete all required fields.');
        return;
      }

      if (!/^[A-Za-z\s]+$/.test(name)) {
        showFormMessage('signUpError', 'Name must contain letters and spaces only.');
        return;
      }

      if (!/^\d{10}$/.test(phone)) {
        showFormMessage('signUpError', 'Mobile number must be exactly 10 digits.');
        return;
      }

      if (!isValidEmail(email)) {
        showFormMessage('signUpError', 'Please enter a valid email address.');
        return;
      }

      if (password.length < 8) {
        showFormMessage('signUpError', 'Password must be at least 8 characters long.');
        return;
      }

      if (password !== confirmPassword) {
        showFormMessage('signUpError', 'Passwords do not match.');
        return;
      }

      // Success
      hideFormMessage('signUpError');
      showFormMessage('signUpSuccess', 'Account created successfully! You can now sign in.');
    });
  }
}

/* 4. Forgot Password */
function initForgotFormValidation() {
  const resetBtn = document.getElementById('resetSubmitBtn');
  if (!resetBtn) return;

  resetBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const email = document.getElementById('forgotEmail')?.value.trim();

    if (!email || !isValidEmail(email)) {
      showFormMessage('forgotError', 'Please enter a valid registered email.');
      return;
    }

    hideFormMessage('forgotError');
    showFormMessage('forgotSuccess', 'Password reset instructions sent to your email address.');
  });
}

/* 5. Footer Newsletter Validation */
function initNewsletterValidation() {
  const forms = document.querySelectorAll('.newsletter-form');
  forms.forEach(form => {
    const input = form.querySelector('input[type="email"]');
    const button = form.querySelector('button');
    const msg = form.parentElement.querySelector('.newsletter-msg');

    if (!button || !input) return;

    button.addEventListener('click', (e) => {
      e.preventDefault();
      const email = input.value.trim();

      if (!isValidEmail(email)) {
        if (msg) {
          msg.textContent = 'Please enter a valid email address.';
          msg.style.color = 'var(--danger)';
          msg.style.display = 'block';
        }
        return;
      }

      input.value = '';
      if (msg) {
        msg.textContent = "You're subscribed successfully.";
        msg.style.color = 'var(--success)';
        msg.style.display = 'block';
      }
    });
  });
}

/* 6. Contact Form Validation */
function initContactFormValidation() {
  const contactForm = document.getElementById('contactForm');
  if (!contactForm) return;

  const nameInput = document.getElementById('contactName');
  const phoneInput = document.getElementById('contactPhone');
  const emailInput = document.getElementById('contactEmail');
  const msgContainer = document.getElementById('contactFormMsg');

  if (nameInput) {
    nameInput.addEventListener('input', () => {
      nameInput.value = nameInput.value.replace(/[^A-Za-z\s]/g, '');
    });
  }

  if (phoneInput) {
    phoneInput.addEventListener('input', () => {
      phoneInput.value = phoneInput.value.replace(/\D/g, '');
    });
  }

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = nameInput?.value.trim();
    const phone = phoneInput?.value.trim();
    const email = emailInput?.value.trim();
    const message = document.getElementById('contactMessage')?.value.trim();

    if (!name || !email || !phone || !message) {
      if (msgContainer) {
        msgContainer.textContent = 'Please complete all required fields.';
        msgContainer.className = 'form-error-msg';
        msgContainer.style.display = 'block';
      }
      return;
    }

    if (!/^[A-Za-z\s]+$/.test(name)) {
      if (msgContainer) {
        msgContainer.textContent = 'Name can only contain letters and spaces.';
        msgContainer.className = 'form-error-msg';
        msgContainer.style.display = 'block';
      }
      return;
    }

    if (!/^\d+$/.test(phone)) {
      if (msgContainer) {
        msgContainer.textContent = 'Phone number must contain digits only.';
        msgContainer.className = 'form-error-msg';
        msgContainer.style.display = 'block';
      }
      return;
    }

    if (!isValidEmail(email)) {
      if (msgContainer) {
        msgContainer.textContent = 'Please enter a valid work email address.';
        msgContainer.className = 'form-error-msg';
        msgContainer.style.display = 'block';
      }
      return;
    }

    contactForm.reset();
    if (msgContainer) {
      msgContainer.textContent = 'Thank you! Your message has been sent to our recruitment team.';
      msgContainer.className = 'form-success-msg';
      msgContainer.style.display = 'block';
    }
  });
}

/* Helpers */
function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function showFormMessage(elementId, text) {
  const el = document.getElementById(elementId);
  if (el) {
    el.textContent = text;
    el.style.display = 'block';
  }
}

function hideFormMessage(elementId) {
  const el = document.getElementById(elementId);
  if (el) {
    el.style.display = 'none';
  }
}

/* Footer Newsletter Handler */
function initFooterNewsletter() {
  const form = document.getElementById('footerNewsletterForm');
  const msgEl = document.getElementById('footerNewsletterMsg');
  if (!form || !msgEl) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const input = document.getElementById('footerEmailInput');
    const email = input ? input.value.trim() : '';

    msgEl.className = 'newsletter-msg';
    msgEl.textContent = '';

    if (!email) {
      msgEl.textContent = 'Please enter your email address.';
      msgEl.classList.add('error');
      return;
    }

    if (!isValidEmail(email)) {
      msgEl.textContent = 'Please enter a valid email address.';
      msgEl.classList.add('error');
      return;
    }

    // Success state
    msgEl.textContent = '✓ You\'re subscribed! Expect great insights soon.';
    msgEl.classList.add('success');
    if (input) input.value = '';

    setTimeout(() => {
      msgEl.textContent = '';
      msgEl.className = 'newsletter-msg';
    }, 5000);
  });
}

