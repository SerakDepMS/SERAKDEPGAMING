// contacto.js - Solo funcionalidad EmailJS para el formulario de contacto
document.addEventListener("DOMContentLoaded", function () {
  const contactoForm = document.querySelector(".contacto-form");

  // Inicializar EmailJS
  emailjs.init("KZquan0PhqC35uDYw");

  // Función para generar ID de sesión seguro
  function generateSecureSessionId(length = 9) {
    const array = new Uint32Array(length);
    window.crypto.getRandomValues(array);
    return Array.from(array, dec => ('0' + dec.toString(36)).substr(-2)).join('').toUpperCase().substr(0, length);
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
        showNotification("❌ Error: Campos requeridos incompletos", "error");
        return;
      }

      // Obtener datos del formulario
      const asuntoSelect = document.getElementById("asunto");
      const asuntoTexto = asuntoSelect.options[asuntoSelect.selectedIndex].text;

      // Generar datos adicionales
      const now = new Date();
      const submissionId = 'SRK' + Date.now();
      const sessionId = "SESS_" + generateSecureSessionId();

      // Preparar parámetros para EmailJS
      const templateParams = {
        from_name: nombre,
        from_email: email,
        subject: asuntoTexto,
        message: mensaje,
        to_email: "soporte@serakdep.com",
        submission_id: submissionId,
        date: now.toLocaleDateString('es-ES'),
        time: now.toLocaleTimeString('es-ES')
      };

      // Enviar con EmailJS
      const submitBtn = this.querySelector('button[type="submit"]');
      const originalText = submitBtn.textContent;
      
      submitBtn.textContent = "🔄 PROCESANDO...";
      submitBtn.disabled = true;

      emailjs.send('service_3dlso3n', 'template_bso642c', templateParams)
        .then(function(response) {
          console.log('✅ Email enviado!', response.status, response.text);
          showNotification("✅ Mensaje enviado correctamente", "success");
          
          submitBtn.textContent = "✅ ENVIADO";
          setTimeout(() => {
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
            contactoForm.reset();
          }, 3000);
          
        }, function(error) {
          console.log('❌ Error EmailJS:', error);
          showNotification("❌ Error al enviar el mensaje", "error");
          
          submitBtn.textContent = "❌ ERROR";
          setTimeout(() => {
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
          }, 3000);
        });
    });
  }
});