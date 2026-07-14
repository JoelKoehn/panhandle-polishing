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

  var photoInput = document.getElementById('photos');
  var photoHint = document.getElementById('photos-hint');
  var photoHintDefault = photoHint ? photoHint.textContent : '';

  if (photoInput && photoHint) {
    photoInput.addEventListener('change', function () {
      if (photoInput.files.length > 4) {
        var trimmed = new DataTransfer();
        for (var i = 0; i < 4; i++) {
          trimmed.items.add(photoInput.files[i]);
        }
        photoInput.files = trimmed.files;
        photoHint.textContent = 'Only the first 4 photos were kept (4 photo max).';
      } else {
        photoHint.textContent = photoHintDefault;
      }
    });
  }

  var yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
});
