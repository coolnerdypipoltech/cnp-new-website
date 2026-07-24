import React, { createContext, useState, useEffect, useContext } from 'react';

// Crear el contexto
const VimeoContext = createContext();

// Hook personalizado para usar el contexto fácilmente
export const useVimeo = () => {
  const context = useContext(VimeoContext);
  if (!context) {
    throw new Error('useVimeo debe usarse dentro de un VimeoProvider');
  }
  return context;
};

// Proveedor del contexto
export const VimeoProvider = ({ children }) => {
  const [isFullscreenVimeo, setIsFullscreenVimeo] = useState(false);

  

  return (
    <VimeoContext.Provider value={{ isFullscreenVimeo, setIsFullscreenVimeo }}>
      {children}
    </VimeoContext.Provider>
  );
};

export default VimeoContext;
