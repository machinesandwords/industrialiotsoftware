/**
 * nav.js — Shared sidebar navigation
 * industrialiotsoftware.com
 * Injected into every page. Edit once, updates everywhere.
 */

(function() {
  const nav = `
    <div class="nav-section">
      <div class="nav-section-label">Why</div>
      <a href="/why/" class="nav-item depth-0">No Switzerland</a>
    </div>

    <div class="nav-divider"></div>

    <div class="nav-section">
      <div class="nav-section-label">Landscape</div>
      <a href="/landscape/" class="nav-item depth-0">Market overview</a>
      <a href="/landscape/vendors/" class="nav-item depth-1">├ Vendor index</a>
      <a href="/tools/vendor-comparison/" class="nav-item depth-1">├ Vendor comparison</a>
      <a href="/landscape/market-direction/" class="nav-item depth-1">├ Market direction</a>
      <a href="/landscape/protocols/" class="nav-item depth-1">└ Protocol reference</a>
    </div>

    <div class="nav-divider"></div>

    <div class="nav-section">
      <div class="nav-section-label">Tools</div>
      <a href="/tools/" class="nav-item depth-0">All tools</a>
      <a href="/tools/roi-calculator/" class="nav-item depth-1">└ IIoT ROI calculator</a>
      <a href="/tools/evaluation-checklist/" class="nav-item depth-1">└ Platform evaluation checklist</a>
      <a href="/tools/" class="nav-item depth-1">└ more</a>
        </div>

       <div class="nav-divider"></div>

    <div class="nav-section">
      <div class="nav-section-label">Comparisons</div>
      <a href="/comparisons/" class="nav-item depth-0">All comparisons</a>
      <a href="/comparisons/kepware-vs-litmus/" class="nav-item depth-1">├ Kepware vs Litmus</a>
      <a href="/comparisons/aws-greengrass-vs-azure-edge/" class="nav-item depth-1">├ AWS IoT vs Azure IoT</a>
      <a href="/comparisons/index.html" class="nav-item depth-1">└ more</a>
      </div>

    <div class="nav-divider"></div>

    <div class="nav-section">
      <div class="nav-section-label">Guides</div>
      <a href="/guides/" class="nav-item depth-0">All guides</a>
      <a href="/guides/iiot-pilot-structure/" class="nav-item depth-1">├ IIoT pilot structure</a>
      <a href="/guides/protocol-compatibility/" class="nav-item depth-1">├ Protocol compatibility</a>
      <a href="/guides/" class="nav-item depth-1">└ more</a>
    </div>

    <div class="nav-divider"></div>

    <div class="nav-section">
      <a href="/subscribe" class="nav-item depth-0 nav-subscribe">Subscribe &rarr;</a>
    </div>
  `;

  // Inject into element with id="sidebar-nav"
  const container = document.getElementById('sidebar-nav');
  if (container) {
    container.innerHTML = nav;

    // Auto-highlight active link based on current path
    const path = window.location.pathname;
    const links = container.querySelectorAll('a.nav-item');
    links.forEach(link => {
      const href = link.getAttribute('href');
      if (!link.textContent.includes('More')) {
        if (href === path || (href !== '/' && path.startsWith(href))) {
          link.classList.add('active');
        }
      }
    });
  }

})();