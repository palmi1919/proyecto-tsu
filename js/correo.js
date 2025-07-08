document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    const asuntoSelect = document.getElementById('asunto');
    const cvUploadGroup = document.getElementById('cvUploadGroup');
    const cvFileInput = document.getElementById('cvFile');
    const formMessage = document.getElementById('formMessage');

    // Referencias a los grupos de campos que queremos controlar
    const nombreGroup = document.getElementById('nombreGroup');
    const emailGroup = document.getElementById('emailGroup');
    // Actualiza esta referencia si cambiaste el ID en el HTML
    const telefonoGroup = document.getElementById('telefonoGroup'); // Ahora nos referimos directamente al grupo del teléfono
    const mensajeGroup = document.getElementById('mensajeGroup');

    // Email de destino unificado (TODOS LOS ASUNTOS IRÁN A ESTE CORREO POR AHORA)
    const destinatarioEmail = 'al202300078tidsm@gmail.com'; // Asegúrate de que este sea tu correo final

    // Función para manejar la visibilidad de los campos y sus atributos 'required'
    function updateFormVisibility() {
        // Todos estos campos siempre estarán visibles ahora
        nombreGroup.style.display = 'block';
        emailGroup.style.display = 'block';
        telefonoGroup.style.display = 'block'; // Campo de teléfono siempre visible
        asuntoSelect.parentNode.style.display = 'block';
        mensajeGroup.style.display = 'block';

        // Configurar campos como 'required' (solo los básicos)
        document.getElementById('nombre').setAttribute('required', 'required');
        document.getElementById('email').setAttribute('required', 'required');
        document.getElementById('mensaje').setAttribute('required', 'required');
        document.getElementById('telefono').removeAttribute('required'); // Teléfono no es requerido por defecto

        if (asuntoSelect.value === 'solicitud_empleo') {
            cvUploadGroup.style.display = 'block';
            cvFileInput.setAttribute('required', 'required'); 
            // Ya no limpiamos el teléfono aquí porque es visible para todos
        } else {
            cvUploadGroup.style.display = 'none';
            cvFileInput.removeAttribute('required');
            cvFileInput.value = ''; // Limpiar el input de archivo
        }
    }

    // Inicializar la visibilidad del formulario cuando la página carga
    updateFormVisibility();

    // Event listener para cambiar la visibilidad cuando el asunto cambia
    asuntoSelect.addEventListener('change', updateFormVisibility);

    contactForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Evita el envío del formulario tradicional

        formMessage.textContent = ''; // Limpiar mensajes previos

        const nombre = document.getElementById('nombre').value;
        const email = document.getElementById('email').value;
        const telefono = document.getElementById('telefono').value; // Recuperar el valor del teléfono
        // const empresa = document.getElementById('empresa').value; // ELIMINADO: Ya no existe este campo
        const asuntoTexto = asuntoSelect.options[asuntoSelect.selectedIndex].text;
        const mensaje = document.getElementById('mensaje').value;
        const selectedAsuntoValue = asuntoSelect.value;

        // Validaciones para campos 'required' 
        if (!nombre || !email || !mensaje || !selectedAsuntoValue) {
             formMessage.style.color = 'red';
             formMessage.textContent = 'Por favor, completa todos los campos marcados con (*).';
             return;
        }

        if (selectedAsuntoValue === 'solicitud_empleo') {
            const file = cvFileInput.files[0];
            if (!file) {
                formMessage.style.color = 'red';
                formMessage.textContent = 'Por favor, sube tu CV para la solicitud de empleo.';
                return;
            }
        }

        let emailSubject;
        let emailBody;

        if (selectedAsuntoValue === 'solicitud_empleo') {
            emailSubject = `Solicitud de Empleo - ${nombre}`;
            emailBody = `
                ¡Hola!

                Se ha recibido una nueva solicitud de empleo a través de la página web.

                Datos del candidato:
                Nombre: ${nombre}
                Email: ${email}
                Teléfono: ${telefono || 'No especificado'} Mensaje del candidato:
                ${mensaje}

                ---
                **IMPORTANTE:** Por razones de seguridad del navegador, no es posible adjuntar archivos directamente a este correo desde la web. Por favor, **adjunta manualmente tu CV o documento** a este correo antes de enviarlo.
            `;
        } else {
            emailSubject = `Contacto desde Web - ${asuntoTexto}`;
            emailBody = `
                Nombre: ${nombre}
                Email: ${email}
                Teléfono: ${telefono || 'No especificado'} Mensaje:
                ${mensaje}
            `;
        }

        // Codificar el asunto y el cuerpo para la URL mailto
        const encodedSubject = encodeURIComponent(emailSubject);
        const encodedBody = encodeURIComponent(emailBody);

        // Crear el enlace mailto usando el email unificado (destinatarioEmail)
        const mailtoLink = `mailto:${destinatarioEmail}?subject=${encodedSubject}&body=${encodedBody}`;

        // Mostrar un mensaje de confirmación antes de abrir el cliente de correo
        let confirmMessage = 'Se abrirá tu cliente de correo para enviar el mensaje. Haz clic en "Aceptar" para continuar y luego en "Enviar" en tu correo.';
        if (selectedAsuntoValue === 'solicitud_empleo') {
            confirmMessage = 'Se abrirá tu cliente de correo para la solicitud de empleo. IMPORTANTE: Una vez abierto el correo, DEBES ADJUNTAR tu CV manualmente y luego hacer clic en "Enviar". ¿Continuar?';
        }

        const userConfirmed = confirm(confirmMessage);

        if (userConfirmed) {
            // Abrir el cliente de correo
            window.location.href = mailtoLink;

            // Mostrar mensaje en la página después de abrir el cliente de correo
            if (selectedAsuntoValue === 'solicitud_empleo') {
                formMessage.style.color = '#007bff'; // Azul
                formMessage.innerHTML = '¡Listo! Se ha abierto tu cliente de correo. <br> **Paso 1: Adjunta tu CV o documento (PDF/DOCX) al correo.** <br> **Paso 2: Haz clic en "Enviar" dentro de tu programa de correo.**';
            } else {
                formMessage.style.color = 'green';
                formMessage.textContent = 'Se ha abierto tu cliente de correo para enviar el mensaje. Por favor, haz clic en "Enviar".';
            }

            // Limpiar el formulario después de abrir el cliente de correo
            contactForm.reset();
            // Volver a la visibilidad inicial (que sería Solicitud de Empleo)
            updateFormVisibility();
        } else {
            // Si el usuario cancela la confirmación
            formMessage.style.color = 'gray';
            formMessage.textContent = 'Envío cancelado.';
        }
    });
});