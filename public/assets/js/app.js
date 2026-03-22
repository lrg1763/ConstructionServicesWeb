/**
 * UI: меню, якорная прокрутка, галерея, отзывы (данные — data.js).
 */
(function () {
  'use strict';

  var GALLERY_SLIDE_CLASS =
    'gallery-item flex-shrink-0 w-[280px] sm:w-[320px] aspect-[3/4] snap-start group relative overflow-hidden shadow-md rounded-lg';
  var GALLERY_IMG_CLASS =
    'w-full h-full object-cover group-hover:scale-105 transition-transform duration-500';

  function renderGallery() {
    var container = document.getElementById('gallery-scroll');
    var items = window.__GALLERY_ITEMS;
    if (!container || !items || !items.length) return;

    container.textContent = '';
    items.forEach(function (item, i) {
      var slide = document.createElement('div');
      slide.className = GALLERY_SLIDE_CLASS;
      var img = document.createElement('img');
      img.src = item.src;
      img.alt = item.alt;
      img.width = 768;
      img.height = 1024;
      img.loading = i < 2 ? 'eager' : 'lazy';
      img.decoding = 'async';
      img.className = GALLERY_IMG_CLASS;
      slide.appendChild(img);
      container.appendChild(slide);
    });
  }

  function renderReviews() {
    var track = document.getElementById('reviews-track');
    var list = window.__REVIEWS;
    if (!track || !list || !list.length) return;

    function makeCard(r) {
      var article = document.createElement('article');
      article.className =
        'review-card flex-shrink-0 w-[300px] sm:w-[360px] bg-gray-50 rounded-xl p-8 shadow-md border border-gray-100';
      var icon = document.createElement('i');
      icon.className = 'fas fa-quote-left text-3xl text-blue-600 opacity-70 mb-4 block';
      icon.setAttribute('aria-hidden', 'true');
      var bq = document.createElement('blockquote');
      bq.className = 'text-gray-600 mb-6 not-italic';
      bq.textContent = r.text;
      var footer = document.createElement('footer');
      footer.className = 'font-bold text-gray-800';
      footer.textContent = r.author;
      var meta = document.createElement('p');
      meta.className = 'text-sm text-gray-500';
      meta.textContent = r.meta;
      article.appendChild(icon);
      article.appendChild(bq);
      article.appendChild(footer);
      article.appendChild(meta);
      return article;
    }

    track.textContent = '';
    var doubled = list.concat(list);
    doubled.forEach(function (r) {
      track.appendChild(makeCard(r));
    });
  }

  function initMobileMenu() {
    var menuToggle = document.getElementById('menu-toggle');
    var mobileMenu = document.getElementById('mobile-menu');
    var iconOpen = document.getElementById('menu-icon-open');
    var iconClose = document.getElementById('menu-icon-close');
    var navLinks = document.querySelectorAll('.nav-link');

    function setMenuOpen(open) {
      if (menuToggle) menuToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    }

    if (menuToggle && mobileMenu && iconOpen && iconClose) {
      menuToggle.addEventListener('click', function () {
        mobileMenu.classList.toggle('hidden');
        iconOpen.classList.toggle('hidden');
        iconClose.classList.toggle('hidden');
        setMenuOpen(!mobileMenu.classList.contains('hidden'));
      });
    }

    navLinks.forEach(function (link) {
      link.addEventListener('click', function () {
        if (!mobileMenu || !iconOpen || !iconClose) return;
        mobileMenu.classList.add('hidden');
        iconOpen.classList.remove('hidden');
        iconClose.classList.add('hidden');
        setMenuOpen(false);
      });
    });
  }

  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
      anchor.addEventListener('click', function (e) {
        var targetId = this.getAttribute('href');
        if (targetId === '#') return;
        e.preventDefault();
        var target = document.querySelector(targetId);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth' });
        }
      });
    });
  }

  function initGalleryControls() {
    var galleryScroll = document.getElementById('gallery-scroll');
    var galleryPrev = document.getElementById('gallery-prev');
    var galleryNext = document.getElementById('gallery-next');
    var STEP = 320 + 16;

    function updateGalleryArrows() {
      if (!galleryScroll || !galleryPrev || !galleryNext) return;
      var atStart = galleryScroll.scrollLeft <= 1;
      var atEnd =
        galleryScroll.scrollLeft >=
        galleryScroll.scrollWidth - galleryScroll.clientWidth - 1;
      galleryPrev.classList.toggle('gallery-nav-hidden', atStart);
      galleryNext.classList.toggle('gallery-nav-hidden', atEnd);
    }

    function galleryScrollLeft() {
      if (galleryScroll) galleryScroll.scrollBy({ left: -STEP, behavior: 'smooth' });
    }

    function galleryScrollRight() {
      if (galleryScroll) galleryScroll.scrollBy({ left: STEP, behavior: 'smooth' });
    }

    if (!galleryScroll || !galleryPrev || !galleryNext) return;

    galleryPrev.addEventListener('click', galleryScrollLeft);
    galleryNext.addEventListener('click', galleryScrollRight);
    galleryScroll.addEventListener('scroll', updateGalleryArrows);

    var resizeTimer;
    window.addEventListener('resize', function () {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(updateGalleryArrows, 150);
    });

    galleryScroll.addEventListener('keydown', function (e) {
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

  function init() {
    renderGallery();
    renderReviews();
    initMobileMenu();
    initSmoothScroll();
    initGalleryControls();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
