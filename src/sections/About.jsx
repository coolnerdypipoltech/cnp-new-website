import { useMemo, useRef, useState, useEffect } from "react";
import { releaseLock, applyLock } from "../hooks/useBodyScrollLock";
import { useViewport } from "../context/ViewportContext";
import SplitText from "../components/SplitText";
import { gsap } from "gsap";
import { CNP_PROJECTS } from "../data";
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


function About() {
  const [activePopup, setActivePopup] = useState(null);
  const [activeServiceIndex, setActiveServiceIndex] = useState(0);
  const { isMobile } = useViewport();
  const project = CNP_PROJECTS;
  const lastTransitionRef = useRef(0);
  const whoWeAreItems = useMemo(
    () => [
      {
        image: `${process.env.PUBLIC_URL}/assets/about/About-0.png`,
        color: "#5944ff",
      },
    ],
    [],
  );

  const serviceCards = useMemo(
    () => [
      {
        title: "Strategy",
        bullets: [
          "Brand Strategy & Positioning",
          "Cultural Intelligence & Trend Forecasting",
          "Strategic Insights & Findings",
          "Listening",
        ],
        image: `${process.env.PUBLIC_URL}/assets/about/About-4.png`,
        color: "#d142a4",
      },
      {
        title: "Creativity",
        bullets: [
          "360° Campaigns",
          "Digital Content",
          "Full-Service Production",
          "AI- Creative Workflows",
          "Event Productions & Brand",
          "Experiences",
          "Gamification"
        ],
        image: `${process.env.PUBLIC_URL}/assets/about/About-3.png`,
        color: "#5944ff",
      },
      {
        title: "Cooltural Partnerships",
        bullets: [
          "Celebrity Brand Partnerships Strategy ",
          "Talent Contracting, Management & Direction",
          "Deal Structuring & Legal Advisory",
          "Music, Sports, Lifestyle, Gaming & Esports",

        ],
        image: `${process.env.PUBLIC_URL}/assets/about/About-1.png`,
        color: "#2892fb",
      },

      {
        title: "Technology",
        bullets: [
          "Apps, WebApps and Web Development",
          "Augmented Reality/ Virtual Reality/ Mixed Reality",
          "AI Product Development",
          "Game Development",
          "Immersive & Phygital Experiences",
          
        ],
        image: `${process.env.PUBLIC_URL}/assets/about/About-2.png`,
        color: "#820cea",
      },
    ],
    [],
  );

  const visibleServiceCards = useMemo(() => {
    return serviceCards.map((card, index) => {
      const relativePosition = index - activeServiceIndex;
      const positionClass =
        relativePosition < 0
          ? "is-before"
          : relativePosition === 0
            ? "is-active"
            : relativePosition === 1
              ? "is-next"
              : relativePosition === 2
                ? "is-tail"
                : "is-hidden";

      return {
        ...card,
        index,
        relativePosition,
        positionClass,
      };
    });
  }, [activeServiceIndex, serviceCards]);

  const closePopup = () => {
    setActivePopup(null);
    releaseLock();
  };

  const openHero = () => {
    setActivePopup("hero");
    applyLock();
  };

  const openWhoWeAre = () => {
    setActivePopup("who");
    applyLock();
  };

  const openServices = () => {
    setActiveServiceIndex(0);
    setActivePopup("services");
    applyLock();
  };

  const canTransitionServiceCard = () => {
    const now = Date.now();

    if (now - lastTransitionRef.current < 420) {
      return false;
    }

    lastTransitionRef.current = now;
    return true;
  };

  const showNextService = () => {
    if (!canTransitionServiceCard()) {
      return;
    }

    setActiveServiceIndex((prev) => (prev + 1) % serviceCards.length);
  };

  const showPreviousService = () => {
    if (!canTransitionServiceCard()) {
      return;
    }

    setActiveServiceIndex(
      (prev) => (prev - 1 + serviceCards.length) % serviceCards.length,
    );
  };

  return (
    <section id="about" className="about-section">
      <div
        className="about-container"
        style={{ marginBottom: isMobile ? "20px" : "0px" }}
      >
        {isMobile && (
          <img
            src={`${process.env.PUBLIC_URL}/assets/about/About-01.png`}
            className="about-image"
            alt="About Us"
            loading="lazy"
          />
        )}
        <div
          className="about-content"
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <SplitText
            key={`text`}
            tag="h1"
            text="THE HUMANS BEHIND THIS"
            className="aboutTitle"
            splitType="words"
            delay={520}
            initialDelay={0}
            duration={2.5}
            ease="power3.out"
            from={{ opacity: 0, y: 30 }}
            to={{ opacity: 1, y: 0 }}
            threshold={0.1}
            rootMargin="-60px"
            textAlign="center"
            style={{ width: "80%" }}
          />
        </div>
        <div
          className="about-buttons"
          style={{ width: "100%", display: "flex" }}
        >
          <BtnPop type="button" style={{ "--btn-bg": "#5944FF", "--btn-fg": "#000000" }} onClick={openWhoWeAre}>
            ABOUT US
          </BtnPop>
          <BtnPop
            type="button"
            style={{ backgroundColor: "#DA48AC", "--btn-bg": "#DA48AC", "--btn-fg": "#000000" }}
            onClick={openServices}
            
          >
            SERVICES
          </BtnPop>
        </div>

        <div
          className="about-buttons"
          style={{ width: "100%", display: "flex", marginTop: "20px" }}
        >
          
          <BtnPop
            type="button"
            style={{ backgroundColor: "#9747FF", "--btn-bg": "#9747FF", "--btn-fg": "#000000" }}
            onClick={openHero}
          >
            Our Reel
          </BtnPop>
          {!isMobile && (
            <button style={{ maxHeight: "0px", scale: 0 }}>WHO WE ARE w</button>
          )}
        </div>
      </div>
      {!isMobile && (
        <img
          src={`${process.env.PUBLIC_URL}/assets/about/About-01.png`}
          className="about-image"
          alt="About Us"
          loading="lazy"
        />
      )}

      {activePopup && (
        <div className="about-popup-overlay" onClick={closePopup}>
          <div
            className="about-popup"
            onClick={(event) => event.stopPropagation()}
          >
            {activePopup !== "hero" && (
              <button
                type="button"
                className="about-popup-close"
                onClick={closePopup}
                aria-label="Close popup"
                style={{
                  top: activePopup === "who" ? "-70px" : "-40px",
                  backgroundColor:
                    activePopup === "who" ? "#5944ff" : "#DA48AC",
                }}
              >
                Cerrar
              </button>
            )}

            {activePopup === "who" && (
              <div className="about-popup-body">
                {whoWeAreItems.map((item) => (
                  <article
                    key={item.title}
                    className="about-popup-card"
                    style={{ backgroundColor: item.color }}
                  >
                    <img
                      src={item.image}
                      alt={item.title}
                      className="about-popup-image"
                      loading="lazy"
                    />
                    <div className="about-popup-copy">
                      <p className="about-text-title">
                        ABOUT <span style={{ color: "#E5FF21" }}>US</span>
                      </p>
                      <p className="about-text" style={{ fontWeight: "600" }}>
                        Coolture Creative Company
                      </p>
                      <p className="about-text">
                        Through strategy, creativity, technology and cooltural
                        partnerships, we help brands transform cultural context
                        into ideas, campaigns, experiences, platforms and
                        collaborations that move people, shape culture and drive
                        measurable business impact.
                      </p>
                      <p className="about-text">
                        We connect brands with the right stories, celebrities,
                        technologies and communities to build relevance beyond
                        advertising.
                      </p>
                      <p className="about-text" style={{ fontWeight: "600" }}>
                        We are not here to simply follow trends. We are here to
                        awaken the people, ideas and possibilities that move
                        culture forward.
                      </p>
                    </div>
                  </article>
                ))}
              </div>
            )}

            {activePopup === "services" && (
              <div
                className="services-popup-layout"
                style={{ position: "relative",  }}
              >
                <button
                  type="button"
                  className="proy__arrow proy__arrow--l small__arrow"
                  onClick={showPreviousService}
                  aria-label="Servicio anterior"
                  style={{
                    borderColor: "#ffffff",
                    top: "88%",
                    color: "#ffffff",
                    left: isMobile ? "8px" : "24px",
                  }}
                >
                  <img
                    src={`${process.env.PUBLIC_URL}/assets/icons/arrow_back_white.svg`}
                    alt="Servicio anterior"
                    style={{ width: "32px", height: "32px" }}
                    loading="lazy"
                  />
                </button>
                <button
                  type="button"
                  className="proy__arrow proy__arrow--r small__arrow"
                  onClick={showNextService}
                  aria-label="Servicio siguiente"
                  style={{
                    borderColor: "#ffffff",
                    color: "#ffffff",
                    top: "88%",
                    right: isMobile ? "8px" : "24px",
                  }}
                >
                  <img
                    src={`${process.env.PUBLIC_URL}/assets/icons/arrow_back_white.svg`}
                    alt="Servicio siguiente"
                    style={{ width: "32px", height: "32px", scale: "-1" }}
                    loading="lazy"
                  />
                </button>
                <div
                  className="services-stack"
                >
                  {visibleServiceCards.map((card, index) => (
                    <article
                      key={card.title}
                      className={`service-stack-card ${card.positionClass}`}
                      style={{ backgroundColor: card.color }}
                    >
                      <img
                        src={card.image}
                        alt={card.title}
                        className="about-popup-image"
                        loading="lazy"
                      />
                      <div className="service-stack-copy">
                        <div>
                          <h4>Service-0{index + 1}</h4>
                          <h3 style={{ color: "white", margin: "0px" }}>
                            {card.title}
                          </h3>
                        </div>
                        <ul>
                          {card.bullets.map((bullet) => (
                            <li key={bullet}>{bullet}</li>
                          ))}
                        </ul>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            )}

            {activePopup === "hero" && (
              <ProjectModal
                project={project[0]}
                onClose={() => {
                  setActivePopup("");
                }}
              />
            )}
          </div>
        </div>
      )}

    </section>
  );
}

export default About;
