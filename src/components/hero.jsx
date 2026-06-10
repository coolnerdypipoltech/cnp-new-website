// ── HERO ──────────────────────────────────────────────────────────
import React from 'react';
const heroStyles = {
  hero: {
    position: "relative",
    minHeight: "92vh",
    width: "100%",
    background: "url(assets/hero-bg.png) center 35% / cover no-repeat",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
};

function HeroButton({ kind, img, label, sub, onClick }) {
  const [hover, setHover] = React.useState(false);
  const isPager = kind === "pager";
  return (
    <button
      className={`hero-btn hero-btn--${kind}`}
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      aria-label={label}
    >
      <span className="hero-btn__art">
        <img src={img} alt={label} draggable="false" />
      </span>
      <span className="hero-btn__tag" style={{
        background: isPager ? "var(--cnp-acid)" : "var(--cnp-ink)",
        color: isPager ? "var(--cnp-ink)" : "var(--cnp-white)",
      }}>
        <span className="horizon">{label}</span>
        <em>{sub}</em>
      </span>
    </button>
  );
}

function Hero() {
  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) window.scrollTo({ top: el.offsetTop, behavior: "smooth" });
  };
  return (
    <section className="section hero" id="top" style={heroStyles.hero} data-screen-label="Hero">
      <div className="hero__scrim" />
      <div className="hero__content">
        <p className="hero__hello reveal">"Hello, World!"</p>
        <h1 className="hero__head horizon reveal" style={{ animationDelay: "120ms" }}>
          "In a world of<br/>infinite generation,<br/>
          <span className="hero__mark">taste</span> becomes power."
        </h1>
      </div>

      <div className="hero__buttons">
        <HeroButton
          kind="pager"
          img="assets/btn-contacto.png"
          label="Contacto"
          sub="1 new message →"
          onClick={() => scrollTo("contacto")}
        />
        <HeroButton
          kind="pet"
          img="assets/btn-game.png"
          label="Game"
          sub="feed the pet"
          onClick={() => {}}
        />
      </div>

      <button className="hero__scroll" onClick={() => scrollTo("proyectos")} aria-label="Scroll">
        <span className="eyebrow">Scroll</span>
        <span className="hero__scroll-line" />
      </button>
    </section>
  );
}

export default Hero;
