/* Hoja de reclamación del Libro de Reclamaciones Virtual. */

(() => {
    const formulario = document.getElementById('formReclamacion');
    if (!formulario) return;

    const { marcar, marcarBloque, validarObligatorios, mostrarEstado } = window.FG.validacion;

    const estado = document.getElementById('estadoReclamacion');
    const numeroHoja = document.getElementById('numeroHoja');
    const fechaHoja = document.getElementById('fechaHoja');
    const esMenor = document.getElementById('esMenor');
    const bloqueTutor = document.getElementById('bloqueTutor');
    const tutor = document.getElementById('tutor');

    const nuevoCorrelativo = () => {
        const aleatorio = String(Math.floor(Math.random() * 10000)).padStart(4, '0');
        return `${new Date().getFullYear()}-${aleatorio}`;
    };

    numeroHoja.textContent = nuevoCorrelativo();
    fechaHoja.textContent = new Date().toLocaleDateString('es-PE', {
        day: '2-digit', month: '2-digit', year: 'numeric'
    });

    esMenor.addEventListener('change', () => {
        bloqueTutor.hidden = !esMenor.checked;
        tutor.required = esMenor.checked;
        if (!esMenor.checked) {
            tutor.value = '';
            marcar(tutor, true);
        }
    });

    formulario.addEventListener('submit', evento => {
        evento.preventDefault();

        // Los datos del apoderado solo se exigen si el consumidor es menor de edad.
        const resultado = validarObligatorios(
            formulario,
            campo => campo === tutor && !esMenor.checked
        );

        let { valido, primerError } = resultado;

        ['tipoBien', 'tipoSolicitud'].forEach(nombre => {
            const elegido = formulario.querySelector(`input[name="${nombre}"]:checked`);
            const bloque = formulario.querySelector(`input[name="${nombre}"]`).closest('.choice');
            if (!marcarBloque(bloque, Boolean(elegido))) {
                valido = false;
                if (!primerError) primerError = bloque;
            }
        });

        const acepta = document.getElementById('aceptaDatos');
        const bloqueAcepta = acepta.closest('.check');
        if (!marcarBloque(bloqueAcepta, acepta.checked)) {
            valido = false;
            if (!primerError) primerError = bloqueAcepta;
        }

        if (!valido) {
            mostrarEstado(estado, 'Revisa los campos marcados antes de enviar.', 'error');
            primerError?.scrollIntoView({ block: 'center' });
            return;
        }

        mostrarEstado(
            estado,
            `Tu reclamación N.° <strong>${numeroHoja.textContent}</strong> quedó registrada. `
            + 'Recibirás la respuesta en el correo indicado dentro del plazo de ley.',
            'success'
        );

        formulario.reset();
        bloqueTutor.hidden = true;
        tutor.required = false;
        numeroHoja.textContent = nuevoCorrelativo();
    });
})();
