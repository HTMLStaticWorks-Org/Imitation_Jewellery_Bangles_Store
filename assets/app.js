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
  document.querySelectorAll('img:not(.brandlogo)').forEach(img => {
    img.addEventListener('error', function() {
      if (!this.dataset.fallbackApplied) {
        this.dataset.fallbackApplied = 'true';
        this.src = imageFallbackSvg;
      }
    });
    // Check already loaded images that failed
    if (img.complete && img.naturalWidth === 0 && img.src && !img.dataset.fallbackApplied) {
      img.dataset.fallbackApplied = 'true';
      img.src = imageFallbackSvg;
    }
  });
}

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('[data-theme-icon]').forEach(x => x.textContent = root.dataset.theme === 'dark' ? '☀' : '☾');
  document.querySelectorAll('[data-rtl-label]').forEach(x => x.textContent = root.dir === 'rtl' ? 'LTR' : 'RTL');

  initImageFallbacks();

  document.querySelectorAll('.eye').forEach(btn => btn.addEventListener('click', () => {
    const input = btn.parentElement.querySelector('input');
    if (input) {
      input.type = input.type === 'password' ? 'text' : 'password';
      btn.textContent = input.type === 'password' ? '◉' : '◎';
    }
  }));

  document.querySelectorAll('form[data-demo]').forEach(f => f.addEventListener('submit', e => {
    e.preventDefault();
    const n = f.querySelector('.notice');
    if (n) {
      n.style.display = 'block';
      n.textContent = 'Demo interaction complete. Connect a backend to enable real account services.';
    }
  }));
});
