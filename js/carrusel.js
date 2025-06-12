document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('.hero-carousel img');
    let currentImageIndex = 0;

    function showImage(index) {
        // Oculta todas las imágenes
        images.forEach(img => img.classList.remove('active'));
        // Muestra la imagen actual
        images[index].classList.add('active');
    }

    function nextImage() {
        currentImageIndex++;
        if (currentImageIndex >= images.length) {
            currentImageIndex = 0; // Vuelve al principio si llega al final
        }
        showImage(currentImageIndex);
    }

    // Muestra la primera imagen al cargar
    if (images.length > 0) {
        showImage(currentImageIndex);
    }

    // Cambia la imagen cada 5 segundos (puedes ajustar el tiempo)
    setInterval(nextImage, 5000); // 5000 milisegundos = 5 segundos
});