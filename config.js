/**
 * config.js — Site identity for otcybersecuritysoftware.com
 * Loaded first on every page. Sets CSS variables and site metadata.
 * To create a new site: copy this file, update values, done.
 */

window.SITE_CONFIG = {
  name:     "OT Cybersecurity Software",
  nameHtml: "OT Cybersecurity <span>Software</span>",
  domain:   "otcybersecuritysoftware.com",
  tagline:  "an independent guide for OT practitioners",
  accent:   "#0A7E6A",
  accentDim:"#087558",
  accentPale:"#e6f4f1"
};

// Inject accent color into CSS variables
(function() {
  const c = window.SITE_CONFIG;
  const root = document.documentElement;
  root.style.setProperty('--accent',      c.accent);
  root.style.setProperty('--accent-dim',  c.accentDim);
  root.style.setProperty('--accent-pale', c.accentPale);

  // Set page title prefix if not already set
  if (document.title && !document.title.includes(c.name)) {
    document.title = document.title + ' — ' + c.name;
  }
})();
