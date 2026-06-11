// Burger menu
const burger = document.querySelector('.burger');
const nav = document.querySelector('.nav');

burger?.addEventListener('click', () => {
  nav.classList.toggle('active');
});

// Pricing cards
const plans = document.querySelectorAll('.plan');
const planButtons = document.querySelectorAll('.plan-btn');

planButtons.forEach(button => {
  button.addEventListener('click', () => {
    plans.forEach(plan => plan.classList.remove('active'));
    planButtons.forEach(btn => btn.classList.remove('active-btn'));

    button.closest('.plan').classList.add('active');
    button.classList.add('active-btn');
  });
});

// Slider
const track = document.querySelector('.slider-track');
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');

const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');

let currentSlide = 0;
let autoSlide;

function updateSlider() {
  slides.forEach(slide => slide.classList.remove('active'));
  dots.forEach(dot => dot.classList.remove('active'));

  slides[currentSlide]?.classList.add('active');
  dots[currentSlide]?.classList.add('active');

  // Mobile slider
  if (window.innerWidth <= 992) {
    const slideWidth = slides[0].clientWidth;
    track.style.transform = `translateX(-${currentSlide * slideWidth}px)`;
    return;
  }

  // Desktop slider
  const slideWidth = slides[0].offsetWidth + 40;
  track.style.transform = `translateX(-${currentSlide * slideWidth}px)`;
}

// Next slide
function nextSlide() {
  currentSlide = (currentSlide + 1) % slides.length;
  updateSlider();
}

// Previous slide
function prevSlide() {
  currentSlide =
    currentSlide === 0
      ? slides.length - 1
      : currentSlide - 1;

  updateSlider();
}

nextBtn?.addEventListener('click', nextSlide);
prevBtn?.addEventListener('click', prevSlide);

// Dots
dots.forEach((dot, index) => {
  dot.addEventListener('click', () => {
    currentSlide = index;
    updateSlider();
  });
});

// Auto slider
function startAutoSlide() {
  autoSlide = setInterval(nextSlide, 5000);
}

function stopAutoSlide() {
  clearInterval(autoSlide);
}

track?.addEventListener('mouseenter', stopAutoSlide);
track?.addEventListener('mouseleave', startAutoSlide);

window.addEventListener('resize', updateSlider);

// Arrow hover
prevBtn?.addEventListener('mouseenter', () => {
  prevBtn.querySelector('img').src = 'icons/arrowWhiteLeft.png';
});

prevBtn?.addEventListener('mouseleave', () => {
  prevBtn.querySelector('img').src = 'icons/arrowRedLeft.png';
});

nextBtn?.addEventListener('mouseenter', () => {
  nextBtn.querySelector('img').src = 'icons/arrowWhiteRight.png';
});

nextBtn?.addEventListener('mouseleave', () => {
  nextBtn.querySelector('img').src = 'icons/arrowRedRight.png';
});

startAutoSlide();
updateSlider();