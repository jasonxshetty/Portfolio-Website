// ── ASCII Donut ────────────────────────────────────────────────
// Classic torus projection — a1k0n.net algorithm
const DONUT_W = 100, DONUT_H = 50;
const DONUT_CHARS = '.,-~:;=!*#$@';
let donutA = 1, donutB = 1;
let lastDonutFrame = 0;

function renderDonut(A, B) {
  const b = new Array(DONUT_W * DONUT_H).fill(' ');
  const z = new Array(DONUT_W * DONUT_H).fill(0);

  for (let j = 0; j < 6.2832; j += 0.07) {
    const sinj = Math.sin(j), cosj = Math.cos(j);
    for (let i = 0; i < 6.2832; i += 0.02) {
      const sini = Math.sin(i), cosi = Math.cos(i);
      const sinA = Math.sin(A), cosA = Math.cos(A);
      const sinB = Math.sin(B), cosB = Math.cos(B);

      const h = cosj + 2;
      const D = 1 / (sini * h * sinA + sinj * cosA + 5);
      const t = sini * h * cosA - sinj * sinA;

      const x = 0 | (DONUT_W / 2 + 41 * D * (cosi * h * cosB - t * sinB));
      const y = 0 | (DONUT_H / 2 + 20 * D * (cosi * h * sinB + t * cosB));
      const o = x + DONUT_W * y;
      const N = 0 | (8 * ((sinj * sinA - sini * cosj * cosA) * cosB
                         - sini * cosj * sinA - sinj * cosA
                         - cosi * cosj * sinB));

      if (y >= 0 && y < DONUT_H && x >= 0 && x < DONUT_W && D > z[o]) {
        z[o] = D;
        b[o] = DONUT_CHARS[N > 0 ? N : 0];
      }
    }
  }

  let out = '';
  for (let row = 0; row < DONUT_H; row++) {
    out += b.slice(row * DONUT_W, (row + 1) * DONUT_W).join('') + '\n';
  }
  return out;
}

function animateDonut(ts) {
  if (ts - lastDonutFrame >= 33) { // cap at ~30fps
    const el = document.getElementById('donut');
    if (el) {
      el.textContent = renderDonut(donutA, donutB);
      donutA += 0.07;
      donutB += 0.03;
    }
    lastDonutFrame = ts;
  }
  requestAnimationFrame(animateDonut);
}

// ── Typed animation (hero) ────────────────────────────────────
const ROLES = [
  'Software Engineer',
  'B.S. CS @ UT Dallas',
  'AI Enthusiast',
  'Open Source Contributor',
  '"Car Guy"',
  'Ping Pong Champ',
  'Dallas Native',
  'Always Exploring'
];
let roleIndex = 0, charIndex = 0, isDeleting = false;

function type() {
  const el = document.getElementById('typed-text');
  if (!el) return;
  const current = ROLES[roleIndex];
  el.textContent = isDeleting
    ? current.substring(0, charIndex - 1)
    : current.substring(0, charIndex + 1);
  isDeleting ? charIndex-- : charIndex++;
  let delay = isDeleting ? 40 : 80;
  if (!isDeleting && charIndex === current.length) { delay = 2200; isDeleting = true; }
  else if (isDeleting && charIndex === 0) { isDeleting = false; roleIndex = (roleIndex + 1) % ROLES.length; delay = 400; }
  setTimeout(type, delay);
}

// ── Nav scroll effect ─────────────────────────────────────────
function initNav() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.style.background = 'rgba(17,24,39,0.96)';
      navbar.style.backdropFilter = 'blur(10px)';
      navbar.style.WebkitBackdropFilter = 'blur(10px)';
      navbar.style.borderBottom = '1px solid rgb(31 41 55)';
    } else {
      navbar.style.background = '';
      navbar.style.backdropFilter = '';
      navbar.style.WebkitBackdropFilter = '';
      navbar.style.borderBottom = '';
    }
  });
}

// ── Mobile menu ───────────────────────────────────────────────
// Backward-compatible: handles both new (#mobileMenu) and old (#navMenu) nav
function toggleMenu() {
  const mobileMenu = document.getElementById('mobileMenu');
  const navMenu    = document.getElementById('navMenu');
  if (mobileMenu) mobileMenu.classList.toggle('hidden');
  if (navMenu)    navMenu.classList.toggle('menu-active');
}
function closeMenu() {
  const mobileMenu = document.getElementById('mobileMenu');
  const navMenu    = document.getElementById('navMenu');
  if (mobileMenu) mobileMenu.classList.add('hidden');
  if (navMenu)    navMenu.classList.remove('menu-active');
}
document.addEventListener('click', (e) => {
  const mobileMenu = document.getElementById('mobileMenu');
  const menuBtn    = document.getElementById('menuBtn');
  if (mobileMenu && menuBtn &&
      !mobileMenu.contains(e.target) && !menuBtn.contains(e.target) &&
      !mobileMenu.classList.contains('hidden')) {
    mobileMenu.classList.add('hidden');
  }
  const navMenu    = document.getElementById('navMenu');
  const menuToggle = document.querySelector('.menu-toggle');
  if (navMenu && menuToggle &&
      !navMenu.contains(e.target) && !menuToggle.contains(e.target) &&
      navMenu.classList.contains('menu-active')) {
    navMenu.classList.remove('menu-active');
  }
});

// ── About: tab switch ─────────────────────────────────────────
function switchTab(tab) {
  const proInfo = document.getElementById('professionalInfo');
  const perInfo = document.getElementById('personalInfo');
  const tabPro  = document.getElementById('tab-pro');
  const tabPer  = document.getElementById('tab-personal');
  if (!proInfo || !perInfo) return;

  if (tab === 'personal') {
    proInfo.style.display = 'none';
    perInfo.style.display = 'block';
    tabPro.className  = 'tab-btn inactive';
    tabPer.className  = 'tab-btn active';
  } else {
    proInfo.style.display = 'block';
    perInfo.style.display = 'none';
    tabPro.className  = 'tab-btn active';
    tabPer.className  = 'tab-btn inactive';
  }
}

// Keep old toggle function name for any references in project pages
function togglePersonalInfo() {
  const toggle = document.getElementById('togglePersonal');
  if (toggle) switchTab(toggle.checked ? 'personal' : 'pro');
}

// ── Personal photo cycling ────────────────────────────────────
let imageIndex = 1;
function changeImage(element) {
  imageIndex = (imageIndex % 18) + 1;
  element.src = `assets/images/personal-photo${imageIndex}.jpg`;
}

// ── Projects / Experience toggle ──────────────────────────────
function showProjects() {
  const pc = document.getElementById('projectCards');
  const ec = document.getElementById('experienceCards');
  const pb = document.getElementById('projectsBtn');
  const eb = document.getElementById('experienceBtn');
  if (pc) pc.style.display = 'flex';
  if (ec) ec.style.display = 'none';
  if (pb) { pb.style.color = 'white'; pb.style.borderBottomColor = '#60a5fa'; }
  if (eb) { eb.style.color = 'rgb(75 85 99)'; eb.style.borderBottomColor = 'transparent'; }
}
function showExperience() {
  const pc = document.getElementById('projectCards');
  const ec = document.getElementById('experienceCards');
  const pb = document.getElementById('projectsBtn');
  const eb = document.getElementById('experienceBtn');
  if (pc) pc.style.display = 'none';
  if (ec) ec.style.display = 'flex';
  if (eb) { eb.style.color = 'white'; eb.style.borderBottomColor = '#60a5fa'; }
  if (pb) { pb.style.color = 'rgb(75 85 99)'; pb.style.borderBottomColor = 'transparent'; }
}

// ── Scroll fade-in ────────────────────────────────────────────
function initScrollAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -30px 0px' });
  document.querySelectorAll('.section-fade').forEach(el => observer.observe(el));
}

// ── Init ──────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  initNav();
  initScrollAnimations();
  setTimeout(type, 600);
  requestAnimationFrame(animateDonut);
});
