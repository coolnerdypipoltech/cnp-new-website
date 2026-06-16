import React from 'react';
import './Partners.css';
function Partners() {
  const sponsors = [
    { name: 'Sponsor 1', image: `${process.env.PUBLIC_URL}/assets/partners/CODM.png` },
    { name: 'Sponsor 2', image: `${process.env.PUBLIC_URL}/assets/partners/CODM.png` },
    { name: 'Sponsor 3', image: `${process.env.PUBLIC_URL}/assets/partners/CODM.png` },
    { name: 'Sponsor 4', image: `${process.env.PUBLIC_URL}/assets/partners/CODM.png` },
    { name: 'Sponsor 5', image: `${process.env.PUBLIC_URL}/assets/partners/CODM.png` },
    { name: 'Sponsor 6', image: `${process.env.PUBLIC_URL}/assets/partners/CODM.png` },
    { name: 'Sponsor 7', image: `${process.env.PUBLIC_URL}/assets/partners/CODM.png` },
    { name: 'Sponsor 8', image: `${process.env.PUBLIC_URL}/assets/partners/CODM.png` },
  ];

  return (
    <section id="patrocinadores" className="patrocinadores-section">
      <p className='text-partners'> PARTNERS</p>
      
      <div className="sponsors-scroll-container">
        
        <div className="sponsors-scroll">
          {[...sponsors, ...sponsors].map((sponsor, index) => (
            <div key={index} className="sponsor-item">
              <img loading="lazy" className='partner-image' src={sponsor.image}  alt={sponsor.name} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Partners;
