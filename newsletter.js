/**
 * newsletter.js — Injects newsletter signup block before .page-footer
 * Load at bottom of every content page: <script src="/newsletter.js"></script>
 * Reads tagline from SITE_CONFIG if available.
 */

(function() {
  const footer = document.querySelector('.page-footer');
  if (!footer) return;

  const block = document.createElement('div');
  block.className = 'newsletter-block';
  block.innerHTML = `
    <span class="page-label">Stay current</span>
    <p>New tools, pricing changes, and honest takes — when there's something worth saying.</p>
    <div class="newsletter-form">
      <input type="email" placeholder="your@email.com" aria-label="Email address">
      <button type="submit">Subscribe</button>
    </div>
  `;

  footer.parentNode.insertBefore(block, footer);

  // Form submission — replace action with your newsletter provider URL
  // e.g. Buttondown: https://buttondown.email/api/emails/embed-subscribe/YOUR-USERNAME
  // e.g. ConvertKit: your form action URL
  const btn = block.querySelector('button');
  const input = block.querySelector('input');

  btn.addEventListener('click', function() {
    const email = input.value.trim();
    if (!email || !email.includes('@')) {
      input.style.borderColor = '#C0392B';
      input.focus();
      return;
    }

    // TODO: Replace with your newsletter provider endpoint
    // Example for Buttondown:
    // fetch('https://buttondown.email/api/emails/embed-subscribe/YOUR-USERNAME', {
    //   method: 'POST',
    //   body: new URLSearchParams({ email }),
    // }).then(() => showConfirmation());

    // Placeholder confirmation
    showConfirmation();
  });

  function showConfirmation() {
    block.innerHTML = `
      <span class="page-label">Subscribed</span>
      <p>You're on the list. You'll hear from us when there's something worth saying.</p>
    `;
  }

  // Allow Enter key in input
  input.addEventListener('keydown', function(e) {
    if (e.key === 'Enter') btn.click();
  });
})();