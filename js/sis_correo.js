document.addEventListener('DOMContentLoaded', function() {
    // Elementos del DOM
    const formMessage = document.getElementById('formMessage');
    const urlParams = new URLSearchParams(window.location.search);
    const status = urlParams.get('status');
    const message = urlParams.get('message');
    const asuntoSelect = document.getElementById('asunto_select');
    const hiddenAsunto = document.getElementById('hiddenAsunto');
    const formGroups = document.querySelectorAll('.form-fields-group');
    const contactForm = document.getElementById('contactFormPHP');

    // Manejar mensajes de respuesta
    if (status === 'success') {
        showMessage('¡Mensaje enviado con éxito! Nos pondremos en contacto pronto.', 'green');
    } else if (status === 'error') {
        handleErrorMessage(message);
    }

    // Mostrar/ocultar campos según asunto seleccionado
    asuntoSelect.addEventListener('change', function() {
        updateFormFields();
    });

    // Validar formulario antes de enviar
    contactForm.addEventListener('submit', function(e) {
        if (!validateForm()) {
            e.preventDefault();
        }
    });

    // Inicializar campos al cargar
    updateFormFields();

    // Funciones auxiliares
    function showMessage(text, color) {
        formMessage.textContent = text;
        formMessage.style.color = color;
        setTimeout(() => formMessage.textContent = '', 7000);
    }

    function handleErrorMessage(msg) {
        const messages = {
            'campos_invalidos': 'Por favor completa todos los campos obligatorios y revisa tu email.',
            'archivo_no_valido': 'El archivo adjunto no es válido (solo PDF/DOC/DOCX, máximo 5MB).',
            'error_servidor_archivos': 'Error al procesar el archivo. Intenta nuevamente.',
            'asunto_invalido': 'El tipo de asunto seleccionado no es válido.',
            'mail_error': 'Error al enviar el mensaje. Por favor intenta más tarde.',
            'no_post': 'El formulario debe enviarse mediante POST.'
        };
        showMessage(messages[msg] || 'Hubo un error al enviar tu mensaje.', 'red');
    }

    function updateFormFields() {
        const selectedAsunto = asuntoSelect.value;
        hiddenAsunto.value = selectedAsunto;

        // Ocultar todos los grupos
        formGroups.forEach(group => {
            group.classList.remove('active');
            group.querySelectorAll('[required]').forEach(field => {
                field.removeAttribute('required');
            });
        });

        // Mostrar grupo seleccionado y establecer required
        if (selectedAsunto) {
            const activeGroup = document.getElementById(`formGroup_${selectedAsunto}`);
            if (activeGroup) {
                activeGroup.classList.add('active');
                activeGroup.querySelectorAll('input, textarea, select').forEach(field => {
                    if (field.id && !field.id.includes('telefono') && !field.id.includes('queja_')) {
                        field.setAttribute('required', 'required');
                    }
                });
            }
        }
    }

    function validateForm() {
        if (!asuntoSelect.value) {
            showMessage('Por favor selecciona un asunto.', 'red');
            return false;
        }

        const activeGroup = document.querySelector('.form-fields-group.active');
        if (!activeGroup) return false;

        let isValid = true;
        activeGroup.querySelectorAll('[required]').forEach(field => {
            if (!field.value.trim()) {
                field.style.borderColor = 'red';
                isValid = false;
            } else {
                field.style.borderColor = '';
            }
        });

        if (!isValid) {
            showMessage('Por favor completa todos los campos requeridos.', 'red');
        }

        return isValid;
    }
});