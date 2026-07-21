// ── CONTACTO + SOCIAL + FOOTER ────────────────────────────────────
import React, { useState, useRef, useEffect } from "react";
import { CNP_SOCIAL } from "../data";
import Particles from "../components/Particles";
import { useViewport } from "../context/ViewportContext";
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
        style={{ background: !hovered ? "#9747FF" : "#9747FF" }}
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

const MARQUEE_TEXT =
  " BEST IDEAS DON'T INTERRUPT CULTURE. THEY JOIN IT ✦ IN A WORLD OF INFINITE GENERATION, TASTE BECOMES POWER ✦ TECHNOLOGY SHOULD FEEL HUMAN ✦ THE";

function JSMarquee({ text, speed = 0.6, fontSize }) {
  const outerRef = useRef(null);
  const trackRef = useRef(null);
  const xRef = useRef(0);
  const rafRef = useRef(null);

  // Build enough copies to fill at least 3× the outer width
  useEffect(() => {
    const outer = outerRef.current;
    const track = trackRef.current;
    if (!outer || !track) return;

    // Remove existing clones
    while (track.children.length > 1) track.removeChild(track.lastChild);

    const singleW = track.children[0].offsetWidth;
    const copies = Math.ceil((outer.offsetWidth * 3) / singleW) + 2;
    for (let i = 1; i < copies; i++) {
      const clone = track.children[0].cloneNode(true);
      track.appendChild(clone);
    }

    const totalW = track.children[0].offsetWidth * track.children.length;
    const halfW = totalW / 2;
    xRef.current = 0;

    const tick = () => {
      xRef.current -= speed;
      if (xRef.current <= -halfW) xRef.current += halfW;
      track.style.transform = `translateX(${xRef.current}px)`;
      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [speed, fontSize]);

  return (
    <div ref={outerRef} className="js-marquee__outer">
      <div ref={trackRef} className="js-marquee__track">
        <span className="js-marquee__item" style={{ fontSize }}>
          {text}
        </span>
      </div>
    </div>
  );
}

const SEND_EMAIL_URL = "https://localhost:4000/send-email"; // Replace with your actual endpoint

function Contacto() {
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [visible, setVisible] = useState(false);
  const { isMobile } = useViewport();
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.1 },
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);
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
        ref={sectionRef}
        className="section contacto"
        id="contacto"
        data-screen-label="Contacto"
        style={{ position: "relative" }}
      >
        <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
          {visible && (
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
          )}
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
              placeholder="What's the message you're trying to send?"
              aria-label="Say hi"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
            />
            {error && <p className="contacto__error">{error}</p>}
            <button className="btn-signal" type="submit" disabled={loading} style={{position: "initial"}}>
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
          {isMobile ? (
            <div className="footer__mobile-marquee">
              <JSMarquee text={MARQUEE_TEXT} speed={0.45} fontSize="8px" />
            </div>
          ) : (
            <div className="merch__marquee-track">
              {Array.from({ length: 2 }).map((_, k) => (
                <span
                  key={k}
                  style={{
                    fontSize: "14px",
                    marginTop: "8px",
                    marginBottom: "8px",
                    fontWeight: "500",
                  }}
                >
                  {MARQUEE_TEXT}
                </span>
              ))}
            </div>
          )}
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
