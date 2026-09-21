/* ============================================================
   TALENTIQ — USER DASHBOARD CONTROLLER
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  initDashboardSidebar();
  initCandidateFilterTabs();
});

function initDashboardSidebar() {
  const sidebarToggle = document.getElementById('sidebarToggleBtn');
  const sidebar = document.querySelector('.dashboard-sidebar');
  const overlay = document.getElementById('sidebarOverlay');

  if (sidebarToggle && sidebar) {
    sidebarToggle.addEventListener('click', () => {
      sidebar.classList.toggle('active');
      if (overlay) overlay.classList.toggle('active');
    });
  }

  if (overlay) {
    overlay.addEventListener('click', () => {
      sidebar.classList.remove('active');
      overlay.classList.remove('active');
    });
  }

  // Sidebar link clicks
  const sidebarLinks = document.querySelectorAll('.sidebar-link');
  sidebarLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      // Keep active styling demo
      sidebarLinks.forEach(l => l.classList.remove('active'));
      link.classList.add('active');
    });
  });
}

function initCandidateFilterTabs() {
  const filterBtns = document.querySelectorAll('.candidate-filter-btn');
  const candidateCards = document.querySelectorAll('.candidate-card-item');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;

      candidateCards.forEach(card => {
        if (filter === 'all' || card.dataset.status === filter) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}
