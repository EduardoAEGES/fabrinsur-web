/* Utilidades de validación compartidas por los formularios del sitio.
   Se exponen en window.FG para que funcionen tanto servidas por HTTP
   como al abrir los archivos directamente desde el disco. */

window.FG = window.FG || {};

window.FG.validacion = (() => {
    const ES_EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const marcar = (campo, valido) => {
        campo.classList.toggle('is-invalid', !valido);
        return valido;
    };

    const marcarBloque = (bloque, valido) => {
        bloque.classList.toggle('is-invalid', !valido);
        return valido;
    };

    const campoValido = campo => {
        const valor = campo.value.trim();
        return campo.type === 'email' ? ES_EMAIL.test(valor) : valor.length > 0;
    };

    /* Valida los campos obligatorios de un formulario.
       `omitir` permite saltar campos que no apliquen (por ejemplo, ocultos). */
    const validarObligatorios = (formulario, omitir = () => false) => {
        let valido = true;
        let primerError = null;

        formulario.querySelectorAll('input[required], select[required], textarea[required]')
            .forEach(campo => {
                if (campo.type === 'radio' || campo.type === 'checkbox') return;
                if (omitir(campo)) return;

                if (!marcar(campo, campoValido(campo))) {
                    valido = false;
                    if (!primerError) primerError = campo;
                }
            });

        return { valido, primerError };
    };

    const mostrarEstado = (elemento, mensaje, tipo) => {
        elemento.innerHTML = mensaje;
        elemento.className = `form-status is-${tipo}`;
    };

    return { marcar, marcarBloque, campoValido, validarObligatorios, mostrarEstado };
})();
