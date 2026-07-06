// ── DROPS — editorial merch statement with interactive gallery ────
import React, { useState, useEffect } from "react";
import { useViewport } from "../context/ViewportContext";
// The left side is a horizontal gallery. Each object (and the cap) is a
// distinct gallery image; clicking an object scrolls the strip to it,
// with the neighbouring image peeking in from the left.
const DROP_ITEMS = [
      {
    id: "Tote2",
    kind: "video",
    img: `${process.env.PUBLIC_URL}/assets/merch/merch4.png`,
    src: `${process.env.PUBLIC_URL}/assets/merch/merch4.mp4`,
    pill: "Archive Tote",
    label: "Archive Tote",
  },
    {
    id: "Tee1",
    kind: "video",
    img: `${process.env.PUBLIC_URL}/assets/merch/merch2.png`,
    src: `${process.env.PUBLIC_URL}/assets/merch/merch2.mp4`,
    pill: "Cool Tee",
    label: "Cool Tee",
  },
    {
    id: "Tee2",
    kind: "video",
    img: `${process.env.PUBLIC_URL}/assets/merch/merch3.png`,
    src: `${process.env.PUBLIC_URL}/assets/merch/merch3.mp4`,
    pill: "Essential Tee",
    label: "Essential Tee",
  },


    {
    id: "Hoodie",
    kind: "video",
    img: `${process.env.PUBLIC_URL}/assets/merch/hoddie.png`,
    src: `${process.env.PUBLIC_URL}/assets/merch/hoddie.mp4`,
    pill: "Build Hoodie",
    label: "Build Hoodie",
  },


  {
    id: "Tote1",
    kind: "obj",
    img: `${process.env.PUBLIC_URL}/assets/merch/merch1.png`,
    pill: "Studio Tote",
    label: "Studio Tote",
  },

    {
    id: "cap1",
    kind: "obj",
    img: `${process.env.PUBLIC_URL}/assets/merch/merch5.png`,
    pill: "Studio Cap",
    label: "Studio Cap",
  },


];

function Drops() {
  const items = DROP_ITEMS;
  const n = items.length;
  const [active, setActive] = useState(0);
  const [vw, setVw] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1280,
  );
  const go = (i) => setActive(((i % n) + n) % n);
  const { isMobile } = useViewport();
  useEffect(() => {
    const on = () => setVw(window.innerWidth);
    window.addEventListener("resize", on);
    return () => window.removeEventListener("resize", on);
  }, []);

  // geometry (all px, computed here so the transform is plain inline CSS)
  const mobile = vw <= 1000;
  const fw = mobile
    ? Math.min(Math.round(vw * 0.87), 336)
    : Math.max(291, Math.min(465, Math.round(vw * 0.378)));
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
        {isMobile && (
          <>

            <h2 className="horizon drops__head reveal">
              Human First.
              <br />
              <span className="drops__acid">Tech as Tool.</span>
              <br />
              Culture as Signal.

               
            </h2>
            
          </>
        )}
        {/* left — interactive gallery */}
        <div className="drops__media">
          <div
            className="drops__gallery"
            style={{ width: fw + peek, height: h }}
          >
            <div
              className="drops__track"
              style={{ gap, transform: `translateX(${x}px)` }}
            >
              {track.map((it, idx) => {
                const isActive = idx === t;
                return (
                  <button
                    key={idx}
                    className={`drops__frame ${it.kind === "photo" ? "is-photo" : "is-obj"} ${isActive ? "is-active" : ""}`}
                    style={{
                      flexBasis: fw,
                      width: fw,
                      background: it.kind === "obj" ? it.panel : undefined,
                    }}
                    onClick={() => (isActive ? go(active + 1) : go(idx - 1))}
                    aria-label={isActive ? "Siguiente" : it.label}
                  >
                    {it.kind === "video" ? (
                      <video
                        src={it.src}
                        autoPlay
                        loop
                        muted
                        playsInline
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                      />
                    ) : (
                      <img src={it.img} alt={it.label} draggable="false" />
                    )}
                    <span
                      className="drops__pill horizon"
                      style={{ bottom: it.kind === "video" ? "25px" : "20px" }}
                    >
                      {it.pill}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* right — statement */}
        <div className="drops__copy">
          {!isMobile && (
            <>
              <h2 className="horizon drops__head reveal">
                Human First.
                <br />
                <span className="drops__acid">Tech as Tool.</span>
                <br />
                Culture as
                <br />
                Signal.
              </h2>
              
            </>
          )}
          <p className="drops__sub">
                This isn't merch.
                <br />
                It's an extension of the brand.
              </p>
          <div className="drops__objects">
            {items.slice(0).map((o, i) => {
              const idx = i;
              return (
                <button
                  key={o.id}
                  className={`drops__obj ${active === idx ? "is-active" : ""}`}
                  style={{ "--d": i * 90 + "ms", background: o.panel }}
                  onClick={() => go(idx)}
                  aria-label={o.label}
                  aria-pressed={active === idx}
                >
                  <img src={o.img} alt={o.label} draggable="false" />
                  {!isMobile && <figcaption>{o.label}</figcaption>}
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
