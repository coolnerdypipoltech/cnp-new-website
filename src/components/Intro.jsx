import { useState, useRef } from 'react';
import './Intro.css';

function Intro({ onDone }) {
  const [fading, setFading] = useState(false);
  const videoRef = useRef(null);

  const handleEnded = () => {
    setFading(true);
    setTimeout(() => onDone(), 700);
  };

  return (
    <div className={`intro${fading ? ' intro--fade' : ''}`}>
      <video
        ref={videoRef}
        className="intro__video"
        src={`${process.env.PUBLIC_URL}/assets/videos/cortinilla.mp4`}
        autoPlay
        muted
        playsInline
        onEnded={handleEnded}
      />
    </div>
  );
}

export default Intro;
