document.addEventListener('DOMContentLoaded', function () {
  var navToggle = document.getElementById('nav-toggle');
  var mainNav = document.getElementById('main-nav');

  navToggle.addEventListener('click', function () {
    var isOpen = mainNav.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', isOpen);
  });

  mainNav.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () {
      mainNav.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });

  var serviceType = document.getElementById('service-type');
  var locationWrap = document.getElementById('location-field-wrap');

  function toggleLocationField() {
    locationWrap.style.display = serviceType.value === 'Mobile' ? 'block' : 'none';
  }

  if (serviceType && locationWrap) {
    toggleLocationField();
    serviceType.addEventListener('change', toggleLocationField);
  }

  var yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
});
