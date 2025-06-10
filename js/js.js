document.addEventListener('DOMContentLoaded', function() {
    // Set current year in footer
    document.getElementById('current-year').textContent = new Date().getFullYear();
    
    // Mobile menu toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mobileMenu = document.querySelector('.mobile-menu');
    
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            mobileMenu.classList.toggle('active');
            
            // Change icon
            const icon = mobileMenuBtn.querySelector('i');
            if (icon.classList.contains('fa-bars')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }
    
    // Tabs functionality
    const tabBtns = document.querySelectorAll('.tab-btn');
    
    if (tabBtns.length > 0) {
        tabBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                // Remove active class from all buttons and contents
                document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
                document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
                
                // Add active class to clicked button
                this.classList.add('active');
                
                // Show corresponding content
                const tabId = this.getAttribute('data-tab');
                document.getElementById(tabId).classList.add('active');
            });
        });
    }
    
    // Accordion functionality
    const accordionBtns = document.querySelectorAll('.accordion-btn, .faq-btn');
    
    if (accordionBtns.length > 0) {
        accordionBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                this.classList.toggle('active');
                
                // Toggle content visibility
                const content = this.closest('.accordion-item, .faq-item').querySelector('.accordion-content, .faq-answer');
                if (content.style.display === 'block') {
                    content.style.display = 'none';
                } else {
                    content.style.display = 'block';
                }
            });
        });
    }
    
    // Contact form submission
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = {
                nombre: document.getElementById('nombre').value,
                email: document.getElementById('email').value,
                telefono: document.getElementById('telefono').value,
                empresa: document.getElementById('empresa').value,
                asunto: document.getElementById('asunto').value,
                mensaje: document.getElementById('mensaje').value
            };
            
            // Here you would typically send the data to a server
            console.log('Form submitted:', formData);
            
            // Show success message
            alert('¡Gracias por tu mensaje! Nos pondremos en contacto contigo pronto.');
            
            // Reset form
            contactForm.reset();
        });
    }
    
    // Vacancy modal functionality
    const vacancyBtns = document.querySelectorAll('.vacancy-details-btn');
    const modal = document.getElementById('vacancyModal');
    
    if (vacancyBtns.length > 0 && modal) {
        // Vacancy data (in a real application, this would come from a database)
        const vacancies = [
            {
                id: 1,
                titulo: "Supervisor de Calidad",
                departamento: "Control de Calidad",
                ubicacion: "Ciudad Mango, México",
                tipo: "Tiempo Completo",
                salario: "$15,000 - $20,000 MXN mensual",
                descripcion: "Buscamos un Supervisor de Calidad con experiencia en la industria alimentaria para supervisar los procesos de control de calidad en nuestra planta de empaque de mangos.",
                requisitos: [
                    "Licenciatura en Ingeniería de Alimentos, Química o afín",
                    "Experiencia mínima de 3 años en control de calidad en la industria alimentaria",
                    "Conocimiento de normas HACCP, ISO 22000 y BRC",
                    "Habilidades de liderazgo y trabajo en equipo",
                    "Disponibilidad para trabajar en turnos rotativos"
                ],
                responsabilidades: [
                    "Supervisar el cumplimiento de los estándares de calidad en todos los procesos",
                    "Coordinar y capacitar al equipo de inspectores de calidad",
                    "Realizar auditorías internas de calidad",
                    "Elaborar informes de calidad y proponer mejoras en los procesos",
                    "Asegurar el cumplimiento de las normativas de seguridad alimentaria"
                ]
            },
            {
                id: 2,
                titulo: "Operador de Línea de Empaque",
                departamento: "Producción",
                ubicacion: "Ciudad Mango, México",
                tipo: "Tiempo Completo",
                salario: "$8,000 - $10,000 MXN mensual",
                descripcion: "Estamos buscando Operadores de Línea de Empaque para trabajar en nuestra planta, responsables de la selección, clasificación y empaque de mangos según los estándares de calidad establecidos.",
                requisitos: [
                    "Educación mínima: Secundaria terminada",
                    "Experiencia previa en líneas de producción (preferentemente en industria alimentaria)",
                    "Disponibilidad para trabajar en turnos rotativos",
                    "Buena condición física",
                    "Atención al detalle y compromiso con la calidad"
                ],
                responsabilidades: [
                    "Seleccionar y clasificar mangos según criterios de calidad",
                    "Operar maquinaria de empaque",
                    "Mantener la limpieza y orden en el área de trabajo",
                    "Cumplir con las normas de higiene y seguridad",
                    "Reportar cualquier anomalía en el producto o proceso"
                ]
            },
            {
                id: 3,
                titulo: "Gerente de Logística",
                departamento: "Logística y Distribución",
                ubicacion: "El Rosario, Sinaloa México",
                tipo: "Tiempo Completo",
                salario: "$25,000 - $35,000 MXN mensual",
                descripcion: "Buscamos un Gerente de Logística con experiencia en la industria alimentaria para optimizar nuestros procesos de distribución nacional e internacional de mangos frescos.",
                requisitos: [
                    "Licenciatura en Logística, Administración o afín",
                    "Experiencia mínima de 5 años en puestos similares",
                    "Conocimiento en logística de productos perecederos",
                    "Dominio del inglés (nivel avanzado)",
                    "Experiencia en comercio internacional y trámites aduaneros"
                ],
                responsabilidades: [
                    "Planificar y coordinar la distribución de productos a nivel nacional e internacional",
                    "Optimizar rutas y costos de transporte",
                    "Gestionar la cadena de frío para garantizar la calidad del producto",
                    "Supervisar el cumplimiento de tiempos de entrega",
                    "Coordinar con aduanas y agentes de carga para exportaciones"
                ]
            },
            {
                id: 4,
                titulo: "Técnico de Mantenimiento",
                departamento: "Mantenimiento",
                ubicacion: "Ciudad Mango, México",
                tipo: "Tiempo Completo",
                salario: "$12,000 - $15,000 MXN mensual",
                descripcion: "Necesitamos un Técnico de Mantenimiento para asegurar el correcto funcionamiento de la maquinaria y equipos en nuestra planta de empaque de mangos.",
                requisitos: [
                    "Técnico en Electromecánica, Mecatrónica o afín",
                    "Experiencia mínima de 2 años en mantenimiento industrial",
                    "Conocimientos de sistemas hidráulicos, neumáticos y eléctricos",
                    "Capacidad para resolver problemas técnicos",
                    "Disponibilidad para trabajar en turnos rotativos y atender emergencias"
                ],
                responsabilidades: [
                    "Realizar mantenimiento preventivo y correctivo de maquinaria",
                    "Diagnosticar y reparar fallas en equipos",
                    "Implementar mejoras en los sistemas de producción",
                    "Mantener inventario de repuestos y herramientas",
                    "Elaborar reportes de mantenimiento"
                ]
            }
        ];
        
        // Open modal with vacancy details
        vacancyBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                const vacancyId = parseInt(this.getAttribute('data-vacancy'));
                const vacancy = vacancies.find(v => v.id === vacancyId);
                
                if (vacancy) {
                    const modalBody = modal.querySelector('.modal-body');
                    
                    // Create modal content
                    let modalContent = `
                        <h2>${vacancy.titulo}</h2>
                        <p class="vacancy-department">${vacancy.departamento}</p>
                        
                        <div class="vacancy-details">
                            <div class="vacancy-detail">
                                <i class="fas fa-map-marker-alt"></i>
                                <span>${vacancy.ubicacion}</span>
                            </div>
                            <div class="vacancy-detail">
                                <i class="fas fa-clock"></i>
                                <span>${vacancy.tipo}</span>
                            </div>
                            <div class="vacancy-detail">
                                <i class="fas fa-dollar-sign"></i>
                                <span>${vacancy.salario}</span>
                            </div>
                        </div>
                        
                        <div class="vacancy-description">
                            <h3>Descripción del Puesto</h3>
                            <p>${vacancy.descripcion}</p>
                        </div>
                        
                        <div class="vacancy-requirements">
                            <h3>Requisitos</h3>
                            <ul>
                    `;
                    
                    // Add requirements
                    vacancy.requisitos.forEach(req => {
                        modalContent += `<li>${req}</li>`;
                    });
                    
                    modalContent += `
                            </ul>
                        </div>
                        
                        <div class="vacancy-responsibilities">
                            <h3>Responsabilidades</h3>
                            <ul>
                    `;
                    
                    // Add responsibilities
                    vacancy.responsabilidades.forEach(resp => {
                        modalContent += `<li>${resp}</li>`;
                    });
                    
                    modalContent += `
                            </ul>
                        </div>
                        
                        <div class="vacancy-apply">
                            <h3>¿Interesado en aplicar?</h3>
                            <p>Envía tu CV a <strong>reclutamiento@cultivares.com</strong> con el asunto "${vacancy.titulo}" o completa el formulario en nuestra sección de contacto.</p>
                            <a href="contacto.html" class="btn btn-primary">Ir al Formulario de Contacto</a>
                        </div>
                    `;
                    
                    // Set modal content
                    modalBody.innerHTML = modalContent;
                    
                    // Show modal
                    modal.style.display = 'block';
                }
            });
        });
        
        // Close modal
        const closeModal = modal.querySelector('.close-modal');
        if (closeModal) {
            closeModal.addEventListener('click', function() {
                modal.style.display = 'none';
            });
        }
        
        // Close modal when clicking outside
        window.addEventListener('click', function(e) {
            if (e.target === modal) {
                modal.style.display = 'none';
            }
        });
    }
    
    // Slider functionality (if exists)
    const sliders = document.querySelectorAll('.slider');
    
    if (sliders.length > 0) {
        sliders.forEach(slider => {
            const slides = slider.querySelectorAll('.slide');
            const prevBtn = slider.querySelector('.prev-slide');
            const nextBtn = slider.querySelector('.next-slide');
            let currentSlide = 0;
            
            // Show first slide
            if (slides.length > 0) {
                slides[0].classList.add('active');
            }
            
            // Function to show slide
            function showSlide(n) {
                // Hide all slides
                slides.forEach(slide => slide.classList.remove('active'));
                
                // Reset index if out of bounds
                if (n >= slides.length) {
                    currentSlide = 0;
                } else if (n < 0) {
                    currentSlide = slides.length - 1;
                } else {
                    currentSlide = n;
                }
                
                // Show current slide
                slides[currentSlide].classList.add('active');
            }
            
            // Event listeners for buttons
            if (prevBtn) {
                prevBtn.addEventListener('click', () => {
                    showSlide(currentSlide - 1);
                });
            }
            
            if (nextBtn) {
                nextBtn.addEventListener('click', () => {
                    showSlide(currentSlide + 1);
                });
            }
            
            // Auto slide (optional)
            if (slider.hasAttribute('data-auto-slide')) {
                setInterval(() => {
                    showSlide(currentSlide + 1);
                }, 5000); // Change slide every 5 seconds
            }
        });
    }
    
    // Initialize any other interactive elements
    
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Close mobile menu if open
                if (mobileMenu && mobileMenu.classList.contains('active')) {
                    mobileMenu.classList.remove('active');
                    const icon = mobileMenuBtn.querySelector('i');
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            }
        });
    });
});