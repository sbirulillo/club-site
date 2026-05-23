// =============================================
// ANIMATIONS.JS — Typing effect + Fade-in scroll
// =============================================

// --- TYPING EFFECT ---
// Agisce sull'elemento con data-typed="true"
// Separa le frasi con il carattere | nell'attributo data-strings
function initTyping() {
  const el = document.querySelector('[data-typed]');
  if (!el) return;

  const strings = (el.getAttribute('data-strings') || el.textContent).split('|');
  const cursor = document.createElement('span');
  cursor.className = 'typed-cursor';
  el.textContent = '';
  el.parentNode.insertBefore(cursor, el.nextSibling);

  let stringIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  const TYPE_SPEED   = 80;
  const DELETE_SPEED = 40;
  const PAUSE_END    = 2000;
  const PAUSE_START  = 400;

  function tick() {
    const current = strings[stringIndex];

    if (isDeleting) {
      el.textContent = current.slice(0, charIndex - 1);
      charIndex--;
    } else {
      el.textContent = current.slice(0, charIndex + 1);
      charIndex++;
    }

    let delay = isDeleting ? DELETE_SPEED : TYPE_SPEED;

    if (!isDeleting && charIndex === current.length) {
      if (strings.length === 1) return; // frase singola, non cancellare
      delay = PAUSE_END;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      stringIndex = (stringIndex + 1) % strings.length;
      delay = PAUSE_START;
    }

    setTimeout(tick, delay);
  }

  tick();
}

// --- FADE-IN ALLO SCROLL ---
// Aggiunge la classe .visible a ogni elemento .fade-in
// quando entra nel viewport
function initFadeIn() {
  const elements = document.querySelectorAll('.fade-in');
  if (!elements.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  elements.forEach((el, i) => {
    el.style.transitionDelay = `${i * 0.08}s`;
    observer.observe(el);
  });
}

// --- FAQ ACCORDION ---
function initFaq() {
  const items = document.querySelectorAll('.faq-item__question');
  items.forEach((btn) => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.faq-item');
      const isOpen = item.classList.contains('open');
      // chiudi tutti
      document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
      // apri quello cliccato (se era chiuso)
      if (!isOpen) item.classList.add('open');
    });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  initTyping();
  initFadeIn();
  initFaq();
});
