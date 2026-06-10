import React from 'react';
import Nav from './components/nav';
import Hero from './components/hero';
import Proyectos from './components/proyectos';
import Services from './components/services';
import Merch from './components/merch';
import Contacto from './components/contacto';
import StarCursor from './components/starcursor';
import WebGLFluid from './components/WebGLFluid';
import './App.css';
import './nav.css';
import './styles.css';

function App() {
  return (
    <React.Fragment>
      <StarCursor />

      <Hero />
      <Proyectos />
      <Services />
      <Merch />
      <Contacto />
    </React.Fragment>
  );
}

export default App;
