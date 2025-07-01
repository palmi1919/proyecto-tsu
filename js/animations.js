// Archivo: js/animations.js

document.addEventListener('DOMContentLoaded', () => {
    /* --- Animaciones al hacer Scroll (Intersection Observer) --- */

    // Selecciona todos los elementos que quieres animar al aparecer en pantalla
    // Esto incluye ahora explícitamente elementos con 'animated-text-element'
    // si quieres que se activen individualmente por scroll
    const elementsToAnimate = document.querySelectorAll('.animate-on-scroll, .animate-slide-in-left, .animated-text-element');

    const observerOptions = {
        root: null, // El viewport es el root
        rootMargin: '0px',
        threshold: 0.15 // El 15% del elemento debe ser visible para activar la animación
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Si el elemento es visible, añade la clase 'is-visible'
                entry.target.classList.add('is-visible');

                // *** NUEVA LÓGICA: Si es un elemento de texto, activa su animación de texto ***
                if (entry.target.classList.contains('animated-text-element')) {
                    animateTextElements([entry.target]);
                }
                // *******************************************************************

                // Deja de observar este elemento para que la animación no se repita
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observa cada elemento seleccionado
    elementsToAnimate.forEach(element => {
        observer.observe(element);
    });

    /* --- Animaciones de Texto --- */
    // Función para animar el texto de un conjunto de elementos
    function animateTextElements(elements) {
        elements.forEach((text, index) => {
            text.classList.remove('text-active'); // Asegura que se reinicie la animación si es necesario
            void text.offsetWidth; // Truco para forzar el reflow y reiniciar la transición
            text.classList.add('text-active'); // Añade la clase 'text-active' para iniciar la animación
            // Opcional: añadir un retraso escalonado para un efecto de escritura/aparición secuencial
            // text.style.transitionDelay = `${index * 0.1}s`; // Descomentar si quieres un retraso por palabra/elemento
        });
    }

    // *** Lógica Específica para la página de Contacto (o páginas sin Carrusel/Hero) ***
    // Animar los textos del page-header al cargar la página (ya que es la primera vista)
    // Esto es para el H1 y el P directamente dentro de .page-header
    const pageHeaderTextElements = document.querySelectorAll('.page-header .animated-text-element');
    if (pageHeaderTextElements.length > 0) {
        animateTextElements(pageHeaderTextElements);
    }

    // NOTA IMPORTANTE:
    // Para los textos dentro de otras secciones (como .contact-section, .faq-section),
    // si el padre tiene 'animate-on-scroll', la clase 'is-visible' se le añadirá al padre.
    // Luego, la regla CSS '.animate-on-scroll.is-visible .animated-text-element' (que deberías tener en styles.css)
    // es la que hará visibles a los textos hijos.
    // Si quieres que los textos hijos se animen con `text-active` por separado cuando su padre es visible,
    // puedes añadir otra observación o un callback en la observación del padre.
    // Sin embargo, la solución CSS es más limpia para la mayoría de los casos.


    /* --- Lógica del Carrusel (Mantener si es un archivo JS compartido, de lo contrario, puedes eliminarla) --- */
    const carouselSlides = document.querySelectorAll('.carousel-slide');
    if (carouselSlides.length > 0) { // Solo ejecuta si hay slides de carrusel en la página
        const carouselSlideObserverOptions = {
            root: null, // El viewport
            rootMargin: '0px',
            threshold: 0.8 // Cuando el 80% del slide es visible, se considera activo
        };

        const carouselSlideObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    carouselSlides.forEach(s => s.classList.remove('active')); // Eliminar 'active' de todos los slides
                    entry.target.classList.add('active'); // Marcar el slide actual como activo
                    // Animar los textos dentro del slide activo
                    animateTextElements(entry.target.querySelectorAll('.animated-text-element'));
                } else {
                    // Opcional: Reiniciar la animación de texto cuando el slide sale de vista
                    const textElementsInSlide = entry.target.querySelectorAll('.animated-text-element');
                    textElementsInSlide.forEach(text => text.classList.remove('text-active'));
                }
            });
        }, carouselSlideObserverOptions);

        carouselSlides.forEach(slide => {
            carouselSlideObserver.observe(slide);
        });
    }
    // Fin de la lógica del Carrusel

});