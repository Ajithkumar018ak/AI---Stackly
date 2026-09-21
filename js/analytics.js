/* ============================================================
   TALENTIQ — ENTERPRISE ANALYTICS & INTERACTIVE SVG CHARTS
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  initSVGCharts();
  initAdminDataTables();
});

/* 1. SVG Chart Renderer */
function initSVGCharts() {
  renderPipelineChart();
  renderVelocityChart();
  renderMonthlyActivityChart();
}

function renderPipelineChart() {
  const container = document.getElementById('pipelineChartSvg');
  if (!container) return;

  const data = [
    { stage: 'Applications', count: 12480, color: '#5B8CFF' },
    { stage: 'AI Screened', count: 4210, color: '#36C7D9' },
    { stage: 'Shortlisted', count: 1860, color: '#7AA2FF' },
    { stage: 'Interviews', count: 720, color: '#F3B45C' },
    { stage: 'Offers Made', count: 180, color: '#35C98A' }
  ];

  const maxVal = 13000;
  let svgContent = `<svg viewBox="0 0 500 220" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">`;

  data.forEach((item, index) => {
    const barHeight = (item.count / maxVal) * 160;
    const x = 30 + index * 90;
    const y = 180 - barHeight;

    svgContent += `
      <rect x="${x}" y="${y}" width="50" height="${barHeight}" rx="6" fill="${item.color}" opacity="0.9">
        <animate attributeName="height" from="0" to="${barHeight}" dur="1s" begin="${index * 0.15}s" fill="freeze" />
        <animate attributeName="y" from="180" to="${y}" dur="1s" begin="${index * 0.15}s" fill="freeze" />
      </rect>
      <text x="${x + 25}" y="${y - 8}" fill="#F8FAFC" font-size="11" font-weight="700" text-anchor="middle">${item.count.toLocaleString()}</text>
      <text x="${x + 25}" y="202" fill="#B6C0CF" font-size="11" text-anchor="middle">${item.stage}</text>
    `;
  });

  svgContent += `</svg>`;
  container.innerHTML = svgContent;
}

function renderVelocityChart() {
  const container = document.getElementById('velocityChartSvg');
  if (!container) return;

  const points = [
    { x: 30, y: 140, label: 'Jan' },
    { x: 110, y: 110, label: 'Feb' },
    { x: 190, y: 130, label: 'Mar' },
    { x: 270, y: 80, label: 'Apr' },
    { x: 350, y: 60, label: 'May' },
    { x: 430, y: 40, label: 'Jun' }
  ];

  const pathD = points.reduce((acc, p, i) => i === 0 ? `M ${p.x} ${p.y}` : `${acc} L ${p.x} ${p.y}`, '');
  const areaD = `${pathD} L 430 180 L 30 180 Z`;

  let svgContent = `
    <svg viewBox="0 0 460 200" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#36C7D9" stop-opacity="0.4"/>
          <stop offset="100%" stop-color="#36C7D9" stop-opacity="0"/>
        </linearGradient>
      </defs>
      <path d="${areaD}" fill="url(#areaGrad)" />
      <path d="${pathD}" fill="none" stroke="#36C7D9" stroke-width="3" stroke-linecap="round" />
  `;

  points.forEach(p => {
    svgContent += `
      <circle cx="${p.x}" cy="${p.y}" r="5" fill="#36C7D9" stroke="#07111F" stroke-width="2" />
      <text x="${p.x}" y="195" fill="#B6C0CF" font-size="11" text-anchor="middle">${p.label}</text>
    `;
  });

  svgContent += `</svg>`;
  container.innerHTML = svgContent;
}

function renderMonthlyActivityChart() {
  const container = document.getElementById('activityChartSvg');
  if (!container) return;

  const data = [
    { month: 'Jul', screenings: 140, matches: 110 },
    { month: 'Aug', screenings: 180, matches: 145 },
    { month: 'Sep', screenings: 230, matches: 195 },
    { month: 'Oct', screenings: 290, matches: 240 },
    { month: 'Nov', screenings: 340, matches: 285 },
    { month: 'Dec', screenings: 410, matches: 360 }
  ];

  let svgContent = `<svg viewBox="0 0 480 200" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">`;

  data.forEach((d, i) => {
    const x = 40 + i * 72;
    const h1 = (d.screenings / 450) * 140;
    const h2 = (d.matches / 450) * 140;

    svgContent += `
      <rect x="${x}" y="${160 - h1}" width="18" height="${h1}" rx="3" fill="#5B8CFF" />
      <rect x="${x + 22}" y="${160 - h2}" width="18" height="${h2}" rx="3" fill="#36C7D9" />
      <text x="${x + 20}" y="182" fill="#B6C0CF" font-size="11" text-anchor="middle">${d.month}</text>
    `;
  });

  svgContent += `</svg>`;
  container.innerHTML = svgContent;
}

/* 2. Admin Interactive Data Table (Search, Filter, Sort, Pagination) */
function initAdminDataTables() {
  const searchInput = document.getElementById('tableSearchInput');
  const statusFilter = document.getElementById('tableStatusFilter');
  const table = document.getElementById('adminDataTable');

  if (!table) return;

  const rows = Array.from(table.querySelectorAll('tbody tr'));
  
  function filterTable() {
    const query = searchInput ? searchInput.value.toLowerCase().trim() : '';
    const status = statusFilter ? statusFilter.value.toLowerCase() : 'all';

    rows.forEach(row => {
      const text = row.textContent.toLowerCase();
      const rowStatus = row.dataset.status ? row.dataset.status.toLowerCase() : '';

      const matchesSearch = query === '' || text.includes(query);
      const matchesStatus = status === 'all' || rowStatus === status;

      if (matchesSearch && matchesStatus) {
        row.style.display = '';
      } else {
        row.style.display = 'none';
      }
    });
  }

  if (searchInput) searchInput.addEventListener('input', filterTable);
  if (statusFilter) statusFilter.addEventListener('change', filterTable);
}
