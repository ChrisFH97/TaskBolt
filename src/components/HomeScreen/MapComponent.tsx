import React, { useEffect, useRef } from 'react';

interface MapComponentProps {
  address: string;
  label: string;
  apiKey: string;
  mapId: string;
}

const MapComponent: React.FC<MapComponentProps> = ({ address, label, apiKey, mapId }) => {
  const mapRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const loadGoogleMapsScript = (callback: () => void) => {
      if (document.getElementById('google-maps-script')) {
        callback();
        return;
      }

      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&map_ids=${mapId}&libraries=marker`;
      script.id = 'google-maps-script';
      script.async = true;
      script.defer = true;
      script.onload = callback;
      document.body.appendChild(script);
    };

    const geocodeAddress = async (address: string) => {
      try {
        const response = await fetch(
          `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`
        );
        const data = await response.json();
        if (data.status === 'OK') {
          return data.results[0].geometry.location;
        }
        console.error('Geocode error:', data.status);
        return null;
      } catch (error) {
        console.error('Failed to geocode address:', error);
        return null;
      }
    };

    loadGoogleMapsScript(async () => {
      if (!mapRef.current) return;

      const coords = await geocodeAddress(address);
      if (coords) {
        const map = new google.maps.Map(mapRef.current, {
          center: coords,
          zoom: 15,
          mapId: mapId,
        });

        if (google?.maps?.marker?.AdvancedMarkerElement) {
          new google.maps.marker.AdvancedMarkerElement({
            position: coords,
            map,
            title: label,
          });
        } else {
          console.error('AdvancedMarkerElement is not available.');
        }
      }
    });
  }, [address, label, apiKey, mapId]);

  return <div ref={mapRef} style={{ width: '100%', height: '100%' }} />;
};

export default MapComponent;
