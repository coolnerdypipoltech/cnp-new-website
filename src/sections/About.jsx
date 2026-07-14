
import { useMemo, useRef, useState, useEffect } from "react";
import { releaseLock, applyLock} from "../hooks/useBodyScrollLock";
import { useViewport } from "../context/ViewportContext";
import SplitText from "../components/SplitText";


import { CNP_PROJECTS } from "../data";
import ProjectModal from "../components/ProjectModal";
function About() {
  const [activePopup, setActivePopup] = useState(null);
  const [activeServiceIndex, setActiveServiceIndex] = useState(0);
  const [servicesHintVisible, setServicesHintVisible] = useState(false);
  const [servicesHintCursor, setServicesHintCursor] = useState({ x: 0, y: 0 });
    const { isTrueMobile, isMobile } = useViewport();

  const touchStartYRef = useRef(null);
  const touchDeltaAccumRef = useRef(0);
  const project = CNP_PROJECTS;
  const lastTransitionRef = useRef(0);
  const whoWeAreItems = useMemo(
    () => [
      {
        image: `${process.env.PUBLIC_URL}/assets/about/About-0.png`,
        color: "#5944ff",
      },
    ],
    []
  );

  const serviceCards = useMemo(
    () => [
      {
        title: "Strategy",
        bullets: [
          "Brand Strategy & Positioning",
          "Cultural Intelligence & Trend Forecasting",
          "Strategic Insights & Findings",
          "Listening"
        ],
        image: `${process.env.PUBLIC_URL}/assets/about/About-4.png`,
        color: "#d142a4",
      },
      {
        title: "Creativity",
        bullets: [
          "360° Campaigns",
          "Digital Content & Film Production",
          "AI-Creative Workflows",
          "Event Production & Brand Experiences",
          "Gamification & Loyalty Programs"
        ],
        image: `${process.env.PUBLIC_URL}/assets/about/About-3.png`,
        color: "#5944ff"
      },
      {
        title: "Cooltural Partnerships",
        bullets: [
          "Talent Strategy & Selection",
          "Deal Structuring & Legal Advisory",
          "Talent Creative Direction & Campaign Execution",
          "Celebrities & Influencers (end-to-end)",
          "Music, Sports & Lifestyle, Gaming & Esports"
        ],
        image: `${process.env.PUBLIC_URL}/assets/about/About-1.png`,
        color: "#2892fb"
      },

      {
        title: "Technology",
        bullets: [
          "Apps & WebApps.",
          "AR/VR/MR",
          "Fake Out of Home",
          "Game Development",
          "Immersive & Phygital Experiences",
        ],
        image: `${process.env.PUBLIC_URL}/assets/about/About-2.png`,
        color: "#820cea"
      },
    ],
    []
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
  }

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

    setActiveServiceIndex((prev) => (prev - 1 + serviceCards.length) % serviceCards.length);
  };

  const handleServiceWheel = (event) => {
    if (Math.abs(event.deltaY) < 8) {
      return;
    }

    if (event.deltaY > 0) {
      showNextService();
      return;
    }

    showPreviousService();
  };

  const handleServiceTouchStart = (event) => {
    touchStartYRef.current = event.touches[0].clientY;
    touchDeltaAccumRef.current = 0;
  };

  const handleServiceTouchMove = (event) => {
    if (touchStartYRef.current === null) {
      return;
    }

    const currentY = event.touches[0].clientY;
    const deltaY = touchStartYRef.current - currentY;
    touchDeltaAccumRef.current = deltaY;

    if (Math.abs(touchDeltaAccumRef.current) < 38) {
      return;
    }

    if (touchDeltaAccumRef.current > 0) {
      showNextService();
    } else {
      showPreviousService();
    }

    touchStartYRef.current = currentY;
    touchDeltaAccumRef.current = 0;
  };

  const handleServiceTouchEnd = () => {
    touchStartYRef.current = null;
    touchDeltaAccumRef.current = 0;
  };

  const handleServicesHintMouseMove = (event) => {
    if (isTrueMobile || activePopup !== "services") {
      return;
    }

    const rect = event.currentTarget.getBoundingClientRect();
    setServicesHintCursor({
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    });
  };

  return (
    <section id="about" className="about-section">
      <div className="about-container" style={{ marginBottom: isMobile ? "20px" : "0px" }}>
        {isMobile && (<img src={`${process.env.PUBLIC_URL}/assets/about/About-01.png`} className="about-image" alt="About Us" />)}
        <div className="about-content" style={{ width: "100%", display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center" }}>


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
        <div className="about-buttons" style={{ width: "100%", display: "flex" }}>
          <button type="button" style={{backgroundColor: "#9747FF"}} onClick={openHero}>VIDEO HERO</button>
          <button type="button" style={{}} onClick={openWhoWeAre}>WHO WE ARE</button>

        </div>
        
        <div className="about-buttons" style={{  width: "100%", display: "flex", marginTop: "20px" }}>
          <button type="button" style={{backgroundColor: "#DA48AC"}}  onClick={openServices}>SERVICES</button>
          {!isMobile && (<button style={{maxHeight: "0px", scale: 0}} >WHO WE ARE   w</button>)}
        </div>
      </div>
      {!isMobile && (<img src={`${process.env.PUBLIC_URL}/assets/about/About-01.png`} className="about-image" alt="About Us" />)}

      {activePopup && (
        <div className="about-popup-overlay" onClick={closePopup}>
          <div className="about-popup" onClick={(event) => event.stopPropagation()}>
            {activePopup !== "hero" && (<button type="button" className="about-popup-close" onClick={closePopup} aria-label="Close popup" style={{top: activePopup === "who" ? "-70px" : "-40px", backgroundColor: activePopup === "who" ? "#9747FF" : "#DA48AC"}}>
              Cerrar
            </button>)}

            {activePopup === "who" && (
              <div className="about-popup-body">
                {whoWeAreItems.map((item) => (
                  <article key={item.title} className="about-popup-card" style={{ backgroundColor: item.color }}>
                    <img src={item.image} alt={item.title} className="about-popup-image" />
                    <div className="about-popup-copy">
                      <p className="about-text-title">ABOUT <span style={{color: "#E5FF21"}}>US</span></p>
                      <p className="about-text" style={{fontWeight: "600"}}>Cool Nerdy People - Coolture Creative Company</p>
                      <p className="about-text">Through strategy, creativity, technology and cooltural partnerships, we help brands transform cultural context into ideas, campaigns, experiences, platforms and collaborations that move people, shape culture and drive measurable business impact.</p>
                      <p className="about-text">We connect brands with the right stories, celebrities, technologies and communities to build relevance beyond advertising.</p>
                      <p className="about-text" style={{fontWeight: "600"}}>We are not here to simply follow trends. We are here to awaken the people, ideas and possibilities that move human potential forward.</p>
                    </div>
                  </article>
                ))}
              </div>
            )}

            {activePopup === "services" && (
              <div
                className="services-popup-layout"
                style={{ position: "relative", cursor: isMobile ? "auto" : "none" }}
                onMouseMove={handleServicesHintMouseMove}
                onMouseEnter={() => {
                  if (!isTrueMobile) {
                    setServicesHintVisible(true);
                  }
                }}
                onMouseLeave={() => {
                  if (!isTrueMobile) {
                    setServicesHintVisible(false);
                  }
                }}
              >


                <div
                  className="services-stack"
                  onWheel={handleServiceWheel}
                  onTouchStart={handleServiceTouchStart}
                  onTouchMove={handleServiceTouchMove}
                  onTouchEnd={handleServiceTouchEnd}
                >
                  {visibleServiceCards.map((card, index) => (
                    <article key={card.title} className={`service-stack-card ${card.positionClass}`} style={{ backgroundColor: card.color }}>
                      <img src={card.image} alt={card.title} className="about-popup-image" />
                      <div className="service-stack-copy"  >
                        <div>
                          <h4>Service-0{index + 1}</h4>
                        <h3 style={{  color: "white",  margin: "0px" }}>{card.title}</h3>
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

                {servicesHintVisible && (
                  <div
                    style={{
                      position: "absolute",
                      left: servicesHintCursor.x,
                      top: servicesHintCursor.y + 34,
                      transform: "translate(-50%, -50%)",
                      pointerEvents: "none",
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      color: "#ffffff",
                      fontFamily: "var(--font-body)",
                      fontWeight: 700,
                      fontSize: "13px",
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                      whiteSpace: "nowrap",
                      transition: "opacity 120ms",
                      zIndex: 2000,
                      flexDirection: "column",
                    }}
                  >
                    <span>SCROLL</span>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                      <path d="M8.575 12.175L13.475 7.27495C13.675 7.07495 13.9083 6.97912 14.175 6.98745C14.4417 6.99578 14.675 7.09995 14.875 7.29995C15.0583 7.49995 15.1542 7.73328 15.1625 7.99995C15.1708 8.26662 15.075 8.49995 14.875 8.69995L8.275 15.3C8.175 15.4 8.06667 15.4708 7.95 15.5125C7.83333 15.5541 7.70833 15.575 7.575 15.575C7.44167 15.575 7.31667 15.5541 7.2 15.5125C7.08333 15.4708 6.975 15.4 6.875 15.3L0.275 8.69995C0.0916664 8.51662 -3.18547e-07 8.28745 -3.30567e-07 8.01245C-3.42588e-07 7.73745 0.0916663 7.49995 0.275 7.29995C0.475 7.09995 0.7125 6.99995 0.9875 6.99995C1.2625 6.99995 1.5 7.09995 1.7 7.29995L6.575 12.175L6.575 0.999951C6.575 0.716617 6.67083 0.479117 6.8625 0.28745C7.05417 0.0957839 7.29167 -4.89561e-05 7.575 -4.89685e-05C7.85833 -4.89809e-05 8.09583 0.0957838 8.2875 0.28745C8.47917 0.479117 8.575 0.716617 8.575 0.999951L8.575 12.175Z" fill="#1F1F1F"/>
                    </svg>
                  </div>
                )}
              </div>
            )}

            {activePopup === "hero" && (        <ProjectModal
              project={project[0]}
              onClose={() => {
                setActivePopup("");
              }}
        />)}
          </div>
        </div>
      )}

      {(isTrueMobile && activePopup === "services") && (                  <div
                    style={{
                      position: "fixed",
                      left: "50%",
                      bottom: "10vh",
                      transform: "translate(-50%, 0%)",
                      pointerEvents: "none",
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      color: "#ffffff",
                      fontFamily: "var(--font-body)",
                      fontWeight: 500,
                      fontSize: "11px",
                      letterSpacing: "0.08em",

                      whiteSpace: "nowrap",
                      transition: "opacity 120ms",
                      zIndex: 2000,
                      flexDirection: "column",
                    }}
                  >
                    <span>Scroll to explore</span>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                      <path d="M8.575 12.175L13.475 7.27495C13.675 7.07495 13.9083 6.97912 14.175 6.98745C14.4417 6.99578 14.675 7.09995 14.875 7.29995C15.0583 7.49995 15.1542 7.73328 15.1625 7.99995C15.1708 8.26662 15.075 8.49995 14.875 8.69995L8.275 15.3C8.175 15.4 8.06667 15.4708 7.95 15.5125C7.83333 15.5541 7.70833 15.575 7.575 15.575C7.44167 15.575 7.31667 15.5541 7.2 15.5125C7.08333 15.4708 6.975 15.4 6.875 15.3L0.275 8.69995C0.0916664 8.51662 -3.18547e-07 8.28745 -3.30567e-07 8.01245C-3.42588e-07 7.73745 0.0916663 7.49995 0.275 7.29995C0.475 7.09995 0.7125 6.99995 0.9875 6.99995C1.2625 6.99995 1.5 7.09995 1.7 7.29995L6.575 12.175L6.575 0.999951C6.575 0.716617 6.67083 0.479117 6.8625 0.28745C7.05417 0.0957839 7.29167 -4.89561e-05 7.575 -4.89685e-05C7.85833 -4.89809e-05 8.09583 0.0957838 8.2875 0.28745C8.47917 0.479117 8.575 0.716617 8.575 0.999951L8.575 12.175Z" fill="#1F1F1F"/>
                    </svg>
                  </div>)}
    </section>
  );
}



export default About;
