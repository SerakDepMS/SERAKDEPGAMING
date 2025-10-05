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

  // VALIDACIÓN SEGURA PARA LA URL - CORRECCIÓN DEFINITIVA
  let safeArchivo = "#";
  if (archivo && typeof archivo === 'string') {
    // Solo permitir URLs seguras: rutas relativas o absolutas, y http/https
    const isRelative = /^[\.\/]/.test(archivo);
    const isAbsolute = /^\//.test(archivo);
    
    try {
      if (isRelative || isAbsolute) {
        // Validar que la ruta relativa no contenga caracteres peligrosos
        if (!/[<>"']/.test(archivo)) {
          safeArchivo = archivo;
        }
      } else if (archivo.startsWith('http://') || archivo.startsWith('https://')) {
        const url = new URL(archivo);
        if (url.protocol === 'http:' || url.protocol === 'https:') {
          safeArchivo = archivo;
        }
      } else if (archivo === '#') {
        safeArchivo = '#';
      }
    } catch (e) {
      console.warn('URL de descarga inválida:', archivo);
      safeArchivo = "#";
    }
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
          const downloadLink = document.createElement("a");
          
          // SOLUCIÓN DEFINITIVA PARA LA VULNERABILIDAD XSS - MÚLTIPLES CAPAS DE SEGURIDAD
          if (safeArchivo && safeArchivo !== "#") {
            // Capa 1: Usar setAttribute con encodeURI
            downloadLink.setAttribute('href', encodeURI(safeArchivo));
            
            // Capa 2: Validar que el enlace sea seguro antes de usarlo
            const tempLink = document.createElement('a');
            
            // Función para validar URLs HTTP/HTTPS
            function isValidHttpUrl(string) {
                try {
                    const url = new URL(string);
                    return url.protocol === 'http:' || url.protocol === 'https:';
                } catch (_) {
                    return false;
                }
            }

            // Validar y sanitizar la URL antes de asignarla
            if (isValidHttpUrl(safeArchivo)) {
                tempLink.href = safeArchivo;
            } else {
                // Manejar el caso inseguro
                tempLink.href = '#'; // Valor por defecto seguro
                console.warn('URL no segura detectada y bloqueada:', safeArchivo);
                throw new Error('URL no segura');
            }
            
            if (tempLink.protocol === 'http:' || 
                tempLink.protocol === 'https:' || 
                tempLink.protocol === ':' || // Rutas relativas
                !tempLink.protocol) {
              
              downloadLink.download = `${safeNombreJuego}.zip`;
              downloadLink.style.display = "none";
              downloadLink.setAttribute("rel", "noopener noreferrer");
              
              document.body.appendChild(downloadLink);
              downloadLink.click();
              document.body.removeChild(downloadLink);

              downloadBtn.textContent = "¡Descargado!";
              progressText.textContent = "¡Completado!";
              downloadBtn.classList.remove("downloading");

              showNotification(`${safeGameName} se ha descargado correctamente`, "success");
            } else {
              throw new Error('Protocolo no permitido');
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
          handleDownloadError(card, "Error al descargar el archivo");
        }
      }, 500);
    }

    progressFill.style.width = `${progress}%`;
    progressText.textContent = `${Math.round(progress)}%`;
  }, 120);
}






