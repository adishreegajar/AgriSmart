import { useEffect, useRef } from 'react';
import { ShoppingBag, Navigation } from 'lucide-react';

// Mock geocoding helper 
const getCityCoords = (location) => {
  const city = location.split(',')[0].trim().toLowerCase();
  const coords = {
    ludhiana: [30.9010, 75.8573],
    pune: [18.5204, 73.8567],
    nashik: [19.9975, 73.7898],
    mumbai: [19.0760, 72.8777],
    delhi: [28.6139, 77.2090],
    bengaluru: [12.9716, 77.5946],
    kolar: [13.1363, 78.1291],
    indore: [22.7196, 75.8577],
    khanna: [30.7011, 76.2233],
    karnal: [29.6857, 76.9907],
  };
  return coords[city] || [30.9010, 75.8573];
};

const MarketMap = ({ crops }) => {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markersRef = useRef([]);

  useEffect(() => {
    // Access global 'L' from the window object (loaded via script tag in index.html)
    const L = window.L;
    if (!L || !mapRef.current) return;

    // Initialize map if not already done
    if (!mapInstanceRef.current) {
      mapInstanceRef.current = L.map(mapRef.current).setView([22.9734, 78.6569], 5);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
      }).addTo(mapInstanceRef.current);
    }

    // Clear existing markers
    markersRef.current.forEach(marker => marker.remove());
    markersRef.current = [];

    // Add new markers
    crops.forEach(crop => {
      const coords = getCityCoords(crop.location);
      const marker = L.marker(coords).addTo(mapInstanceRef.current);
      
      const popupContent = `
        <div class="p-2 font-sans">
          <div class="flex items-center gap-2 mb-2">
            <h4 class="font-bold text-gray-800">${crop.name}</h4>
          </div>
          <p class="text-[10px] text-gray-500 mb-2">${crop.quantity} available</p>
          <div class="flex items-center justify-between gap-4">
            <p class="text-sm font-bold text-green-600">₹${crop.price}</p>
          </div>
        </div>
      `;
      
      marker.bindPopup(popupContent);
      markersRef.current.push(marker);
    });

    return () => {
      // We don't necessarily want to destroy the map instance here if the component re-renders
      // but markers are managed above.
    };
  }, [crops]);

  return (
    <div className="h-full w-full rounded-[2.5rem] overflow-hidden shadow-2xl border-4 border-white relative">
      <div id="map" ref={mapRef} className="h-full w-full" style={{ zIndex: 0 }} />
      
      {/* Floating Legend */}
      <div className="absolute bottom-6 right-6 z-[1000] bg-white/90 backdrop-blur-md p-4 rounded-3xl shadow-xl border border-agri-light/10 pointer-events-none">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-agri-leaf rounded-full animate-pulse" />
          <p className="text-[10px] uppercase font-bold text-agri-dark tracking-widest">Active Listings</p>
        </div>
      </div>
    </div>
  );
};

export default MarketMap;

