// ── PROYECTOS (slider) + PopUp ────────────────────────────────────
import React, { useState, useEffect, useRef, useCallback } from 'react';
import Icon from './icons';
import { CNP_PROJECTS } from '../data';


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
  useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", onKey); document.body.style.overflow = ""; };
  }, [onClose]);

  if (!project) return null;
  return (
    <div className="modal-backdrop" onMouseDown={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="modal" style={{ "--p-bg": project.bg, "--p-fg": project.fg, "--p-accent": project.accent }}>
        <button className="modal__close" onClick={onClose} aria-label="Cerrar">
          <Icon name="x" size={22} />
        </button>

        <div className="modal__head" style={{ background: project.bg, color: project.fg }}>
          <span className="eyebrow" style={{ color: project.fg }}>{project.tag} — {project.year}</span>
          <h2 className="horizon modal__title">{project.name}</h2>
          <span className="modal__client">{project.client}</span>
          <PaletteDots project={project} />
        </div>

        <div className="modal__body">
          <div className="modal__video">
            <iframe
              src={project.video}
              title={project.name}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>

          <div className="modal__meta">
            <div className="modal__block">
              <span className="eyebrow modal__lab">We worked on the</span>
              <ul className="svc-list">
                {project.services.map((s) => (
                  <li key={s} style={{ "--accent": project.accent }}>{s}</li>
                ))}
              </ul>
            </div>

            <div className="modal__block">
              <span className="eyebrow modal__lab">Keywords</span>
              <div className="kw-row">
                {project.keywords.map((k) => (
                  <span key={k} className="kw" style={{ borderColor: project.fg, color: project.fg }}>{k}</span>
                ))}
              </div>
            </div>

            <div className="modal__block">
              <span className="eyebrow modal__lab">The brief</span>
              <p className="modal__desc">{project.desc}</p>
            </div>
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

  const go = useCallback((d) => {
    setDir(d);
    setIndex((i) => (i + d + projects.length) % projects.length);
  }, [projects.length]);

  return (
    <section
      className="section proyectos"
      id="proyectos"
      data-screen-label="Proyectos"
      style={{ background: active.bg, color: active.fg }}
    >
      {/* background watermark headline */}
      <h2 className="proy__watermark horizon" style={{ color: active.fg }}>
        Awakening Human<br/>Potential through<br/>culture, creativity<br/>and tech.
      </h2>

      <div className="wrap proy__inner">
        <div className="proy__topbar">
          <span className="eyebrow">The Work — Curated Drops</span>
          <span className="proy__count horizon">{String(index + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}</span>
        </div>

        <button className="proy__arrow proy__arrow--l" onClick={() => go(-1)} aria-label="Anterior" style={{ borderColor: active.fg, color: active.fg }}>
          <Icon name="arrow-left" />
        </button>
        <button className="proy__arrow proy__arrow--r" onClick={() => go(1)} aria-label="Siguiente" style={{ borderColor: active.fg, color: active.fg }}>
          <Icon name="arrow-right" />
        </button>

        <div className="proy__stage">
          <div key={active.id} className={`proy__card ${dir > 0 ? "in-right" : "in-left"}`}>
            <span className="proy__tag" style={{ background: active.chip, color: active.chipFg }}>{active.tag}</span>
            <h3 className="proy__name horizon" style={{ color: active.fg }}>{active.name}</h3>
            <div className="proy__art">
              <img src={active.img} alt={active.name} draggable="false" />
            </div>
            <span className="proy__client">{active.client} · {active.year}</span>
            <button className="btn-pop" onClick={() => setOpen(true)} style={{ "--btn-bg": active.fg, "--btn-fg": active.bg }}>
              Ver más <Icon name="plus" size={18} />
            </button>
          </div>
        </div>

        <div className="proy__dots">
          {projects.map((p, i) => (
            <button
              key={p.id}
              className={`proy__dot ${i === index ? "is-active" : ""}`}
              onClick={() => { setDir(i > index ? 1 : -1); setIndex(i); }}
              aria-label={p.name}
              style={{ background: i === index ? active.fg : "transparent", borderColor: active.fg }}
            />
          ))}
        </div>
      </div>

      {open && <ProjectModal project={active} onClose={() => setOpen(false)} />}
    </section>
  );
}

export default Proyectos;
