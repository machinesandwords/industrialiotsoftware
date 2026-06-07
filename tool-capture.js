/**
 * tool-capture.js
 * Reusable email capture handler for IIoT tool modals.
 * Drop this file at /tools/tool-capture.js and include it in each tool page,
 * OR inline the initToolCapture() call in each tool's existing script.
 *
 * Usage:
 *   <script src="/tools/tool-capture.js"></script>
 *   <script>initToolCapture('roi-calculator');</script>
 *
 * Expected modal HTML structure (same across all tools):
 *   <input  id="tool-email"  type="email" placeholder="you@company.com" />
 *   <button id="tool-submit">Get results</button>
 *   <p     id="tool-msg"></p>
 *
 * Replace WORKER_URL with the deployed Worker URL for this site.
 */

var IIOT_WORKER_URL = '<!-- WORKER_URL: https://newsletter-iiot.ACCOUNT.workers.dev -->';

function initToolCapture(toolSlug) {
  var emailInput = document.getElementById('tool-email');
  var submitBtn  = document.getElementById('tool-submit');
  var msgEl      = document.getElementById('tool-msg');

  if (!emailInput || !submitBtn) return;

  function attempt() {
    var email = emailInput.value.trim();

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      msgEl.textContent = 'Please enter a valid email address.';
      return;
    }

    submitBtn.disabled    = true;
    submitBtn.textContent = 'Sending\u2026';
    msgEl.textContent     = '';

    fetch(IIOT_WORKER_URL, {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email:    email,
        group_id: '189191445053179034',
        source:   toolSlug,          // passed through for MailerLite field mapping if desired
      }),
    })
      .then(function (r) { return r.json(); })
      .then(function (data) {
        if (data.success) {
          msgEl.textContent     = 'You\u2019re subscribed. Check your inbox for a confirmation.';
          emailInput.value      = '';
          submitBtn.disabled    = false;
          submitBtn.textContent = 'Get results';
        } else {
          msgEl.textContent     = 'Something went wrong. Please try again.';
          submitBtn.disabled    = false;
          submitBtn.textContent = 'Get results';
        }
      })
      .catch(function () {
        msgEl.textContent     = 'Could not connect. Please try again.';
        submitBtn.disabled    = false;
        submitBtn.textContent = 'Get results';
      });
  }

  submitBtn.addEventListener('click', attempt);
  emailInput.addEventListener('keydown', function (e) {
    if (e.key === 'Enter') attempt();
  });
}


/* ─────────────────────────────────────────────────────────────
   Per-tool wiring — replace the TODO comment in each tool with
   the corresponding line below.
   ───────────────────────────────────────────────────────────── */

// /tools/roi-calculator/index.html
//   initToolCapture('roi-calculator');

// /tools/plc-bandwidth/index.html
//   initToolCapture('plc-bandwidth');

// /tools/uns-builder/index.html
//   initToolCapture('uns-builder');

// /tools/evaluation-checklist/index.html
//   initToolCapture('evaluation-checklist');

// /tools/pilot-risk/index.html
//   initToolCapture('pilot-risk');