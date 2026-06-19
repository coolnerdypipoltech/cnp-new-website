// ── CONTACTO + SOCIAL + FOOTER ────────────────────────────────────
import React, { useState } from "react";
import { CNP_SOCIAL } from "../data";
import Particles from "./Particles";

const SOCIAL_ICONS = {
  linkedin: {
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="100%">
        <path d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1 4.98 2.12 4.98 3.5zM.2 8h4.6v15H.2V8zm7.4 0h4.4v2.05h.06c.61-1.16 2.1-2.38 4.32-2.38 4.62 0 5.47 3.04 5.47 7V23h-4.6v-6.4c0-1.53-.03-3.5-2.13-3.5-2.13 0-2.46 1.66-2.46 3.38V23H7.6V8z" />
      </svg>
    ),
    label: "LinkedIn",
    sub: "Connect with us",
    link: "https://mx.linkedin.com/company/coolnerdypeople",
  },
  instagram: {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" width="100%">
        <rect
          x="2"
          y="2"
          width="20"
          height="20"
          rx="5.5"
          stroke="currentColor"
          strokeWidth="2"
        />
        <circle cx="12" cy="12" r="4.5" stroke="currentColor" strokeWidth="2" />
        <circle cx="17.5" cy="6.5" r="1.4" fill="currentColor" />
      </svg>
    ),
    label: "Instagram",
    sub: "Follow our work",
    link: "https://www.instagram.com/coolnerdypeople/",
  },
  spacer: {
    icon: (
      <img src={`${process.env.PUBLIC_URL}/assets/icons/Signal.png`} alt="" />
    ),
    label: "",
    sub: "",
    link: "",
  },
};

function SocialBtn({ s }) {
  const [hovered, setHovered] = React.useState(false);
  const data = SOCIAL_ICONS[s.id];
  if (s.id === "spacer") {
    return (
      <a
        className="social-btn_spacer"
        href={data.link || s.href}
        target="_blank"
        rel="noreferrer noopener"
        aria-label={s.label}
      >
        <span className="social-btn__icon">{data.icon}</span>
      </a>
    );
  }
  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <a
        className={`social-btn${hovered ? " social-btn--hover" : ""}`}
        href={data.link || s.href}
        target="_blank"
        rel="noreferrer noopener"
        style={{ background: hovered ? "#00ABFF" : "#1E232C" }}
        aria-label={data.label || s.label}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <span className="social-btn__icon">{data.icon}</span>
      </a>
    </div>
  );
}

function SocialBar() {
  return (
    <div className="social-bar">
      {CNP_SOCIAL.map((s) => (
        <SocialBtn key={s.id} s={s} />
      ))}
    </div>
  );
}

const SEND_EMAIL_URL = "https://example.com/send-email";

function Contacto() {
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  var audio = new Audio(`${process.env.PUBLIC_URL}/assets/audio/sound3.mp3`);
  const submit = async (e) => {
    audio.play();
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(SEND_EMAIL_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          asunto: "Nuevo mensaje desde el sitio",
          texto: message,
        }),
      });
      if (!res.ok) throw new Error("Error al enviar");
      setSent(true);
      setEmail("");
      setMessage("");
      setTimeout(() => setSent(false), 2600);
    } catch (err) {
      setError("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <section
        className="section contacto"
        id="contacto"
        data-screen-label="Contacto"
        style={{ position: "relative" }}
      >
        <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
          <Particles
            particleColors={["#ffffff", "#aaaaff", "#cccccc"]}
            particleCount={1000}
            particleSpread={8}
            speed={0.08}
            particleBaseSize={80}
            moveParticlesOnHover={true}
            alphaParticles={true}
            disableRotation={false}
          />
        </div>
        <div
          className="contacto__inner"
          style={{ position: "relative", zIndex: 1 }}
        >
          <div className="contacto__signalmark">
            <img
              className="twinkle"
              src={`${process.env.PUBLIC_URL}/assets/icons/thecursor.svg`}
              alt=""
            />
          </div>
          <h2 className="horizon contacto__head reveal">
            Drop your signal
            <br />
            We are listening
          </h2>

          <form className="contacto__form" onSubmit={submit}>
            <input
              className="field"
              type="email"
              placeholder="Tell us your email"
              aria-label="E-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              className="field"
              type="text"
              placeholder="What is the message you are trying to send?"
              aria-label="Say hi"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
            />
            {error && <p className="contacto__error">{error}</p>}
            <button className="btn-signal" type="submit" disabled={loading}>
              {sent
                ? "Signal received ✦"
                : loading
                  ? "Sending…"
                  : "Send signal"}
            </button>
            <p className="contacto__note">THIS SITE WAS NOT VIBE CODED</p>
            <SocialBar />
          </form>

          <img
            className="contacto__logo"
            src={`${process.env.PUBLIC_URL}/assets/logo/CNP_Brand.png`}
            alt="Nerdy People"
          />
        </div>
      </section>

      <footer className="section footer" data-screen-label="Footer">

        <div className="merch__marquee" aria-hidden="true">
          <div className="merch__marquee-track">
            {Array.from({ length: 2 }).map((_, k) => (
              <span
                key={k}
                style={{
                  fontSize: "14px",
                  marginTop: "8px",
                  marginBottom: "8px",
                }}
              >
                ‎ ‎‎ ‎ ‎ THE BEST IDEAS DON’T INTERRUPT CULTURE. THEY JOIN IT ‎
                ‎‎ ‎ ‎ ✦‎ ‎ ‎ ‎ ‎ ‎ IN A WORLD OF INFINITE GENERATION, TASTE
                BECOMES POWER ‎ ‎ ‎ ‎ ‎ ✦ ‎ ‎‎ ‎ ‎ TECHNOLOGY SHOULD FEEL HUMAN
                ‎ ‎‎ ‎ ‎ ✦‎ ‎ ‎‎ ‎ ‎
              </span>
            ))}
          </div>
        </div>
        <p className="footer__copy">
          © 2026 Cool Nerdy People. All rights reserved. Unauthorized
          reproduction or use of any content, concept, visual identity or
          creative work is strictly prohibited. We curate what we share. Respect
          it.
        </p>
      </footer>
    </>
  );
}

export default Contacto;
