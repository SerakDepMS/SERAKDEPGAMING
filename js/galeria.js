// Filtrado de galería
document.addEventListener("DOMContentLoaded", function () {
  const filtroBtns = document.querySelectorAll(".filtro-btn");
  const galeriaItems = document.querySelectorAll(".galeria-item");

  filtroBtns.forEach((btn) => {
    btn.addEventListener("click", function () {
      // Remover active de todos los botones
      filtroBtns.forEach((b) => b.classList.remove("active"));
      // Agregar active al botón clickeado
      this.classList.add("active");

      const filtro = this.getAttribute("data-filtro");

      // Filtrar items
      galeriaItems.forEach((item) => {
        if (
          filtro === "todos" ||
          item.getAttribute("data-categoria") === filtro
        ) {
          item.style.display = "block";
        } else {
          item.style.display = "none";
        }
      });
    });
  });

  // Efectos hover mejorados para galería
  galeriaItems.forEach((item) => {
    item.addEventListener("mouseenter", function () {
      this.style.transform = "scale(1.05) rotate(1deg)";
    });

    item.addEventListener("mouseleave", function () {
      this.style.transform = "scale(1) rotate(0deg)";
    });
  });
});
