import { useEffect, useState } from 'react';

export const useResponsiveCanvas = () => {
  const [dimensions, setDimensions] = useState({
    width: 600,
    height: 400
  });

  useEffect(() => {
    const updateDimensions = () => {
      const width = window.innerWidth;
      
      if (width < 640) {
        // Mobile
        setDimensions({ width: Math.min(width - 64, 400), height: 300 });
      } else if (width < 1024) {
        // Tablet
        setDimensions({ width: 500, height: 350 });
      } else {
        // Desktop
        setDimensions({ width: 600, height: 400 });
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  return dimensions;
};
