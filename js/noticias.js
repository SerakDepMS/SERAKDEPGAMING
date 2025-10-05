// ===== SISTEMA MEJORADO DE NOTICIAS - VERSIÓN CORREGIDA Y SEGURA =====

document.addEventListener("DOMContentLoaded", function () {
  // Elementos del DOM - SELECCIÓN SEGURA
  const filtroBtns = document.querySelectorAll(".filtro-btn[data-categoria]");
  const noticiaCards = document.querySelectorAll(".noticia-card");
  const paginacionBtns = document.querySelectorAll(".paginacion-btn");
  const newsletterForm = document.querySelector(".newsletter-form");
  const searchInput = document.getElementById("search-noticias");
  const noticiasGrid = document.querySelector(".noticias-grid");

  // Verificar que los elementos esenciales existen
  if (!noticiasGrid) {
    console.error("Contenedor de noticias no encontrado");
    return;
  }

  // Estado de la aplicación
  let estadoNoticias = {
    categoriaActiva: "todas",
    paginaActual: 1,
    noticiasPorPagina: 6,
    busquedaActual: "",
    noticiasFavoritas: JSON.parse(localStorage.getItem("noticiasFavoritas")) || [],
  };

  // Inicializar la sección de noticias
  function inicializarNoticias() {
    console.log("Inicializando sistema de noticias...");

    // Aplicar estilos iniciales a las noticias
    noticiaCards.forEach((card) => {
      card.style.opacity = "0";
      card.style.transform = "translateY(20px)";
      card.style.transition = "opacity 0.5s ease, transform 0.5s ease";
    });

    aplicarFiltros();
    configurarFiltros();
    configurarPaginacion();
    configurarNewsletter();
    configurarBusqueda();
    configurarFavoritos();
    actualizarContadorNoticias();
    actualizarPaginacion();

    // Animación de entrada inicial
    setTimeout(() => {
      noticiaCards.forEach((card, index) => {
        setTimeout(() => {
          card.style.opacity = "1";
          card.style.transform = "translateY(0)";
        }, 100 * index);
      });
    }, 300);
  }

  // Filtrado mejorado de noticias
  function configurarFiltros() {
    if (filtroBtns.length === 0) {
      console.warn("Botones de filtro no encontrados");
      return;
    }

    filtroBtns.forEach((btn) => {
      btn.addEventListener("click", function (e) {
        e.preventDefault();

        // Animación de click en el botón
        this.style.transform = "scale(0.95)";
        setTimeout(() => {
          this.style.transform = "scale(1)";
        }, 150);

        // Cambiar categoría activa
        filtroBtns.forEach((b) => {
          b.classList.remove("active");
          b.setAttribute("aria-pressed", "false");
        });

        this.classList.add("active");
        this.setAttribute("aria-pressed", "true");

        estadoNoticias.categoriaActiva = this.getAttribute("data-categoria");
        estadoNoticias.paginaActual = 1;

        aplicarFiltros();
        actualizarPaginacion();
        actualizarContadorNoticias();

        // Efecto visual de transición
        noticiasGrid.style.opacity = "0.7";
        setTimeout(() => {
          noticiasGrid.style.opacity = "1";
        }, 300);

        // Anunciar cambio para lectores de pantalla
        anunciarCambio(`Mostrando noticias de ${this.textContent.trim()}`);
      });
    });
  }

  // Función mejorada para aplicar filtros
  function aplicarFiltros() {
    let noticiasVisibles = 0;
    const noticiasFiltradas = [];

    noticiaCards.forEach((card, index) => {
      const categoriaCard = card.getAttribute("data-categoria");
      const textoCard = card.textContent.toLowerCase();
      const tituloCard = card.querySelector(".noticia-titulo")?.textContent.toLowerCase() || "";
      const resumenCard = card.querySelector(".noticia-resumen")?.textContent.toLowerCase() || "";
      const busqueda = estadoNoticias.busquedaActual.toLowerCase();

      const coincideCategoria =
        estadoNoticias.categoriaActiva === "todas" ||
        categoriaCard === estadoNoticias.categoriaActiva;

      const coincideBusqueda =
        estadoNoticias.busquedaActual === "" ||
        textoCard.includes(busqueda) ||
        tituloCard.includes(busqueda) ||
        resumenCard.includes(busqueda);

      if (coincideCategoria && coincideBusqueda) {
        noticiasFiltradas.push(card);
        noticiasVisibles++;
      }
    });

    // Aplicar paginación a las noticias filtradas
    const inicio = (estadoNoticias.paginaActual - 1) * estadoNoticias.noticiasPorPagina;
    const fin = estadoNoticias.paginaActual * estadoNoticias.noticiasPorPagina;

    noticiaCards.forEach((card, index) => {
      const posicion = noticiasFiltradas.indexOf(card);
      const mostrar = posicion >= inicio && posicion < fin && noticiasFiltradas.includes(card);

      if (mostrar) {
        card.style.display = "block";
        // Animación de entrada escalonada
        setTimeout(() => {
          card.style.opacity = "1";
          card.style.transform = "translateY(0)";
        }, 50 * (posicion - inicio));
      } else {
        card.style.display = "none";
        card.style.opacity = "0";
        card.style.transform = "translateY(20px)";
      }
    });

    // Mostrar mensaje si no hay resultados
    mostrarMensajeSinResultados(noticiasFiltradas.length === 0);

    return noticiasFiltradas.length;
  }

  // Sistema de búsqueda mejorado
  function configurarBusqueda() {
    if (!searchInput) {
      console.warn("Campo de búsqueda no encontrado");
      return;
    }

    let timeoutId;

    searchInput.addEventListener("input", function () {
      clearTimeout(timeoutId);

      // Debounce para mejorar rendimiento
      timeoutId = setTimeout(() => {
        estadoNoticias.busquedaActual = this.value.trim();
        estadoNoticias.paginaActual = 1;

        aplicarFiltros();
        actualizarPaginacion();
        actualizarContadorNoticias();

        // Efecto de búsqueda
        if (estadoNoticias.busquedaActual) {
          noticiasGrid.classList.add("buscando");
        } else {
          noticiasGrid.classList.remove("buscando");
        }

        // Anunciar resultados de búsqueda
        if (estadoNoticias.busquedaActual) {
          const resultados = document.querySelectorAll('.noticia-card[style="display: block"]').length;
          anunciarCambio(
            `${resultados} resultados encontrados para "${estadoNoticias.busquedaActual}"`
          );
        }
      }, 300);
    });

    // Limpiar búsqueda
    const clearSearch = document.querySelector(".clear-search");
    if (clearSearch) {
      clearSearch.addEventListener("click", function (e) {
        e.preventDefault();
        searchInput.value = "";
        estadoNoticias.busquedaActual = "";
        estadoNoticias.paginaActual = 1;

        aplicarFiltros();
        actualizarPaginacion();
        actualizarContadorNoticias();
        noticiasGrid.classList.remove("buscando");

        searchInput.focus();
        anunciarCambio("Búsqueda limpiada. Mostrando todas las noticias.");
      });
    }

    // Soporte para tecla Escape
    searchInput.addEventListener("keydown", function (e) {
      if (e.key === "Escape") {
        this.value = "";
        estadoNoticias.busquedaActual = "";
        aplicarFiltros();
        actualizarContadorNoticias();
        this.blur();
      }
    });
  }

  // Sistema de favoritos mejorado
  function configurarFavoritos() {
    noticiaCards.forEach((card) => {
      const idNoticia = card.getAttribute("data-id");
      const favBtn = card.querySelector(".favorito-btn");

      if (favBtn && idNoticia) {
        // Verificar si ya es favorito
        actualizarEstadoFavorito(favBtn, idNoticia);

        // Evento para toggle favorito
        favBtn.addEventListener("click", function (e) {
          e.preventDefault();
          e.stopPropagation();

          toggleFavorito(idNoticia, favBtn, card);
        });
      }
    });
  }

  function actualizarEstadoFavorito(boton, idNoticia) {
    if (estadoNoticias.noticiasFavoritas.includes(idNoticia)) {
      boton.classList.add("activo");
      boton.textContent = "★";
      boton.setAttribute("aria-label", `Quitar noticia ${idNoticia} de favoritos`);
      boton.setAttribute("title", "Quitar de favoritos");
    } else {
      boton.classList.remove("activo");
      boton.textContent = "☆";
      boton.setAttribute("aria-label", `Añadir noticia ${idNoticia} a favoritos`);
      boton.setAttribute("title", "Añadir a favoritos");
    }
  }

  function toggleFavorito(idNoticia, boton, card) {
    const index = estadoNoticias.noticiasFavoritas.indexOf(idNoticia);
    const titulo = card.querySelector(".noticia-titulo")?.textContent || "Noticia";

    if (index > -1) {
      // Quitar de favoritos
      estadoNoticias.noticiasFavoritas.splice(index, 1);
      showNotification(`"${titulo}" eliminada de favoritos`, "info");
    } else {
      // Añadir a favoritos
      estadoNoticias.noticiasFavoritas.push(idNoticia);
      showNotification(`"${titulo}" añadida a favoritos`, "success");

      // Efecto visual
      boton.style.transform = "scale(1.3)";
      setTimeout(() => {
        boton.style.transform = "scale(1)";
      }, 200);
    }

    // Actualizar estado visual
    actualizarEstadoFavorito(boton, idNoticia);

    // Guardar en localStorage
    localStorage.setItem(
      "noticiasFavoritas",
      JSON.stringify(estadoNoticias.noticiasFavoritas)
    );
  }

  // Paginación mejorada
  function configurarPaginacion() {
    if (paginacionBtns.length === 0) {
      console.warn("Botones de paginación no encontrados");
      return;
    }

    paginacionBtns.forEach((btn) => {
      btn.addEventListener("click", function (e) {
        e.preventDefault();

        if (this.disabled) return;

        let mensaje = "";

        if (this.classList.contains("siguiente")) {
          estadoNoticias.paginaActual++;
          mensaje = "Cargando más noticias...";
        } else if (this.classList.contains("anterior")) {
          if (estadoNoticias.paginaActual > 1) {
            estadoNoticias.paginaActual--;
            mensaje = "Cargando noticias anteriores...";
          }
        } else {
          // Página específica
          const pagina = parseInt(this.textContent);
          if (!isNaN(pagina)) {
            estadoNoticias.paginaActual = pagina;
            mensaje = `Cargando página ${pagina}...`;
          }
        }

        if (mensaje) {
          showNotification(mensaje, "info");
        }

        // Actualizar UI
        actualizarBotonesPaginacion();
        aplicarFiltros();
        actualizarPaginacion();

        // Scroll suave al principio de las noticias
        noticiasGrid.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });

        // Anunciar cambio de página para accesibilidad
        anunciarCambio(`Página ${estadoNoticias.paginaActual} de noticias`);
      });
    });
  }

  function actualizarBotonesPaginacion() {
    paginacionBtns.forEach((btn) => {
      btn.classList.remove("active");
      if (!btn.classList.contains("siguiente") && !btn.classList.contains("anterior")) {
        const pagina = parseInt(btn.textContent);
        if (pagina === estadoNoticias.paginaActual) {
          btn.classList.add("active");
          btn.setAttribute("aria-current", "page");
        } else {
          btn.removeAttribute("aria-current");
        }
      }
    });
  }

  function actualizarPaginacion() {
    // Calcular total de páginas
    const noticiasVisibles = Array.from(noticiaCards).filter(
      (card) => card.style.display !== "none" && card.style.display !== ""
    ).length;

    const totalPaginas = Math.ceil(noticiasVisibles / estadoNoticias.noticiasPorPagina);

    // Actualizar estado de botones
    const btnAnterior = document.querySelector(".paginacion-btn.anterior");
    const btnSiguiente = document.querySelector(".paginacion-btn.siguiente");

    if (btnAnterior) {
      btnAnterior.disabled = estadoNoticias.paginaActual === 1;
      btnAnterior.setAttribute("aria-disabled", estadoNoticias.paginaActual === 1);
    }

    if (btnSiguiente) {
      btnSiguiente.disabled = estadoNoticias.paginaActual === totalPaginas;
      btnSiguiente.setAttribute("aria-disabled", estadoNoticias.paginaActual === totalPaginas);
    }

    // Actualizar contadores en el DOM
    const contadorPagina = document.querySelector(".contador-pagina");
    if (contadorPagina) {
      // Crear elementos de forma segura
      contadorPagina.textContent = '';
      contadorPagina.appendChild(document.createTextNode('Página '));
      
      const paginaActual = document.createElement('span');
      paginaActual.id = 'pagina-actual';
      paginaActual.textContent = estadoNoticias.paginaActual;
      contadorPagina.appendChild(paginaActual);
      
      contadorPagina.appendChild(document.createTextNode(' de '));
      
      const paginasTotal = document.createElement('span');
      paginasTotal.id = 'paginas-total';
      paginasTotal.textContent = totalPaginas;
      contadorPagina.appendChild(paginasTotal);
    }

    // Actualizar contador de noticias
    const contadorActual = document.getElementById("contador-actual");
    const contadorTotal = document.getElementById("contador-total");

    if (contadorActual && contadorTotal) {
      const noticiasMostradas = Math.min(
        noticiasVisibles - (estadoNoticias.paginaActual - 1) * estadoNoticias.noticiasPorPagina,
        estadoNoticias.noticiasPorPagina
      );
      contadorActual.textContent = noticiasMostradas;
      contadorTotal.textContent = noticiasVisibles;
    }
  }

  // Newsletter mejorado
  function configurarNewsletter() {
    if (!newsletterForm) {
      console.warn("Formulario de newsletter no encontrado");
      return;
    }

    newsletterForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const emailInput = this.querySelector("#newsletter-email");
      const email = emailInput.value.trim();

      if (!validarEmail(email)) {
        showNotification("Por favor, introduce un email válido", "error");
        emailInput.focus();
        return;
      }

      // Simular envío
      const submitBtn = this.querySelector('button[type="submit"]');
      const textoOriginal = submitBtn.textContent;

      submitBtn.textContent = "Enviando...";
      submitBtn.disabled = true;
      submitBtn.setAttribute("aria-disabled", "true");

      // Simular llamada a API
      setTimeout(() => {
        showNotification(
          `¡Gracias por suscribirte con ${email}! Te hemos enviado un email de confirmación.`,
          "success"
        );

        // Resetear formulario
        this.reset();
        submitBtn.textContent = textoOriginal;
        submitBtn.disabled = false;
        submitBtn.removeAttribute("aria-disabled");

        // Animación de éxito
        this.style.transform = "scale(0.98)";
        setTimeout(() => {
          this.style.transform = "scale(1)";
        }, 200);

        // Anunciar éxito para accesibilidad
        anunciarCambio("Suscripción al newsletter completada exitosamente");
      }, 1500);
    });
  }

  // Utilidades mejoradas
  function validarEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }

  function actualizarContadorNoticias() {
    const noticiasVisibles = Array.from(noticiaCards).filter(
      (card) => card.style.display !== "none" && card.style.display !== ""
    ).length;

    const totalNoticias = noticiaCards.length;

    // Actualizar contadores numéricos
    const contadorActual = document.getElementById("contador-actual");
    const contadorTotal = document.getElementById("contador-total");

    if (contadorActual && contadorTotal) {
      contadorActual.textContent = noticiasVisibles;
      contadorTotal.textContent = totalNoticias;
    }

    // Actualizar texto descriptivo
    const contador = document.querySelector(".contador-noticias");
    if (!contador) return;

    if (estadoNoticias.categoriaActiva === "todas" && estadoNoticias.busquedaActual === "") {
      contador.textContent = `Mostrando ${noticiasVisibles} de ${totalNoticias} noticias`;
    } else {
      let texto = `Mostrando ${noticiasVisibles} noticia${noticiasVisibles !== 1 ? "s" : ""}`;

      if (estadoNoticias.categoriaActiva !== "todas") {
        const categoriaTexto = document.querySelector(
          `.filtro-btn[data-categoria="${estadoNoticias.categoriaActiva}"]`
        )?.textContent || estadoNoticias.categoriaActiva;
        texto += ` en ${categoriaTexto.trim()}`;
      }

      if (estadoNoticias.busquedaActual) {
        texto += ` para "${estadoNoticias.busquedaActual}"`;
      }

      contador.textContent = texto;
    }
  }

  function mostrarMensajeSinResultados(mostrar) {
    let mensaje = document.querySelector(".sin-resultados");

    if (mostrar) {
      if (!mensaje) {
        mensaje = document.createElement("div");
        mensaje.className = "sin-resultados";
        mensaje.setAttribute("role", "status");
        mensaje.setAttribute("aria-live", "polite");
        
        // Crear contenido de forma segura
        const contenido = document.createElement("div");
        contenido.className = "sin-resultados-content";
        
        const titulo = document.createElement("h3");
        titulo.textContent = "No se encontraron noticias";
        
        const parrafo = document.createElement("p");
        parrafo.textContent = "Intenta con otros términos de búsqueda o cambia de categoría";
        
        const resetBtn = document.createElement("button");
        resetBtn.className = "btn btn-primary reset-filtros";
        resetBtn.type = "button";
        resetBtn.textContent = "Mostrar todas las noticias";
        
        contenido.appendChild(titulo);
        contenido.appendChild(parrafo);
        contenido.appendChild(resetBtn);
        mensaje.appendChild(contenido);
        
        noticiasGrid.parentNode.insertBefore(mensaje, noticiasGrid.nextSibling);

        // Evento para el botón de reset
        resetBtn.addEventListener("click", function (e) {
          e.preventDefault();
          resetearFiltros();
        });
      }
      mensaje.style.display = "block";
      anunciarCambio("No se encontraron noticias con los filtros actuales");
    } else if (mensaje) {
      mensaje.style.display = "none";
    }
  }

  function resetearFiltros() {
    estadoNoticias.categoriaActiva = "todas";
    estadoNoticias.busquedaActual = "";
    estadoNoticias.paginaActual = 1;

    filtroBtns.forEach((b) => {
      b.classList.remove("active");
      b.setAttribute("aria-pressed", "false");
    });

    const btnTodas = document.querySelector('.filtro-btn[data-categoria="todas"]');
    if (btnTodas) {
      btnTodas.classList.add("active");
      btnTodas.setAttribute("aria-pressed", "true");
    }

    if (searchInput) searchInput.value = "";

    aplicarFiltros();
    actualizarPaginacion();
    actualizarContadorNoticias();

    anunciarCambio("Filtros reiniciados. Mostrando todas las noticias.");
  }

  // SISTEMA DE NOTIFICACIONES MEJORADO Y SEGURO
  function showNotification(mensaje, tipo = "info") {
    // Eliminar notificaciones existentes
    const notificacionesExistentes = document.querySelectorAll(".notificacion");
    notificacionesExistentes.forEach((notif) => {
      cerrarNotificacion(notif);
    });

    const notificacion = document.createElement("div");
    notificacion.className = `notificacion notificacion-${tipo}`;
    notificacion.setAttribute("role", "status");
    notificacion.setAttribute("aria-live", "polite");
    
    // CREACIÓN SEGURA DEL CONTENIDO - SIN innerHTML
    const notificacionContent = document.createElement("div");
    notificacionContent.className = "notificacion-content";
    
    const mensajeSpan = document.createElement("span");
    mensajeSpan.className = "notificacion-mensaje";
    mensajeSpan.textContent = mensaje; // Usar textContent en lugar de innerHTML
    
    const cerrarBtn = document.createElement("button");
    cerrarBtn.className = "notificacion-cerrar";
    cerrarBtn.setAttribute("aria-label", "Cerrar notificación");
    cerrarBtn.textContent = "×"; // Usar textContent en lugar de innerHTML
    
    // Ensamblar la estructura de manera segura
    notificacionContent.appendChild(mensajeSpan);
    notificacionContent.appendChild(cerrarBtn);
    notificacion.appendChild(notificacionContent);

    document.body.appendChild(notificacion);

    // Mostrar con animación
    setTimeout(() => {
      notificacion.classList.add("mostrar");
    }, 10);

    // Evento para cerrar
    cerrarBtn.addEventListener("click", () => {
      cerrarNotificacion(notificacion);
    });

    // Cerrar automáticamente después de 5 segundos
    setTimeout(() => {
      if (document.body.contains(notificacion)) {
        cerrarNotificacion(notificacion);
      }
    }, 5000);
  }

  function cerrarNotificacion(notificacion) {
    notificacion.classList.remove("mostrar");
    setTimeout(() => {
      if (document.body.contains(notificacion)) {
        notificacion.remove();
      }
    }, 300);
  }

  // Función para anunciar cambios (accesibilidad)
  function anunciarCambio(mensaje) {
    // Crear elemento para lectores de pantalla
    const anuncio = document.createElement("div");
    anuncio.className = "sr-only";
    anuncio.setAttribute("aria-live", "polite");
    anuncio.setAttribute("aria-atomic", "true");
    anuncio.textContent = mensaje;

    document.body.appendChild(anuncio);

    // Remover después de un tiempo
    setTimeout(() => {
      if (document.body.contains(anuncio)) {
        anuncio.remove();
      }
    }, 1000);
  }

  // Inicializar todos los sistemas
  inicializarNoticias();

  // Hacer funciones disponibles globalmente para debugging
  window.noticiasApp = {
    estado: estadoNoticias,
    aplicarFiltros,
    resetearFiltros,
    actualizarPaginacion,
  };
});
