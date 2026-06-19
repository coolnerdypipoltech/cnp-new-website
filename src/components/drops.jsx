// ── DROPS — editorial merch statement with interactive gallery ────
import React, { useState, useEffect } from 'react'; 

// The left side is a horizontal gallery. Each object (and the cap) is a
// distinct gallery image; clicking an object scrolls the strip to it,
// with the neighbouring image peeking in from the left.
const DROP_ITEMS = [
  { id: "bolsa",    kind: "video", src: `${process.env.PUBLIC_URL}/assets/videos/Vid_Bolsa.mp4`,   pill: "DROP",    label: "Bolsa",                  },
  { id: "phone",    kind: "obj",   img: `${process.env.PUBLIC_URL}/assets/merch/merch2.png`,     pill: "PHONE",   label: "Calling Creative Minds", },
  { id: "cookie",   kind: "obj",   img: `${process.env.PUBLIC_URL}/assets/merch/merch3.png`,    pill: "COOKIE",  label: "Open for Insight",        },
  { id: "cassette", kind: "obj",   img: `${process.env.PUBLIC_URL}/assets/merch/merch2.png`,  pill: "REWIND",  label: "Be Kind Rewind",         },
  { id: "8ball",    kind: "obj",   img: `${process.env.PUBLIC_URL}/assets/merch/merch3.png`,     pill: "8 BALL",  label: "Confía en tu instinto",   },
  { id: "bolsa",    kind: "video", src: `${process.env.PUBLIC_URL}/assets/videos/Vid_Bolsa.mp4`,   pill: "DROP",    label: "Bolsa",                   },
  
];

function Drops() {
  const items = DROP_ITEMS;
  const n = items.length;
  const [active, setActive] = useState(0);
  const [vw, setVw] = useState(typeof window !== "undefined" ? window.innerWidth : 1280);
  const go = (i) => setActive(((i % n) + n) % n);

  useEffect(() => {
    const on = () => setVw(window.innerWidth);
    window.addEventListener("resize", on);
    return () => window.removeEventListener("resize", on);
  }, []);

  // geometry (all px, computed here so the transform is plain inline CSS)
  const mobile = vw <= 1000;
  const fw = mobile ? Math.min(Math.round(vw * 0.87), 336) : Math.max(291, Math.min(465, Math.round(vw * 0.378)));
  const gap = 16;
  const peek = mobile ? 28 : Math.max(46, Math.min(86, Math.round(vw * 0.06)));
  const h = Math.round(fw * 1.324);

  // prepend a clone of the LAST item so there is always something peeking
  // on the left (wrap-around). Track index of the active item is active+1.
  const track = [items[n - 1], ...items];
  const t = active + 1;
  const x = peek - t * (fw + gap);

  return (
    <section className="section drops" id="drops" data-screen-label="Drops">
      <div className="drops__block">
        {/* left — interactive gallery */}
        <div className="drops__media">
          <div className="drops__gallery" style={{ width: fw + peek, height: h }}>
            <div className="drops__track" style={{ gap, transform: `translateX(${x}px)` }}>
              {track.map((it, idx) => {
                const isActive = idx === t;
                return (
                  <button
                    key={idx}
                    className={`drops__frame ${it.kind === "photo" ? "is-photo" : "is-obj"} ${isActive ? "is-active" : ""}`}
                    style={{ flexBasis: fw, width: fw, background: it.kind === "obj" ? it.panel : undefined }}
                    onClick={() => (isActive ? go(active + 1) : go(idx - 1))}
                    aria-label={isActive ? "Siguiente" : it.label}
                  >
                    {it.kind === "video"
                      ? <video src={it.src} autoPlay loop muted playsInline style={{ width: "100%", height: "100%", objectFit: "cover"}} />
                      : <img src={it.img} alt={it.label} draggable="false" />}
                    <span className="drops__pill horizon" style={{ bottom: it.kind === "video" ? "25px" : "20px" }}>{it.pill}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* right — statement */}
        <div className="drops__copy">
          <h2 className="horizon drops__head reveal">
            Human First.<br/>
            <span className="drops__acid">Tech as Tool.</span><br/>
            Culture as<br/>Signal.
          </h2>
          <p className="drops__sub">This isn't merch.<br/>It's an extension of the brand.</p>
          <div className="drops__objects">
            {items.slice(0).map((o, i) => {
              const idx = i ;
              return (
                <button
                  key={o.id}
                  className={`drops__obj ${active === idx ? "is-active" : ""}`}
                  style={{ "--d": i * 90 + "ms", background: o.panel }}
                  onClick={() => go(idx)}
                  aria-label={o.label}
                  aria-pressed={active === idx}
                >
                  {o.kind === "video"
                    ? <video src={o.src} muted loop playsInline style={{ width: "100%", height: "100%", objectFit: "cover", pointerEvents: "none", borderRadius: "12px" }} />
                    : <img src={o.img} alt={o.label} draggable="false" />}
                  <figcaption>{o.label}</figcaption>
                </button>
              );
              
            })}
          </div>
        </div>
      </div>
      
    </section>
  );
}

export default Drops;

