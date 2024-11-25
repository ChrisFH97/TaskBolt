import { useState, useEffect } from 'react';

export const useGoogleMapsScript = (apiKey: string, mapId: string) => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const loadGoogleMapsScript = () => {
      return new Promise<void>((resolve) => {
        if (document.getElementById('google-maps-script')) {
          resolve();
          return;
        }

        const script = document.createElement('script');
        script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&map_ids=${mapId}`;
        script.id = 'google-maps-script';
        script.async = true;
        script.defer = true;
        script.onload = () => resolve();
        document.body.appendChild(script);
      });
    };

    loadGoogleMapsScript().then(() => {
      setIsLoaded(true);
    });
  }, [apiKey, mapId]);

  return isLoaded;
};
