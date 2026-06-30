// =========================================================
// Wise Works Consulting - Simple UI scripts
// =========================================================

document.addEventListener('DOMContentLoaded', () => {
  const menuButton = document.querySelector('.menu-button');
  const nav = document.querySelector('#global-nav');
  const navLinks = document.querySelectorAll('#global-nav a');
  const pageTop = document.querySelector('.page-top');

  const closeMenu = () => {
    nav.classList.remove('is-open');
    menuButton.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('is-menu-open');
  };

  menuButton.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('is-open');
    menuButton.setAttribute('aria-expanded', String(isOpen));
    document.body.classList.toggle('is-menu-open', isOpen);
  });

  navLinks.forEach((link) => {
    link.addEventListener('click', () => {
      closeMenu();
    });
  });

  window.addEventListener('scroll', () => {
    if (window.scrollY > 420) {
      pageTop.classList.add('is-visible');
    } else {
      pageTop.classList.remove('is-visible');
    }
  });

  pageTop.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      closeMenu();
    }
  });
});
