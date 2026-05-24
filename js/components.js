// =============================================
// COMPONENTS.JS — Navbar e Footer
// =============================================
// Inietta navbar e footer in ogni pagina.
// Per aggiungere una voce di menu, modifica
// solo questo file — si aggiorna ovunque.
// =============================================

const NAV_LINKS = [
  { href: 'index.html',      label: 'Home' },
  { href: 'chi-siamo.html',  label: 'Chi siamo' },
  { href: 'evento.html',     label: 'Evento' },
  { href: 'faq.html',        label: 'FAQ' },
  { href: 'contatti.html',   label: 'Contatti' },
];

function renderNavbar() {
  const el = document.getElementById('navbar');
  if (!el) return;

  const currentPage = window.location.pathname.split('/').pop() || 'index.html';

  const links = NAV_LINKS.map(({ href, label }) => {
    const isActive = href === currentPage ? 'active' : '';
    return `<li><a href="${href}" class="${isActive}">${label}</a></li>`;
  }).join('');

  el.innerHTML = `
    <nav class="nav">
      <a href="index.html" class="nav__logo" aria-label="Future Club - Home">
        <img src="logo/logo_black.jpeg" alt="Future Club logo">
      </a>
      <ul class="nav__links" id="nav-links">
        ${links}
      </ul>
      <button class="nav__burger" id="burger" aria-label="Apri menu" aria-expanded="false">
        <span></span>
        <span></span>
        <span></span>
      </button>
    </nav>
  `;

  document.getElementById('burger').addEventListener('click', function () {
    const navLinks = document.getElementById('nav-links');
    const isOpen = navLinks.classList.toggle('open');
    this.setAttribute('aria-expanded', isOpen);
  });
}

function renderFooter() {
  const el = document.getElementById('footer');
  if (!el) return;

  const year = new Date().getFullYear();

  const links = NAV_LINKS.map(({ href, label }) =>
    `<li><a href="${href}">${label}</a></li>`
  ).join('');

  el.innerHTML = `
    <footer class="footer">
      <div class="footer__inner">
        <ul class="footer__links">
          ${links}
        </ul>
        <p class="footer__copy">
          &copy; ${year} Future Club &mdash; Ospitato da Future Academy
        </p>
      </div>
    </footer>
  `;
}

document.addEventListener('DOMContentLoaded', () => {
  renderNavbar();
  renderFooter();
});
