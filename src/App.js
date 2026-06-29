import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Nav from "./sections/nav";
import Hero from "./sections/hero";
import Proyectos from "./sections/proyectos";
import Services from "./sections/services";
import Contacto from "./sections/contacto";
import StarCursor from "./components/starcursor";
import Drops from "./sections/drops";
import Intro from "./sections/Intro";
import DinoGame from "./sections/DinoGame";
import { useViewport } from "./context/ViewportContext";
import "./App.css";
import "./nav.css";
import "./styles.css";

import Partners from "./sections/Partners";

function Main() {
  const [introDone, setIntroDone] = useState(false);
  const [show, setShow] = useState(false);
  const { isTrueMobile } = useViewport();
  return (
    <React.Fragment>
      {!introDone && <Intro onDone={() => {
        setShow(true);
        setTimeout(() => setIntroDone(true), 100);
      }} />}
      {introDone && show && (
        <>
          <Nav />
          {!isTrueMobile && <StarCursor />}
          <Hero />
          <Proyectos />
          <Partners />
          <Services />
          <Drops />
          <Contacto />
        </>
      )}
    </React.Fragment>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/cnp-new-website" element={<Main />} />
      <Route path="/game" element={<DinoGame />} />
      <Route path="*" element={<Main />} />
    </Routes>
  );
}

export default App;
