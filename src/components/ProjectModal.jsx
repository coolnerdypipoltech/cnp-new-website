// ── Inline SVG icons (React-safe; no DOM mutation) ────────────────
import React, { useRef, useState, useCallback, useEffect } from "react";
import { useViewport } from "../context/ViewportContext";
import { useVimeo } from "../context/VimeoContext";
let vimeoPlayerApiPromise = null;

function loadVimeoPlayerApi() {
  if (typeof window === "undefined") return Promise.reject(new Error("No window"));
  if (window.Vimeo?.Player) return Promise.resolve(window.Vimeo.Player);
  if (!vimeoPlayerApiPromise) {
    vimeoPlayerApiPromise = new Promise((resolve, reject) => {
      const existingScript = document.querySelector(
        'script[src="https://player.vimeo.com/api/player.js"]',
      );

      if (existingScript) {
        existingScript.addEventListener("load", () => resolve(window.Vimeo.Player), {
          once: true,
        });
        existingScript.addEventListener("error", reject, { once: true });
        return;
      }

      const script = document.createElement("script");
      script.src = "https://player.vimeo.com/api/player.js";
      script.async = true;
      script.onload = () => resolve(window.Vimeo.Player);
      script.onerror = reject;
      document.body.appendChild(script);
    });
  }

  return vimeoPlayerApiPromise;
}

function buildVimeoSrc(src) {
  try {
    const url = new URL(src);
    url.searchParams.set("controls", "0");
    url.searchParams.set("title", "0");
    url.searchParams.set("byline", "0");
    url.searchParams.set("portrait", "0");
    url.searchParams.set("dnt", "1");
    url.searchParams.set("playsinline", "1");
    return url.toString();
  } catch {
    return src;
  }
}

function VideoPlayer({
  src,
  title,
  onPlayingChange,
  coverSrc,
  showCover,
  fullModal,
}) {
  const videoRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [coverVisible, setCoverVisible] = useState(true);

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
    updatePlaying(false);
  }, [showCover, src, updatePlaying]);

  const togglePlay = (e) => {
    // If the click comes from the native <video>, let browser controls handle it.
    if (e?.target instanceof HTMLVideoElement) return;

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
    if (isTrueMobile) {
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
      onMouseEnter={() => {
        if (!isTrueMobile) setHovered(true);
      }}
      onMouseLeave={() => {
        if (!isTrueMobile) setHovered(false);
      }}
    >
      <video
        ref={videoRef}
        style={{ height: "82vh", objectFit: fullModal ? "cover" : "contain" }}
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
              objectFit: fullModal ? "cover" : "contain",
            }}
            loading="lazy"
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

function VimeoPlayer({ src, title, onPlayingChange, id, fullModal }) {
  const iframeRef = useRef(null);
  const playerRef = useRef(null);
  const containerRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [ready, setReady] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isIPhone, setIsIPhone] = useState(false);
  const { setIsFullscreenVimeo } = useVimeo();
  useEffect(() => {
    if (typeof navigator === "undefined") return;
    const ua = navigator.userAgent || "";
    setIsIPhone(true);
  }, []);

  useEffect(() => {
    let cancelled = false;
    let player = null;

    setPlaying(false);
    setMuted(false);
    setDuration(0);
    setCurrentTime(0);
    setReady(false);
    setIsFullscreen(false);
    onPlayingChange?.(false);

    loadVimeoPlayerApi()
      .then((Player) => {
        if (cancelled || !iframeRef.current) return;

        player = new Player(iframeRef.current);
        playerRef.current = player;

        player.on("play", () => {
          setPlaying(true);
          onPlayingChange?.(true);
        });
        player.on("pause", () => {
          setPlaying(false);
          onPlayingChange?.(false);
        });
        player.on("ended", () => {
          setPlaying(false);
          onPlayingChange?.(false);
          setCurrentTime(0);
        });
        player.on("timeupdate", (data) => {
          setCurrentTime(data.seconds || 0);
          if (data.duration) setDuration(data.duration);
        });
        player.on("volumechange", (data) => {
          setMuted(Boolean(data?.muted));
        });

        return Promise.all([
          player.getMuted(),
          player.getDuration().catch(() => 0),
          player.getCurrentTime().catch(() => 0),
        ]).then(([isMuted, totalDuration, seconds]) => {
          if (cancelled) return;
          setMuted(Boolean(isMuted));
          setDuration(totalDuration || 0);
          setCurrentTime(seconds || 0);
          setReady(true);
        });
      })
      .catch(() => {
        if (!cancelled) setReady(true);
      });

    return () => {
      cancelled = true;
      if (playerRef.current) {
        playerRef.current.destroy?.();
        playerRef.current = null;
      }
    };
  }, [onPlayingChange, src]);

  useEffect(() => {
    const onFullscreenChange = () => {
      const activeElement =
        document.fullscreenElement || document.webkitFullscreenElement;
      setIsFullscreen(activeElement === containerRef.current);
    };

    document.addEventListener("fullscreenchange", onFullscreenChange);
    document.addEventListener("webkitfullscreenchange", onFullscreenChange);
    return () => {
      document.removeEventListener("fullscreenchange", onFullscreenChange);
      document.removeEventListener("webkitfullscreenchange", onFullscreenChange);
    };
  }, []);



  useEffect(() => {
    if(isIPhone){
      setIsFullscreenVimeo(isFullscreen);
    }
    const modalElement = containerRef.current?.closest(".modal--h");
    const modalElement2 = containerRef.current?.closest(".modal-container");
    const modalElement3 = containerRef.current?.closest(".modal-container2");
    const elements = [modalElement, modalElement2, modalElement3].filter(Boolean);
    if (elements.length === 0) return;

    if (isIPhone && isFullscreen) {
      elements.forEach((el) => el.classList.add("modal--h--iphone-fullscreen"));
    } else {
      elements.forEach((el) => el.classList.remove("modal--h--iphone-fullscreen"));
    }

    return () => {
      elements.forEach((el) => el.classList.remove("modal--h--iphone-fullscreen"));
    };
  }, [isIPhone, isFullscreen]);

  useEffect(() => {
    if (!(isIPhone && isFullscreen)) return;

    const html = document.documentElement;
    const body = document.body;

    const previousHtmlOverflow = html.style.overflow;
    const previousHtmlTouchAction = html.style.touchAction;
    const previousHtmlOverscroll = html.style.overscrollBehavior;

    const previousBodyOverflow = body.style.overflow;
    const previousBodyTouchAction = body.style.touchAction;
    const previousBodyOverscroll = body.style.overscrollBehavior;

    html.style.overflow = "hidden";
    html.style.touchAction = "none";
    html.style.overscrollBehavior = "none";

    body.style.overflow = "hidden";
    body.style.touchAction = "none";
    body.style.overscrollBehavior = "none";

    return () => {
      html.style.overflow = previousHtmlOverflow;
      html.style.touchAction = previousHtmlTouchAction;
      html.style.overscrollBehavior = previousHtmlOverscroll;

      body.style.overflow = previousBodyOverflow;
      body.style.touchAction = previousBodyTouchAction;
      body.style.overscrollBehavior = previousBodyOverscroll;
    };
  }, [isIPhone, isFullscreen]);

  const togglePlay = useCallback(() => {
    const player = playerRef.current;
    if (!player) return;
    if (playing) {
      player.pause().catch(() => {});
    } else {
      player.play().catch(() => {});
    }
  }, [playing]);

  const toggleMute = useCallback(() => {
    const player = playerRef.current;
    if (!player) return;
    player.setMuted(!muted).catch(() => {});
    setMuted((prev) => !prev);
  }, [muted]);

  const handleSeek = useCallback(
    (e) => {
      const nextTime = Number(e.target.value);
      const player = playerRef.current;
      setCurrentTime(nextTime);
      if (!player) return;
      player.setCurrentTime(nextTime).catch(() => {});
    },
    [],
  );

  const toggleFullscreen = useCallback(() => {
    if (isIPhone) {
      setIsFullscreen((prev) => !prev);
      return;
    }

    const element = containerRef.current;
    if (!element) return;

    const activeElement = document.fullscreenElement || document.webkitFullscreenElement;
    if (activeElement === element) {
      if (document.exitFullscreen) {
        document.exitFullscreen().catch(() => {});
      } else {
        document.webkitExitFullscreen?.();
      }
    } else if (element.requestFullscreen) {
      element.requestFullscreen().catch(() => {});
    } else {
      element.webkitRequestFullscreen?.();
    }
  }, [isIPhone]);

  const progress = duration > 0 ? Math.min(100, (currentTime / duration) * 100) : 0;

  return (
    <div className="modal__bg-video">
      <div
        ref={containerRef}
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          overflow: "hidden",
        }}
      >
        <iframe
        
          ref={iframeRef}
          src={buildVimeoSrc(src)}
          frameBorder="0"
          allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          title={title}
          allowFullScreen
          style={{ width: "100%", height:   !fullModal ? "56.25vw" : "100%", minHeight:  !fullModal  ? "0%" : "auto", border: 0, display: "block" }}
        />

        <button
          type="button"
          className="vp-center"
          onClick={togglePlay}

          style={{
            position: "absolute",
            left: "50%",
            top: "47.5%",
            transform: "translate(-50%, -50%)",
            width: "100%",
            height: "92.5%",
            border: "none",
            borderRadius: "999px",
            background: "transparent",
            color: "#fff",
            display: "grid",
            placeItems: "center",
            cursor: "pointer",
            zIndex: 9,
          }}
        >

        </button>

        <div
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            bottom: id === "cnp" ? "0px" : isFullscreen ? "0px" : "60px",
            top: "auto",
            display: "flex",
            alignItems: "center",
            gap: "10px",
            padding: "10px 12px",
            background:
              "linear-gradient(to top, rgba(0,0,0,0.78) 0%, rgba(0,0,0,0.64) 45%, rgba(0,0,0,0) 100%)",
            color: "#ffffff",
            zIndex: 12,
            pointerEvents: "auto",
            
          }}
        >
        <button
          type="button"
          onClick={togglePlay}
          aria-label={playing ? "Pausa" : "Play"}
          style={{
            width: "32px",
            height: "32px",
            borderRadius: "999px",
            border: "1px solid rgba(255,255,255,0.28)",
            background: "rgba(255,255,255,0.12)",
            color: "#fff",
            display: "grid",
            placeItems: "center",
            cursor: "pointer",
            flex: "0 0 auto",
            
            
          }}
        >
          <div style={{position: "relative", top:  playing ? "-1px" : "-8px", fontSize: playing ? "24px" : "32px"}}>{playing ? "II" : "▶"}</div>
        </button>

        <input
          type="range"
          min="0"
          max={duration || 0}
          step="0.1"
          value={currentTime}
          onChange={handleSeek}
          aria-label="Progreso"
          style={{
            flex: "1 1 auto",
            accentColor: "#fff",
            cursor: "pointer",
            height: "4px",
            borderRadius: "999px",
            background: `linear-gradient(to right, #fff 0%, #fff ${progress}%, rgba(255,255,255,0.28) ${progress}%, rgba(255,255,255,0.28) 100%)`,
          }}
        />

        <button
          type="button"
          onClick={toggleMute}
          aria-label={muted ? "Activar sonido" : "Silenciar"}
          style={{
            minWidth: "32px",
            height: "32px",
            borderRadius: "999px",
            border: "1px solid rgba(255,255,255,0.28)",
            background: "rgba(255,255,255,0.12)",
            color: "#fff",
            cursor: "pointer",
            flex: "0 0 auto",
            fontSize: "12px",
          }}
        >
          <img
            src={!muted ? `${process.env.PUBLIC_URL}/assets/icons/volume_icon.svg` : `${process.env.PUBLIC_URL}/assets/icons/volume_off.svg`}
            alt={!muted ? "Muted" : "Unmuted"}
          />
        </button>

        <button
          type="button"
          onClick={toggleFullscreen}
          aria-label={isFullscreen ? "Salir de pantalla completa" : "Pantalla completa"}
          style={{
            minWidth: "32px",
            height: "32px",
            borderRadius: "999px",
            border: "1px solid rgba(255,255,255,0.28)",
            background: "rgba(255,255,255,0.12)",
            color: "#fff",
            cursor: "pointer",
            flex: "0 0 auto",
            fontSize: "12px",
          }}
        >
          <img
            src={!isFullscreen ? `${process.env.PUBLIC_URL}/assets/icons/fullscreen_icon.svg` : `${process.env.PUBLIC_URL}/assets/icons/fullscreen_exit.svg`}
            alt={!isFullscreen ? "Enter Fullscreen" : "Exit Fullscreen"}
          />
        </button>
        </div>

        {!ready && (
          <div
            style={{
              position: "absolute",
              inset: 0,
              display: "grid",
              placeItems: "center",
              color: "#fff",
              background: "rgba(0,0,0,0.12)",
              zIndex: 8,
              pointerEvents: "none",
            }}
          >
            Loading
          </div>
        )}
      </div>
    </div>
  );
}

function ProjectModal({ project, onClose }) {
  const [activePanel, setActivePanel] = useState(null);
  const [closing, setClosing] = useState(false);
  const [videoPlaying, setVideoPlaying] = useState(false);
  const [videoIndex, setVideoIndex] = useState(0);
  const { isMobile, isTrueMobile } = useViewport();
  const { isFullscreenVimeo } = useVimeo();
  const vimeoSources =
    isMobile && project?.vimeoMobile?.length
      ? project.vimeoMobile
      : project?.vimeoDesktop;
  const hasVimeoSource =
    Array.isArray(vimeoSources) &&
    typeof vimeoSources[0] === "string" &&
    vimeoSources[0].trim() !== "";
  const videoSources = hasVimeoSource
    ? vimeoSources
    : isMobile && project?.videoMobil?.length
      ? project.videoMobil
      : project?.video;
  const mediaCount = videoSources?.length ?? 0;

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

  useEffect(() => {
    if (hasVimeoSource) setVideoPlaying(false);
  }, [hasVimeoSource, videoIndex]);

  if (!project) return null;

  const playerButtonsZIndex = activePanel ? 0 : 200;

  const togglePanel = (panel) => {
    if (activePanel === panel) {
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
          {mediaCount > 1 && (
            <>
              <button
                className="player__buttons "
                style={{
                  background: "#00000050",
                  width: "50px",
                  left: "3vw",
                  zIndex: playerButtonsZIndex,
                }}
                onClick={(e) => {
                  setVideoIndex(
                    (prev) =>
                      (prev - 1 + mediaCount) % mediaCount,
                  );
                }}
              >
                <img
                  src={`${process.env.PUBLIC_URL}/assets/icons/arrow_back_white.svg`}
                  alt="Anterior"
                  style={{ width: "32px", height: "32px" }}
                  loading="lazy"
                />
              </button>
              <button
                className="player__buttons"
                style={{
                  background: "#00000050",
                  width: "50px",
                  right: "3vw",
                  zIndex: playerButtonsZIndex,
                }}
                onClick={(e) => {
                  setVideoIndex((prev) => (prev + 1) % mediaCount);
                }}
              >
                <img
                  src={`${process.env.PUBLIC_URL}/assets/icons/arrow_back_white.svg`}
                  alt="Siguiente"
                  style={{ width: "32px", height: "32px", scale: "-1" }}
                  loading="lazy"
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
          height: project.id === "cnp" && "82dvh",
        }}
      >
        {/* Background video fills entire modal */}
        <div key={project.id} style={{ position: "relative", width: "100%", height: "100%" }} className="modal-container">
          {hasVimeoSource ? (
            <div style={{ position: "relative", width: "100%", height: "100%", display: "flex", justifyContent: "center", alignItems: "center"  }} className="modal-container2">
            {
              project.cover[videoIndex] === "" ? (<img
              loading="lazy"
              src={videoSources[videoIndex]}
              alt={project.name}
              style={{
                width: "100%",
                height: "100%",
                objectFit: isMobile
                  ? project.videoFill[videoIndex]
                    ? "contain"
                    : "contain"
                  : "contain",
              }}
            />) : (<VimeoPlayer
              key={`${project.id}-${isMobile ? "mobile" : "desktop"}-${videoIndex}`}
              src={videoSources[videoIndex]}
              title={`${project.name} Vimeo ${videoIndex + 1}`}
              onPlayingChange={setVideoPlaying}
              id={project.id}
              fullModal={project.vimeoFill[videoIndex]}
            />)
            }
            </div>
          ) : project.cover[videoIndex] !== "" ? (
            <VideoPlayer
              key={videoIndex}
              src={videoSources[videoIndex]}
              title={project.name}
              onPlayingChange={setVideoPlaying}
              coverSrc={
                isMobile
                  ? project.cover[videoIndex]
                  : project.deskCover[videoIndex]
              }
              showCover={isMobile}
              fullModal={project.videoFill[videoIndex]}
            />
          ) : (
            <img
              loading="lazy"
              src={videoSources[videoIndex]}
              alt={project.name}
              style={{
                width: "100%",
                height: "100%",
                objectFit: isMobile
                  ? project.videoFill[videoIndex]
                    ? "cover"
                    : "contain"
                  : "cover",
              }}
            />
          )}
        </div>

        {/* Title overlay — top */}
        <div
          className="modal__title-overlay"
          style={{
            opacity: videoPlaying ? 0 : 1,
            transition: "opacity 400ms ease",
          }}
        >
          <span className="eyebrow">{project.year}</span>
          <h2 className="horizon modal__title">{project.name}</h2>
          <span className="modal__client">{project.videoTitle}</span>
        </div>

        {/* Bottom buttons */}
        {!isFullscreenVimeo && project.id !== "cnp" && (
          <div className="modal__btns">
            {/* El Brief */}
            <div
              className="modal__btn-wrap"
              onMouseEnter={() => {
                if (!isTrueMobile) setActivePanel("brief");
              }}
              onMouseLeave={() => {
                if (!isTrueMobile) setActivePanel(null);
              }}
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
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div
                      style={{
                        height: "0px",
                        width: "0px",
                        position: "relative",
                        top: "-10px",
                        left: "90%",
                      }}
                    >
                      <button
                        className="modal__close "
                        style={{
                          background: "#00000050",
                          width: "30px",
                          height: "30px",
                          position: "relative",
                          left: "-20px",
                          top: "0px",
                          color: "white",
                          border: "white 1px solid",
                          fontFamily: "var(--font-body)",
                          fontWeight: 700,
                          fontSize: "15px",
                          letterSpacing: "0.0em",
                          textTransform: "uppercase",
                        }}
                        onClick={() => setActivePanel(null)}
                      >
                        <img style={{position: "relative", left: "-0.5px"}} src={`${process.env.PUBLIC_URL}/assets/icons/close_24dp.svg`} alt="Close" />
                      </button>
                    </div>
                    <span className="eyebrow modal__lab">Our work</span>
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
              onMouseEnter={() => {
                if (!isTrueMobile) setActivePanel("services");
              }}
              onMouseLeave={() => {
                if (!isTrueMobile) setActivePanel(null);
              }}
              onClick={() => togglePanel("services")}
            >
              {activePanel === "services" && (
                <div
                  className="modal__btn-panel"
                  style={{ left: isMobile ? "-45dvw" : "auto" }}
                  onClick={(e) => e.stopPropagation()}
                >
                                      <div
                      style={{
                        height: "0px",
                        width: "0px",
                        position: "relative",
                        top: "-10px",
                        left: "90%",
                      }}
                    >
                      <button
                        className="modal__close "
                        style={{
                          background: "#00000050",
                          width: "30px",
                          height: "30px",
                          position: "relative",
                          left: "-0px",
                          top: "0px",
                          color: "white",
                          border: "white 1px solid",
                          fontFamily: "var(--font-body)",
                          fontWeight: 700,
                          fontSize: "15px",
                          letterSpacing: "0.0em",
                          textTransform: "uppercase",
                        }}
                        onClick={() => setActivePanel(null)}
                      >
                        <img style={{position: "relative"}} src={`${process.env.PUBLIC_URL}/assets/icons/close_24dp.svg`} alt="Close" />
                     
                      </button>
                    </div>
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
        )}
      </div>
    </div>
  );
}

export default ProjectModal;
