// Validación y efectos del formulario de contacto
document.addEventListener("DOMContentLoaded", function () {
  const contactoForm = document.querySelector(".contacto-form");

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
          "Por favor, completa todos los campos obligatorios.",
          "error"
        );
        return;
      }

      // Simular envío
      const submitBtn = this.querySelector('button[type="submit"]');
      const originalText = submitBtn.textContent;
      submitBtn.textContent = "Enviando...";
      submitBtn.disabled = true;

      setTimeout(() => {
        showNotification(
          "Mensaje enviado correctamente. Te contactaremos pronto.",
          "success"
        );
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
        contactoForm.reset();
      }, 2000);
    });
  }

  // Efectos para los elementos de contacto
  const contactoItems = document.querySelectorAll(".contacto-item");
  contactoItems.forEach((item) => {
    item.addEventListener("mouseenter", function () {
      this.style.transform = "translateX(10px)";
      this.style.borderLeft = "3px solid var(--neon-cyan)";
    });

    item.addEventListener("mouseleave", function () {
      this.style.transform = "translateX(0)";
      this.style.borderLeft = "none";
    });
  });
});
