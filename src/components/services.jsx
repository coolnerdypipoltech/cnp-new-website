// ── SERVICES — centred phrase with objects orbiting around it ─────
import React from 'react';
import SplashCursor from './SplashCursor';
import OrbitImages from './OrbitImages';

const PU = process.env.PUBLIC_URL;
const ORBIT_IMAGES = [
  { a: `${PU}/assets/orbit/orbit1A.png`, b: `${PU}/assets/orbit/orbit1B.png`, text: "Our curated playlist" },
  { a: `${PU}/assets/orbit/orbit2A.png`, b: `${PU}/assets/orbit/orbit2B.png`, text: "Come to the creative-nerd side, we have cookies" },
  { a: `${PU}/assets/orbit/orbit3A.png`, b: `${PU}/assets/orbit/orbit3B.png`, text: "Feeling lucky?" },
  { a: `${PU}/assets/orbit/orbit4A.png`, b: `${PU}/assets/orbit/orbit4B.png`, text: "Infinite recommended TBR" },
  { a: `${PU}/assets/orbit/orbit5A.png`, b: `${PU}/assets/orbit/orbit5B.png`, text: "Contact us" },
  { a: `${PU}/assets/orbit/orbit6A.png`, b: `${PU}/assets/orbit/orbit6B.png`, text: "Let's play" },
];

function Services() {
  return (
    <section className="section services" id="services" data-screen-label="Services">
      <SplashCursor RAINBOW_MODE />
      <div className="services__stage">
        <OrbitImages
          images={ORBIT_IMAGES}
          shape="ellipse"
          radiusX={380}
          radiusY={230}
          rotation={0}
          duration={50}
          itemSize={130}
          responsive={true}
          showPath={false}
          centerContent={
            <div className="services__center">
              <h2 className="horizon services__head reveal">Get<br/>Today's<br/>Creative<br/><span style={{ color: '#00ABFF' }}>SPARK</span></h2>
            </div>
          }
        />
      </div>
    </section>
  );
}

export default Services;
