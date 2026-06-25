import React, { createContext, useState, useEffect, useContext } from 'react';

// Crear el contexto
const ViewportContext = createContext();

// Hook personalizado para usar el contexto fácilmente
export const useViewport = () => {
  const context = useContext(ViewportContext);
  if (!context) {
    throw new Error('useViewport debe usarse dentro de un ViewportProvider');
  }
  return context;
};

// Proveedor del contexto
export const ViewportProvider = ({ children }) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 800);
  const [isTrueMobile, setIsTrueMobile] = useState(false);
  
  useEffect(() => {
    const userAgent = navigator.userAgent.toLowerCase();


    const isMobile2 = /iphone|ipad|ipod|android|windows phone/g.test(userAgent);
    const isTablet =/(ipad|tablet|playbook|silk)|(android(?!.*mobile))/g.test(userAgent);

    if (isMobile2 || isTablet) {
      setIsTrueMobile(true);
    }

    const handleResize = () => {
      setIsMobile(window.innerWidth <= 800);
    };

    // Agregar event listener
    window.addEventListener('resize', handleResize);

    // Cleanup: remover event listener cuando el componente se desmonte
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <ViewportContext.Provider value={{ isMobile, isTrueMobile }}>
      {children}
    </ViewportContext.Provider>
  );
};

export default ViewportContext;
