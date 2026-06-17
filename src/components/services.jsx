// ── SERVICES — centred phrase with objects orbiting around it ─────
import React from 'react';
import SplashCursor from './SplashCursor';
import OrbitImages from './OrbitImages';

const PU = process.env.PUBLIC_URL;
const ORBIT_IMAGES = [
  `${PU}/assets/orbit/orbit.png`,
  `${PU}/assets/orbit/orbit1.png`,
  `${PU}/assets/orbit/orbit2.png`,
  `${PU}/assets/orbit/orbit3.png`,
  `${PU}/assets/orbit/orbit4.png`,
  `${PU}/assets/orbit/orbit5.png`,
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
          itemSize={180}
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
