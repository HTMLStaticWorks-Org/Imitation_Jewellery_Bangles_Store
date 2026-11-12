const root = document.documentElement;
const savedTheme = localStorage.getItem('jewel-theme') || 'light';
root.dataset.theme = savedTheme;

function toggleTheme() {
  const next = root.dataset.theme === 'dark' ? 'light' : 'dark';
  root.dataset.theme = next;
  localStorage.setItem('jewel-theme', next);
  document.querySelectorAll('[data-theme-icon]').forEach(x => x.textContent = next === 'dark' ? '☀' : '☾');
}

function toggleRTL() {
  const next = root.dir === 'rtl' ? 'ltr' : 'rtl';
  root.dir = next;
  localStorage.setItem('jewel-dir', next);
  document.querySelectorAll('[data-rtl-label]').forEach(x => x.textContent = next === 'rtl' ? 'LTR' : 'RTL');
}

root.dir = localStorage.getItem('jewel-dir') || 'ltr';

const imageFallbackSvg = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 800 600' width='800' height='600'%3E%3Cdefs%3E%3ClinearGradient id='g' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' stop-color='%236d344d'/%3E%3Cstop offset='100%25' stop-color='%239b4968'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='800' height='600' fill='url(%23g)'/%3E%3Ccircle cx='400' cy='270' r='90' fill='rgba(255,255,255,0.08)'/%3E%3Cpath d='M400 200 L460 260 L400 340 L340 260 Z' fill='none' stroke='%23ffffff' stroke-width='6' stroke-linejoin='round'/%3E%3Ccircle cx='400' cy='260' r='18' fill='%23f5c8c0'/%3E%3Ctext x='400' y='395' font-family='sans-serif' font-size='22' font-weight='600' fill='%23ffffff' text-anchor='middle' letter-spacing='1.5'%3ELUSTRE LANE%3C/text%3E%3Ctext x='400' y='425' font-family='sans-serif' font-size='14' fill='%23f5c8c0' text-anchor='middle'%3EImitation Jewellery & Bangles%3C/text%3E%3C/svg%3E";

function initImageFallbacks() {
  document.querySelectorAll('img:not(.brandlogo):not(.quote-avatar)').forEach(img => {
    img.addEventListener('error', function() {
      if (!this.dataset.fallbackApplied) {
        this.dataset.fallbackApplied = 'true';
        this.src = imageFallbackSvg;
      }
    });
    if (img.complete && img.naturalWidth === 0 && img.src && !img.dataset.fallbackApplied) {
      this.dataset.fallbackApplied = 'true';
      this.src = imageFallbackSvg;
    }
  });
}

// Mobile Hamburger Menu Setup (Point 19)
function setupMobileMenu() {
  const toggleBtn = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.navlinks');
  if (toggleBtn && navLinks) {
    toggleBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = navLinks.classList.toggle('open');
      toggleBtn.classList.toggle('active', isOpen);
      toggleBtn.setAttribute('aria-expanded', isOpen);
    });

    // Close when clicking outside
    document.addEventListener('click', (e) => {
      if (!navLinks.contains(e.target) && !toggleBtn.contains(e.target) && navLinks.classList.contains('open')) {
        navLinks.classList.remove('open');
        toggleBtn.classList.remove('active');
        toggleBtn.setAttribute('aria-expanded', 'false');
      }
    });

    // Close when link clicked
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        toggleBtn.classList.remove('active');
        toggleBtn.setAttribute('aria-expanded', 'false');
      });
    });
  }
}

// Back to Top Button Setup (Point 6)
function setupBackToTop() {
  let bttBtn = document.getElementById('backToTop');
  if (!bttBtn) {
    bttBtn = document.createElement('button');
    bttBtn.id = 'backToTop';
    bttBtn.setAttribute('aria-label', 'Back to top');
    bttBtn.innerHTML = '↑';
    document.body.appendChild(bttBtn);
  }

  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      bttBtn.classList.add('show');
    } else {
      bttBtn.classList.remove('show');
    }
  });

  bttBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

// FAQ Accordion Setup (Point 15)
function setupFAQs() {
  document.querySelectorAll('.faq-question').forEach(btn => {
    btn.addEventListener('click', () => {
      const parent = btn.closest('.faq-item');
      const isActive = parent.classList.contains('active');
      // Close other open faqs
      document.querySelectorAll('.faq-item').forEach(item => {
        if (item !== parent) item.classList.remove('active');
      });
      parent.classList.toggle('active', !isActive);
    });
  });
}

// Interactive Category Filters (Points 11 & 12)
function setupFilterPills() {
  document.querySelectorAll('.filter-pill').forEach(pill => {
    pill.addEventListener('click', () => {
      const container = pill.closest('.filter-bar');
      if (container) {
        container.querySelectorAll('.filter-pill').forEach(p => p.classList.remove('active'));
        pill.classList.add('active');
        const filterVal = pill.getAttribute('data-filter') || 'all';
        const targetGrid = document.querySelector('.products, .categories');
        if (targetGrid) {
          targetGrid.querySelectorAll('.product, .category').forEach(card => {
            const categoryAttr = card.getAttribute('data-category') || '';
            if (filterVal === 'all' || categoryAttr.includes(filterVal)) {
              card.style.display = 'flex';
            } else {
              card.style.display = 'none';
            }
          });
        }
      }
    });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('[data-theme-icon]').forEach(x => x.textContent = root.dataset.theme === 'dark' ? '☀' : '☾');
  document.querySelectorAll('[data-rtl-label]').forEach(x => x.textContent = root.dir === 'rtl' ? 'LTR' : 'RTL');

  initImageFallbacks();
  setupMobileMenu();
  setupBackToTop();
  setupFAQs();
  setupFilterPills();

  // Password visibility toggle
  document.querySelectorAll('.eye').forEach(btn => btn.addEventListener('click', () => {
    const input = btn.parentElement.querySelector('input');
    if (input) {
      input.type = input.type === 'password' ? 'text' : 'password';
      btn.textContent = input.type === 'password' ? '◉' : '◎';
    }
  }));

  // Demo Forms
  document.querySelectorAll('form[data-demo]').forEach(f => f.addEventListener('submit', e => {
    e.preventDefault();
    const n = f.querySelector('.notice');
    if (n) {
      n.style.display = 'block';
      n.textContent = 'Demo interaction complete. Thank you!';
    }
  }));
});
