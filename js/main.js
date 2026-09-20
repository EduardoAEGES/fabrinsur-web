/* Comportamiento compartido por todas las páginas: navegación y aparición progresiva. */

(() => {
    const toggle = document.querySelector('[data-nav-toggle]');
    const nav = document.querySelector('[data-nav]');

    if (toggle && nav) {
        toggle.addEventListener('click', () => {
            const abierto = nav.classList.toggle('is-open');
            toggle.setAttribute('aria-expanded', String(abierto));
        });

        nav.querySelectorAll('a').forEach(enlace => {
            enlace.addEventListener('click', () => {
                nav.classList.remove('is-open');
                toggle.setAttribute('aria-expanded', 'false');
            });
        });

        document.addEventListener('keydown', evento => {
            if (evento.key === 'Escape' && nav.classList.contains('is-open')) {
                nav.classList.remove('is-open');
                toggle.setAttribute('aria-expanded', 'false');
                toggle.focus();
            }
        });
    }

    const anioActual = document.querySelector('[data-year]');
    if (anioActual) anioActual.textContent = new Date().getFullYear();

    const objetivos = document.querySelectorAll('[data-reveal]');
    if (!objetivos.length) return;

    const observador = new IntersectionObserver(entradas => {
        entradas.forEach(entrada => {
            if (!entrada.isIntersecting) return;
            entrada.target.classList.add('is-visible');
            observador.unobserve(entrada.target);
        });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    objetivos.forEach(elemento => {
        elemento.classList.add('reveal');
        observador.observe(elemento);
    });
})();
