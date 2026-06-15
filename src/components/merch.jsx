// ── MERCH — category browser (OFLYN-style) ────────────────────────
import React, { useState, useRef, useEffect } from 'react';
import { CNP_MERCH } from '../data';

function Merch() {
  const items = CNP_MERCH;
  const [active, setActive] = useState(0);
  const hoverLock = useRef(false);
  const it = items[active];

  // gentle auto-advance unless the user is interacting
  useEffect(() => {
    const id = setInterval(() => { if (!hoverLock.current) setActive((a) => (a + 1) % items.length); }, 3800);
    return () => clearInterval(id);
  }, [items.length]);

  return (
    <section className="section merch" id="merch" data-screen-label="Merch">
      <div className="wrap merch__grid">
        <div className="merch__left">
          <span className="eyebrow">The Drop — Merch Collection</span>
          <h2 className="horizon merch__title reveal">Human First.<br/>Tech as Tool.<br/>Culture as Signal.</h2>
          <button className="merch__shopall">Shop the full drop <span aria-hidden="true">→</span></button>

          <div className="merch__cats" onMouseEnter={() => (hoverLock.current = true)} onMouseLeave={() => (hoverLock.current = false)}>
            {items.map((m, i) => (
              <button
                key={m.id}
                className={`merch__cat ${i === active ? "is-active" : ""}`}
                onMouseEnter={() => setActive(i)}
                onClick={() => setActive(i)}
              >
                <span className="merch__cat-thumb" style={{ background: m.color }}>
                  {m.typeOnly
                    ? <img src={`${process.env.PUBLIC_URL}/assets/cursor-black.png`} alt="" />
                    : <img className="merch__cat-photo" src={m.img} alt={m.name} />}
                </span>
                <span className="merch__cat-name horizon">{m.name}</span>
                <span className="merch__cat-price">{m.price}</span>
                <span className="merch__cat-arrow" aria-hidden="true">→</span>
              </button>
            ))}
          </div>
        </div>

        <div className="merch__preview">
          <div className="merch__media" key={it.id} style={{ background: it.color }}>
            {it.typeOnly ? (
              <div className="merch__slab" style={{ color: it.id === "tee" ? "#191919" : "#fff" }}>
                <img className="merch__slab-star twinkle" src={`${process.env.PUBLIC_URL}/assets/cursor-black.png`} alt="" />
                <h3 className="horizon merch__slab-name">{it.name}</h3>
                <p className="merch__slab-sub">{it.sub}</p>
              </div>
            ) : (
              <img className="merch__photo" src={it.img} alt={it.name} />
            )}
            {/* tag overlay — text ALWAYS present */}
            <div className="merch__tagbar">
              <span className="merch__tag-drop">{it.drop}</span>
              <span className="merch__tag-row"><span className="horizon">{it.name}</span><span className="merch__tag-price">{it.price}</span></span>
            </div>
          </div>
          <div className="merch__counter horizon">{String(active + 1).padStart(2, "0")} <span>/ {String(items.length).padStart(2, "0")}</span></div>
        </div>
      </div>

      <div className="merch__marquee" aria-hidden="true">
        <div className="merch__marquee-track">
          {Array.from({ length: 2 }).map((_, k) => (
            <span key={k}>THE BEST IDEAS DON’T INTERRUPT CULTURE. THEY JOIN IT — IN A WORLD OF INFINITE GENERATION, TASTE BECOMES POWER — TECHNOLOGY SHOULD FEEL HUMAN —</span>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Merch;
