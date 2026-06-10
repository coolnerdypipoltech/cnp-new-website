// ── SERVICES — centred phrase with objects orbiting around it ─────
import React, { useState, useEffect, useRef } from 'react';

// objects on the outer ring (the section's retro-tech objects)
const ORBIT_OBJECTS = [
  { img: "assets/svc-1.png", label: "Idea Machine" },
  { img: "assets/svc-2.png", label: "Be Kind Rewind" },
  { img: "assets/btn-contacto.png", label: "Viper Pager" },
  { img: "assets/btn-game.png", label: "CNP Pet" },
  { img: "assets/proj-brand.png", label: "Barrios Latinos" },
];
// small signal-stars on the inner ring
const ORBIT_STARS = ["assets/cursor-acid.png", "assets/cursor-magenta.png", "assets/cursor-sky.png", "assets/cursor-green.png"];

function useOrbitRadius() {
  const [r, setR] = useState(() => {
    const w = typeof window !== "undefined" ? window.innerWidth : 1200;
    return Math.max(160, Math.min(360, w * 0.33));
  });
  useEffect(() => {
    const on = () => setR(Math.max(160, Math.min(360, window.innerWidth * 0.33)));
    on();
    window.addEventListener("resize", on);
    return () => window.removeEventListener("resize", on);
  }, []);
  return r;
}

function Orbit() {
  const outerRef = useRef(null);
  const innerRef = useRef(null);
  const rot = useRef({ o: 0, i: 0, paused: false });
  const R1 = useOrbitRadius();
  const R2 = R1 * 0.6;

  useEffect(() => {
    let raf;
    const tick = () => {
      const s = rot.current;
      if (!s.paused) { s.o += 0.07; }
      s.i -= 0.12;
      if (outerRef.current) {
        outerRef.current.style.transform = `rotate(${s.o}deg)`;
        outerRef.current.style.setProperty("--cr", (-s.o) + "deg");
      }
      if (innerRef.current) {
        innerRef.current.style.transform = `rotate(${s.i}deg)`;
        innerRef.current.style.setProperty("--cr", (-s.i) + "deg");
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div className="orbit" style={{ width: R1 * 2, height: R1 * 2 }}>
      {/* inner ring of signal stars */}
      <div className="orbit__ring orbit__ring--inner" ref={innerRef} style={{ width: R2 * 2, height: R2 * 2, marginLeft: -R2, marginTop: -R2 }}>
        {ORBIT_STARS.map((src, i) => {
          const a = (i / ORBIT_STARS.length) * 2 * Math.PI;
          return (
            <span key={i} className="orbit__star" style={{
              transform: `translate(-50%,-50%) translate(${R2 * Math.cos(a)}px, ${R2 * Math.sin(a)}px)` }}>
              <img className="orbit__star-rot" src={src} alt="" />
            </span>
          );
        })}
      </div>
      {/* outer ring of objects */}
      <div className="orbit__ring orbit__ring--outer" ref={outerRef} style={{ width: R1 * 2, height: R1 * 2, marginLeft: -R1, marginTop: -R1 }}>
        {ORBIT_OBJECTS.map((o, i) => {
          const a = (i / ORBIT_OBJECTS.length) * 2 * Math.PI - Math.PI / 2;
          return (
            <div key={i} className="orbit__obj" style={{
              transform: `translate(-50%,-50%) translate(${R1 * Math.cos(a)}px, ${R1 * Math.sin(a)}px)` }}
              onMouseEnter={() => { rot.current.paused = true; }}
              onMouseLeave={() => { rot.current.paused = false; }}>
              <div className="orbit__obj-up">
                <img src={o.img} alt={o.label} draggable="false" />
                <span className="orbit__label">{o.label}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function Services() {
  return (
    <section className="section services" id="services" data-screen-label="Services">
      <div className="services__stage">
        <Orbit />
        <div className="services__center">
          <span className="eyebrow services__eyebrow">The Spark — Daily Creative Fuel</span>
          <h2 className="horizon services__head reveal">Get<br/>Today's<br/>Creative<br/>Spark</h2>
          <span className="services__caption">A daily oracle of curated ideas, spinning around you.</span>
        </div>
      </div>
    </section>
  );
}

export default Services;
