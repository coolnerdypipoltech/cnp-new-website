// ── NAV (logo only) ───────────────────────────────────────────────
import React, { useState, useEffect, useRef } from 'react';
import { CNP_SOCIAL } from "../data";
const SOCIAL_ICONS = {
  linkedin: {
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="100%">
        <path d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1 4.98 2.12 4.98 3.5zM.2 8h4.6v15H.2V8zm7.4 0h4.4v2.05h.06c.61-1.16 2.1-2.38 4.32-2.38 4.62 0 5.47 3.04 5.47 7V23h-4.6v-6.4c0-1.53-.03-3.5-2.13-3.5-2.13 0-2.46 1.66-2.46 3.38V23H7.6V8z" />
      </svg>
    ),
    label: "LinkedIn",
    sub: "Connect with us",
    link: "https://mx.linkedin.com/company/coolnerdypeople",
  },
  instagram: {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" width="100%">
        <rect
          x="2"
          y="2"
          width="20"
          height="20"
          rx="5.5"
          stroke="currentColor"
          strokeWidth="2"
        />
        <circle cx="12" cy="12" r="4.5" stroke="currentColor" strokeWidth="2" />
        <circle cx="17.5" cy="6.5" r="1.4" fill="currentColor" />
      </svg>
    ),
    label: "Instagram",
    sub: "Follow our work",
    link: "https://www.instagram.com/coolnerdypeople",
  },
  spacer: {
    icon: (
      <img src={`${process.env.PUBLIC_URL}/assets/icons/Signal.png`} alt="" />
    ),
    label: "",
    sub: "",
    link: "",
  },
};

function SocialBtn({ s }) {
  const [hovered, setHovered] = React.useState(false);
  const data = SOCIAL_ICONS[s.id];
  if (s.id === "spacer") {
    return (
      <></>
    );
  }
  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <a
        className={`social-btn${hovered ? " social-btn--hover" : ""}`}
        href={data.link || s.href}
        target="_blank"
        style={{ width: "30px", height: "30px", background: !hovered ? "#9747FF" : "#9747FF" }}
        rel="noreferrer noopener"
        aria-label={data.label || s.label}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <span className="social-btn__icon" style={{ width: "14px", height: "14px" }}>{data.icon}</span>
      </a>


    </div>
  );
}

function SocialBar() {
  return (
    <div className="social-bar" style={{justifyContent: "center", marginTop: "5px", gap: "16px"}}>
      {CNP_SOCIAL.map((s) => (
        <SocialBtn key={s.id} s={s} />
      ))}
    </div>
  );
}



const NAV_SECTIONS = [
  { label: 'Home',    id: 'top', color: "#E2FF0D" },
  { label: 'Collabs', id: 'proyectos', color: "#2892FB" },
  { label: 'The Spark',  id: 'services', color: "#22B656" },
  { label: 'Drops',     id: 'drops', color: "#F35544" },
  { label: 'Contact',  id: 'contacto', color: "#D142A4" },
];

function FloatingMenu() {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  const scrollTo = (id) => {
    setOpen(false);
    if (id === 'top') { window.scrollTo({ top: 0, behavior: 'smooth' }); return; }
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  var audio = new Audio(`${process.env.PUBLIC_URL}/assets/audio/sound1.mp3`);

  // Close on outside click
  useEffect(() => {
    const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <div className="fnav" ref={ref}>
      <div className={`fnav__menu${open ? ' fnav__menu--open' : ''}`}>
        {NAV_SECTIONS.map((s, i) => (
          <button
            key={s.id}
            className="fnav__item"
            style={{  '--i': i, '--hover-bg': s.color, ...(s.id === 'top' ? { '--hover-color': '#000' } : {}) }}
            onClick={() => {
              scrollTo(s.id);
              console.log("play")
              audio.play();
            }}
          >
            {s.label}
          </button>
        ))}
        <SocialBar />
        <div style={{ height: "16px" }}></div>
      </div>
      <button
        className={`fnav__trigger${open ? ' fnav__trigger--open' : ''}`}
        onClick={() => {setOpen(!open); 
          console.log("play")
          audio.play();
        }}
        onMouseEnter={() => {
          setOpen(true)
        }}
        aria-label="Menu"
        aria-expanded={open}
      >
        <span className="fnav__pulse" aria-hidden="true" />
        <img style={{ width: "24px", height: "24px", }} src={ `${process.env.PUBLIC_URL}/assets/icons/CNP_Star_2.svg`} alt="Nerdy People" />
      </button>
    </div>
  );
}

function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [inServices, setInServices] = useState(false);
  const lastY = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 60);
      if (y <= 60) {
        setHidden(false);
      } else if (y > lastY.current) {
        setHidden(true);
      } else {
        setHidden(false);
      }
      lastY.current = y;

      const section = document.getElementById('services');
      if (section) {
        const rect = section.getBoundingClientRect();
        setInServices(rect.top <= 80 && rect.bottom > 80);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const toTop = () => window.scrollTo({ top: 0, behavior: "smooth" });
  return (
    <nav className={`nav ${scrolled ? "is-scrolled" : ""}`}>
      <div className={`nav__container${hidden ? " navContainer--hidden" : ""}`}>
        <button className="nav__logo" aria-label="Inicio" onClick={toTop}>
        <img
          src={`${process.env.PUBLIC_URL}/assets/logo/${inServices ? "CNP_BrandBlack.png" : "CNP_Brand.png"}`}
          alt="Nerdy People"
        />
      </button>
      <FloatingMenu />
         </div>
    </nav>
  );
}

export default Nav;
