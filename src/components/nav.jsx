// ── NAV (logo only) ───────────────────────────────────────────────
import React, { useState, useEffect } from 'react';

function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  const toTop = () => window.scrollTo({ top: 0, behavior: "smooth" });
  return (
    <nav className={`nav ${scrolled ? "is-scrolled" : ""}`}>
      <button className="nav__logo" onClick={toTop} aria-label="Inicio">
        <img src={scrolled ? "assets/logo-creativo-black.png" : "assets/logo-creativo-white.png"} alt="Nerdy People" />
      </button>
    </nav>
  );
}

export default Nav;
