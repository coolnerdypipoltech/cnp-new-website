// ── HERO ──────────────────────────────────────────────────────────
import React, { useEffect, useRef, useState } from "react";
import HeroWordHeadline from "../components/HeroWordHeadline";
import { useViewport } from "../context/ViewportContext";

const HERO_WORDS = [
  "Coolture Creative Company",
  "Awakening human potential through creativity, culture & tech",
];

const WORD_CHANGE_SCROLL_THRESHOLD = 85;

function Hero() {
  const heroRef = useRef(null);
  const videoRef = useRef(null);
  const lastTouchYRef = useRef(null);
  const wheelDeltaAccumulatorRef = useRef(0);
  const touchDeltaAccumulatorRef = useRef(0);
  const isTransitioningRef = useRef(false);
  const [activeWordIndex, setActiveWordIndex] = useState(0);
  const [scrollDirection, setScrollDirection] = useState(1);
  const { isMobile } = useViewport();
  const isFirstWord = activeWordIndex <= 0;
  const isLastWord = activeWordIndex >= HERO_WORDS.length - 1;

  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;

    const isHeroActive = () => {
      const rect = hero.getBoundingClientRect();
      return rect.top <= 0 && rect.bottom >= window.innerHeight;
    };

    const canChangeWordInDirection = (deltaY) => {
      if (deltaY > 0) {
        return !isLastWord;
      }

      if (deltaY < 0) {
        return !isFirstWord;
      }

      return false;
    };

    const tryChangeWord = (deltaY, event) => {
      if (deltaY === 0 || isTransitioningRef.current || !isHeroActive()) {
        return;
      }

      if (deltaY > 0 && isLastWord) {
        return;
      }

      if (deltaY < 0 && isFirstWord) {
        return;
      }

      event.preventDefault();
      isTransitioningRef.current = true;

      setScrollDirection(deltaY > 0 ? 1 : -1);
      setActiveWordIndex((prev) => {
        if (deltaY > 0) {
          return Math.min(prev + 1, HERO_WORDS.length - 1);
        }

        return Math.max(prev - 1, 0);
      });

      window.setTimeout(() => {
        isTransitioningRef.current = false;
      }, 520);
    };

    const accumulateAndTryChange = (rawDeltaY, event, source) => {
      const accumulatorRef = source === "wheel" ? wheelDeltaAccumulatorRef : touchDeltaAccumulatorRef;

      if (!isHeroActive()) {
        accumulatorRef.current = 0;
        return;
      }

      if (!canChangeWordInDirection(rawDeltaY)) {
        accumulatorRef.current = 0;
        return;
      }

      event.preventDefault();

      const currentDirection = Math.sign(rawDeltaY);
      const accumulatedDirection = Math.sign(accumulatorRef.current);
      if (currentDirection !== 0 && accumulatedDirection !== 0 && currentDirection !== accumulatedDirection) {
        accumulatorRef.current = 0;
      }

      accumulatorRef.current += rawDeltaY;

      if (Math.abs(accumulatorRef.current) < WORD_CHANGE_SCROLL_THRESHOLD) {
        return;
      }

      const effectiveDelta = accumulatorRef.current;
      accumulatorRef.current = 0;
      tryChangeWord(effectiveDelta, event);
    };

    const onWheel = (event) => {
      accumulateAndTryChange(event.deltaY, event, "wheel");
    };

    const onTouchStart = (event) => {
      lastTouchYRef.current = event.touches[0]?.clientY ?? null;
      touchDeltaAccumulatorRef.current = 0;
    };

    const onTouchMove = (event) => {
      const currentY = event.touches[0]?.clientY ?? 0;
      const lastTouchY = lastTouchYRef.current;
      if (lastTouchY == null) {
        lastTouchYRef.current = currentY;
        return;
      }

      const deltaY = lastTouchY - currentY;
      lastTouchYRef.current = currentY;
      accumulateAndTryChange(deltaY, event, "touch");
    };

    const onTouchEnd = () => {
      lastTouchYRef.current = null;
      touchDeltaAccumulatorRef.current = 0;
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: false });
    window.addEventListener("touchend", onTouchEnd, { passive: true });

    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
    };
  }, [isFirstWord, isLastWord]);

  useEffect(() => {
    if (activeWordIndex > 0) {
      videoRef.current?.play();
    }
  }, [activeWordIndex]);
  
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
        
        loop
        muted
        playsInline
      />

      <div className="hero__scrim" />

      <div className="hero__content">
        <HeroWordHeadline
          text={HERO_WORDS[activeWordIndex]}
          activeWordIndex={activeWordIndex}
          direction={scrollDirection}
        />
      </div>

      <div className="hero__buttons">

      </div>
    </section>
  );
}

export default Hero;
