        $(document).ready(function() {
            const form = $('#contactFormPHP');
            const formMessage = $('#formMessage');
            const submitBtn = $('#submitBtn');
            const cvUploadGroup = $('#cvUploadGroup');
            const asuntoSelect = $('#asunto');

            // Mostrar/ocultar el campo de CV según el asunto
            function toggleCvField() {
                if (asuntoSelect.val() === 'Solicitud de Empleo') {
                    cvUploadGroup.show();
                    $('#cvFile').attr('required', true); // Hacer el campo obligatorio
                } else {
                    cvUploadGroup.hide();
                    $('#cvFile').removeAttr('required'); // No obligatorio
                    $('#cvFile').val(''); // Limpiar selección del archivo
                }
            }

            // Llamar a la función al cargar la página y al cambiar el asunto
            toggleCvField();
            asuntoSelect.on('change', toggleCvField);

            form.on('submit', function(e) {
                e.preventDefault(); // Previene el envío tradicional del formulario

                formMessage.html('').removeClass('success-message error-message'); // Limpia mensajes anteriores
                submitBtn.prop('disabled', true).html('<i class="fas fa-spinner fa-spin"></i> Enviando...'); // Deshabilita el botón

                let formData = new FormData(this); // Crea un objeto FormData para enviar archivos

                $.ajax({
                    url: 'enviar_correo.php', // El archivo PHP que procesará el formulario
                    type: 'POST',
                    data: formData,
                    processData: false, // Importante: no procesar los datos
                    contentType: false, // Importante: no establecer el tipo de contenido
                    dataType: 'json', // Esperar una respuesta JSON
                    success: function(response) {
                        if (response.success) {
                            formMessage.html('<i class="fas fa-check-circle"></i> ' + response.message).addClass('success-message');
                            form[0].reset(); // Limpia el formulario
                            toggleCvField(); // Restablece el estado del campo CV
                        } else {
                            formMessage.html('<i class="fas fa-times-circle"></i> ' + response.message).addClass('error-message');
                        }
                    },
                    error: function(xhr, status, error) {
                        console.error("Error AJAX:", status, error, xhr.responseText);
                        formMessage.html('<i class="fas fa-times-circle"></i> Hubo un problema al enviar tu mensaje. Por favor, inténtalo de nuevo más tarde.').addClass('error-message');
                    },
                    complete: function() {
                        submitBtn.prop('disabled', false).html('<i class="fas fa-paper-plane"></i> Enviar Mensaje'); // Habilita el botón
                    }
                });
            });
        });