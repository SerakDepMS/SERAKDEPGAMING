// Efectos futuristas y funcionalidades gaming - VERSIÓN OPTIMIZADA
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
  // Precargar imágenes críticas si existen
  const criticalImages = [
    // Agrega aquí las rutas de imágenes críticas
  ];

  criticalImages.forEach((src) => {
    const img = new Image();
    img.src = src;
  });
}

// Efecto de partículas en el fondo - OPTIMIZADO
function initParticles() {
  // Evitar duplicados
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

  // Crear menos partículas para mejor rendimiento
  for (let i = 0; i < 30; i++) {
    createParticle(particlesContainer);
  }
}

function createParticle(container) {
  const particle = document.createElement("div");
  const size = Math.random() * 2 + 1; // Partículas más pequeñas
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
  const duration = Math.random() * 30 + 20; // Animaciones más lentas
  const xMovement = (Math.random() - 0.5) * 50; // Menos movimiento
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

// Efecto de máquina de escribir para títulos
function initTypewriter() {
  const heroTitle = document.querySelector(".hero-title");
  if (heroTitle && !heroTitle.classList.contains("typed")) {
    const text = heroTitle.textContent;
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

// Inicializar audio al cargar
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
    if (
      downloadBtn &&
      !downloadBtn.classList.contains("download-initialized")
    ) {
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
    // Reducido de 5 a 3 partículas
    setTimeout(() => {
      const particle = document.createElement("div");
      const size = Math.random() * 3 + 2; // Tamaño reducido
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
    }, i * 150); // Intervalo aumentado
  }
}

// Función mejorada de descarga con confirmación
function simulateDownload(card) {
  const titleElement = card.querySelector("h3");
  const downloadBtn = card.querySelector(".btn");
  const sizeElement = card.querySelector(".juego-tamaño");

  if (!titleElement || !downloadBtn) return;

  const gameName = titleElement.textContent;
  const archivo = downloadBtn.getAttribute("data-archivo") || "#";
  const nombreJuego = downloadBtn.getAttribute("data-nombre") || gameName;
  const tamaño = sizeElement ? sizeElement.textContent : "Tamaño desconocido";

  showDownloadModal(gameName, tamaño, archivo, () => {
    startRealDownload(card, gameName, archivo, nombreJuego);
  });
}

// Modal de confirmación de descarga
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

  modal.innerHTML = `
    <div class="modal-content" style="
      background: linear-gradient(135deg, #1a1a2e, #16213e);
      padding: 2rem;
      border-radius: 10px;
      border: 1px solid #00f3ff;
      box-shadow: 0 0 30px rgba(0, 243, 255, 0.2);
      max-width: 400px;
      width: 90%;
      text-align: center;
    ">
      <h3 style="color: #00f3ff; margin-bottom: 1rem; font-family: 'Rajdhani', sans-serif;">Confirmar Descarga</h3>
      <p style="color: white; margin-bottom: 0.5rem; font-family: 'Rajdhani', sans-serif;">¿Estás seguro de que quieres descargar <strong>${gameName}</strong>?</p>
      <p style="color: #ccc; margin-bottom: 1.5rem; font-family: 'Rajdhani', sans-serif;">Tamaño: ${tamaño}</p>
      <div class="modal-buttons" style="display: flex; gap: 1rem; justify-content: center;">
        <button class="modal-btn confirm" style="
          background: linear-gradient(45deg, #00ff9d, #00f3ff);
          border: none;
          padding: 0.75rem 1.5rem;
          border-radius: 5px;
          color: #1a1a2e;
          cursor: pointer;
          font-weight: bold;
          font-family: 'Rajdhani', sans-serif;
          transition: transform 0.2s ease;
        ">Sí, Descargar</button>
        <button class="modal-btn cancel" style="
          background: transparent;
          border: 1px solid #ff00ff;
          padding: 0.75rem 1.5rem;
          border-radius: 5px;
          color: #ff00ff;
          cursor: pointer;
          font-family: 'Rajdhani', sans-serif;
          transition: transform 0.2s ease;
        ">Cancelar</button>
      </div>
    </div>
  `;

  document.body.appendChild(modal);

  setTimeout(() => (modal.style.opacity = "1"), 100);

  // Event listeners con mejoras de UX
  const confirmBtn = modal.querySelector(".modal-btn.confirm");
  const cancelBtn = modal.querySelector(".modal-btn.cancel");

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

  // Cerrar con ESC
  const handleKeydown = (e) => {
    if (e.key === "Escape") {
      closeModal();
      document.removeEventListener("keydown", handleKeydown);
    }
  };
  document.addEventListener("keydown", handleKeydown);
}

// Función principal de descarga real
function startRealDownload(card, gameName, archivo, nombreJuego) {
  const downloadBtn = card.querySelector(".btn");

  if (!downloadBtn || downloadBtn.classList.contains("downloading")) {
    return;
  }

  downloadBtn.classList.add("downloading");
  const originalText = downloadBtn.textContent;
  const originalBackground = downloadBtn.style.background;

  downloadBtn.textContent = "Descargando...";
  downloadBtn.style.background = "linear-gradient(45deg, #00ff9d, #00f3ff)";
  downloadBtn.disabled = true;

  // Crear elemento de progreso
  const progressBar = document.createElement("div");
  progressBar.className = "download-progress";
  progressBar.style.cssText = `
    margin-top: 0.5rem;
    width: 100%;
  `;

  progressBar.innerHTML = `
    <div class="progress-bar" style="
      width: 100%;
      height: 4px;
      background: rgba(255, 255, 255, 0.1);
      border-radius: 2px;
      overflow: hidden;
      margin: 0.5rem 0;
    ">
      <div class="progress-fill" style="
        width: 0%;
        height: 100%;
        background: linear-gradient(90deg, #00ff9d, #00f3ff);
        transition: width 0.3s ease;
      "></div>
    </div>
    <span class="progress-text" style="color: #00f3ff; font-size: 0.8rem; font-family: 'Rajdhani', sans-serif;">0%</span>
  `;

  const juegoInfo = card.querySelector(".juego-info");
  if (juegoInfo) {
    juegoInfo.appendChild(progressBar);
  }

  // Simular progreso de descarga
  let progress = 0;
  const interval = setInterval(() => {
    progress += Math.random() * 8 + 2; // Progreso más consistente
    if (progress >= 100) {
      progress = 100;
      clearInterval(interval);

      setTimeout(() => {
        try {
          // Crear enlace de descarga
          const downloadLink = document.createElement("a");
          downloadLink.href = sanitizeDownloadUrl(archivo);
          downloadLink.download = `${nombreJuego}.zip`;
          downloadLink.style.display = "none";
          document.body.appendChild(downloadLink);
          downloadLink.click();
          document.body.removeChild(downloadLink);

          // Efectos de completado
          downloadBtn.textContent = "¡Descargado!";
          const progressText = progressBar.querySelector(".progress-text");
          if (progressText) progressText.textContent = "¡Completado!";
          downloadBtn.classList.remove("downloading");

          showNotification(
            `${gameName} se ha descargado correctamente`,
            "success"
          );

          setTimeout(() => {
            downloadBtn.textContent = originalText;
            downloadBtn.style.background = originalBackground;
            downloadBtn.disabled = false;
            if (progressBar.parentNode) {
              progressBar.remove();
            }
          }, 3000);
        } catch (error) {
          handleDownloadError(card, "Error al descargar el archivo");
        }
      }, 500);
    }

    // Actualizar barra de progreso
    const progressFill = progressBar.querySelector(".progress-fill");
    const progressText = progressBar.querySelector(".progress-text");
    if (progressFill && progressText) {
      progressFill.style.width = `${progress}%`;
      progressText.textContent = `${Math.round(progress)}%`;
    }
  }, 120); // Intervalo ligeramente aumentado
}

// Helper to ensure only a safe protocol can be used for download URLs
function sanitizeDownloadUrl(url) {
  try {
    if (typeof url !== 'string') return '#';
    url = url.trim().replace(/[\x00-\x1F\x7F]+/g, ''); // Remove control characters
    // Disallow data:, javascript:, vbscript:, and file: protocols
    const tmp = document.createElement('a');
    tmp.href = url;
    const allowedProtocols = ['http:', 'https:'];
    // If input is a relative URL, protocol will be ':'
    const isRelative = (tmp.protocol === ':');
    const isSafeProtocol = allowedProtocols.includes(tmp.protocol);
    // Disallow URLs that begin with "//" (protocol-relative)
    const startsWithDoubleSlash = url.startsWith('//');
    // Very basic further check: disallow javascript:/data: urls inside relative paths
    if (
      (isRelative && !startsWithDoubleSlash && !/^(\s*javascript:|\s*data:|\s*vbscript:|\s*file:)/i.test(url)) ||
      isSafeProtocol
    ) {
      return url;
    }
  } catch (e) {
    // If URL parsing fails, treat as unsafe
  }
  // fallback: block and use a safe placeholder
  return '#';
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

    // Agregar event listener para reintentar
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
      progressFill.style.background =
        "linear-gradient(90deg, #ff00ff, #9d00ff)";
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

// Manejo del formulario de contacto
function initContactForm() {
  const contactForm = document.querySelector("form");
  if (contactForm && !contactForm.classList.contains("form-initialized")) {
    contactForm.classList.add("form-initialized");

    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      if (!validateForm(this)) {
        return;
      }

      const submitBtn = this.querySelector('button[type="submit"]');
      const originalText = submitBtn.textContent;
      const originalBackground = submitBtn.style.background;

      submitBtn.textContent = "Enviando...";
      submitBtn.disabled = true;

      // Simular envío con mejor UX
      setTimeout(() => {
        submitBtn.textContent = "¡Mensaje Enviado!";
        submitBtn.style.background = "linear-gradient(45deg, #00ff9d, #00f3ff)";

        showNotification(
          "Mensaje enviado con éxito. Te contactaremos pronto.",
          "success"
        );

        // Crear efecto de confeti
        createConfettiEffect(20);

        setTimeout(() => {
          submitBtn.textContent = originalText;
          submitBtn.disabled = false;
          submitBtn.style.background = originalBackground;
          contactForm.reset();
        }, 3000);
      }, 2000);
    });

    // Mejorar validación en tiempo real
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

  // Validación de email
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
    showNotification(
      "Por favor, completa todos los campos obligatorios correctamente",
      "error"
    );
  }

  return isValid;
}

// Efecto de confeti para éxito
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
            transform: `translate(${Math.random() * 200 - 100}px, ${
              window.innerHeight
            }px) rotate(${Math.random() * 360}deg)`,
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

// Mostrar notificaciones
function showNotification(message, type = "info") {
  const existingNotifications = document.querySelectorAll(
    ".custom-notification"
  );
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

// Cargar juegos dinámicamente - OPTIMIZADO
function cargarJuegos() {
  const juegosGrid = document.querySelector(".juegos-grid");
  if (!juegosGrid) return;

  juegosGrid.innerHTML = "";

  const juegos = [
    {
      nombre: "Nexus Runner",
      descripcion:
        "Corre a través de dimensiones en este juego de plataformas de alta velocidad con gráficos psicodélicos.",
      imagen: "../assets/images/juegos/",
      archivo: "../assets/downloads/juegos/",
      tamaño: "850 MB",
      tags: ["Plataformas", "Carrera", "Multidimensional"],
    },
    {
      nombre: "Cyber Samurai",
      descripcion:
        "Conviértete en un samurái cibernético y libera a Neo-Tokio de corporaciones corruptas.",
      imagen: "../assets/images/juegos/",
      archivo: "../assets/downloads/juegos/",
      tamaño: "1.2 GB",
      tags: ["Acción", "Hack and Slash", "Ciberpunk"],
    },
    // Agrega más juegos según necesites
  ];

  juegos.forEach((juego, index) => {
    const juegoCard = document.createElement("div");
    juegoCard.className = "juego-card fade-in";

    // Estrategia de carga optimizada
    const loadingStrategy = index < 4 ? "eager" : "lazy";

    juegoCard.innerHTML = `
      <div class="juego-img">
        <img src="${juego.imagen}" 
             alt="${juego.nombre}" 
             loading="${loadingStrategy}"
             onerror="this.src='${getPlaceholderSVG()}'">
      </div>
      <div class="juego-info">
        <h3>${juego.nombre}</h3>
        <p>${juego.descripcion}</p>
        <div class="juego-meta">
          <span class="juego-tamaño">${juego.tamaño}</span>
          <span class="juego-tag">${juego.tags[0]}</span>
        </div>
        <a href="#" class="btn btn-primary" data-archivo="${
          juego.archivo
        }" data-nombre="${juego.nombre}">Descargar</a>
      </div>
    `;

    juegosGrid.appendChild(juegoCard);
  });

  setTimeout(() => {
    initGameCards();
    initScrollEffects();
  }, 100);
}

// SVG placeholder mejorado
function getPlaceholderSVG() {
  return (
    "data:image/svg+xml;base64," +
    btoa(`
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
  `)
  );
}

// Manejo de errores de imágenes - OPTIMIZADO
function initImageErrorHandling() {
  const images = document.querySelectorAll("img");

  images.forEach((img) => {
    // Remover loading="lazy" de imágenes críticas (above-the-fold)
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

    // Precargar imágenes importantes
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

// ===== SISTEMA DE MEMES CON MÚLTIPLES VIDEOS =====

// Variables globales para memes
let currentMemeIndex = 0;
let memeDatabase = [];
let favorites = [];

function initMemeGallery() {
  try {
    // Elementos del DOM
    const memeVideo = document.getElementById("memeVideo");
    const soundToggle = document.getElementById("soundToggle");
    const prevMemeBtn = document.getElementById("prevMeme");
    const nextMemeBtn = document.getElementById("nextMeme");
    const randomMemeBtn = document.getElementById("randomMeme");
    const shareMemeBtn = document.getElementById("shareMeme");
    const favoriteBtn = document.getElementById("favoriteBtn");
    const memeText = document.getElementById("memeText");
    const memeContainer = document.getElementById("memeContainer");
    const memeThumbnails = document.getElementById("memeThumbnails");
    const currentMemeSpan = document.getElementById("currentMeme");
    const totalMemesSpan = document.getElementById("totalMemes");

    // Verificar elementos críticos
    if (!memeVideo || !totalMemesSpan) {
      console.error("Elementos esenciales de memes no encontrados");
      return;
    }

    // Agregar manejo de errores global para el video
    memeVideo.addEventListener("error", function (e) {
      console.error("Error en el elemento de video:", e);
      showNotification("Error al cargar el video", "error");
    });

    // Base de datos de memes
    memeDatabase = [
      {
        id: 1,
        video: "", // aqui va el vinculo del video
        thumbnail: "", // aqui va el vinculo del video
        title: "¡Esto es gaming puro! 🎮",
        favorite: false,
      },
      {
        id: 2,
        video: "", // aqui va el vinculo del video
        thumbnail: "", // aqui va el vinculo del video
        title: "Cuando ganas por primera vez 😎",
        favorite: false,
      },
      // Agrega más memes aquí
    ];

    // Cargar favoritos
    favorites = JSON.parse(localStorage.getItem("memeFavorites")) || [];

    // Inicializar contadores
    totalMemesSpan.textContent = memeDatabase.length;

    // Sincronizar favoritos
    memeDatabase.forEach((meme) => {
      meme.favorite = favorites.includes(meme.id);
    });

    // Generar miniaturas
    generateThumbnails();

    // Cargar primer meme
    if (memeDatabase.length > 0) {
      loadMeme(currentMemeIndex);
    }

    // Actualizar navegación
    updateNavButtons();

    // Event listeners seguros
    if (soundToggle) soundToggle.addEventListener("click", toggleSound);
    if (prevMemeBtn) prevMemeBtn.addEventListener("click", loadPrevMeme);
    if (nextMemeBtn) nextMemeBtn.addEventListener("click", loadNextMeme);
    if (randomMemeBtn) randomMemeBtn.addEventListener("click", loadRandomMeme);
    if (shareMemeBtn) shareMemeBtn.addEventListener("click", shareMeme);
    if (favoriteBtn) favoriteBtn.addEventListener("click", toggleFavorite);

    // Navegación por teclado
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

// Funciones de la galería de memes
function generateThumbnails() {
  const memeThumbnails = document.getElementById("memeThumbnails");
  if (!memeThumbnails) return;

  memeThumbnails.innerHTML = "";

  memeDatabase.forEach((meme, index) => {
    const thumb = document.createElement("div");
    thumb.className = `meme-thumb ${
      index === currentMemeIndex ? "active" : ""
    }`;
    thumb.dataset.index = index;

    if (meme.thumbnail) {
      thumb.innerHTML = `<img src="${meme.thumbnail}" alt="Meme ${meme.id}" loading="lazy">`;
    } else {
      thumb.style.background = `linear-gradient(45deg, #${Math.floor(
        Math.random() * 16777215
      ).toString(16)}, #${Math.floor(Math.random() * 16777215).toString(16)})`;
      thumb.innerHTML = `<div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;color:white;font-size:0.7rem;">Meme ${meme.id}</div>`;
    }

    thumb.addEventListener("click", () => {
      loadMeme(index);
    });

    memeThumbnails.appendChild(thumb);
  });
}

// FUNCIÓN LOADMEME CORREGIDA
function loadMeme(index) {
  if (index < 0 || index >= memeDatabase.length) return;

  const memeVideo = document.getElementById("memeVideo");
  const memeText = document.getElementById("memeText");
  const currentMemeSpan = document.getElementById("currentMeme");

  if (!memeVideo || !memeText || !currentMemeSpan) return;

  currentMemeIndex = index;
  const meme = memeDatabase[index];

  // Verificar que el video tenga una fuente válida
  if (!meme.video || meme.video === "") {
    console.warn(`El meme ${index} no tiene video válido`);
    showNotification("Este meme no tiene video disponible", "error");
    return;
  }

  // Guardar el estado de mute actual
  const wasMuted = memeVideo.muted;

  // Limpiar fuentes anteriores
  memeVideo.innerHTML = "";

  // Crear nueva fuente
  const source = document.createElement("source");
  source.src = meme.video;
  source.type = "video/mp4";
  memeVideo.appendChild(source);

  // Actualizar UI
  memeText.textContent = meme.title;
  currentMemeSpan.textContent = index + 1;

  updateFavoriteButton();
  updateActiveThumbnail();
  updateNavButtons();

  // Efectos
  createMemeParticles(15);

  // Manejar la carga y reproducción correctamente
  memeVideo.load(); // Forzar recarga

  // Esperar a que el video esté listo para reproducir
  const playVideo = () => {
    memeVideo.muted = wasMuted; // Restaurar estado de mute

    memeVideo
      .play()
      .then(() => {
        console.log(`Reproduciendo meme ${index}`);
      })
      .catch((error) => {
        console.warn("Error al reproducir automáticamente:", error);

        // Mostrar controles para reproducción manual
        memeVideo.controls = true;

        // Intentar reproducción con interacción del usuario
        const tryPlayOnInteraction = () => {
          memeVideo.play().catch((e) => {
            console.log("Reproducción manual requerida");
          });
          // Remover event listeners después del primer intento
          document.removeEventListener("click", tryPlayOnInteraction);
          document.removeEventListener("touchstart", tryPlayOnInteraction);
        };

        document.addEventListener("click", tryPlayOnInteraction);
        document.addEventListener("touchstart", tryPlayOnInteraction);
      });
  };

  // Esperar a que el metadata esté cargado
  memeVideo.addEventListener("loadedmetadata", playVideo, { once: true });

  // Timeout de seguridad si loadedmetadata no se dispara
  setTimeout(playVideo, 1000);
}

// FUNCIÓN TOGGLESOUND MEJORADA
function toggleSound() {
  const memeVideo = document.getElementById("memeVideo");
  const soundToggle = document.getElementById("soundToggle");

  if (!memeVideo || !soundToggle) return;

  // Cambiar estado de mute
  memeVideo.muted = !memeVideo.muted;

  if (memeVideo.muted) {
    soundToggle.textContent = "🔇";
    soundToggle.title = "Activar sonido";
  } else {
    soundToggle.textContent = "🔊";
    soundToggle.title = "Silenciar";

    // Intentar reproducir si estaba pausado
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

  createMemeParticles(20); // Reducido de 30 a 20
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
  createMemeParticles(10); // Reducido de 15 a 10
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
    navigator
      .share({
        title: `Meme Gaming: ${meme.title}`,
        text: "¡Mira este divertido meme gaming de SerakDep Gaming!",
        url: window.location.href + `#meme-${meme.id}`,
      })
      .catch((error) => console.log("Error al compartir", error));
  } else {
    const shareText = `¡Mira este meme gaming: "${meme.title}" - SerakDep Gaming`;
    // Usar showNotification en lugar de alert para mejor UX
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
      background: ${
        [
          "rgba(0, 195, 255, 0.7)",
          "rgba(255, 0, 128, 0.7)",
          "rgba(0, 255, 157, 0.7)",
          "rgba(255, 215, 0, 0.7)",
        ][Math.floor(Math.random() * 4)]
      };
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
          transform: `translate(${Math.random() * 80 - 40}px, ${
            Math.random() * 80 - 40
          }px) scale(0)`,
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

// Añadir keyframes de animación para el shake
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
    
    /* Optimizaciones de rendimiento */
    .juego-card, .meme-thumb, .btn {
      will-change: transform;
      transform: translateZ(0);
    }
    
    /* Mejoras de accesibilidad */
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
