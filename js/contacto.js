/* Formulario de contacto. */

(() => {
    const formulario = document.getElementById('formContacto');
    if (!formulario) return;

    const estado = document.getElementById('estadoContacto');
    const { validarObligatorios, mostrarEstado } = window.FG.validacion;

    formulario.addEventListener('submit', evento => {
        evento.preventDefault();

        const { valido, primerError } = validarObligatorios(formulario);

        if (!valido) {
            mostrarEstado(estado, 'Revisa los campos marcados antes de enviar.', 'error');
            primerError?.focus();
            return;
        }

        mostrarEstado(
            estado,
            'Gracias por escribirnos. Nuestro equipo técnico revisará tu solicitud y te responderá a la brevedad.',
            'success'
        );
        formulario.reset();
    });
})();
