// ── Reveal-on-scroll for main texts ───────────────────────────────
(function () {
  function reveal(el) { el.classList.add("in"); }
  function setup() {
    var els = document.querySelectorAll(".reveal:not(.in)");
    if (!els.length) return;
    if (!("IntersectionObserver" in window)) { els.forEach(reveal); return; }
    if (!window.__cnpIO) {
      window.__cnpIO = new IntersectionObserver(function (entries, io) {
        entries.forEach(function (en) {
          if (en.isIntersecting) { reveal(en.target); io.unobserve(en.target); }
        });
      }, { threshold: 0.18, rootMargin: "0px 0px -8% 0px" });
    }
    els.forEach(function (el) { window.__cnpIO.observe(el); });
  }
  // React renders headlines after mount — keep catching new .reveal nodes.
  var tries = 0;
  var iv = setInterval(function () { setup(); if (++tries > 25) clearInterval(iv); }, 250);
  window.addEventListener("load", setup);
})();
