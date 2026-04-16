// Nav scroll effect
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 60);
}, { passive: true });

// Mobile burger menu
const burger = document.getElementById('burger');
const navLinks = document.querySelector('.nav__links');
burger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});
document.addEventListener('click', (e) => {
  if (!nav.contains(e.target)) navLinks.classList.remove('open');
});

// Schedule tabs
const tabBtns = document.querySelectorAll('.tab-btn');
const panels  = document.querySelectorAll('.schedule__panel');

tabBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const day = btn.dataset.day;
    tabBtns.forEach(b => b.classList.remove('active'));
    panels.forEach(p => p.classList.remove('active'));
    btn.classList.add('active');
    const panel = document.getElementById('day' + day);
    panel.classList.add('active');
    // Re-trigger reveal on newly visible schedule items
    panel.querySelectorAll('.reveal').forEach(el => {
      el.classList.remove('visible');
      requestAnimationFrame(() => requestAnimationFrame(() => el.classList.add('visible')));
    });
  });
});

// Register form
const form       = document.getElementById('registerForm');
const successMsg = document.getElementById('formSuccess');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const required = form.querySelectorAll('[required]');
  let valid = true;

  required.forEach(field => {
    field.style.borderColor = '';
    if (!field.value.trim()) {
      field.style.borderColor = '#b03030';
      valid = false;
    }
  });

  if (!valid) return;

  const submitBtn = form.querySelector('[type="submit"]');
  submitBtn.textContent = 'Enviando…';
  submitBtn.disabled = true;

  setTimeout(() => {
    submitBtn.style.display = 'none';
    successMsg.hidden = false;
    form.querySelectorAll('input, select, textarea').forEach(f => f.disabled = true);
  }, 1200);
});

// Scroll reveal — IntersectionObserver
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

// Add reveal class and staggered delays to elements
function setupReveal(selector, delayStep = 0) {
  document.querySelectorAll(selector).forEach((el, i) => {
    el.classList.add('reveal');
    if (delayStep > 0 && i < 5) {
      el.classList.add('reveal-delay-' + Math.min(i + 1, 4));
    }
    observer.observe(el);
  });
}

setupReveal('.feature-card', 1);
setupReveal('.speaker-card', 1);
setupReveal('.stat-item', 1);
setupReveal('.schedule-item');
setupReveal('.pricing__item', 1);
setupReveal('.about__text');
setupReveal('.about__features');
setupReveal('.register__info');
setupReveal('.register__form');
