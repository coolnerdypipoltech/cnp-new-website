// ── HERO ──────────────────────────────────────────────────────────
import React, { useRef, useEffect } from "react";
import SplitText from "../components/SplitText";
import { useViewport } from "../context/ViewportContext";

function Hero() {
  const heroRef = useRef(null);
  const videoRef = useRef(null);
  const { isMobile } = useViewport();

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = true; // Requisito obligatorio para autoplay en iOS
    video.play().catch((err) => {
      console.warn("Autoplay bloqueado:", err);
    });
  }, [isMobile]); // Re-ejecuta si cambia la fuente del video

  return (
    <section
      ref={heroRef}
      className="section hero"
      id="top"
      style={{
        position: "relative",
        height: "100vh",
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
        src={isMobile ? `${process.env.PUBLIC_URL}/assets/videos/VIDEO_movil.mp4` : `${process.env.PUBLIC_URL}/assets/videos/VIDEO_WEB.mp4`}
        autoPlay
        loop
        muted
        playsInline
      />

      <div className="hero__scrim" />

      <div className="hero__content">
        <SplitText
      key={`text1`}
      tag="h2"
      text={"Coolture Creative Company"}
      className="hero__head2 horizon reveal"
      splitType="words"
      delay={1020}
      initialDelay={0}
      duration={1.1}
      ease="power3.out"
      from={{ opacity: 0, }}
      to={{ opacity: 1, y: 0 }}
      threshold={0.1}
      rootMargin="-60px"
      textAlign="left"
      style={{ color: "#ffffff", maxWidth: "80vw", minWidth: "300px" }}
    />
        <SplitText
      key={`text2`}
      tag="h1"
      text={"Awakening human potential through creativity, culture & tech"}
      className="hero__head horizon reveal"
      splitType="words"
      delay={1020}
      initialDelay={0}
      duration={1.1}
      ease="power3.out"
      from={{ opacity: 0, }}
      to={{ opacity: 1, y: 0 }}
      threshold={0.1}
      rootMargin="-60px"
      textAlign="left"
      style={{ color: "#ffffff", maxWidth: "80vw", width: "100%" , minWidth: "300px" }}
    />
      </div>

      <div className="hero__buttons">

      </div>
    </section>
  );
}

export default Hero;
