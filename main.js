// ── Nav scroll effect ──────────────────────────────────────
const nav = document.getElementById('nav');
if (nav) {
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 60);
  }, { passive: true });
}

// ── Mobile nav toggle ──────────────────────────────────────
const toggle   = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

if (toggle && navLinks) {
  toggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    toggle.classList.toggle('open');
  });

  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      toggle.classList.remove('open');
    });
  });
}

// ── Fade-in on scroll ──────────────────────────────────────
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      observer.unobserve(e.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

// ── Instagram feed via Behold.so ───────────────────────────
function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

async function loadIgFeed() {
  const grid = document.getElementById('igGrid');
  if (!grid) return;

  try {
    const res = await fetch('https://feeds.behold.so/pVMlTvi6CSvKIHxoxozX');
    const data = await res.json();
    const posts = (data.posts || data).slice(0, 6);

    grid.innerHTML = posts.map(post => {
      const thumb = post.thumbnailUrl || (post.sizes && post.sizes.medium && post.sizes.medium.mediaUrl) || '';
      const caption = escapeHtml((post.prunedCaption || post.caption || '').split('\n')[0]);
      const permalink = escapeHtml(post.permalink || 'https://www.instagram.com/prestigebuildcoaz/');

      return `
        <a href="${permalink}" target="_blank" rel="noopener" class="ig-item fade-in">
          <img src="${thumb}" alt="${caption}" loading="lazy" />
          <div class="ig-overlay">
            <svg class="ig-play" viewBox="0 0 24 24" fill="none"><polygon points="5 3 19 12 5 21 5 3" fill="rgba(255,255,255,0.9)"/></svg>
            <p class="ig-caption">${caption}</p>
          </div>
        </a>`;
    }).join('');

    grid.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
  } catch (e) {
    grid.innerHTML = '<a href="https://www.instagram.com/prestigebuildcoaz/" target="_blank" rel="noopener" style="grid-column:1/-1; text-align:center; padding:40px; color:var(--gray-400); text-decoration:none;">View @prestigebuildcoaz on Instagram →</a>';
  }
}

loadIgFeed();

// ── Contact form (placeholder handler) ────────────────────
const form = document.getElementById('contactForm');
if (form) {
  form.addEventListener('submit', e => {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    btn.textContent = 'Message Sent';
    btn.style.background = '#1a7f4b';
    btn.disabled = true;
    // TODO: wire up to your backend or form service (e.g. Formspree, Netlify Forms)
  });
}
