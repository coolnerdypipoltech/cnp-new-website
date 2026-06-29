// ── SERVICES — centred phrase with objects orbiting around it ─────
import React, { useState, useCallback, useEffect, useRef } from "react";
import SplashCursor from "../components/SplashCursor";
import OrbitImages from "../components/OrbitImages";
import { useViewport } from "../context/ViewportContext";
import { useNavigate } from 'react-router-dom'


const PU = process.env.PUBLIC_URL;

const ORBIT_IMAGES = [
  {
    a: `${PU}/assets/orbit/orbit1A.png`,
    b: `${PU}/assets/orbit/orbit1B.png`,
    text: "Our curated playlist",
  },
  {
    a: `${PU}/assets/orbit/orbit2A.png`,
    b: `${PU}/assets/orbit/orbit2B.png`,
    text: "Come to the creative-nerd side, we have cookies",
  },
  {
    a: `${PU}/assets/orbit/orbit3A.png`,
    b: `${PU}/assets/orbit/orbit3B.png`,
    text: "Feeling lucky?",
  },
  {
    a: `${PU}/assets/orbit/orbit4A.png`,
    b: `${PU}/assets/orbit/orbit4B.png`,
    text: "Infinite recommended TBR",
  },
  {
    a: `${PU}/assets/orbit/orbit5A.png`,
    b: `${PU}/assets/orbit/orbit5B.png`,
    text: "Contact us",
  },
  {
    a: `${PU}/assets/orbit/orbit6A.png`,
    b: `${PU}/assets/orbit/orbit6B.png`,
    text: "Let's play",
  },
];

const BallResponses = [
  `${PU}/assets/orbit/8ball/bola-ocho_01.png`,
  `${PU}/assets/orbit/8ball/bola-ocho_02.png`,
  `${PU}/assets/orbit/8ball/bola-ocho_03.png`,
  `${PU}/assets/orbit/8ball/bola-ocho_04.png`,
  `${PU}/assets/orbit/8ball/bola-ocho_05.png`,
  `${PU}/assets/orbit/8ball/bola-ocho_06.png`,
  `${PU}/assets/orbit/8ball/bola-ocho_07.png`,
  `${PU}/assets/orbit/8ball/bola-ocho_08.png`,
  `${PU}/assets/orbit/8ball/bola-ocho_09.png`,
  `${PU}/assets/orbit/8ball/bola-ocho_10.png`,
  `${PU}/assets/orbit/8ball/bola-ocho_11.png`,
  `${PU}/assets/orbit/8ball/bola-ocho_12.png`,
  `${PU}/assets/orbit/8ball/bola-ocho_13.png`,
  `${PU}/assets/orbit/8ball/bola-ocho_14.png`,
  `${PU}/assets/orbit/8ball/bola-ocho_15.png`,
  `${PU}/assets/orbit/8ball/bola-ocho_16.png`,
  `${PU}/assets/orbit/8ball/bola-ocho_17.png`,
  `${PU}/assets/orbit/8ball/bola-ocho_18.png`,
  `${PU}/assets/orbit/8ball/bola-ocho_19.png`,
];

function Services() {
  const navigate = useNavigate()
  const [ballImg, setBallImg] = useState(null);
    const [visible, setVisible] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const { isMobile } = useViewport();
  const { isTrueMobile } = useViewport();
  const sectionRef = useRef(null);
  const orbitSectionRef = useRef(null);
    const [visibleOrbit, setVisibleOrbit] = useState(false);

  const handleOrbit3Hover = useCallback(() => {
    const random =
      BallResponses[Math.floor(Math.random() * (BallResponses.length - 1))];

      console.log("Selected 8ball response:", random); // Debug log
    setBallImg(random);
  }, []);

    useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setVisibleOrbit(entry.isIntersecting),
      { threshold: 0.1 },
    );
    if (orbitSectionRef.current) observer.observe(orbitSectionRef.current);
    return () => observer.disconnect();
  }, []);

  const handleOrbit3Leave = useCallback(() => {
    // keep visible until click
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  console.log(windowWidth)

  const itemSizeHelper = () => {
    let size = 180;
    if (windowWidth < 800) {
      size = 330;
    }else{
      if(windowWidth < 1200){
        size = 250;
      }
    }
    

    return size;
  }

  const radiusXHelper = () => {
    let size = 430;
    if (windowWidth < 700) {
      size = 500;
    }else{
      if(windowWidth < 1200){
        size = 500;
      }
    }

    return size;
  }

  const radiusYHelper = () => {
    let size = 250;
    if (windowWidth < 700) {
      size = 800;
    }else{
      if(windowWidth < 1200){
        size = 300;
      }
    }

    console.log("radiusYHelper:", size);

    return size;
  }

    const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) window.scrollTo({ top: el.offsetTop, behavior: "smooth" });
  };

    useEffect(() => {
      const observer = new IntersectionObserver(
        ([entry]) => setVisible(entry.isIntersecting),
        { threshold: 0.1 },
      );
      if (sectionRef.current) observer.observe(sectionRef.current);
      return () => observer.disconnect();
    }, []);


  return (
    <section
      className="section services"
      id="services"
      data-screen-label="Services"
      ref={sectionRef}
    >
      {visible && !isTrueMobile && <SplashCursor />}

      {/* 8-ball overlay */}
      {ballImg && (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", position: "fixed", top: 0, left: 0, width: "100vw", height: "100dvh", backgroundColor: "rgba(0, 0, 0, 0.8)", zIndex: 1000 }}>
          <button
            className="modal__close modal__close--outside ball-close"

            onClick={() => setBallImg(null)}
            aria-label="Cerrar"
          >
            <p style={{ color: "#ffffff" }}>Cerrar</p>
          </button>
          <div
          className="ball-container"
            style={{
              background: `url(${PU}/assets/bg_8ball.png) no-repeat center center / cover`,

              animation: "ballFadeIn 0.4s ease forwards",
            }}
          >
            <p className="ball-title">La bola dice</p>
            <div className="breathing-ani" style={{width: "100%", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center"}} >
              <img
                src={ballImg}
                alt="8ball response"
                draggable={false}
                
                className="ball-img"
              />

            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes ballFadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes ballScaleIn {
          from { transform: scale(0.6); opacity: 0; }
          to   { transform: scale(1);   opacity: 1; }
        }
      `}</style>

      {!ballImg && (
        <div className="services__stage" ref={orbitSectionRef}>
        <OrbitImages
          images={ORBIT_IMAGES}
          shape="ellipse"
          radiusX={radiusXHelper()}
          radiusY={radiusYHelper()}
          rotation={0}
          duration={50}
          itemSize={itemSizeHelper()}
          responsive={true}
          showPath={false}
          itemCallbacks={{
            2: { onHover: handleOrbit3Hover, onLeave: handleOrbit3Leave },
            5: { onHover: () => navigate('/game') },
            4: { onHover: () => scrollTo("contacto") }
          }}
          centerContent={

            !ballImg ? (<div className="services__center">
              <h2 className="horizon services__head reveal">
                Get
                <br />
                Today's
                <br />
                Creative
                <br />
                <span style={{ color: "#00ABFF" }}>SPARK</span>
              </h2>
              {isMobile && (
                <p className="services__sub reveal">
                  Desbloquea tu inspiración:
                  <br />
                  Elige un elemento
                </p>
              )}
            </div>) : null
          }
        />
      </div>
      )}
    </section>
  );
}

export default Services;
