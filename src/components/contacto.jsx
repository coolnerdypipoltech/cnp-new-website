// ── CONTACTO + SOCIAL + FOOTER ────────────────────────────────────
import React, { useState } from 'react';
import { CNP_SOCIAL } from '../data';
import SplashCursor from './SplashCursor';

const SOCIAL_ICONS = {
  linkedin: (
    <svg viewBox="0 0 24 24" fill="currentColor" width="100%"><path d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1 4.98 2.12 4.98 3.5zM.2 8h4.6v15H.2V8zm7.4 0h4.4v2.05h.06c.61-1.16 2.1-2.38 4.32-2.38 4.62 0 5.47 3.04 5.47 7V23h-4.6v-6.4c0-1.53-.03-3.5-2.13-3.5-2.13 0-2.46 1.66-2.46 3.38V23H7.6V8z"/></svg>
  ),
  instagram: (
    <svg viewBox="0 0 24 24" fill="none" width="100%"><rect x="2" y="2" width="20" height="20" rx="5.5" stroke="currentColor" strokeWidth="2"/><circle cx="12" cy="12" r="4.5" stroke="currentColor" strokeWidth="2"/><circle cx="17.5" cy="6.5" r="1.4" fill="currentColor"/></svg>
  ),
};

function SocialBar() {
  return (
    <div className="social-bar">
      {CNP_SOCIAL.map((s) => (
        <a key={s.id} className="social-btn" href={s.href} target="_blank" rel="noreferrer noopener" aria-label={s.label}>
          <span className="social-btn__icon">{SOCIAL_ICONS[s.id]}</span>
        </a>
      ))}
    </div>
  );
}

function Contacto() {
  const [sent, setSent] = useState(false);
  const submit = (e) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 2600);
  };
  return (
    <>
      <section className="section contacto" id="contacto" data-screen-label="Contacto" style={{ position: 'relative' }}>
        <SplashCursor RAINBOW_MODE />
        <div className="contacto__inner">
          <div className="contacto__signalmark">
            <img className="twinkle" src="assets/cursor-acid.png" alt="" />
          </div>
          <h2 className="horizon contacto__head reveal">Drop your signal<br/>We are listening</h2>

          <form className="contacto__form" onSubmit={submit}>
            <input className="field" type="email" placeholder="E-mail" aria-label="E-mail" />
            <input className="field" type="text" placeholder="Say hi" aria-label="Say hi" />
            <button className="btn-signal" type="submit">
              {sent ? "Signal received ✦" : "Send signal"}
            </button>
            <SocialBar />
          </form>

          <p className="contacto__note">This site was not vibe coded</p>
          <img className="contacto__logo" src="assets/logo-creativo-white.png" alt="Nerdy People" />
        </div>
      </section>

      <footer className="section footer" data-screen-label="Footer">
        <p className="footer__copy">
          © 2025 Cool Nerdy People. All rights reserved. Unauthorized reproduction or use of any content,
          concept, visual identity or creative work is strictly prohibited. We curate what we share. Respect it.
        </p>
      </footer>
    </>
  );
}

export default Contacto;
