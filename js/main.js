// js/main.js

document.addEventListener('DOMContentLoaded', () => {
    // --- Modo Oscuro ---
    const modeToggle = document.getElementById('mode-toggle');
    const body = document.body; // Obtenemos una referencia al body

    // Función para aplicar el tema
    function applyTheme(theme) {
        if (theme === 'dark-mode') {
            body.classList.add('dark-mode'); // **AÑADE** la clase 'dark-mode' al body
            modeToggle.innerHTML = '<i class="fas fa-sun"></i>'; // Cambia el icono a sol
        } else {
            body.classList.remove('dark-mode'); // **QUITA** la clase 'dark-mode' del body
            modeToggle.innerHTML = '<i class="fas fa-moon"></i>'; // Cambia el icono a luna
        }
        localStorage.setItem('theme', theme); // Guarda la preferencia del usuario
    }

    // Cargar el tema al inicio (si ya hay una preferencia guardada o si el sistema lo prefiere)
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        applyTheme(savedTheme);
    } else {
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            applyTheme('dark-mode');
        } else {
            applyTheme('light-mode');
        }
    }

    // Alternar tema al hacer clic en el botón
    modeToggle.addEventListener('click', () => {
        if (body.classList.contains('dark-mode')) {
            applyTheme('light-mode'); // Si ya tiene la clase, quítala (cambia a claro)
        } else {
            applyTheme('dark-mode'); // Si no la tiene, añádela (cambia a oscuro)
        }
    });

    // ... (el resto de tu código main.js, como la traducción y el menú móvil) ...
});