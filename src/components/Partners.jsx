import React, { useEffect, useRef } from 'react';
import './Partners.css';

const BASE_SPEED = 60; // px/s at normal speed
const SMOOTH_TAU = 0.35; // seconds — controls how quickly it eases

function Partners() {
  const sponsors = [
    { name: 'Sponsor 1', image: `${process.env.PUBLIC_URL}/assets/partners/Logo_1.png` },
    { name: 'Sponsor 2', image: `${process.env.PUBLIC_URL}/assets/partners/Logo_2.png` },
    { name: 'Sponsor 3', image: `${process.env.PUBLIC_URL}/assets/partners/Logo_3.png` },
    { name: 'Sponsor 4', image: `${process.env.PUBLIC_URL}/assets/partners/Logo_4.png` },
    { name: 'Sponsor 5', image: `${process.env.PUBLIC_URL}/assets/partners/Logo_5.png` },
    { name: 'Sponsor 6', image: `${process.env.PUBLIC_URL}/assets/partners/Logo_6.png` },
    { name: 'Sponsor 1', image: `${process.env.PUBLIC_URL}/assets/partners/Logo_1.png` },
    { name: 'Sponsor 2', image: `${process.env.PUBLIC_URL}/assets/partners/Logo_2.png` },
    { name: 'Sponsor 3', image: `${process.env.PUBLIC_URL}/assets/partners/Logo_3.png` },
    { name: 'Sponsor 4', image: `${process.env.PUBLIC_URL}/assets/partners/Logo_4.png` },
  ];

  const scrollRef = useRef(null);
  const hoveredRef = useRef(false);
  const offsetRef = useRef(0);
  const velocityRef = useRef(BASE_SPEED);
  const lastTimestampRef = useRef(null);
  const rafRef = useRef(null);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const animate = (timestamp) => {
      if (lastTimestampRef.current === null) lastTimestampRef.current = timestamp;
      const dt = Math.min((timestamp - lastTimestampRef.current) / 1000, 0.1);
      lastTimestampRef.current = timestamp;

      const target = hoveredRef.current ? 0 : BASE_SPEED;
      const factor = 1 - Math.exp(-dt / SMOOTH_TAU);
      velocityRef.current += (target - velocityRef.current) * factor;

      const totalWidth = el.scrollWidth / 2;
      offsetRef.current = (offsetRef.current + velocityRef.current * dt) % totalWidth;

      el.style.transform = `translateX(${-offsetRef.current}px)`;
      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  return (
    <section id="patrocinadores" className="patrocinadores-section">
      <div
        className="sponsors-scroll-container"
        onMouseEnter={() => { hoveredRef.current = true; }}
        onMouseLeave={() => { hoveredRef.current = false; }}
      >
        <div className="sponsors-scroll" ref={scrollRef}>
          {[...sponsors, ...sponsors].map((sponsor, index) => (
            <div key={index} className="sponsor-item">
              <img loading="lazy" className='partner-image' src={sponsor.image} alt={sponsor.name} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Partners;
