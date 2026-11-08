// Counts the things that matter to the business: quote requests, calls, texts and emails.
// Safe on its own: if Google Analytics is not on the page these do nothing.
(function () {
  function send(name, params) {
    if (typeof window.gtag === 'function') window.gtag('event', name, params || {});
  }

  // A finished quote request lands on /thank-you. Count it once per visit.
  if (location.pathname.replace(/\/$/, '') === '/thank-you' && !sessionStorage.getItem('pp_lead_sent')) {
    sessionStorage.setItem('pp_lead_sent', '1');
    send('generate_lead', { form_name: 'quote-request', method: 'quote_form' });
  }

  document.addEventListener('click', function (e) {
    var a = e.target.closest && e.target.closest('a[href]');
    if (!a) return;
    var href = a.getAttribute('href') || '';
    if (href.indexOf('tel:') === 0) send('phone_click', { link_url: href, link_text: (a.textContent || '').trim().slice(0, 60) });
    else if (href.indexOf('sms:') === 0) send('text_click', { link_url: href });
    else if (href.indexOf('mailto:') === 0) send('email_click', { link_url: href.split('?')[0] });
    else if (href === '#contact') send('quote_button_click', { link_text: (a.textContent || '').trim().slice(0, 60) });
  });

  var form = document.getElementById('quote-form');
  if (form) {
    var started = false;
    form.addEventListener('input', function () {
      if (started) return;
      started = true;
      send('form_start', { form_name: 'quote-request' });
    });
  }
})();
