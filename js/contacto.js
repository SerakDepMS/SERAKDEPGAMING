// Validación y efectos del formulario de contacto
document.addEventListener("DOMContentLoaded", function () {
  const contactoForm = document.querySelector(".contacto-form");

  // Inicializar EmailJS con tu Public Key
  emailjs.init("KZquan0PhqC35uDYw");

  // Función para generar ID de sesión seguro
  function generateSecureSessionId(length = 9) {
    const array = new Uint32Array(length);
    window.crypto.getRandomValues(array);
    return Array.from(array, dec => ('0' + dec.toString(36)).substr(-2)).join('').toUpperCase().substr(0, length);
  }

  // Función mejorada para mostrar notificaciones secuenciales
  function showSequentialNotifications(messages, delay = 5000) {
    let currentIndex = 0;
    
    function showNextNotification() {
      if (currentIndex < messages.length) {
        const message = messages[currentIndex];
        showNotification(message.text, message.type);
        currentIndex++;
        setTimeout(showNextNotification, delay);
      }
    }
    
    showNextNotification();
  }

  if (contactoForm) {
    contactoForm.addEventListener("submit", function (e) {
      e.preventDefault();

      // Validación básica
      const nombre = document.getElementById("nombre").value;
      const email = document.getElementById("email").value;
      const asunto = document.getElementById("asunto").value;
      const mensaje = document.getElementById("mensaje").value;

      if (!nombre || !email || !asunto || !mensaje) {
        showNotification(
          "❌ Error: Campos requeridos incompletos",
          "error"
        );
        return;
      }

      // Obtener el texto del asunto seleccionado
      const asuntoSelect = document.getElementById("asunto");
      const asuntoTexto = asuntoSelect.options[asuntoSelect.selectedIndex].text;

      // Generar datos adicionales para el estilo programación
      const now = new Date();
      const timestamp = now.toISOString();
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
        timestamp: timestamp,
        session_id: sessionId
      };

      // Enviar con EmailJS
      const submitBtn = this.querySelector('button[type="submit"]');
      const originalText = submitBtn.textContent;
      
      submitBtn.textContent = "🔄 PROCESANDO...";
      submitBtn.disabled = true;

      emailjs.send('service_3dlso3n', 'template_bso642c', templateParams)
        .then(function(response) {
          console.log('✅ SUCCESS!', response.status, response.text);
          
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
          
          showSequentialNotifications(successMessages, 5000);
          
          submitBtn.textContent = "✅ ENVIADO";
          setTimeout(() => {
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
          }, (successMessages.length * 5000) + 2000); // Esperar que terminen todas las notificaciones + 2 segundos extra
          
          contactoForm.reset();
        }, function(error) {
          console.log('❌ FAILED...', error);
          
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
          
          showSequentialNotifications(errorMessages, 5000);
          
          // Fallback a Gmail después de las notificaciones
          setTimeout(() => {
            const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=soporte@serakdep.com&su=${encodeURIComponent('Contacto SerakDep: ' + asuntoTexto + ' - ' + nombre)}&body=${encodeURIComponent(
              `Nombre: ${nombre}\nEmail: ${email}\nAsunto: ${asuntoTexto}\n\nMensaje:\n${mensaje}\n\n---\nEnviado desde SerakDep Gaming (Método alternativo)`
            )}`;
            
            window.open(gmailUrl, '_blank');
            showNotification("📬 Cliente de correo abierto. Por favor completa el envío.", "info");
          }, (errorMessages.length * 5000) + 2000); // Esperar que terminen todas las notificaciones + 2 segundos extra
          
          submitBtn.textContent = "❌ ERROR";
          setTimeout(() => {
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
          }, (errorMessages.length * 5000) + 3000);
        });
    });
  }

  // Efectos para los elementos de contacto (mejorados)
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
});