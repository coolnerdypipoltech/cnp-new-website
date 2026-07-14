// ── PROYECTOS (slider) + PopUp ────────────────────────────────────
import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
} from "react";
import { gsap } from "gsap";

import { CNP_PROJECTS } from "../data";
import { useViewport } from "../context/ViewportContext";
import SplitText from "../components/SplitText";
import ProjectModal from "../components/ProjectModal";
function BtnPop({ onClick, style, children }) {
  const btnRef = useRef(null);
  const circleRef = useRef(null);
  const labelRef = useRef(null);
  const labelHoverRef = useRef(null);
  const tlRef = useRef(null);
  const tweenRef = useRef(null);

  useEffect(() => {
    const btn = btnRef.current;
    const circle = circleRef.current;
    const label = labelRef.current;
    const labelHover = labelHoverRef.current;
    if (!btn || !circle) return;

    const layout = () => {
      const rect = btn.getBoundingClientRect();
      const { width: w, height: h } = rect;
      const R = ((w * w) / 4 + h * h) / (2 * h);
      const D = Math.ceil(2 * R) + 2;
      const delta =
        Math.ceil(R - Math.sqrt(Math.max(0, R * R - (w * w) / 4))) + 1;
      const originY = D - delta;

      circle.style.width = `${D}px`;
      circle.style.height = `${D}px`;
      circle.style.bottom = `-${delta}px`;

      gsap.set(circle, {
        xPercent: -50,
        scale: 0,
        transformOrigin: `50% ${originY}px`,
      });
      if (label) gsap.set(label, { y: 0 });
      if (labelHover) gsap.set(labelHover, { y: h + 12, opacity: 0 });

      tlRef.current?.kill();
      const tl = gsap.timeline({ paused: true });
      tl.to(
        circle,
        {
          scale: 1.2,
          xPercent: -50,
          duration: 2,
          ease: "power3.easeOut",
          overwrite: "auto",
        },
        0,
      );
      if (label)
        tl.to(
          label,
          {
            y: -(h + 8),
            duration: 2,
            ease: "power3.easeOut",
            overwrite: "auto",
          },
          0,
        );
      if (labelHover) {
        gsap.set(labelHover, { y: Math.ceil(h + 100), opacity: 0 });
        tl.to(
          labelHover,
          {
            y: 0,
            opacity: 1,
            duration: 2,
            ease: "power3.easeOut",
            overwrite: "auto",
          },
          0,
        );
      }
      tlRef.current = tl;
    };

    layout();
    window.addEventListener("resize", layout);
    return () => window.removeEventListener("resize", layout);
  }, []);

  const handleEnter = () => {
    const tl = tlRef.current;
    if (!tl) return;
    tweenRef.current?.kill();
    tweenRef.current = tl.tweenTo(tl.duration(), {
      duration: 0.3,
      ease: "power3.easeOut",
      overwrite: "auto",
    });
  };

  const handleLeave = () => {
    const tl = tlRef.current;
    if (!tl) return;
    tweenRef.current?.kill();
    tweenRef.current = tl.tweenTo(0, {
      duration: 0.2,
      ease: "power3.easeOut",
      overwrite: "auto",
    });
  };

  return (
    <button
      ref={btnRef}
      className="btn-pop"
      onClick={onClick}
      style={style}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      <span className="btn-pop__circle" ref={circleRef} aria-hidden="true" />
      <span className="btn-pop__label-stack">
        <span className="btn-pop__label" ref={labelRef}>
          {children}
        </span>
        <span
          className="btn-pop__label-hover"
          ref={labelHoverRef}
          aria-hidden="true"
        >
          {children}
        </span>
      </span>
    </button>
  );
}

function SideRibbon({ side }) {
  const repeatedWords = Array.from({ length: 10 }, (_, index) => index);

  return (
    <div
      className={`proy__ribbon proy__ribbon--${side}`}
      aria-hidden="true"
    >
      <div
        className={`proy__ribbon-track${side === "right" ? " proy__ribbon-track--reverse" : ""}`}
      >
        <div className="proy__ribbon-group">
          {repeatedWords.map((index) => (
            <span key={`${side}-a-${index}`} className="proy__ribbon-word">
              CLIENT COLLABS
            </span>
          ))}
        </div>
        <div className="proy__ribbon-group">
          {repeatedWords.map((index) => (
            <span key={`${side}-b-${index}`} className="proy__ribbon-word">
              CLIENT COLLABS
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}




function Proyectos() {
  var audio = new Audio(`${process.env.PUBLIC_URL}/assets/audio/sound2.mp3`);
  let projects = CNP_PROJECTS.slice(1); // Exclude the first project (CNP) from the slider
  



  const [index, setIndex] = useState(0);
  const [dir, setDir] = useState(1);
  const [open, setOpen] = useState(false);
  const active = projects[index];
  const { isMobile } = useViewport();
  const go = useCallback(
    (d) => {
      setDir(d);
      setIndex((i) => (i + d + projects.length) % projects.length);
    },
    [projects.length],
  );

  const touchStartX = useRef(null);
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const handleTouchEnd = (e) => {
    if (touchStartX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1);
    touchStartX.current = null;
  };

  return (
    <section
      className="section proyectos"
      id="proyectos"
      data-screen-label="Proyectos"
      style={{ background: active.bg, color: "#000000" }}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <SideRibbon side="left" />
      <SideRibbon side="right" />

      {/* background watermark headline */}

      <SplitText
        tag="h1"
        text={"In a world of\n infinite generation, taste becomes power"}
        className=" horizon reveal"
        preserveLineBreaks
        splitType="words"
        delay={120}
        initialDelay={3.25}
        duration={2.5}
        ease="power3.out"
        from={{ opacity: 0, y: 30 }}
        to={{ opacity: 1, y: 0 }}
        threshold={0.1}
        rootMargin="-60px"
        textAlign="left"
        style={{
          color: "#000000",
          fontSize: isMobile ? "22px" : "50px",
          maxWidth: "1200px",
          width: isMobile ? "80%" : "65%",
          position: "absolute",
          left: "50%",
          transform: "translateX(-50%)",
          textAlign: "center",
          zIndex: 0,
          pointerEvents: "none",
          top: isMobile ? "22vh" : "auto"
        }}
      />

      <div className="wrap proy__inner">
        


        {!isMobile ? (
          <>
            <button
              className="proy__arrow proy__arrow--l"
              onClick={() => {
                go(-1);
                audio.volume = 0.2;
                audio.play();
              }}
              aria-label="Anterior"
              style={{ borderColor: "#000000", color: "#000000", position: "absolute", left: "55px" }}
            >
              <img
                  src={`${process.env.PUBLIC_URL}/assets/icons/arrow_back.svg`}
                  alt="Anterior"
                  style={{ width: "32px", height: "32px",  }}
                />
            </button>
            <button
              className="proy__arrow proy__arrow--r"
              onClick={() => {
                go(1);
                audio.volume = 0.2;
                audio.play();
              }}
              aria-label="Siguiente"
              style={{ borderColor: "#000000", color: "#000000", position: "absolute", right: "55px" }}
            >
              <img
                  src={`${process.env.PUBLIC_URL}/assets/icons/arrow_back.svg`}
                  alt="Siguiente"
                  style={{ width: "32px", height: "32px", scale: "-1", }}
                />
            </button>
          </>
        ) : (
          <>
            <button
              className="proy__arrow proy__arrow--l"
              onClick={() => {
                go(-1);
                audio.volume = 0.2;
                audio.play();
              }}
              aria-label="Anterior"
              style={{ marginLeft: "20px", borderWidth: "0px" }}
            >
              <img
                  src={`${process.env.PUBLIC_URL}/assets/icons/arrow_back_white.svg`}
                  alt="Anterior"
                  style={{ width: "32px", height: "32px", }}
                />
            </button>
            <button
              className="proy__arrow proy__arrow--r"
              onClick={() => {
                go(1);
                audio.volume = 0.2;
                audio.play();
              }}
              aria-label="Siguiente"
              style={{  marginRight: "20px", borderWidth: "0px", width: "48px", height: "48px" }}
            >
              <img
                  src={`${process.env.PUBLIC_URL}/assets/icons/arrow_back_white.svg`}
                  alt="Siguiente"
                  style={{ width: "32px", height: "32px", scale: "-1", }}
                />
            </button>
          </>
        )}
        <img
              className="proy__art__logo"
              style={{ height: "70px", position: "absolute", top: "0px", left: "50%", transform: "translateX(-50%)" }}
              src={active.logo}
              alt={active.name}
              draggable="false"
            />
        <div className="proy__stage">
          <div
            key={active.id}
            className={`proy__card ${dir > 0 ? "in-right" : "in-left"}`}
          >


            
            <div className="proy__art">
              <img src={active.img} alt={active.name} style={{scale: active.id === "cnp" ? "0" : "1"}} draggable="false" />
            </div>
            <div
              style={{
                position: "relative",
                top: isMobile ? "0px" : "-12px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: isMobile ? "32px" : "16px",
              }}
            >
              <span className="proy__client">{active.client}</span>
              <BtnPop
                onClick={() => {
                  setOpen(true);
                  audio.volume = 0.2;
                  audio.play();
                }}
                style={{ "--btn-bg": "#000000", "--btn-fg": active.bg }}
              >
                Ver más
              </BtnPop>
              {isMobile && (<>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                gap: "8px",
                justifyContent: "center",
                alignItems: "center",
                margin: "10px 0",
              }}
            >
              {projects.map((_, i) => (
                <button
                  key={i}
                  onClick={() => { setDir(i > index ? 1 : -1); setIndex(i); }}
                  aria-label={`Proyecto ${i + 1}`}
                  style={{
                    width: i === index ? "24px" : "6px",
                    height: "6px",
                    borderRadius: "4px",
                    background: "#000000",
                    opacity: i === index ? 1 : 0.3,
                    border: "none",
                    padding: 0,
                    cursor: "pointer",
                    transition: "width 300ms ease, opacity 300ms ease",
                  }}
                />
              ))}
            </div>
</>)}
            </div>
          </div>
        </div>
      </div>

      {open && (
        <ProjectModal
          project={active}
          onClose={() => {
            setOpen(false);
            audio.volume = 0.2;
            audio.play();
          }}
        />
      )}
    </section>
  );
}

export default Proyectos;
