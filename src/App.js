import React, { useState } from 'react';
import Nav from './components/nav';
import Hero from './components/hero';
import Proyectos from './components/proyectos';
import Services from './components/services';
import Contacto from './components/contacto';
import StarCursor from './components/starcursor';
import Drops from './components/drops';
import Intro from './components/Intro';

import './App.css';
import './nav.css';
import './styles.css';

import Partners from './components/Partners';

const techLogos = [
  { src: `${process.env.PUBLIC_URL}/assets/proyects/logos/CODM.png`, title: "React", href: "https://react.dev" },
  { src: `${process.env.PUBLIC_URL}/assets/proyects/logos/CODM.png`, title: "Next.js", href: "https://nextjs.org" },
  { src: `${process.env.PUBLIC_URL}/assets/proyects/logos/CODM.png`, title: "TypeScript", href: "https://www.typescriptlang.org" },
  { src: `${process.env.PUBLIC_URL}/assets/proyects/logos/CODM.png`, title: "CODM", href: "https://www.callofduty.com/mobile" },
];

function App() {
  const [introDone, setIntroDone] = useState(false);

  return (
    <React.Fragment>
      {!introDone && <Intro onDone={() => setIntroDone(true)} />}
      {introDone && <Nav/>}
      <StarCursor />
      <Hero />
      <Proyectos />
      <Partners
        logos={techLogos}
      />
      <Services />
      <Drops />
      <Contacto />
    </React.Fragment>
  );
}

export default App;
