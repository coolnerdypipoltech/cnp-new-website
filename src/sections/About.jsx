import { useMemo, useRef, useState } from "react";
import { releaseLock, applyLock } from "../hooks/useBodyScrollLock";
import { useViewport } from "../context/ViewportContext";
import SplitText from "../components/SplitText";

import { CNP_PROJECTS } from "../data";
import ProjectModal from "../components/ProjectModal";
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
          <button type="button" style={{}} onClick={openWhoWeAre}>
            ABOUT US
          </button>
          <button
            type="button"
            style={{ backgroundColor: "#DA48AC" }}
            onClick={openServices}
          >
            SERVICES
          </button>
        </div>

        <div
          className="about-buttons"
          style={{ width: "100%", display: "flex", marginTop: "20px" }}
        >
          <button
            type="button"
            style={{ backgroundColor: "#9747FF" }}
            onClick={openHero}
          >
            Our Reel
          </button>
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
                    activePopup === "who" ? "#9747FF" : "#DA48AC",
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
