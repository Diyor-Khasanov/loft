document.addEventListener("DOMContentLoaded", function () {
  // Mobile menu toggle
  const hamburger = document.querySelector(".hamburger");
  const mobileMenu = document.querySelector(".mobile-menu");

  hamburger.addEventListener("click", function () {
    this.classList.toggle("active");
    mobileMenu.classList.toggle("active");
    document.body.classList.toggle("no-scroll");
  });

  // Close mobile menu when clicking on a link
  const mobileNavLinks = document.querySelectorAll(".mobile-nav__link");
  mobileNavLinks.forEach((link) => {
    link.addEventListener("click", function () {
      hamburger.classList.remove("active");
      mobileMenu.classList.remove("active");
      document.body.classList.remove("no-scroll");
    });
  });

  // Search functionality
  const searchBtn = document.querySelector(".search-btn");
  const searchOverlay = document.querySelector(".search-overlay");
  const searchClose = document.querySelector(".search-close");

  searchBtn.addEventListener("click", function () {
    searchOverlay.classList.add("active");
    document.body.classList.add("no-scroll");
  });

  searchClose.addEventListener("click", function () {
    searchOverlay.classList.remove("active");
    document.body.classList.remove("no-scroll");
  });

  // Sticky header on scroll
  const header = document.querySelector(".header");
  window.addEventListener("scroll", function () {
    if (window.scrollY > 100) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  });

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");
      if (targetId === "#") return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: "smooth",
        });
      }
    });
  });

  // Back to top button
  const backToTopBtn = document.querySelector(".back-to-top");
  window.addEventListener("scroll", function () {
    if (window.scrollY > 300) {
      backToTopBtn.classList.add("show");
    } else {
      backToTopBtn.classList.remove("show");
    }
  });

  backToTopBtn.addEventListener("click", function () {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });

  // Active nav link based on scroll position
  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll(".nav__link, .mobile-nav__link");

  window.addEventListener("scroll", function () {
    let current = "";

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;

      if (pageYOffset >= sectionTop - 100) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${current}`) {
        link.classList.add("active");
      }
    });
  });

  // Initialize product grid
  initializeProductGrid();
});

// Product grid initialization
function initializeProductGrid() {
  const productsGrid = document.querySelector(".products__grid");
  const loadMoreBtn = document.getElementById("load-more");
  let visibleProducts = 6;
  const totalProducts = 12; // In a real app, this would come from your data source

  // Sample product data
  const products = [
    {
      id: 1,
      name: "Industrial Coffee Table",
      category: "living",
      price: 499,
      rating: 4,
      image: "images/products/product-1.jpg",
      isNew: true,
    },
    {
      id: 2,
      name: "Loft Style Sofa",
      category: "living",
      price: 1299,
      rating: 5,
      image: "images/products/product-2.jpg",
    },
    {
      id: 3,
      name: "Metal Frame Bed",
      category: "bedroom",
      price: 899,
      rating: 4,
      image: "images/products/product-3.jpg",
      isNew: true,
    },
    {
      id: 4,
      name: "Reclaimed Wood Dining Table",
      category: "dining",
      price: 799,
      rating: 5,
      image: "images/products/product-4.jpg",
    },
    {
      id: 5,
      name: "Leather Office Chair",
      category: "office",
      price: 399,
      rating: 4,
      image: "images/products/product-5.jpg",
    },
    {
      id: 6,
      name: "Patio Lounge Set",
      category: "outdoor",
      price: 1499,
      rating: 5,
      image: "images/products/product-6.jpg",
      isNew: true,
    },
    {
      id: 7,
      name: "Bookshelf with Metal Frame",
      category: "living",
      price: 599,
      rating: 4,
      image: "images/products/product-1.jpg",
    },
    {
      id: 8,
      name: "Minimalist Armchair",
      category: "living",
      price: 349,
      rating: 4,
      image: "images/products/product-2.jpg",
    },
    {
      id: 9,
      name: "Platform Bed with Storage",
      category: "bedroom",
      price: 799,
      rating: 5,
      image: "images/products/product-3.jpg",
    },
    {
      id: 10,
      name: "Extendable Dining Table",
      category: "dining",
      price: 899,
      rating: 4,
      image: "images/products/product-4.jpg",
    },
    {
      id: 11,
      name: "Executive Desk",
      category: "office",
      price: 699,
      rating: 5,
      image: "images/products/product-5.jpg",
    },
    {
      id: 12,
      name: "Outdoor Dining Set",
      category: "outdoor",
      price: 1299,
      rating: 4,
      image: "images/products/product-6.jpg",
    },
  ];

  // Display initial products
  displayProducts(products.slice(0, visibleProducts));

  // Load more products
  loadMoreBtn.addEventListener("click", function () {
    visibleProducts += 6;
    if (visibleProducts >= totalProducts) {
      loadMoreBtn.style.display = "none";
    }
    displayProducts(products.slice(0, visibleProducts));
  });

  // Display products function
  function displayProducts(productsToShow) {
    productsGrid.innerHTML = "";

    productsToShow.forEach((product) => {
      const ratingStars =
        "★".repeat(product.rating) + "☆".repeat(5 - product.rating);

      const productCard = document.createElement("div");
      productCard.className = "product-card";
      productCard.dataset.category = product.category;

      productCard.innerHTML = `
        <div class="product-card__image">
          <img src="${product.image}" alt="${product.name}">
          ${product.isNew ? '<span class="product-badge">New</span>' : ""}
        </div>
        <div class="product-card__content">
          <span class="product-card__category">${formatCategory(
            product.category
          )}</span>
          <h3 class="product-card__title">${product.name}</h3>
          <div class="product-card__price">$${product.price}</div>
          <div class="product-card__rating">${ratingStars}</div>
          <div class="product-card__actions">
            <button class="btn btn--secondary">Add to Cart</button>
            <button class="wishlist-btn"><i class="far fa-heart"></i></button>
          </div>
        </div>
      `;

      productsGrid.appendChild(productCard);
    });

    // Initialize wishlist buttons
    const wishlistBtns = document.querySelectorAll(".wishlist-btn");
    wishlistBtns.forEach((btn) => {
      btn.addEventListener("click", function () {
        this.classList.toggle("active");
        this.innerHTML = this.classList.contains("active")
          ? '<i class="fas fa-heart"></i>'
          : '<i class="far fa-heart"></i>';
      });
    });
  }

  // Format category for display
  function formatCategory(category) {
    return category.charAt(0).toUpperCase() + category.slice(1);
  }
}
