import { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MapPin, Layers, Zap } from "lucide-react";

interface RiskMapProps {
  userRole: "admin" | "sector" | "worker";
}

export const RiskMap = ({ userRole }: RiskMapProps) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [mapboxToken, setMapboxToken] = useState("");
  const [isMapLoaded, setIsMapLoaded] = useState(false);

  useEffect(() => {
    if (!mapContainer.current || !mapboxToken) return;

    mapboxgl.accessToken = mapboxToken;
    
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/satellite-v9',
      center: [-110.8, 32.2], // Example mining coordinates
      zoom: 15,
      pitch: 45,
      bearing: -15
    });

    map.current.on('load', () => {
      setIsMapLoaded(true);
      
      // Add risk zones
      map.current?.addSource('risk-zones', {
        type: 'geojson',
        data: {
          type: 'FeatureCollection',
          features: [
            {
              type: 'Feature',
              properties: { risk: 'high', name: 'Sector C' },
              geometry: {
                type: 'Polygon',
                coordinates: [[
                  [-110.81, 32.205],
                  [-110.805, 32.205],
                  [-110.805, 32.195],
                  [-110.81, 32.195],
                  [-110.81, 32.205]
                ]]
              }
            },
            {
              type: 'Feature',
              properties: { risk: 'medium', name: 'Sector B' },
              geometry: {
                type: 'Polygon',
                coordinates: [[
                  [-110.805, 32.205],
                  [-110.795, 32.205],
                  [-110.795, 32.195],
                  [-110.805, 32.195],
                  [-110.805, 32.205]
                ]]
              }
            },
            {
              type: 'Feature',
              properties: { risk: 'low', name: 'Sector A' },
              geometry: {
                type: 'Polygon',
                coordinates: [[
                  [-110.795, 32.205],
                  [-110.785, 32.205],
                  [-110.785, 32.195],
                  [-110.795, 32.195],
                  [-110.795, 32.205]
                ]]
              }
            }
          ]
        }
      });

      // Add risk zone layers
      map.current?.addLayer({
        id: 'risk-zones-fill',
        type: 'fill',
        source: 'risk-zones',
        paint: {
          'fill-color': [
            'match',
            ['get', 'risk'],
            'high', '#ef4444',
            'medium', '#f59e0b',
            'low', '#22c55e',
            '#64748b'
          ],
          'fill-opacity': 0.6
        }
      });

      map.current?.addLayer({
        id: 'risk-zones-outline',
        type: 'line',
        source: 'risk-zones',
        paint: {
          'line-color': '#ffffff',
          'line-width': 2
        }
      });

      // Add worker locations
      if (userRole === "admin" || userRole === "sector") {
        map.current?.addSource('workers', {
          type: 'geojson',
          data: {
            type: 'FeatureCollection',
            features: [
              {
                type: 'Feature',
                properties: { name: 'Team Alpha' },
                geometry: {
                  type: 'Point',
                  coordinates: [-110.79, 32.2]
                }
              },
              {
                type: 'Feature',
                properties: { name: 'Team Beta' },
                geometry: {
                  type: 'Point',
                  coordinates: [-110.8, 32.198]
                }
              }
            ]
          }
        });

        map.current?.addLayer({
          id: 'workers',
          type: 'circle',
          source: 'workers',
          paint: {
            'circle-radius': 6,
            'circle-color': '#3b82f6',
            'circle-stroke-width': 2,
            'circle-stroke-color': '#ffffff'
          }
        });
      }
    });

    return () => {
      map.current?.remove();
    };
  }, [mapboxToken, userRole]);

  if (!mapboxToken) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="w-5 h-5 text-mining" />
            Risk Map Configuration
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Enter your Mapbox public token to view the interactive risk map.
          </p>
          <div className="flex gap-2">
            <Input
              placeholder="pk.eyJ1IjoiZXhhbXBsZSIsImEiOiJja..."
              value={mapboxToken}
              onChange={(e) => setMapboxToken(e.target.value)}
            />
            <Button onClick={() => setIsMapLoaded(false)}>
              Load Map
            </Button>
          </div>
          <p className="text-xs text-muted-foreground">
            Get your token at <a href="https://mapbox.com" target="_blank" rel="noopener noreferrer" className="text-mining underline">mapbox.com</a>
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MapPin className="w-5 h-5 text-mining" />
          Interactive Risk Map - {userRole === "admin" ? "Global View" : userRole === "sector" ? "Sector View" : "Worker View"}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-safe rounded"></div>
              <span className="text-sm">Safe Zone</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-caution rounded"></div>
              <span className="text-sm">Caution Zone</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-danger rounded"></div>
              <span className="text-sm">High Risk Zone</span>
            </div>
          </div>
          
          <div 
            ref={mapContainer} 
            className="w-full h-96 rounded-lg border overflow-hidden"
          />
          
          {isMapLoaded && (
            <div className="text-sm text-muted-foreground">
              Use mouse to navigate • Scroll to zoom • Drag to pan
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};