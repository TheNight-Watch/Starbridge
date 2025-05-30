
import React, { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

interface LocationMapProps {
  center?: [number, number];
  zoom?: number;
  height?: string;
}

const LocationMap: React.FC<LocationMapProps> = ({ 
  center = [116.4074, 39.9042], // Beijing coordinates as default
  zoom = 15,
  height = "200px"
}) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);

  useEffect(() => {
    if (!mapContainer.current) return;

    // You'll need to add your Mapbox token here
    mapboxgl.accessToken = 'YOUR_MAPBOX_TOKEN';
    
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/light-v11',
      center: center,
      zoom: zoom,
    });

    // Add a marker for current location
    new mapboxgl.Marker({ color: '#fb923c' })
      .setLngLat(center)
      .addTo(map.current);

    // Cleanup
    return () => {
      map.current?.remove();
    };
  }, [center, zoom]);

  return (
    <div 
      ref={mapContainer} 
      className="w-full rounded-2xl overflow-hidden border border-gray-200" 
      style={{ height }}
    />
  );
};

export default LocationMap;
