/**
 * Единая точка правок: телефон, мессенджеры, URL сайта, фон hero.
 * После изменений синхронизируйте JSON-LD в index.html (telephone, url).
 */
(function (global) {
  'use strict';

  var SITE = {
    brand: 'Nashmaster.pro',
    phoneE164: '+79066428723',
    phoneDigits: '79066428723',
    phoneDisplay: '+7 906 642 87 23',
    siteUrl: 'https://nashmaster.pro/',
    telegramUrl: 'https://t.me/+79066428723',
    maxUrl: 'https://max.ru/chat?phone=79066428723',
    mailUrl: 'https://mail.ru',
    heroImageUrl:
      'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1920'
  };

  function applyContactLinks() {
    document.querySelectorAll('[data-contact]').forEach(function (el) {
      var key = el.getAttribute('data-contact');
      if (key === 'tel') el.setAttribute('href', 'tel:' + SITE.phoneE164);
      else if (key === 'telegram') el.setAttribute('href', SITE.telegramUrl);
      else if (key === 'max') el.setAttribute('href', SITE.maxUrl);
      else if (key === 'mail') el.setAttribute('href', SITE.mailUrl);
    });
    document.querySelectorAll('[data-contact-display="phone"]').forEach(function (el) {
      el.textContent = SITE.phoneDisplay;
    });
  }

  function applyHeroBackground() {
    var hero = document.getElementById('hero');
    if (!hero) return;
    var url = SITE.heroImageUrl.replace(/'/g, '%27');
    hero.style.backgroundImage = "url('" + url + "')";
  }

  function init() {
    applyContactLinks();
    applyHeroBackground();
  }

  global.__SITE_CONFIG = SITE;

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})(window);
