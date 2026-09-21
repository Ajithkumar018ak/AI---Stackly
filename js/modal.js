/* ============================================================
   TALENTIQ — AUTHENTICATION POPUP MODAL CONTROLLER
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  initAuthModal();
});

function initAuthModal() {
  const loginModal = document.getElementById('loginModal');
  const openModalBtns = document.querySelectorAll('.open-login-btn');
  const closeModalBtn = document.getElementById('closeModalBtn');
  
  const authTabs = document.querySelectorAll('.auth-tab');
  const loginFormState = document.getElementById('loginSection');
  const forgotFormState = document.getElementById('forgotSection');
  const signUpFormState = document.getElementById('signUpSection');

  const goToForgotLink = document.getElementById('goToForgot');
  const goToSignUpLink = document.getElementById('goToSignUp');
  const backToLoginLinks = document.querySelectorAll('.back-to-login');

  const loginSubmitBtn = document.getElementById('loginSubmitBtn');
  const adminSubmitBtn = document.getElementById('adminSubmitBtn');

  let currentAuthRole = 'user'; // 'user' or 'admin'

  if (!loginModal) return;

  // Open Modal
  const openModal = (role = 'user') => {
    currentAuthRole = role;
    loginModal.classList.add('active');
    document.body.classList.add('scroll-locked');
    setAuthRoleTab(role);
    showFormState('login');
  };

  // Close Modal
  const closeModal = () => {
    loginModal.classList.remove('active');
    document.body.classList.remove('scroll-locked');
  };

  // Attach Event Listeners to Open Buttons
  openModalBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const role = btn.dataset.role || 'user';
      openModal(role);
    });
  });

  if (closeModalBtn) closeModalBtn.addEventListener('click', closeModal);

  // Outside backdrop click
  loginModal.addEventListener('click', (e) => {
    if (e.target === loginModal) {
      closeModal();
    }
  });

  // ESC Key listener
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && loginModal.classList.contains('active')) {
      closeModal();
    }
  });

  // Switch between USER and ADMIN Login Tabs
  authTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const role = tab.dataset.role;
      setAuthRoleTab(role);
    });
  });

  function setAuthRoleTab(role) {
    currentAuthRole = role;
    authTabs.forEach(t => t.classList.remove('active'));
    const targetTab = document.querySelector(`.auth-tab[data-role="${role}"]`);
    if (targetTab) targetTab.classList.add('active');

    if (role === 'admin') {
      if (loginSubmitBtn) loginSubmitBtn.style.display = 'none';
      if (adminSubmitBtn) adminSubmitBtn.style.display = 'block';
    } else {
      if (loginSubmitBtn) loginSubmitBtn.style.display = 'block';
      if (adminSubmitBtn) adminSubmitBtn.style.display = 'none';
    }
  }

  // Switch Form States
  function showFormState(state) {
    if (loginFormState) loginFormState.classList.remove('active');
    if (forgotFormState) forgotFormState.classList.remove('active');
    if (signUpFormState) signUpFormState.classList.remove('active');

    if (state === 'login' && loginFormState) loginFormState.classList.add('active');
    if (state === 'forgot' && forgotFormState) forgotFormState.classList.add('active');
    if (state === 'signup' && signUpFormState) signUpFormState.classList.add('active');
  }

  if (goToForgotLink) {
    goToForgotLink.addEventListener('click', (e) => {
      e.preventDefault();
      showFormState('forgot');
    });
  }

  if (goToSignUpLink) {
    goToSignUpLink.addEventListener('click', (e) => {
      e.preventDefault();
      showFormState('signup');
    });
  }

  backToLoginLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      showFormState('login');
    });
  });
}
