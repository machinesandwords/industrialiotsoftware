/**
 * config.js — Site identity and accent color configuration
 * Replace all placeholder values before deploying.
 *
 * accent / accentDim / accentPale: Choose a palette that distinguishes
 * this site. accentDim = ~15% darker than accent. accentPale = very light
 * tint of accent (used for callout backgrounds and hover states).
 */

window.SITE_CONFIG = {
  name:      "Industrial IoT Software",
  nameHtml:  "Industrial <span>IoT</span> Software",
  domain:    "industrialiotsoftware.com",
  tagline:   "Independent guidance for industrial IoT software buyers",
  accent:    "#0A7E6A",
  accentDim: "#087558",
  accentPale:"#e6f4f1"
};

(function() {
  var r = document.documentElement;
  r.style.setProperty('--accent',      window.SITE_CONFIG.accent);
  r.style.setProperty('--accent-dim',  window.SITE_CONFIG.accentDim);
  r.style.setProperty('--accent-pale', window.SITE_CONFIG.accentPale);
})();