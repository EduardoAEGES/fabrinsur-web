/* Carga diferida de videos de YouTube.
   Muestra la miniatura y solo inserta el iframe al hacer clic:
   la página no contacta con YouTube hasta que el visitante lo pide. */

(() => {
    const facades = document.querySelectorAll('[data-video]');
    if (!facades.length) return;

    facades.forEach(facade => {
        const id = facade.dataset.video;
        const titulo = facade.dataset.titulo || 'Video';

        const miniatura = document.createElement('img');
        miniatura.src = `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;
        miniatura.alt = '';
        miniatura.loading = 'lazy';
        miniatura.className = 'video-card__thumb';
        facade.prepend(miniatura);

        const reproducir = () => {
            if (facade.classList.contains('is-playing')) return;

            const iframe = document.createElement('iframe');
            iframe.src = `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`;
            iframe.title = titulo;
            iframe.allow = 'accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture';
            iframe.allowFullscreen = true;
            iframe.loading = 'lazy';

            facade.classList.add('is-playing');
            facade.replaceChildren(iframe);
        };

        facade.addEventListener('click', reproducir);

        facade.addEventListener('keydown', evento => {
            if (evento.key !== 'Enter' && evento.key !== ' ') return;
            evento.preventDefault();
            reproducir();
        });
    });
})();
