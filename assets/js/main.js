// Menú responsive + activo + lightbox del equipo
document.addEventListener('DOMContentLoaded', () => {
    const btn = document.querySelector('.menu-btn');
    const list = document.querySelector('.main-nav ul');
    const closeBtn = document.querySelector('.nav-close');
  
    // === MENÚ MÓVIL ===
    const openMenu = () => {
      if (!list) return;
      list.classList.add('show');
      document.body.classList.add('menu-open');
      btn?.setAttribute('aria-expanded', 'true');
      closeBtn?.focus();
    };
  
    const closeMenu = () => {
      if (!list) return;
      list.classList.remove('show');
      document.body.classList.remove('menu-open');
      btn?.setAttribute('aria-expanded', 'false');
      btn?.focus();
    };
  
    if (btn && list) {
      btn.addEventListener('click', () => {
        list.classList.contains('show') ? closeMenu() : openMenu();
      });
    }
    closeBtn?.addEventListener('click', closeMenu);
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && list?.classList.contains('show')) closeMenu();
    });
  
    // Marca activo en el menú
    const current = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
    document.querySelectorAll('.main-nav a').forEach(a => {
      const href = a.getAttribute('href').split('#')[0].toLowerCase();
      if (href === current) a.classList.add('active');
    });
  
    // === Lightbox equipo (tal y como lo tenías) ===
    const lb = document.getElementById('lb');
    if (lb) {
      const lbImg = lb.querySelector('img');
      const btnClose = lb.querySelector('.lb-close');
      const ENABLE_ON_MOBILE = false;
      const isTouch = window.matchMedia('(pointer: coarse)').matches;
      const isSmall = window.matchMedia('(max-width: 767.98px)').matches;
      const allowLightbox = ENABLE_ON_MOBILE || (!isTouch && !isSmall);
  
      const closeLB = () => {
        lb.classList.remove('show');
        lb.setAttribute('aria-hidden', 'true');
        document.body.classList.remove('lb-open');
        lbImg.src = '';
      };
  
      if (allowLightbox) {
        document.querySelectorAll('.team-photo img').forEach(img => {
          img.addEventListener('click', (e) => {
            e.preventDefault();
            lbImg.src = img.currentSrc || img.src;
            lbImg.alt = img.alt || '';
            lb.classList.add('show');
            lb.setAttribute('aria-hidden', 'false');
            document.body.classList.add('lb-open');
            btnClose?.focus();
          });
        });
        btnClose?.addEventListener('click', closeLB);
        lb.addEventListener('click', e => { if (e.target === lb) closeLB(); });
        document.addEventListener('keydown', e => { if (e.key === 'Escape') closeLB(); });
      }
    }
  });
  