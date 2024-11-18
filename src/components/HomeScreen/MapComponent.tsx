import React, { useEffect, useRef, useState } from 'react';

interface MapComponentProps {
  markers: { address: string; label: string; status: string }[];
  apiKey: string;
  mapId: string;
  selectedMarker?: { address: string; label: string };
}

const MapComponent: React.FC<MapComponentProps> = ({ markers, apiKey, mapId, selectedMarker }) => {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const mapInstanceRef = useRef<google.maps.Map | null>(null);

  // Function to convert address to coordinates
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
      console.error('Geocoding failed:', error);
      return null;
    }
  };

  // Load Google Maps script dynamically
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

  // Initialize the map
  useEffect(() => {
    loadGoogleMapsScript(async () => {
      if (!mapRef.current || markers.length === 0) return;

      const map = new google.maps.Map(mapRef.current, {
        zoom: 10,
        center: { lat: 55.8642, lng: -4.2518 }, // Default center (Glasgow)
        mapId: mapId,
      });
      mapInstanceRef.current = map;

      // Geocode addresses and add markers
      for (const marker of markers) {
        const coords = await geocodeAddress(marker.address);
        if (coords) {
          const googleMarker = new google.maps.marker.AdvancedMarkerElement({
            position: coords,
            map,
            title: marker.label,
          });

          // Add click listener to the marker to open Google Maps
          googleMarker.addListener('click', () => {
            const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(marker.address)}`;
            window.open(googleMapsUrl, '_blank');
          });
        }
      }
    });
  }, [markers]);

  // Zoom in on the selected marker
  useEffect(() => {
    const zoomToMarker = async () => {
      if (selectedMarker && mapInstanceRef.current) {
        const coords = await geocodeAddress(selectedMarker.address);
        if (coords) {
          mapInstanceRef.current.panTo(coords);
          mapInstanceRef.current.setZoom(15);
        }
      }
    };

    zoomToMarker();
  }, [selectedMarker]);

  return <div ref={mapRef} style={{ width: '100%', height: '400px'}} />;
};

export default MapComponent;
