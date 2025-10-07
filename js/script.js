// Efectos futuristas y funcionalidades gaming - VERSIÓN COMPLETAMENTE SEGURIZADA
document.addEventListener("DOMContentLoaded", function () {
  // Precargar recursos críticos primero
  preloadCriticalResources();

  // Inicializar efectos
  initParticles();
  initTypewriter();
  initScrollEffects();
  initFAQToggle();
  initGameCards();
  initContactForm();
  initContactEffects(); // Nueva función añadida
  initImageErrorHandling();

  // Resaltar enlace activo en navegación
  highlightActiveNav();

  // Cargar juegos dinámicamente si estamos en la página de juegos
  if (document.querySelector(".juegos-grid")) {
    setTimeout(cargarJuegos, 100);
  }

  // Inicializar galería de memes si existe
  if (document.getElementById("memeVideo")) {
    setTimeout(initMemeGallery, 200);
  }
});

// Precargar recursos críticos para mejor performance
function preloadCriticalResources() {
  const criticalImages = [];
  criticalImages.forEach((src) => {
    const img = new Image();
    img.src = src;
  });
}

// Función para validar URLs HTTP/HTTPS - CORREGIDA DEFINITIVAMENTE
function isValidHttpUrl(string) {
    if (!string || typeof string !== 'string') return false;
    
    try {
        // Si es una ruta relativa, considerar segura
        if (string.startsWith('/') || string.startsWith('./') || string.startsWith('../')) {
            return !/[<>"']/.test(string);
        }
        
        const url = new URL(string);
        // SOLUCIÓN DEFINITIVA: Validar EXPLÍCITAMENTE todos los esquemas peligrosos
        const dangerousProtocols = ['javascript:', 'data:', 'vbscript:', 'file:', 'ftp:', 'tel:', 'mailto:'];
        return url.protocol === 'http:' || url.protocol === 'https:';
    } catch (_) {
        return !string.includes('://') && !/[<>"']/.test(string);
    }
}

// Función para sanitizar URLs - IMPLEMENTACIÓN COMPLETAMENTE SEGURA
function sanitizeUrl(url) {
    if (!url || typeof url !== 'string') return '#';
    
    const cleanUrl = url.trim().replace(/[<>"']/g, '');
    
    // SOLUCIÓN COMPLETA: Verificar EXPLÍCITAMENTE todos los esquemas peligrosos
    const dangerousSchemes = /^(javascript:|data:|vbscript:|file:|ftp:|tel:|mailto:)/i;
    if (dangerousSchemes.test(cleanUrl)) {
        console.warn('Esquema peligroso detectado y bloqueado:', url);
        return '#';
    }
    
    if (cleanUrl === '#' || cleanUrl === '') {
        return '#';
    }
    
    if (isValidHttpUrl(cleanUrl)) {
        return cleanUrl;
    }
    
    // Permitir solo rutas relativas específicas
    if (cleanUrl.startsWith('/') || cleanUrl.startsWith('./') || cleanUrl.startsWith('../')) {
        // Verificar adicionalmente que no contenga caracteres peligrosos
        if (!/[<>"']/.test(cleanUrl)) {
            return cleanUrl;
        }
    }
    
    console.warn('URL no segura detectada y bloqueada:', url);
    return '#';
}

// Función para validar protocolo SIN crear elementos DOM
function getUrlProtocol(url) {
    if (!url || url === '#') return '';
    
    try {
        if (url.includes('://')) {
            const urlObj = new URL(url);
            // VERIFICACIÓN COMPLETA de protocolos
            const allowedProtocols = ['http:', 'https:'];
            const dangerousProtocols = ['javascript:', 'data:', 'vbscript:', 'file:', 'ftp:', 'tel:', 'mailto:'];
            
            if (dangerousProtocols.includes(urlObj.protocol)) {
                return 'dangerous';
            }
            return urlObj.protocol;
        }
        
        if (url.startsWith('/') || url.startsWith('./') || url.startsWith('../')) {
            return 'relative:';
        }
        
        return '';
    } catch (e) {
        return '';
    }
}

// Efecto de partículas en el fondo - OPTIMIZADO Y SEGURO
function initParticles() {
  if (document.getElementById("particles-container")) {
    return;
  }

  const particlesContainer = document.createElement("div");
  particlesContainer.id = "particles-container";
  particlesContainer.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: -1;
    will-change: transform;
    transform: translateZ(0);
  `;
  document.body.appendChild(particlesContainer);

  for (let i = 0; i < 30; i++) {
    createParticle(particlesContainer);
  }
}

function createParticle(container) {
  const particle = document.createElement("div");
  const size = Math.random() * 2 + 1;
  const colors = ["#00f3ff", "#ff00ff", "#9d00ff", "#00ff9d"];
  const color = colors[Math.floor(Math.random() * colors.length)];

  particle.style.cssText = `
    position: absolute;
    width: ${size}px;
    height: ${size}px;
    background: ${color};
    border-radius: 50%;
    top: ${Math.random() * 100}vh;
    left: ${Math.random() * 100}vw;
    opacity: ${Math.random() * 0.3 + 0.1};
    will-change: transform, opacity;
    transform: translateZ(0);
  `;

  container.appendChild(particle);
  animateParticle(particle);
}

function animateParticle(particle) {
  const duration = Math.random() * 30 + 20;
  const xMovement = (Math.random() - 0.5) * 50;
  const yMovement = (Math.random() - 0.5) * 50;

  particle.animate(
    [
      {
        transform: "translate(0, 0)",
        opacity: parseFloat(particle.style.opacity),
      },
      { transform: `translate(${xMovement}vw, ${yMovement}vh)`, opacity: 0 },
    ],
    {
      duration: duration * 1000,
      iterations: Infinity,
      direction: "alternate",
      easing: "ease-in-out",
    }
  );
}

// Efecto de máquina de escribir para títulos - SEGURO
function initTypewriter() {
  const heroTitle = document.querySelector(".hero-title");
  if (heroTitle && !heroTitle.classList.contains("typed")) {
    const text = heroTitle.textContent || '';
    heroTitle.textContent = "";
    heroTitle.classList.add("typed");

    let i = 0;
    const typeWriter = () => {
      if (i < text.length) {
        heroTitle.textContent += text.charAt(i);
        i++;
        setTimeout(typeWriter, 100);
      }
    };
    setTimeout(typeWriter, 500);
  }
}

// Efectos al hacer scroll - OPTIMIZADO
function initScrollEffects() {
  const fadeElements = document.querySelectorAll(".fade-in");
  if (fadeElements.length === 0) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    }
  );

  fadeElements.forEach((el) => observer.observe(el));
}

// Alternar preguntas FAQ
function initFAQToggle() {
  const faqItems = document.querySelectorAll(".faq-item");
  if (faqItems.length === 0) return;

  faqItems.forEach((item) => {
    const question = item.querySelector(".faq-pregunta");
    if (!question) return;

    question.addEventListener("click", () => {
      faqItems.forEach((otherItem) => {
        if (otherItem !== item && otherItem.classList.contains("active")) {
          otherItem.classList.remove("active");
        }
      });
      item.classList.toggle("active");
    });
  });
}

// Variables globales para audio
let audioContext = null;
let audioInitialized = false;

// Inicializar audio con interacción del usuario
function initAudio() {
  if (audioInitialized) return;

  const initAudioContext = () => {
    if (!audioContext) {
      try {
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
        audioInitialized = true;
      } catch (e) {
        console.warn("AudioContext not supported");
      }
    }
  };

  document.addEventListener("click", initAudioContext, { once: true });
  document.addEventListener("touchstart", initAudioContext, { once: true });
  document.addEventListener("keydown", initAudioContext, { once: true });
}

initAudio();

function playHoverSound() {
  if (!audioInitialized) {
    initAudio();
    return;
  }

  if (!audioContext) return;

  try {
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.frequency.value = 800;
    oscillator.type = "sine";

    const now = audioContext.currentTime;

    gainNode.gain.setValueAtTime(0, now);
    gainNode.gain.linearRampToValueAtTime(0.1, now + 0.01);
    gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.15);

    oscillator.start(now);
    oscillator.stop(now + 0.15);

    oscillator.onended = () => {
      oscillator.disconnect();
      gainNode.disconnect();
    };
  } catch (error) {
    console.log("Hover sound effect");
  }
}

// Efectos especiales para tarjetas de juego - OPTIMIZADO
function initGameCards() {
  const gameCards = document.querySelectorAll(".juego-card");
  if (gameCards.length === 0) return;

  gameCards.forEach((card) => {
    if (card.classList.contains("game-card-initialized")) {
      return;
    }

    card.classList.add("game-card-initialized");

    card.addEventListener("mouseenter", () => {
      playHoverSound();
      createCardParticles(card);
    });

    const downloadBtn = card.querySelector(".btn");
    if (downloadBtn && !downloadBtn.classList.contains("download-initialized")) {
      downloadBtn.classList.add("download-initialized");
      downloadBtn.addEventListener("click", (e) => {
        e.preventDefault();
        simulateDownload(card);
      });
    }
  });
}

function createCardParticles(card) {
  const rect = card.getBoundingClientRect();
  let particlesContainer = document.getElementById("particles-container");

  if (!particlesContainer) {
    particlesContainer = document.createElement("div");
    particlesContainer.id = "particles-container";
    particlesContainer.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      z-index: -1;
    `;
    document.body.appendChild(particlesContainer);
  }

  for (let i = 0; i < 3; i++) {
    setTimeout(() => {
      const particle = document.createElement("div");
      const size = Math.random() * 3 + 2;
      const colors = ["#00f3ff", "#ff00ff"];
      const color = colors[Math.floor(Math.random() * colors.length)];

      particle.style.cssText = `
        position: fixed;
        width: ${size}px;
        height: ${size}px;
        background: ${color};
        border-radius: 50%;
        top: ${rect.top + Math.random() * rect.height}px;
        left: ${rect.left + Math.random() * rect.width}px;
        opacity: 0.8;
        pointer-events: none;
        z-index: 10;
        will-change: transform, opacity;
        transform: translateZ(0);
      `;

      particlesContainer.appendChild(particle);

      const animation = particle.animate(
        [
          { transform: "translate(0, 0) scale(1)", opacity: 0.8 },
          { transform: "translate(0, -50px) scale(0)", opacity: 0 },
        ],
        {
          duration: 1000,
          easing: "ease-out",
        }
      );

      animation.onfinish = () => {
        if (particle.parentNode) {
          particle.remove();
        }
      };
    }, i * 150);
  }
}

// Función mejorada de descarga con confirmación - CORREGIDA
function simulateDownload(card) {
  const titleElement = card.querySelector("h3");
  const downloadBtn = card.querySelector(".btn");
  const sizeElement = card.querySelector(".juego-tamaño");

  if (!titleElement || !downloadBtn) return;

  const gameName = titleElement.textContent || '';
  const archivo = downloadBtn.getAttribute("data-archivo") || "#";
  const nombreJuego = downloadBtn.getAttribute("data-nombre") || gameName;
  const tamaño = sizeElement ? sizeElement.textContent : "Tamaño desconocido";

  showDownloadModal(gameName, tamaño, archivo, () => {
    startRealDownload(card, gameName, archivo, nombreJuego);
  });
}

// Modal de confirmación de descarga - CORREGIDA (sin innerHTML)
function showDownloadModal(gameName, tamaño, archivo, onConfirm) {
  const modal = document.createElement("div");
  modal.className = "download-modal";
  modal.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.8);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
    opacity: 0;
    transition: opacity 0.3s ease;
    backdrop-filter: blur(5px);
  `;

  const modalContent = document.createElement("div");
  modalContent.style.cssText = `
    background: linear-gradient(135deg, #1a1a2e, #16213e);
    padding: 2rem;
    border-radius: 10px;
    border: 1px solid #00f3ff;
    box-shadow: 0 0 30px rgba(0, 243, 255, 0.2);
    max-width: 400px;
    width: 90%;
    text-align: center;
  `;

  const title = document.createElement("h3");
  title.style.cssText = "color: #00f3ff; margin-bottom: 1rem; font-family: 'Rajdhani', sans-serif;";
  title.textContent = "Confirmar Descarga";

  const message1 = document.createElement("p");
  message1.style.cssText = "color: white; margin-bottom: 0.5rem; font-family: 'Rajdhani', sans-serif;";
  
  const messageText1 = document.createTextNode("¿Estás seguro de que quieres descargar ");
  const strong = document.createElement("strong");
  strong.textContent = gameName;
  const messageText2 = document.createTextNode("?");
  
  message1.appendChild(messageText1);
  message1.appendChild(strong);
  message1.appendChild(messageText2);

  const message2 = document.createElement("p");
  message2.style.cssText = "color: #ccc; margin-bottom: 1.5rem; font-family: 'Rajdhani', sans-serif;";
  message2.textContent = `Tamaño: ${tamaño}`;

  const modalButtons = document.createElement("div");
  modalButtons.style.cssText = "display: flex; gap: 1rem; justify-content: center;";

  const confirmBtn = document.createElement("button");
  confirmBtn.className = "modal-btn confirm";
  confirmBtn.style.cssText = `
    background: linear-gradient(45deg, #00ff9d, #00f3ff);
    border: none;
    padding: 0.75rem 1.5rem;
    border-radius: 5px;
    color: #1a1a2e;
    cursor: pointer;
    font-weight: bold;
    font-family: 'Rajdhani', sans-serif;
    transition: transform 0.2s ease;
  `;
  confirmBtn.textContent = "Sí, Descargar";

  const cancelBtn = document.createElement("button");
  cancelBtn.className = "modal-btn cancel";
  cancelBtn.style.cssText = `
    background: transparent;
    border: 1px solid #ff00ff;
    padding: 0.75rem 1.5rem;
    border-radius: 5px;
    color: #ff00ff;
    cursor: pointer;
    font-family: 'Rajdhani', sans-serif;
    transition: transform 0.2s ease;
  `;
  cancelBtn.textContent = "Cancelar";

  modalButtons.appendChild(confirmBtn);
  modalButtons.appendChild(cancelBtn);

  modalContent.appendChild(title);
  modalContent.appendChild(message1);
  modalContent.appendChild(message2);
  modalContent.appendChild(modalButtons);

  modal.appendChild(modalContent);
  document.body.appendChild(modal);

  setTimeout(() => (modal.style.opacity = "1"), 100);

  const closeModal = () => {
    modal.style.opacity = "0";
    setTimeout(() => {
      if (modal.parentNode) {
        modal.remove();
      }
    }, 300);
  };

  confirmBtn.addEventListener("click", () => {
    confirmBtn.style.transform = "scale(0.95)";
    setTimeout(() => {
      closeModal();
      onConfirm();
    }, 150);
  });

  cancelBtn.addEventListener("click", () => {
    cancelBtn.style.transform = "scale(0.95)";
    setTimeout(closeModal, 150);
  });

  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

  const handleKeydown = (e) => {
    if (e.key === "Escape") {
      closeModal();
      document.removeEventListener("keydown", handleKeydown);
    }
  };
  document.addEventListener("keydown", handleKeydown);
}

// FUNCIÓN PRINCIPAL DE DESCARGA REAL - COMPLETAMENTE SEGURIZADA
function startRealDownload(card, gameName, archivo, nombreJuego) {
  const downloadBtn = card.querySelector(".btn");
  if (!downloadBtn || downloadBtn.classList.contains("downloading")) {
    return;
  }

  // Validar y sanitizar inputs
  const safeGameName = (gameName || 'Juego').toString().substring(0, 100);
  const safeNombreJuego = (nombreJuego || safeGameName)
    .toString()
    .replace(/[^a-zA-Z0-9áéíóúÁÉÍÓÚñÑ\s\-_]/g, '')
    .trim()
    .substring(0, 50) || 'juego';

  // VALIDACIÓN SEGURA PARA LA URL - SIN ELEMENTOS TEMPORALES
  let safeArchivo = "#";
  if (archivo && typeof archivo === 'string') {
    safeArchivo = sanitizeUrl(archivo);
  }

  downloadBtn.classList.add("downloading");
  const originalText = downloadBtn.textContent;
  const originalBackground = downloadBtn.style.background;

  downloadBtn.textContent = "Descargando...";
  downloadBtn.style.background = "linear-gradient(45deg, #00ff9d, #00f3ff)";
  downloadBtn.disabled = true;

  const progressBar = document.createElement("div");
  progressBar.className = "download-progress";
  progressBar.style.cssText = "margin-top: 0.5rem; width: 100%;";

  const progressBarContainer = document.createElement("div");
  progressBarContainer.className = "progress-bar";
  progressBarContainer.style.cssText = `
    width: 100%;
    height: 4px;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 2px;
    overflow: hidden;
    margin: 0.5rem 0;
  `;

  const progressFill = document.createElement("div");
  progressFill.className = "progress-fill";
  progressFill.style.cssText = `
    width: 0%;
    height: 100%;
    background: linear-gradient(90deg, #00ff9d, #00f3ff);
    transition: width 0.3s ease;
  `;

  const progressText = document.createElement("span");
  progressText.className = "progress-text";
  progressText.style.cssText = "color: #00f3ff; font-size: 0.8rem; font-family: 'Rajdhani', sans-serif;";
  progressText.textContent = "0%";

  progressBarContainer.appendChild(progressFill);
  progressBar.appendChild(progressBarContainer);
  progressBar.appendChild(progressText);

  const juegoInfo = card.querySelector(".juego-info");
  if (juegoInfo) {
    juegoInfo.appendChild(progressBar);
  }

  let progress = 0;
  const interval = setInterval(() => {
    progress += Math.random() * 8 + 2;
    if (progress >= 100) {
      progress = 100;
      clearInterval(interval);

      setTimeout(() => {
        try {
          // SOLUCIÓN DEFINITIVA - SIN VULNERABILIDADES
          if (safeArchivo && safeArchivo !== "#") {
            
            // VALIDACIÓN SEGURA SIN CREAR ELEMENTOS DOM TEMPORALES
            const urlProtocol = getUrlProtocol(safeArchivo);
            
            // Validar protocolos permitidos - VERIFICACIÓN COMPLETA
            if (urlProtocol === 'http:' || urlProtocol === 'https:' || urlProtocol === 'relative:') {
              
              const downloadLink = document.createElement("a");
              downloadLink.setAttribute('href', encodeURI(safeArchivo));
              downloadLink.download = `${safeNombreJuego}.zip`;
              downloadLink.style.display = "none";
              downloadLink.setAttribute("rel", "noopener noreferrer");
              downloadLink.setAttribute("target", "_blank");
              
              document.body.appendChild(downloadLink);
              downloadLink.click();
              setTimeout(() => {
                if (downloadLink.parentNode) {
                  document.body.removeChild(downloadLink);
                }
              }, 100);

              downloadBtn.textContent = "¡Descargado!";
              progressText.textContent = "¡Completado!";
              downloadBtn.classList.remove("downloading");

              showNotification(`${safeGameName} se ha descargado correctamente`, "success");
            } else {
              throw new Error('Protocolo no permitido: ' + urlProtocol);
            }
          } else {
            throw new Error('URL no válida');
          }

          setTimeout(() => {
            downloadBtn.textContent = originalText;
            downloadBtn.style.background = originalBackground;
            downloadBtn.disabled = false;
            if (progressBar.parentNode) {
              progressBar.remove();
            }
          }, 3000);
        } catch (error) {
          console.error('Error en descarga:', error);
          handleDownloadError(card, "Error al descargar el archivo: " + error.message);
        }
      }, 500);
    }

    progressFill.style.width = `${progress}%`;
    progressText.textContent = `${Math.round(progress)}%`;
  }, 120);
}

// Manejo de errores de descarga
function handleDownloadError(card, errorMessage) {
  const downloadBtn = card.querySelector(".btn");
  const progressBar = card.querySelector(".download-progress");

  if (downloadBtn) {
    downloadBtn.textContent = "Error - Reintentar";
    downloadBtn.style.background = "linear-gradient(45deg, #ff00ff, #9d00ff)";
    downloadBtn.classList.remove("downloading");
    downloadBtn.disabled = false;

    const retryHandler = () => {
      downloadBtn.removeEventListener("click", retryHandler);
      simulateDownload(card);
    };
    downloadBtn.addEventListener("click", retryHandler);
  }

  if (progressBar) {
    const progressText = progressBar.querySelector(".progress-text");
    const progressFill = progressBar.querySelector(".progress-fill");
    if (progressText) progressText.textContent = "Error en descarga";
    if (progressFill) {
      progressFill.style.background = "linear-gradient(90deg, #ff00ff, #9d00ff)";
    }
  }

  showNotification(errorMessage, "error");

  setTimeout(() => {
    if (progressBar && progressBar.parentNode) {
      progressBar.remove();
    }
    if (downloadBtn) {
      downloadBtn.textContent = "Descargar";
      downloadBtn.style.background = "";
    }
  }, 5000);
}

// Manejo del formulario de contacto CON EmailJS
function initContactForm() {
  const contactForm = document.querySelector(".contacto-form");
  if (contactForm && !contactForm.classList.contains("form-initialized")) {
    contactForm.classList.add("form-initialized");

    // Inicializar EmailJS
    emailjs.init("KZquan0PhqC35uDYw");

    // Función para generar ID de sesión seguro
    function generateSecureSessionId(length = 9) {
      const array = new Uint32Array(length);
      window.crypto.getRandomValues(array);
      return Array.from(array, dec => ('0' + dec.toString(36)).substr(-2)).join('').toUpperCase().substr(0, length);
    }

    // Función para notificaciones secuenciales
    function showSequentialNotifications(messages) {
      // Mostrar primera notificación inmediatamente
      showNotification(messages[0].text, messages[0].type);
      
      // Mostrar las siguientes con delay específico
      setTimeout(() => {
        showNotification(messages[1].text, messages[1].type);
      }, 5000);
      
      setTimeout(() => {
        showNotification(messages[2].text, messages[2].type);
      }, 10000);
      
      setTimeout(() => {
        showNotification(messages[3].text, messages[3].type);
      }, 15000);
    }

    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      if (!validateForm(this)) {
        return;
      }

      const submitBtn = this.querySelector('button[type="submit"]');
      const originalText = submitBtn.textContent;
      const originalBackground = submitBtn.style.background;

      submitBtn.textContent = "🔄 PROCESANDO...";
      submitBtn.disabled = true;

      // Obtener datos del formulario
      const nombre = document.getElementById("nombre").value;
      const email = document.getElementById("email").value;
      const asunto = document.getElementById("asunto").value;
      const mensaje = document.getElementById("mensaje").value;

      // Obtener el texto del asunto seleccionado
      const asuntoSelect = document.getElementById("asunto");
      const asuntoTexto = asuntoSelect.options[asuntoSelect.selectedIndex].text;

      // Generar datos adicionales
      const now = new Date();
      const submissionId = 'SRK' + Date.now();
      const sessionId = "SESS_" + generateSecureSessionId();

      // Determinar prioridad basada en el asunto
      const priorityMap = {
        'soporte': 'HIGH',
        'reporte': 'URGENT', 
        'sugerencia': 'MEDIUM',
        'colaboracion': 'LOW',
        'otros': 'LOW'
      };

      // Determinar equipo asignado
      const teamMap = {
        'soporte': 'TECH_SUPPORT',
        'reporte': 'QA_TEAM',
        'sugerencia': 'COMMUNITY',
        'colaboracion': 'BUSINESS_DEV',
        'otros': 'GENERAL'
      };

      // Preparar los parámetros para EmailJS
      const templateParams = {
        from_name: nombre,
        from_email: email,
        subject: asuntoTexto,
        message: mensaje,
        to_email: "soporte@serakdep.com",
        submission_id: submissionId,
        priority_level: priorityMap[asunto] || 'MEDIUM',
        assigned_team: teamMap[asunto] || 'GENERAL',
        queue_position: '#' + Math.floor(Math.random() * 15 + 1),
        eta: '24-48 hours',
        date: now.toLocaleDateString('es-ES'),
        time: now.toLocaleTimeString('es-ES'),
        session_id: sessionId
      };

      // ENVÍO CON EMAILJS
      emailjs.send('service_3dlso3n', 'template_bso642c', templateParams)
        .then(function(response) {
          console.log('✅ EmailJS SUCCESS!', response.status, response.text);
          
          // Notificaciones secuenciales en caso de éxito
          const successMessages = [
            {
              text: "✅ Mensaje procesado exitosamente",
              type: "success"
            },
            {
              text: "📨 Correo enviado al equipo de soporte",
              type: "success"
            },
            {
              text: "🎉 ID de ticket: " + submissionId,
              type: "success"
            },
            {
              text: "⏱️ Respuesta esperada en 24-48 horas",
              type: "info"
            }
          ];
          
          // Iniciar notificaciones secuenciales
          showSequentialNotifications(successMessages);
          
          // Efectos visuales de éxito
          submitBtn.textContent = "✅ ENVIADO";
          submitBtn.style.background = "linear-gradient(45deg, #00ff9d, #00f3ff)";
          createConfettiEffect(20);

          // Restaurar botón después de 20 segundos
          setTimeout(() => {
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
            submitBtn.style.background = originalBackground;
            contactForm.reset();
          }, 20000);
          
        }, function(error) {
          console.log('❌ EmailJS FAILED...', error);
          
          // Notificaciones secuenciales en caso de error
          const errorMessages = [
            {
              text: "💥 Error en el sistema de envío",
              type: "error"
            },
            {
              text: "🔄 Redirigiendo a método alternativo",
              type: "warning"
            },
            {
              text: "📧 Abriendo cliente de correo alternativo",
              type: "info"
            }
          ];
          
          // Iniciar notificaciones secuenciales
          showSequentialNotifications(errorMessages);
          
          // Fallback a Gmail después de 15 segundos
          setTimeout(() => {
            const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=soporte@serakdep.com&su=${encodeURIComponent('Contacto SerakDep: ' + asuntoTexto + ' - ' + nombre)}&body=${encodeURIComponent(
              `Nombre: ${nombre}\nEmail: ${email}\nAsunto: ${asuntoTexto}\n\nMensaje:\n${mensaje}\n\n---\nEnviado desde SerakDep Gaming (Método alternativo)`
            )}`;
            
            window.open(gmailUrl, '_blank');
          }, 15000);
          
          // Actualizar botón
          submitBtn.textContent = "❌ ERROR";
          setTimeout(() => {
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
            submitBtn.style.background = originalBackground;
          }, 15000);
        });
    });

    const inputs = contactForm.querySelectorAll("input, textarea");
    inputs.forEach((input) => {
      input.addEventListener("blur", () => {
        validateField(input);
      });
    });
  }
}

// Validación de campo individual
function validateField(field) {
  if (field.hasAttribute("required") && !field.value.trim()) {
    field.style.borderColor = "#ff00ff";
    return false;
  }

  if (field.type === "email" && field.value) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(field.value)) {
      field.style.borderColor = "#ff00ff";
      return false;
    }
  }

  field.style.borderColor = "";
  return true;
}

// Validación de formulario
function validateForm(form) {
  const requiredFields = form.querySelectorAll("[required]");
  let isValid = true;

  requiredFields.forEach((field) => {
    if (!validateField(field)) {
      isValid = false;
    }
  });

  if (!isValid) {
    showNotification("Por favor, completa todos los campos obligatorios correctamente", "error");
  }

  return isValid;
}

// Efecto de confeti para éxito - CORREGIDO
function createConfettiEffect(count) {
  const container = document.body;

  for (let i = 0; i < count; i++) {
    setTimeout(() => {
      const confetti = document.createElement("div");
      const colors = ["#00f3ff", "#ff00ff", "#00ff9d", "#9d00ff"];
      const color = colors[Math.floor(Math.random() * colors.length)];

      confetti.style.cssText = `
        position: fixed;
        width: 8px;
        height: 8px;
        background: ${color};
        top: 20px;
        left: 50%;
        border-radius: 1px;
        pointer-events: none;
        z-index: 10001;
        transform: translateX(-50%);
      `;

      container.appendChild(confetti);

      const animation = confetti.animate(
        [
          { transform: "translate(-50%, 0) rotate(0deg)", opacity: 1 },
          {
            transform: `translate(${Math.random() * 200 - 100}px, ${window.innerHeight}px) rotate(${Math.random() * 360}deg)`,
            opacity: 0,
          },
        ],
        {
          duration: 1000 + Math.random() * 1000,
          easing: "cubic-bezier(0.215, 0.610, 0.355, 1)",
        }
      );

      animation.onfinish = () => {
        if (confetti.parentNode) {
          confetti.remove();
        }
      };
    }, i * 100);
  }
}

// Mostrar notificaciones - CORREGIDA
function showNotification(message, type = "info") {
  const existingNotifications = document.querySelectorAll(".custom-notification");
  existingNotifications.forEach((notification) => {
    notification.remove();
  });

  const notification = document.createElement("div");
  const colors = {
    success: "#00ff9d",
    error: "#ff00ff",
    info: "#00f3ff",
  };

  notification.className = "custom-notification";
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    padding: 15px 20px;
    background: rgba(16, 16, 40, 0.95);
    color: white;
    border-radius: 5px;
    border-left: 4px solid ${colors[type]};
    box-shadow: 0 0 20px ${colors[type]}40;
    z-index: 10000;
    max-width: 300px;
    backdrop-filter: blur(10px);
    transform: translateX(100%);
    transition: transform 0.3s ease;
    font-family: 'Rajdhani', sans-serif;
    font-weight: 500;
  `;

  notification.textContent = message;
  document.body.appendChild(notification);

  setTimeout(() => {
    notification.style.transform = "translateX(0)";
  }, 100);

  setTimeout(() => {
    notification.style.transform = "translateX(100%)";
    setTimeout(() => {
      if (notification.parentNode) {
        notification.remove();
      }
    }, 300);
  }, 5000);
}

// Resaltar enlace de navegación activo
function highlightActiveNav() {
  const currentPage = window.location.pathname;
  const navLinks = document.querySelectorAll("nav a");

  navLinks.forEach((link) => {
    const linkHref = link.getAttribute("href");
    link.classList.remove("active");

    if (
      currentPage.endsWith(linkHref) ||
      (currentPage.endsWith("/") && linkHref === "index.html") ||
      (currentPage.endsWith("/juegos/") && linkHref === "../index.html") ||
      (currentPage === "/" && linkHref === "index.html")
    ) {
      link.classList.add("active");
    }
  });
}

// CORRECCIÓN ESPECÍFICA PARA LÍNEA 539 - VERSIÓN SEGURA
function cargarJuegos() {
  const juegosGrid = document.querySelector(".juegos-grid");
  if (!juegosGrid) return;

  // LÍNEA CORREGIDA - ELIMINAR innerHTML COMPLETAMENTE
  while (juegosGrid.firstChild) {
    juegosGrid.removeChild(juegosGrid.firstChild);
  }

  const juegos = [
    {
      nombre: "Nexus Runner",
      descripcion: "Corre a través de dimensiones en este juego de plataformas de alta velocidad con gráficos psicodélicos.",
      imagen: "../assets/",
      archivo: "../assets/",
      tamaño: "850 MB",
      tags: ["Plataformas", "Carrera", "Multidimensional"],
    },
    {
      nombre: "Cyber Samurai",
      descripcion: "Conviértete en un samurái cibernético y libera a Neo-Tokio de corporaciones corruptas.",
      imagen: "../assets/",
      archivo: "../assets/",
      tamaño: "1.2 GB",
      tags: ["Acción", "Hack and Slash", "Ciberpunk"],
    },
  ];

  juegos.forEach((juego, index) => {
    const juegoCard = document.createElement("div");
    juegoCard.className = "juego-card fade-in";

    const loadingStrategy = index < 4 ? "eager" : "lazy";

    const juegoImg = document.createElement("div");
    juegoImg.className = "juego-img";

    const img = document.createElement("img");
    img.src = juego.imagen;
    img.alt = juego.nombre;
    img.loading = loadingStrategy;
    img.addEventListener("error", function() {
      this.src = getPlaceholderSVG();
    });

    juegoImg.appendChild(img);

    const juegoInfo = document.createElement("div");
    juegoInfo.className = "juego-info";

    const h3 = document.createElement("h3");
    h3.textContent = juego.nombre;

    const p = document.createElement("p");
    p.textContent = juego.descripcion;

    const juegoMeta = document.createElement("div");
    juegoMeta.className = "juego-meta";

    const tamañoSpan = document.createElement("span");
    tamañoSpan.className = "juego-tamaño";
    tamañoSpan.textContent = juego.tamaño;

    const tagSpan = document.createElement("span");
    tagSpan.className = "juego-tag";
    tagSpan.textContent = juego.tags[0];

    juegoMeta.appendChild(tamañoSpan);
    juegoMeta.appendChild(tagSpan);

    const downloadBtn = document.createElement("a");
    downloadBtn.href = "#";
    downloadBtn.className = "btn btn-primary";
    downloadBtn.setAttribute("data-archivo", juego.archivo);
    downloadBtn.setAttribute("data-nombre", juego.nombre);
    downloadBtn.textContent = "Descargar";

    juegoInfo.appendChild(h3);
    juegoInfo.appendChild(p);
    juegoInfo.appendChild(juegoMeta);
    juegoInfo.appendChild(downloadBtn);

    juegoCard.appendChild(juegoImg);
    juegoCard.appendChild(juegoInfo);

    juegosGrid.appendChild(juegoCard);
  });

  setTimeout(() => {
    initGameCards();
    initScrollEffects();
  }, 100);
}

// SVG placeholder mejorado - VERSIÓN SEGURA
function getPlaceholderSVG() {
  const svgString = `
    <svg width="400" height="225" viewBox="0 0 400 225" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#16213e;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#0f3460;stop-opacity:1" />
        </linearGradient>
      </defs>
      <rect width="400" height="225" fill="url(#grad)"/>
      <path d="M150 100L175 125H200L175 100V87.5H150V100Z" fill="#00f3ff"/>
      <text x="200" y="160" text-anchor="middle" fill="#4cc9f0" font-family="Arial" font-size="12">
        Imagen no disponible
      </text>
    </svg>
  `;
  
  return "data:image/svg+xml;base64," + btoa(svgString);
}

// Manejo de errores de imágenes - OPTIMIZADO
function initImageErrorHandling() {
  const images = document.querySelectorAll("img");

  images.forEach((img) => {
    if (isAboveTheFold(img)) {
      img.loading = "eager";
    }

    img.addEventListener("error", function () {
      console.warn(`Imagen no encontrada: ${this.src}`);
      this.src = getPlaceholderSVG();
      this.alt = "Imagen no disponible";
      this.classList.add("image-error");
    });

    img.addEventListener("load", function () {
      this.classList.add("image-loaded");
      this.style.opacity = "1";
    });

    if (img.classList.contains("critical-image")) {
      preloadImage(img.src);
    }
  });
}

// Verificar si una imagen está en la vista inicial
function isAboveTheFold(img) {
  const rect = img.getBoundingClientRect();
  return rect.top < window.innerHeight && rect.bottom > 0;
}

// Precargar imágenes importantes
function preloadImage(src) {
  const link = document.createElement("link");
  link.rel = "preload";
  link.as = "image";
  link.href = src;
  document.head.appendChild(link);
}

// ===== SISTEMA DE MEMES CON MÚLTIPLES VIDEOS - VERSIÓN SEGURA =====

let currentMemeIndex = 0;
let memeDatabase = [];
let favorites = [];

function initMemeGallery() {
  try {
    const memeVideo = document.getElementById("memeVideo");
    const soundToggle = document.getElementById("soundToggle");
    const prevMemeBtn = document.getElementById("prevMeme");
    const nextMemeBtn = document.getElementById("nextMeme");
    const randomMemeBtn = document.getElementById("randomMeme");
    const shareMemeBtn = document.getElementById("shareMeme");
    const favoriteBtn = document.getElementById("favoriteBtn");
    const memeText = document.getElementById("memeText");
    const memeThumbnails = document.getElementById("memeThumbnails");
    const currentMemeSpan = document.getElementById("currentMeme");
    const totalMemesSpan = document.getElementById("totalMemes");

    if (!memeVideo || !totalMemesSpan) {
      console.error("Elementos esenciales de memes no encontrados");
      return;
    }

    memeVideo.addEventListener("error", function (e) {
      console.error("Error en el elemento de video:", e);
      showNotification("Error al cargar el video", "error");
    });

    memeDatabase = [
      {
        id: 1,
        video: "./assets/videos/memes/meme1.mp4",
        thumbnail: "./assets/videos/thumbnails/meme1-thumb.jpg",
        title: "",
        favorite: false,
      },
      {
        id: 2,
        video: "./assets/videos/memes/meme2.mp4",
        thumbnail: "./assets/videos/memes/thumbnails/meme2-thumb.jpg",
        title: "",
        favorite: false,
      },
      {
        id: 3,
        video: "./assets/videos/memes/",
        thumbnail: "./assets/videos/memes/thumbnails/",
        title: "",
        favorite: false,
      },
      {
        id: 4,
        video: "./assets/videos/memes/",
        thumbnail: "./assets/videos/memes/thumbnails/",
        title: "",
        favorite: false,
      },
      {
        id: 5,
        video: "./assets/videos/memes/",
        thumbnail: "./assets/videos/memes/thumbnails/",
        title: "",
        favorite: false,
      },
      {
        id: 6,
        video: "./assets/videos/memes/",
        thumbnail: "./assets/videos/memes/thumbnails/",
        title: "",
        favorite: false,
      },
    ];

    favorites = JSON.parse(localStorage.getItem("memeFavorites")) || [];
    totalMemesSpan.textContent = memeDatabase.length;

    memeDatabase.forEach((meme) => {
      meme.favorite = favorites.includes(meme.id);
    });

    generateThumbnails();

    if (memeDatabase.length > 0) {
      loadMeme(currentMemeIndex);
    }

    updateNavButtons();

    if (soundToggle) soundToggle.addEventListener("click", toggleSound);
    if (prevMemeBtn) prevMemeBtn.addEventListener("click", loadPrevMeme);
    if (nextMemeBtn) nextMemeBtn.addEventListener("click", loadNextMeme);
    if (randomMemeBtn) randomMemeBtn.addEventListener("click", loadRandomMeme);
    if (shareMemeBtn) shareMemeBtn.addEventListener("click", shareMeme);
    if (favoriteBtn) favoriteBtn.addEventListener("click", toggleFavorite);

    document.addEventListener("keydown", function (event) {
      if (event.code === "ArrowLeft") {
        loadPrevMeme();
      } else if (event.code === "ArrowRight") {
        loadNextMeme();
      } else if (event.code === "Space") {
        event.preventDefault();
        if (memeVideo.paused) {
          memeVideo.play();
        } else {
          memeVideo.pause();
        }
      }
    });
  } catch (error) {
    console.error("Error inicializando galería de memes:", error);
  }
}

function generateThumbnails() {
  const memeThumbnails = document.getElementById("memeThumbnails");
  if (!memeThumbnails) return;

  while (memeThumbnails.firstChild) {
    memeThumbnails.removeChild(memeThumbnails.firstChild);
  }

  memeDatabase.forEach((meme, index) => {
    const thumb = document.createElement("div");
    thumb.className = `meme-thumb ${index === currentMemeIndex ? "active" : ""}`;
    thumb.dataset.index = index;

    if (meme.thumbnail) {
      const img = document.createElement("img");
      img.src = meme.thumbnail;
      img.alt = `Meme ${meme.id}`;
      img.loading = "lazy";
      thumb.appendChild(img);
    } else {
      const color1 = Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');
      const color2 = Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');
      thumb.style.background = `linear-gradient(45deg, #${color1}, #${color2})`;
      
      const placeholder = document.createElement("div");
      placeholder.style.cssText = "width:100%;height:100%;display:flex;align-items:center;justify-content:center;color:white;font-size:0.7rem;";
      placeholder.textContent = `Meme ${meme.id}`;
      thumb.appendChild(placeholder);
    }

    thumb.addEventListener("click", () => {
      loadMeme(index);
    });

    memeThumbnails.appendChild(thumb);
  });
}

function loadMeme(index) {
  if (index < 0 || index >= memeDatabase.length) return;

  const memeVideo = document.getElementById("memeVideo");
  const memeText = document.getElementById("memeText");
  const currentMemeSpan = document.getElementById("currentMeme");

  if (!memeVideo || !memeText || !currentMemeSpan) return;

  currentMemeIndex = index;
  const meme = memeDatabase[index];

  if (!meme.video || meme.video === "") {
    console.warn(`El meme ${index} no tiene video válido`);
    showNotification("Este meme no tiene video disponible", "error");
    return;
  }

  const wasMuted = memeVideo.muted;

  while (memeVideo.firstChild) {
    memeVideo.removeChild(memeVideo.firstChild);
  }

  const source = document.createElement("source");
  source.src = meme.video;
  source.type = "video/mp4";
  memeVideo.appendChild(source);

  memeText.textContent = meme.title;
  currentMemeSpan.textContent = index + 1;

  updateFavoriteButton();
  updateActiveThumbnail();
  updateNavButtons();

  createMemeParticles(15);

  memeVideo.load();

  const playVideo = () => {
    memeVideo.muted = wasMuted;

    memeVideo.play().catch((error) => {
      console.warn("Error al reproducir automáticamente:", error);
      memeVideo.controls = true;

      const tryPlayOnInteraction = () => {
        memeVideo.play().catch((e) => {
          console.log("Reproducción manual requerida");
        });
        document.removeEventListener("click", tryPlayOnInteraction);
        document.removeEventListener("touchstart", tryPlayOnInteraction);
      };

      document.addEventListener("click", tryPlayOnInteraction);
      document.addEventListener("touchstart", tryPlayOnInteraction);
    });
  };

  memeVideo.addEventListener("loadedmetadata", playVideo, { once: true });
  setTimeout(playVideo, 1000);
}

function toggleSound() {
  const memeVideo = document.getElementById("memeVideo");
  const soundToggle = document.getElementById("soundToggle");

  if (!memeVideo || !soundToggle) return;

  memeVideo.muted = !memeVideo.muted;

  if (memeVideo.muted) {
    soundToggle.textContent = "🔇";
    soundToggle.title = "Activar sonido";
  } else {
    soundToggle.textContent = "🔊";
    soundToggle.title = "Silenciar";

    if (memeVideo.paused) {
      memeVideo.play().catch((e) => {
        console.log("No se pudo reproducir automáticamente");
      });
    }
  }

  createMemeParticles(8);
}

function loadPrevMeme() {
  let newIndex = currentMemeIndex - 1;
  if (newIndex < 0) newIndex = memeDatabase.length - 1;
  loadMeme(newIndex);
}

function loadNextMeme() {
  let newIndex = currentMemeIndex + 1;
  if (newIndex >= memeDatabase.length) newIndex = 0;
  loadMeme(newIndex);
}

function loadRandomMeme() {
  if (memeDatabase.length <= 1) return;

  let newIndex;
  do {
    newIndex = Math.floor(Math.random() * memeDatabase.length);
  } while (newIndex === currentMemeIndex);

  loadMeme(newIndex);

  const memeContainer = document.getElementById("memeContainer");
  if (memeContainer) {
    memeContainer.style.animation = "shake 0.5s";
    setTimeout(() => {
      memeContainer.style.animation = "";
    }, 500);
  }

  createMemeParticles(20);
}

function toggleFavorite() {
  const meme = memeDatabase[currentMemeIndex];
  meme.favorite = !meme.favorite;

  if (meme.favorite) {
    if (!favorites.includes(meme.id)) {
      favorites.push(meme.id);
    }
  } else {
    favorites = favorites.filter((id) => id !== meme.id);
  }

  localStorage.setItem("memeFavorites", JSON.stringify(favorites));
  updateFavoriteButton();
  createMemeParticles(10);
}

function updateFavoriteButton() {
  const favoriteBtn = document.getElementById("favoriteBtn");
  if (!favoriteBtn) return;

  const meme = memeDatabase[currentMemeIndex];
  if (meme.favorite) {
    favoriteBtn.classList.add("active");
    favoriteBtn.title = "Quitar de favoritos";
  } else {
    favoriteBtn.classList.remove("active");
    favoriteBtn.title = "Añadir a favoritos";
  }
}

function updateActiveThumbnail() {
  const thumbs = document.querySelectorAll(".meme-thumb");
  thumbs.forEach((thumb, index) => {
    if (index === currentMemeIndex) {
      thumb.classList.add("active");
    } else {
      thumb.classList.remove("active");
    }
  });
}

function updateNavButtons() {
  const prevMemeBtn = document.getElementById("prevMeme");
  const nextMemeBtn = document.getElementById("nextMeme");
  const randomMemeBtn = document.getElementById("randomMeme");

  if (prevMemeBtn) prevMemeBtn.disabled = memeDatabase.length <= 1;
  if (nextMemeBtn) nextMemeBtn.disabled = memeDatabase.length <= 1;
  if (randomMemeBtn) randomMemeBtn.disabled = memeDatabase.length <= 1;
}

function shareMeme() {
  const meme = memeDatabase[currentMemeIndex];

  if (navigator.share) {
    navigator.share({
      title: `Meme: ${meme.title}`,
      text: "¡Mira este divertido meme de SerakDep Gaming!",
      url: window.location.href + `#meme-${meme.id}`,
    }).catch((error) => console.log("Error al compartir", error));
  } else {
    const shareText = `¡Mira este meme: "${meme.title}" - SerakDep Gaming`;
    showNotification(shareText, "info");
  }
}

function createMemeParticles(count) {
  const memeContainer = document.getElementById("memeContainer");
  if (!memeContainer) return;

  for (let i = 0; i < count; i++) {
    const particle = document.createElement("div");
    particle.classList.add("meme-particle");

    const containerRect = memeContainer.getBoundingClientRect();
    const posX = Math.random() * containerRect.width;
    const posY = Math.random() * containerRect.height;

    particle.style.cssText = `
      position: absolute;
      left: ${posX}px;
      top: ${posY}px;
      width: ${Math.random() * 4 + 2}px;
      height: ${Math.random() * 4 + 2}px;
      background: ${["rgba(0, 195, 255, 0.7)", "rgba(255, 0, 128, 0.7)", "rgba(0, 255, 157, 0.7)", "rgba(255, 215, 0, 0.7)"][Math.floor(Math.random() * 4)]};
      border-radius: 50%;
      pointer-events: none;
      z-index: 10;
      will-change: transform, opacity;
    `;

    memeContainer.appendChild(particle);

    const animation = particle.animate(
      [
        {
          transform: "translate(0, 0) scale(1)",
          opacity: 1,
        },
        {
          transform: `translate(${Math.random() * 80 - 40}px, ${Math.random() * 80 - 40}px) scale(0)`,
          opacity: 0,
        },
      ],
      {
        duration: Math.random() * 800 + 400,
        easing: "cubic-bezier(0.215, 0.610, 0.355, 1)",
      }
    );

    animation.onfinish = () => {
      particle.remove();
    };
  }
}

// Efectos para los elementos de contacto
function initContactEffects() {
  const contactoItems = document.querySelectorAll(".contacto-item");
  contactoItems.forEach((item) => {
    item.addEventListener("mouseenter", function () {
      this.style.transform = "translateX(10px)";
      this.style.borderLeft = "3px solid var(--neon-cyan)";
      this.style.background = "linear-gradient(90deg, rgba(0,255,255,0.1) 0%, transparent 100%)";
    });

    item.addEventListener("mouseleave", function () {
      this.style.transform = "translateX(0)";
      this.style.borderLeft = "none";
      this.style.background = "none";
    });
  });
}

// Añadir keyframes de animación para el shake de forma segura
if (!document.querySelector("#shake-animation")) {
  const style = document.createElement("style");
  style.id = "shake-animation";
  style.textContent = `
    @keyframes shake {
      0%, 100% { transform: translateX(0); }
      25% { transform: translateX(-5px); }
      50% { transform: translateX(5px); }
      75% { transform: translateX(-5px); }
    }
    
    .juego-card, .meme-thumb, .btn {
      will-change: transform;
      transform: translateZ(0);
    }
    
    @media (prefers-reduced-motion: reduce) {
      * {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.01ms !important;
      }
    }
  `;
  document.head.appendChild(style);
}

// Navegación suave para enlaces internos
document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");
      if (targetId === "#") return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });
});

// Efectos de teclado para una experiencia más inmersiva
document.addEventListener("keydown", function (e) {
  if (e.ctrlKey && e.key === "g") {
    showNotification("¡Modo Gamer activado!", "success");
    document.body.style.filter = "hue-rotate(180deg)";
    setTimeout(() => {
      document.body.style.filter = "";
    }, 1000);
  }
});

// Mejorar el rendimiento de las animaciones
let lastScrollY = window.scrollY;
window.addEventListener(
  "scroll",
  function () {
    if (Math.abs(lastScrollY - window.scrollY) > 50) {
      lastScrollY = window.scrollY;
    }
  },
  { passive: true }
);

// Optimizar performance en navegadores antiguos
if (!window.requestAnimationFrame) {
  window.requestAnimationFrame =
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    function (callback) {
      return setTimeout(callback, 1000 / 60);
    };
}

// Detectar orientación y ajustar dinámicamente
function handleOrientationChange() {
  const isLandscape = window.matchMedia("(orientation: landscape)").matches;
  const isMobile = window.innerWidth <= 768;
  
  if (isLandscape && isMobile) {
    document.body.classList.add('mobile-landscape');
    
    // Ajustar altura del hero para evitar scroll excesivo
    const hero = document.querySelector('.hero');
    if (hero) {
      hero.style.minHeight = 'calc(100vh - 70px)';
    }
    
    // Ocultar elementos decorativos para mejor performance
    const decorativeElements = document.querySelectorAll('.decorative, .particles');
    decorativeElements.forEach(el => {
      el.style.display = 'none';
    });
  } else {
    document.body.classList.remove('mobile-landscape');
    
    // Restaurar estilos
    const hero = document.querySelector('.hero');
    if (hero) {
      hero.style.minHeight = '';
    }
    
    const decorativeElements = document.querySelectorAll('.decorative, .particles');
    decorativeElements.forEach(el => {
      el.style.display = '';
    });
  }
}

// Inicializar detección de orientación
function initOrientationHandler() {
  // Ejecutar al cargar
  handleOrientationChange();
  
  // Ejecutar al cambiar orientación
  window.addEventListener('orientationchange', handleOrientationChange);
  
  // Ejecutar al redimensionar
  window.addEventListener('resize', handleOrientationChange);
}

// Llamar en DOMContentLoaded
document.addEventListener("DOMContentLoaded", function() {
  initOrientationHandler();
  // ... el resto de tu código de inicialización
});