import { useState, useRef } from 'react';
import './Intro.css';

import { useViewport } from "../context/ViewportContext";
function Intro({ onDone }) {
  const [fading, setFading] = useState(false);
  const videoRef = useRef(null);
  const { isMobile } = useViewport();
  const handleEnded = () => {
    setFading(true);
    setTimeout(() => onDone(), 700);
  };

  return (
    <div className={`intro${fading ? ' intro--fade' : ''}`}>
      <video
        ref={videoRef}
        className="intro__video"
        src={isMobile ? `${process.env.PUBLIC_URL}/assets/videos/cortinillaMobile.mp4` : `${process.env.PUBLIC_URL}/assets/videos/cortinilla.mp4`}
        autoPlay
        muted
        playsInline
        onClick={() => {
          if (videoRef.current) {
            videoRef.current.pause();
            handleEnded();
          }
        }}
        onEnded={handleEnded}
      />
    </div>
  );
}

export default Intro;
