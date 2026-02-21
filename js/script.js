// Mobile menu toggle
const menuToggle = document.getElementById('menu-toggle');
const mobileMenu = document.getElementById('mobile-menu');
const iconOpen = document.getElementById('menu-icon-open');
const iconClose = document.getElementById('menu-icon-close');
const navLinks = document.querySelectorAll('.nav-link');

menuToggle.addEventListener('click', function() {
  mobileMenu.classList.toggle('hidden');
  iconOpen.classList.toggle('hidden');
  iconClose.classList.toggle('hidden');
});

navLinks.forEach(function(link) {
  link.addEventListener('click', function() {
    mobileMenu.classList.add('hidden');
    iconOpen.classList.remove('hidden');
    iconClose.classList.add('hidden');
  });
});

// Smooth scroll for anchor links (fallback)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const targetId = this.getAttribute('href');
    if (targetId === '#') return;
    e.preventDefault();
    const target = document.querySelector(targetId);
    if (target) target.scrollIntoView({ behavior: 'smooth' });
  });
});

// Галерея: прокрутка влево/вправо, видимость стрелок, клавиатура
const galleryScroll = document.getElementById('gallery-scroll');
const galleryPrev = document.getElementById('gallery-prev');
const galleryNext = document.getElementById('gallery-next');

function updateGalleryArrows() {
  if (!galleryScroll || !galleryPrev || !galleryNext) return;
  const atStart = galleryScroll.scrollLeft <= 1;
  const atEnd = galleryScroll.scrollLeft >= galleryScroll.scrollWidth - galleryScroll.clientWidth - 1;
  galleryPrev.classList.toggle('gallery-nav-hidden', atStart);
  galleryNext.classList.toggle('gallery-nav-hidden', atEnd);
}

function galleryScrollLeft() {
  if (!galleryScroll) return;
  galleryScroll.scrollBy({ left: -(320 + 16), behavior: 'smooth' });
}

function galleryScrollRight() {
  if (!galleryScroll) return;
  galleryScroll.scrollBy({ left: 320 + 16, behavior: 'smooth' });
}

if (galleryScroll && galleryPrev && galleryNext) {
  galleryPrev.addEventListener('click', function() {
    galleryScrollLeft();
  });

  galleryNext.addEventListener('click', function() {
    galleryScrollRight();
  });

  galleryScroll.addEventListener('scroll', updateGalleryArrows);
  galleryScroll.addEventListener('keydown', function(e) {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      galleryScrollLeft();
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      galleryScrollRight();
    }
  });

  updateGalleryArrows();
}
