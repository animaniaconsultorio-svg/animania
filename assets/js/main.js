// Menú responsive + activo + lightbox del equipo
document.addEventListener('DOMContentLoaded', () => {
    const btn = document.querySelector('.menu-btn');
    const list = document.querySelector('.main-nav ul');
    if (btn && list) {
        btn.addEventListener('click', () => {
            const open = list.classList.toggle('show');
            btn.setAttribute('aria-expanded', open ? 'true' : 'false');
            document.body.classList.toggle('menu-open', open);   // <— añade esto

        });
    }

    const current = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
    document.querySelectorAll('.main-nav a').forEach(a => {
        const href = a.getAttribute('href').split('#')[0].toLowerCase();
        if (href === current) a.classList.add('active');
    });

    // Lightbox fotos del equipo — solo en escritorio (no en móvil/táctil)
    const lb = document.getElementById('lb');
    if (lb) {
        const lbImg = lb.querySelector('img');
        const btnClose = lb.querySelector('.lb-close');

        // === CONTROLES DE ACTIVACIÓN ===
        // Cambia a true si quieres ACTIVAR también en móvil en el futuro.
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
            // === ESCRITORIO / PANTALLA GRANDE ===
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

        } else {
            // === MÓVIL / TÁCTIL: desactivar interacción (dejamos comentado para reactivar en el futuro)
            // document.querySelectorAll('.team-photo img').forEach(img => {
            //   img.addEventListener('click', (e) => {
            //     e.preventDefault();
            //   }, { passive: true });
            // });
        }
    }



});
