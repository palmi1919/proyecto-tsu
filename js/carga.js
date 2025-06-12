// Este script maneja la animación de carga (loader) de la página
window.addEventListener('load', function() {
    const loaderWrapper = document.getElementById('loader-wrapper');
    const body = document.body;
    const loaderLogo = loaderWrapper.querySelector('.loader-logo');
    const loaderText = loaderWrapper.querySelector('.loader-text');

    // Ajusta la duración total de la animación de carga aquí (en milisegundos)
    // 2000 ms = 2 segundos. Aumenta este valor si quieres que la animación dure más.
    const totalAnimationDuration = 2000; 

    // Este retardo interno es para que los elementos del loader tengan tiempo de salir
    // antes de que el wrapper completo desaparezca.
    const delayBeforeWrapperFadeOut = 500; // 0.5 segundos

    setTimeout(() => {
        // Paso 1: Aplicar animaciones de salida a los elementos internos del loader
        if (loaderLogo) {
            loaderLogo.classList.remove('animate__fadeInUp'); // Quita la animación de entrada
            loaderLogo.classList.add('animate__zoomOut'); // Logo se "aleja" al desaparecer
        }

        if (loaderText) {
            loaderText.classList.remove('animate__fadeInUp', 'animate__delay-1s'); // Quita las animaciones de entrada
            loaderText.classList.add('animate__fadeOut'); // Texto se desvanece
        }

        // Paso 2: Desvanecer el wrapper completo del loader después de que los elementos internos empiecen a desaparecer
        setTimeout(() => {
            loaderWrapper.classList.add('animate__animated', 'animate__fadeOut'); // El wrapper se desvanece

            // Paso 3: Ocultar el loader completamente y mostrar el contenido principal
            loaderWrapper.addEventListener('animationend', () => {
                loaderWrapper.style.display = 'none'; // Oculta el loader del DOM
                body.classList.remove('loading'); // Permite que el CSS muestre el contenido
                body.classList.add('loaded'); // Añade la clase loaded (para la transición de opacidad del body)
            }, { once: true }); 
        }, delayBeforeWrapperFadeOut); // Espera 0.5 segundos después de que las animaciones internas comienzan
    }, totalAnimationDuration); // Este es el temporizador principal que controla la duración total de la visibilidad del loader.
});