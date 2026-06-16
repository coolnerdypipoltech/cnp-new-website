// ── PROYECTOS (slider) + PopUp ────────────────────────────────────
import React, { useState, useEffect, useRef, useCallback } from "react";
import Icon from "./icons";
import { CNP_PROJECTS } from "../data";
import ScrollFloat from "./ScrollFloat";

function PaletteDots({ project }) {
  const swatches = [project.bg, project.fg, project.accent, project.chipFg];
  return (
    <div className="palette-dots" aria-hidden="true">
      {swatches.map((c, i) => (
        <span key={i} style={{ background: c, borderColor: project.fg }} />
      ))}
    </div>
  );
}

function ProjectModal({ project, onClose }) {
  const [activePanel, setActivePanel] = useState(null);
  const [closing, setClosing] = useState(false);

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

  if (!project) return null;

  const togglePanel = (panel) =>
    setActivePanel((prev) => (prev === panel ? null : panel));

  return (
    <div
      className={`modal-backdrop${closing ? " modal-backdrop--closing" : ""}`}
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) handleClose();
      }}
    >
      {/* Close button — floating outside modal, top right */}
      <button
        className="modal__close modal__close--outside"
        style={{background: project.bg}}
        onClick={handleClose}
        aria-label="Cerrar"
      >
        <p>Cerrar</p>
      </button>

      <div
        className="modal modal--h"
        style={{
          "--p-bg": project.bg,
          "--p-fg": project.fg,
          "--p-accent": project.accent,
        }}
      >
        {/* Background video fills entire modal */}
        <div className="modal__bg-video">
          <iframe
            src={project.video}
            title={project.name}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>

        {/* Title overlay — top */}
        <div className="modal__title-overlay">
          <span className="eyebrow">
            {project.tag} — {project.year}
          </span>
          <h2 className="horizon modal__title">{project.name}</h2>
          <span className="modal__client">{project.client}</span>
        </div>

        {/* Bottom buttons */}
        <div className="modal__btns">
          {/* El Brief */}
          <div
            className={`modal__btn-wrap${activePanel === "brief" ? " is-active" : ""}`}
            onMouseEnter={() => setActivePanel("brief")}
            onMouseLeave={() => setActivePanel(null)}
            onClick={() => togglePanel("brief")}
          >
            <div className="modal__btn-panel">
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
            <button className="modal__bottom-btn" style={{background: project.bg}}>Short description</button>
          </div>

          {/* Servicios */}
          <div
            className={`modal__btn-wrap${activePanel === "services" ? " is-active" : ""}`}
            onMouseEnter={() => setActivePanel("services")}
            onMouseLeave={() => setActivePanel(null)}
            onClick={() => togglePanel("services")}
          >
            <div className="modal__btn-panel">
              <span className="eyebrow modal__lab">We worked on the</span>
              <ul className="svc-list">
                {project.services.map((s) => (
                  <li key={s} style={{ "--accent": project.accent }}>
                    {s}
                  </li>
                ))}
              </ul>
            </div>
            <button className="modal__bottom-btn" style={{background: project.bg}}>Development</button>
          </div>
        </div>
      </div>
    </div>
  );
}

function Proyectos() {
  const projects = CNP_PROJECTS;
  const [index, setIndex] = useState(0);
  const [dir, setDir] = useState(1);
  const [open, setOpen] = useState(false);
  const active = projects[index];

  const go = useCallback(
    (d) => {
      setDir(d);
      setIndex((i) => (i + d + projects.length) % projects.length);
    },
    [projects.length],
  );

  return (
    <section
      className="section proyectos"
      id="proyectos"
      data-screen-label="Proyectos"
      style={{ background: active.bg, color: "#000000" }}
    >
      {/* background watermark headline */}
      <ScrollFloat
        animationDuration={0.5}
        ease="power3.out"
        scrollStart="center bottom+=50%"
        scrollEnd="bottom bottom-=40%"
        stagger={0.09}
        containerClassName="proy__watermark horizon"
      >
        Awakening Human Potential through culture, creativity and tech.
      </ScrollFloat>

      <div className="wrap proy__inner">
        <button
          className="proy__arrow proy__arrow--l"
          onClick={() => go(-1)}
          aria-label="Anterior"
          style={{ borderColor: "#000000", color: "#000000" }}
        >
          <Icon name="arrow-left" />
        </button>
        <button
          className="proy__arrow proy__arrow--r"
          onClick={() => go(1)}
          aria-label="Siguiente"
          style={{ borderColor: "#000000", color: "#000000" }}
        >
          <Icon name="arrow-right" />
        </button>

        <div className="proy__stage">
          <div
            key={active.id}
            className={`proy__card ${dir > 0 ? "in-right" : "in-left"}`}
          >
            <img
              className="proy__art__logo"
              src={active.logo}
              alt={active.name}
              draggable="false"
            />
            <div className="proy__art">
              <img src={active.img} alt={active.name} draggable="false" />
            </div>
            <span className="proy__client">{active.client}</span>
            <button
              className="btn-pop"
              onClick={() => setOpen(true)}
              style={{ "--btn-bg": "#000000", "--btn-fg": active.bg }}
            >
              Ver más
            </button>
          </div>
        </div>
      </div>

      {open && <ProjectModal project={active} onClose={() => setOpen(false)} />}
    </section>
  );
}

export default Proyectos;
