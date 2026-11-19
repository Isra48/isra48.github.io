// Shows the Spanish or English block: saved choice, else the browser language, else Spanish.
(function () {
  var saved = null;
  try { saved = localStorage.getItem('lang'); } catch (e) {}
  var lang = saved || ((navigator.language || 'es').toLowerCase().indexOf('es') === 0 ? 'es' : 'en');
  function apply(l) {
    document.documentElement.lang = l;
    document.querySelectorAll('[lang-block]').forEach(function (el) {
      el.classList.toggle('active', el.getAttribute('lang-block') === l);
    });
    document.querySelectorAll('.langs button').forEach(function (b) {
      b.setAttribute('aria-pressed', b.dataset.lang === l ? 'true' : 'false');
    });
  }
  document.addEventListener('DOMContentLoaded', function () {
    apply(lang);
    document.querySelectorAll('.langs button').forEach(function (b) {
      b.addEventListener('click', function () {
        apply(b.dataset.lang);
        try { localStorage.setItem('lang', b.dataset.lang); } catch (e) {}
      });
    });
  });
})();
