// ── PROYECTOS (slider) + PopUp ────────────────────────────────────
import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
} from "react";
import { gsap } from "gsap";
import Icon from "../components/icons";
import { CNP_PROJECTS } from "../data";
import { useViewport } from "../context/ViewportContext";
import SplitText from "../components/SplitText";
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



function VideoPlayer({ src, title, onPlayingChange, coverSrc, showCover }) {
  const videoRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [coverVisible, setCoverVisible] = useState(showCover);

  const updatePlaying = useCallback(
    (val) => {
      setPlaying(val);
      onPlayingChange?.(val);
    },
    [onPlayingChange],
  );
  const [hovered, setHovered] = useState(false);
  const [cursor, setCursor] = useState({ x: 0, y: 0 });
  const { isTrueMobile } = useViewport();

  useEffect(() => {
    setCoverVisible(showCover);
    updatePlaying(false);
  }, [showCover, src, updatePlaying]);

  const togglePlay = () => {
    const v = videoRef.current;
    if (!v) return;

    if (v.paused) {
      const playPromise = v.play();
      setCoverVisible(false);
      if (playPromise?.catch) {
        playPromise.catch(() => {
          setCoverVisible(showCover);
        });
      }
      return;
    }

    v.pause();
  };

  const onMouseMove = (e) => {
    if(isTrueMobile) {
      return;
    }
    const rect = e.currentTarget.getBoundingClientRect();
    setCursor({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <div
      className="modal__bg-video"
      style={{ position: "relative", cursor: "none" }}
      onClick={togglePlay}
      onMouseMove={onMouseMove}
      onMouseEnter={() => {if(!isTrueMobile) setHovered(true)}}
      onMouseLeave={() => {if(!isTrueMobile) setHovered(false)}}
    >
      <video
        ref={videoRef}
        style={{ height: "82vh", objectFit: "contain" }}
        width="100%"
        height="100%"
        controls={true}
        
        onPlay={() => updatePlaying(true)}
        onPause={() => updatePlaying(false)}
        onEnded={() => {
          updatePlaying(false);
          setCoverVisible(showCover);
        }}
      >
        <source src={src} type="video/mp4" />
      </video>
      {coverVisible && coverSrc && (
        <button
          type="button"
          aria-label={`Reproducir ${title}`}
          onClick={(e) => {
            e.stopPropagation();
            togglePlay();
          }}
          style={{
            position: "absolute",
            inset: 0,
            padding: 0,
            border: "none",
            background: "transparent",
            cursor: "pointer",
          }}
        >
          <img
            src={coverSrc}
            alt={`${title} cover`}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "contain",
            }}
          />
        </button>
      )}
      {hovered && (
        <div
          style={{
            position: "absolute",
            left: cursor.x,
            top: cursor.y + 20,
            transform: "translate(-50%, -50%)",
            pointerEvents: "none",
            color: "#fff",
            fontFamily: "var(--font-body)",
            fontWeight: 700,
            fontSize: "13px",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            padding: "10px 18px",

            whiteSpace: "nowrap",
            transition: "opacity 120ms",
          }}
        >
          {playing ? "Pausa" : "Play"}
        </div>
      )}
    </div>
  );
}

function ProjectModal({ project, onClose }) {
  const [activePanel, setActivePanel] = useState(null);
  const [closing, setClosing] = useState(false);
  const [videoPlaying, setVideoPlaying] = useState(false);
  const [videoIndex, setVideoIndex] = useState(0);
  const { isMobile, isTrueMobile } = useViewport();
  const videoSources =
    isMobile && project?.videoMobil?.length ? project.videoMobil : project?.video;

  const handleClose = useCallback(() => {
    setClosing(true);
    setTimeout(() => onClose(), 320);
  }, [onClose]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") handleClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [handleClose]);

  useEffect(() => {
    setVideoIndex(0);
  }, [project?.id, isMobile]);

  if (!project) return null;

  const togglePanel = (panel) =>  {
    console.log(panel, activePanel);
    if(activePanel === panel) {
      setActivePanel(null);
      
    } else {
      setActivePanel(panel);
    }
  };

  return (
    <div
      className={`modal-backdrop${closing ? " modal-backdrop--closing" : ""}`}
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) handleClose();
      }}
    >
      {/* Close button — floating outside modal, top right */}
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          position: "absolute",
          width: "90%",
          top: "calc(5dvh - 18px)",
        }}
      >
        <div style={{ display: "flex", flexDirection: "row", gap: "12px" }}>
          {videoSources.length > 1 && (
            <>
              <button
                className="modal__close modal__close--outside"
                style={{ background: project.bg, width: "50px" }}
                onClick={(e) => {
                  setVideoIndex(
                    (prev) => (prev - 1 + videoSources.length) % videoSources.length,
                  );
                }}
                aria-label="Cerrar"
              >
                <img
                  src={`${process.env.PUBLIC_URL}/assets/icons/arrow_back.svg`}
                  alt="Anterior"
                  style={{ width: "32px", height: "32px" }}
                />
              </button>
              <button
                className="modal__close modal__close--outside"
                style={{ background: project.bg, width: "50px" }}
                onClick={(e) => {
                  setVideoIndex((prev) => (prev + 1) % videoSources.length);
                }}
                aria-label="Cerrar"
              >
                <img
                  src={`${process.env.PUBLIC_URL}/assets/icons/arrow_back.svg`}
                  alt="Siguiente"
                  style={{ width: "32px", height: "32px", scale: "-1" }}
                />
              </button>
            </>
          )}
        </div>
        <button
          className="modal__close modal__close--outside"
          style={{ background: project.bg, width: "110px" }}
          onClick={handleClose}
          aria-label="Cerrar"
        >
          <p>Cerrar</p>
        </button>
      </div>

      <div
        className="modal modal--h"
        style={{
          "--p-bg": project.bg,
          "--p-fg": project.fg,
          "--p-accent": project.accent,
        }}
      >
        {/* Background video fills entire modal */}
        <div key={project.id} >
        <VideoPlayer
          key={videoIndex}
          src={videoSources[videoIndex]}
          title={project.name}
          onPlayingChange={setVideoPlaying}
          coverSrc={project.cover}
          showCover={isMobile}
        /></div>

        {/* Title overlay — top */}
        <div
          className="modal__title-overlay"
          style={{
            opacity: videoPlaying ? 0 : 1,
            transition: "opacity 400ms ease",
          }}
        >
          <span className="eyebrow">
            {project.year}
          </span>
          <h2 className="horizon modal__title">{project.name}</h2>
          <span className="modal__client">{project.client}</span>
        </div>

        {/* Bottom buttons */}
        <div className="modal__btns">
          {/* El Brief */}
          <div
            className="modal__btn-wrap"
            onMouseEnter={() => { if (!isTrueMobile) setActivePanel("brief"); }}
            onMouseLeave={() => { if (!isTrueMobile) setActivePanel(null); }}
            onClick={() => togglePanel("brief")}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <div></div>
              {activePanel === "brief" && (
                <div
                  className="modal__btn-panel"
                  style={{ borderRadius: "0px 16px 0px 0px" }}
                >
                  <span className="eyebrow modal__lab">The brief</span>
                  <p className="modal__desc" style={{ color: "#fff" }}>
                    {project.desc}
                  </p>
                  <div className="kw-row" style={{ marginTop: "12px" }}>
                    {project.keywords.map((k) => (
                      <span
                        key={k}
                        className="kw"
                        style={{
                          borderColor: "rgba(255,255,255,0.5)",
                          color: "#fff",
                        }}
                      >
                        {k}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <button
              className="modal__bottom-btn"
              style={{ background: project.bg }}
            >
              Overview
            </button>
          </div>

          {/* Services */}
          <div
            className="modal__btn-wrap"
            onMouseEnter={() => { if (!isTrueMobile) setActivePanel("services"); }}
            onMouseLeave={() => { if (!isTrueMobile) setActivePanel(null); }}
            onClick={() => togglePanel("services")}
          >
            {activePanel === "services" && (
              <div className="modal__btn-panel" style={{ left: isMobile ? "-45dvw" : "auto" }}>
                <span className="eyebrow modal__lab">We worked on the</span>
                <ul className="svc-list">
                  {project.services.map((s) => (
                    <li key={s} style={{ "--accent": project.accent }}>
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <button
              className="modal__bottom-btn"
              style={{ background: project.bg }}
            >
              Services
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function Proyectos() {
  var audio = new Audio(`${process.env.PUBLIC_URL}/assets/audio/sound2.mp3`);
  const projects = CNP_PROJECTS;
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
      {/* background watermark headline */}

      <SplitText
        tag="h1"
        text=" 
            Awakening Human Potential through culture, creativity and tech."
        className=" horizon reveal"
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
          fontSize: window.innerWidth < 600 ? "22px" : "60px",
          maxWidth: "1200px",
          width: window.innerWidth < 600 ? "85%" : "70%",
          position: "absolute",
          left: "50%",
          transform: "translateX(-50%)",
          textAlign: "center",
          zIndex: 0,
          pointerEvents: "none",
          top: window.innerWidth < 600 ? "22.5vh" : "auto"
        }}
      />

      <div className="wrap proy__inner">
        <div className="proy__topbar">
          <span className="eyebrow">Collabs</span>
          <span className="eyebrow ">
            {String(index + 1).padStart(2, "0")} /{" "}
            {String(projects.length).padStart(2, "0")}
          </span>
        </div>


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
              style={{ borderColor: "#000000", color: "#000000" }}
            >
              <Icon name="arrow-left" />
            </button>
            <button
              className="proy__arrow proy__arrow--r"
              onClick={() => {
                go(1);
                audio.volume = 0.2;
                audio.play();
              }}
              aria-label="Siguiente"
              style={{ borderColor: "#000000", color: "#000000" }}
            >
              <Icon name="arrow-right" />
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
              <Icon name="arrow-left" />
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
              <Icon name="arrow-right" style={{}} />
            </button>
          </>
        )}
        <div className="proy__stage">
          <div
            key={active.id}
            className={`proy__card ${dir > 0 ? "in-right" : "in-left"}`}
          >
            <img
              className="proy__art__logo"
              style={{ height: "70px" }}
              src={active.logo}
              alt={active.name}
              draggable="false"
            />

            
            <div className="proy__art">
              <img src={active.img} alt={active.name}  draggable="false" />
            </div>
            <div
              style={{
                position: "relative",
                top: "-12px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "16px",
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
