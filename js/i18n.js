(function () {
  function applyLang(lang) {
    if (!window.LANG || !window.LANG[lang]) return;
    var t = window.LANG[lang];

    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      var key = el.getAttribute('data-i18n');
      if (t[key] !== undefined) el.innerHTML = t[key];
    });

    localStorage.setItem('lang', lang);
    document.documentElement.lang = lang;

    var toggle = document.getElementById('lang-toggle');
    if (toggle) toggle.textContent = lang === 'es' ? 'EN' : 'ES';
  }

  function initLang() {
    var saved = localStorage.getItem('lang');
    var browser = (navigator.language || navigator.userLanguage || 'es').toLowerCase();
    var detected = saved || (browser.startsWith('es') ? 'es' : 'en');
    applyLang(detected);
  }

  window.addEventListener('DOMContentLoaded', function () {
    initLang();

    var toggle = document.getElementById('lang-toggle');
    if (toggle) {
      toggle.addEventListener('click', function () {
        var current = localStorage.getItem('lang') || 'es';
        applyLang(current === 'es' ? 'en' : 'es');
      });
    }

    var hamburger = document.getElementById('nav-hamburger');
    var navLinks = document.getElementById('nav-links');
    if (hamburger && navLinks) {
      hamburger.addEventListener('click', function () {
        navLinks.classList.toggle('open');
      });
    }
  });
})();
