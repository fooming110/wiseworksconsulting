// =========================================================
// Wise Works Consulting - Simple UI scripts
// =========================================================

document.addEventListener('DOMContentLoaded', () => {
  const menuButton = document.querySelector('.menu-button');
  const nav = document.querySelector('#global-nav');
  const navLinks = document.querySelectorAll('#global-nav a');
  const pageTop = document.querySelector('.page-top');

  const closeMenu = () => {
    if (!nav || !menuButton) return;
    nav.classList.remove('is-open');
    menuButton.setAttribute('aria-expanded', 'false');
  };

  if (menuButton && nav) {
    menuButton.addEventListener('click', () => {
      const isOpen = nav.classList.toggle('is-open');
      menuButton.setAttribute('aria-expanded', String(isOpen));
    });
  }

  navLinks.forEach((link) => {
    link.addEventListener('click', () => {
      closeMenu();
    });
  });

  if (pageTop) {
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
  }

  // Fade-in animation: opacity only, run once.
  const fadeTargets = document.querySelectorAll('.fade-in');

  const showAllFadeTargets = () => {
    fadeTargets.forEach((target) => {
      target.classList.add('is-visible');
    });
  };

  if (fadeTargets.length) {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      showAllFadeTargets();
    } else if ('IntersectionObserver' in window) {
      const fadeObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      }, {
        threshold: 0.06,
        rootMargin: '0px 0px -4% 0px'
      });

      // Wait a moment after first paint so the initial transparent state is visible.
      window.setTimeout(() => {
        fadeTargets.forEach((target) => {
          fadeObserver.observe(target);
        });
      }, 180);
    } else {
      showAllFadeTargets();
    }
  }

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      closeMenu();
    }
  });
});


// v65 break visual typewriter label
document.addEventListener('DOMContentLoaded', () => {
  const labels = Array.from(document.querySelectorAll('.break-visual-label.typewriter-float'));
  if (!labels.length) return;

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  labels.forEach((label) => {
    const text = label.textContent.trim();
    label.setAttribute('aria-label', text);
    label.textContent = '';

    Array.from(text).forEach((char, index) => {
      const span = document.createElement('span');
      span.className = 'break-visual-char';
      span.style.setProperty('--char-index', index);
      span.textContent = char === ' ' ? '\u00A0' : char;
      label.appendChild(span);
    });

    if (prefersReducedMotion) {
      label.classList.add('is-type-visible');
    }
  });

  if (prefersReducedMotion) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      const label = entry.target.querySelector('.break-visual-label.typewriter-float');
      if (!label) return;

      if (entry.isIntersecting) {
        label.classList.remove('is-type-visible');

        // Restart the animation cleanly when the visual comes into view.
        window.requestAnimationFrame(() => {
          window.requestAnimationFrame(() => {
            label.classList.add('is-type-visible');
          });
        });
      }
    });
  }, {
    threshold: 0.38,
    rootMargin: '0px 0px -12% 0px'
  });

  document.querySelectorAll('.break-visual').forEach((visual) => observer.observe(visual));
});
// End v65 break visual typewriter label
