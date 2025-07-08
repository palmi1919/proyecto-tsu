// Modo oscuro
function initTheme() {
  const themeToggle = document.getElementById("theme-toggle")
  const themeIcon = document.getElementById("theme-icon")
  const body = document.body

  // Verificar tema guardado o preferencia del sistema
  const savedTheme = localStorage.getItem("theme")
  const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches

  // Establecer tema inicial
  if (savedTheme) {
    body.setAttribute("data-theme", savedTheme)
  } else if (systemPrefersDark) {
    body.setAttribute("data-theme", "dark")
  }

  // Actualizar icono
  updateThemeIcon()

  // Event listener para el botón
  if (themeToggle) {
    themeToggle.addEventListener("click", toggleTheme)
  }

  function toggleTheme() {
    const currentTheme = body.getAttribute("data-theme")
    const newTheme = currentTheme === "dark" ? "light" : "dark"

    body.setAttribute("data-theme", newTheme)
    localStorage.setItem("theme", newTheme)
    updateThemeIcon()
  }

  function updateThemeIcon() {
    const currentTheme = body.getAttribute("data-theme")
    if (themeIcon) {
      if (currentTheme === "dark") {
        themeIcon.className = "fas fa-sun"
      } else {
        themeIcon.className = "fas fa-moon"
      }
    }
  }
}

// Inicializar tema cuando se carga la página
document.addEventListener("DOMContentLoaded", initTheme)
