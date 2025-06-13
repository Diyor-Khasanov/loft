document.addEventListener("DOMContentLoaded", function () {
  const slider = document.querySelector(".slider");
  const sliderTrack = document.querySelector(".slider__track");
  const slides = document.querySelectorAll(".slider__slide");
  const prevBtn = document.querySelector(".slider__prev");
  const nextBtn = document.querySelector(".slider__next");
  const dotsContainer = document.querySelector(".slider__dots");

  let currentIndex = 0;
  const slideCount = slides.length;

  // Create dots
  for (let i = 0; i < slideCount; i++) {
    const dot = document.createElement("div");
    dot.classList.add("dot");
    if (i === 0) dot.classList.add("active");
    dot.addEventListener("click", () => goToSlide(i));
    dotsContainer.appendChild(dot);
  }

  const dots = document.querySelectorAll(".dot");

  // Update slider position
  function updateSlider() {
    sliderTrack.style.transform = `translateX(-${currentIndex * 100}%)`;

    // Update dots
    dots.forEach((dot, index) => {
      dot.classList.toggle("active", index === currentIndex);
    });

    // Disable/enable buttons
    prevBtn.disabled = currentIndex === 0;
    nextBtn.disabled = currentIndex === slideCount - 1;
  }

  // Go to specific slide
  function goToSlide(index) {
    currentIndex = index;
    updateSlider();
  }

  // Next slide
  function nextSlide() {
    if (currentIndex < slideCount - 1) {
      currentIndex++;
      updateSlider();
    }
  }

  // Previous slide
  function prevSlide() {
    if (currentIndex > 0) {
      currentIndex--;
      updateSlider();
    }
  }

  // Event listeners
  nextBtn.addEventListener("click", nextSlide);
  prevBtn.addEventListener("click", prevSlide);

  // Keyboard navigation
  document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight") {
      nextSlide();
    } else if (e.key === "ArrowLeft") {
      prevSlide();
    }
  });

  // Auto-slide (optional)
  let slideInterval = setInterval(nextSlide, 5000);

  // Pause on hover
  slider.addEventListener("mouseenter", () => {
    clearInterval(slideInterval);
  });

  slider.addEventListener("mouseleave", () => {
    slideInterval = setInterval(nextSlide, 5000);
  });
});
