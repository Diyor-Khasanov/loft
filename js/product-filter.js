document.addEventListener("DOMContentLoaded", function () {
  const filterButtons = document.querySelectorAll(".filter-btn");
  const productSearch = document.getElementById("product-search");
  const productsGrid = document.querySelector(".products__grid");

  // Filter by category
  filterButtons.forEach((button) => {
    button.addEventListener("click", function () {
      // Remove active class from all buttons
      filterButtons.forEach((btn) => btn.classList.remove("active"));

      // Add active class to clicked button
      this.classList.add("active");

      const filterValue = this.dataset.filter;
      const productCards = productsGrid.querySelectorAll(".product-card");

      productCards.forEach((card) => {
        if (filterValue === "all" || card.dataset.category === filterValue) {
          card.style.display = "block";
        } else {
          card.style.display = "none";
        }
      });
    });
  });

  // Search functionality
  productSearch.addEventListener("input", function () {
    const searchTerm = this.value.toLowerCase();
    const productCards = productsGrid.querySelectorAll(".product-card");

    productCards.forEach((card) => {
      const title = card
        .querySelector(".product-card__title")
        .textContent.toLowerCase();
      const category = card
        .querySelector(".product-card__category")
        .textContent.toLowerCase();

      if (title.includes(searchTerm) || category.includes(searchTerm)) {
        card.style.display = "block";
      } else {
        card.style.display = "none";
      }
    });
  });

  // Filter by URL hash (for footer category links)
  window.addEventListener("hashchange", filterByHash);
  filterByHash();

  function filterByHash() {
    const hash = window.location.hash;
    if (hash && hash.startsWith("#products")) {
      const urlParams = new URLSearchParams(hash.split("?")[1]);
      const category = urlParams.get("category");

      if (category) {
        const correspondingButton = document.querySelector(
          `.filter-btn[data-filter="${category}"]`
        );
        if (correspondingButton) {
          correspondingButton.click();
        }
      }
    }
  }
});
