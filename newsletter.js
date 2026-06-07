/**
 * newsletter.js — Shared newsletter signup handler
 * Wires up #nl-email / #nl-submit / #nl-msg on any page that includes this script.
 * Replace WORKER_URL with the deployed Cloudflare Worker URL for this site.
 */

(function () {
  var WORKER_URL = '<!-- WORKER_URL: https://newsletter-SITENAME.ACCOUNT.workers.dev -->';

  var emailInput = document.getElementById('nl-email');
  var submitBtn  = document.getElementById('nl-submit');
  var msgEl      = document.getElementById('nl-msg');

  if (!emailInput || !submitBtn) return;

  function attempt() {
    var email = emailInput.value.trim();

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      msgEl.textContent = 'Please enter a valid email address.';
      return;
    }

    submitBtn.disabled    = true;
    submitBtn.textContent = 'Sending…';
    msgEl.textContent     = '';

    fetch(WORKER_URL, {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify({ email: email }),
    })
      .then(function (r) { return r.json(); })
      .then(function (data) {
        if (data.success) {
          msgEl.textContent     = 'You're subscribed. Check your inbox for a confirmation.';
          emailInput.value      = '';
          submitBtn.disabled    = false;
          submitBtn.textContent = 'Subscribe';
        } else {
          msgEl.textContent     = 'Something went wrong. Please try again.';
          submitBtn.disabled    = false;
          submitBtn.textContent = 'Subscribe';
        }
      })
      .catch(function () {
        msgEl.textContent     = 'Could not connect. Please try again.';
        submitBtn.disabled    = false;
        submitBtn.textContent = 'Subscribe';
      });
  }

  submitBtn.addEventListener('click', attempt);
  emailInput.addEventListener('keydown', function (e) {
    if (e.key === 'Enter') attempt();
  });
})();
