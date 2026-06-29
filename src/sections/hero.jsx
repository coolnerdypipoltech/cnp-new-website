// ── HERO ──────────────────────────────────────────────────────────
import React, { useRef, useState } from "react";
import SplitText from "../components/SplitText";
import { useViewport } from "../context/ViewportContext";
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
      <span
        className="hero-btn__tag"
        style={{
          background: isPager ? "#00BF63" : "#00ABFF",
          color: "var(--cnp-white)",
        }}
      >
        <span className="horizon">{label}</span>
        <em>{sub}</em>
      </span>
    </button>
  );
}

function Hero() {
  const videoRef = useRef(null);
  const [muted, setMuted] = useState(true);
  const { isMobile } = useViewport();
  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setMuted(videoRef.current.muted);
    }
  };


  return (
    <section
      className="section hero"
      id="top"
      style={{
        position: "relative",
        minHeight: "100vh",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",
      }}
      data-screen-label="Hero"
    >
      {/* Background video */}
      <video
        ref={videoRef}
        className="hero__bg-video"
        src={isMobile ? `${process.env.PUBLIC_URL}/assets/videos/VIDEO_mobil.mp4` : `${process.env.PUBLIC_URL}/assets/videos/VIDEO_WEB.mp4`}
        autoPlay
        loop
        muted
        playsInline
      />

      {/* Mute indicator 
      <div className={`hero__mute-badge${muted ? '' : ' hero__mute-badge--on'}`}>
        {muted ? '🔇' : '🔊'}
      </div>
      */}
      <div className="hero__scrim" />

      <div className="hero__content">
        <SplitText
          tag="h1"
          text=" 
            In a world of infinite
              generation, taste becomes power."
          className="hero__head horizon reveal"
          splitType="words"
          delay={120}
          initialDelay={0}
          duration={2.5}
          ease="power3.out"
          from={{ opacity: 0, y: 30 }}
          to={{ opacity: 1, y: 0 }}
          threshold={0.1}
          rootMargin="-60px"
          textAlign="left"
          style={{ color: "#ffffff", maxWidth: "1000px", minWidth: "300px" }}
        />
      </div>

      <div className="hero__buttons">
        {/* <HeroButton
          kind="pager"
          img={`${process.env.PUBLIC_URL}/assets/btn-contacto.png`}
          label="Contacto"
          sub="Send us a message"
          onClick={() => scrollTo("contacto")}
        />
        <HeroButton
          kind="pet"
          img={`${process.env.PUBLIC_URL}/assets/tamagochi.png`}
          label="Game"
          sub="Play the game"
          onClick={() => {}}
        />*/}
      </div>
    </section>
  );
}

export default Hero;
