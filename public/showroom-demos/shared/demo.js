(() => {
  const menuButton = document.querySelector('[data-menu-toggle]');
  const menu = document.querySelector('[data-menu]');

  menuButton?.addEventListener('click', () => {
    const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
    menuButton.setAttribute('aria-expanded', String(!isOpen));
    menu?.classList.toggle('is-open', !isOpen);
  });

  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', () => {
      menuButton?.setAttribute('aria-expanded', 'false');
      menu?.classList.remove('is-open');
    });
  });

  document.querySelectorAll('[data-customize]').forEach((button) => {
    button.addEventListener('click', (event) => {
      event.preventDefault();
      const productId = document.body.dataset.product;
      if (window.parent !== window) {
        window.parent.postMessage({ type: 's2p2:customize', productId }, '*');
      } else if (productId) {
        window.location.href = `/showroom/${productId}`;
      }
    });
  });

  document.querySelectorAll('[data-year]').forEach((element) => {
    element.textContent = String(new Date().getFullYear());
  });

  if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    document.querySelectorAll('[data-reveal]').forEach((element) => observer.observe(element));
  } else {
    document.querySelectorAll('[data-reveal]').forEach((element) => element.classList.add('is-visible'));
  }
})();
