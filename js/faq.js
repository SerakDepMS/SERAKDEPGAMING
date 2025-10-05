// Funcionalidades mejoradas para FAQ
document.addEventListener("DOMContentLoaded", function () {
  // Cambio de categorías
  const categoryBtns = document.querySelectorAll(".category-btn");
  const faqCategories = document.querySelectorAll(".faq-category");

  categoryBtns.forEach((btn) => {
    btn.addEventListener("click", function () {
      // Remover active de todos los botones
      categoryBtns.forEach((b) => b.classList.remove("active"));
      // Agregar active al botón clickeado
      this.classList.add("active");

      const category = this.getAttribute("data-category");

      // Mostrar categoría seleccionada
      faqCategories.forEach((cat) => {
        cat.classList.remove("active");
        if (cat.id === category) {
          cat.classList.add("active");
        }
      });
    });
  });

  // Búsqueda en FAQ
  const searchInput = document.querySelector(".search-input");
  const searchBtn = document.querySelector(".search-btn");

  function performSearch() {
    const searchTerm = searchInput.value.toLowerCase();

    if (searchTerm.length < 2) {
      showNotification("Ingresa al menos 2 caracteres para buscar.", "info");
      return;
    }

    const allQuestions = document.querySelectorAll(".faq-pregunta");
    let foundResults = false;

    allQuestions.forEach((question) => {
      const questionText = question.textContent.toLowerCase();
      const faqItem = question.closest(".faq-item");

      if (questionText.includes(searchTerm)) {
        faqItem.style.display = "block";
        faqItem.style.background = "rgba(0, 243, 255, 0.1)";
        foundResults = true;

        // Abrir la pregunta
        faqItem.classList.add("active");
      } else {
        faqItem.style.display = "none";
      }
    });

    if (!foundResults) {
      showNotification(
        "No se encontraron resultados para tu búsqueda.",
        "info"
      );
    } else {
      showNotification(
        `Se encontraron resultados para "${searchTerm}"`,
        "success"
      );
    }
  }

  searchBtn.addEventListener("click", performSearch);
  searchInput.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
      performSearch();
    }
  });

  // Efectos adicionales para items FAQ
  const faqItems = document.querySelectorAll(".faq-item");
  faqItems.forEach((item) => {
    item.addEventListener("mouseenter", function () {
      this.style.borderLeft = "3px solid var(--neon-cyan)";
    });

    item.addEventListener("mouseleave", function () {
      if (!this.classList.contains("active")) {
        this.style.borderLeft = "none";
      }
    });
  });
});
