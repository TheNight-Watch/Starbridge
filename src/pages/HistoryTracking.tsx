
import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, MapPin, Clock, Info } from "lucide-react";
import { useNavigate } from "react-router-dom";
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

const HistoryTracking = () => {
  const navigate = useNavigate();
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [selectedPoint, setSelectedPoint] = useState<any>(null);

  // Mock trajectory data
  const trajectoryData = [
    { 
      id: 1, 
      coordinates: [116.4074, 39.9042], 
      time: "08:30", 
      location: "家门口", 
      duration: "2分钟" 
    },
    { 
      id: 2, 
      coordinates: [116.4084, 39.9052], 
      time: "08:45", 
      location: "小区花园", 
      duration: "15分钟" 
    },
    { 
      id: 3, 
      coordinates: [116.4094, 39.9062], 
      time: "09:15", 
      location: "附近公园", 
      duration: "45分钟" 
    },
    { 
      id: 4, 
      coordinates: [116.4104, 39.9072], 
      time: "10:30", 
      location: "商场", 
      duration: "1小时20分钟" 
    },
  ];

  useEffect(() => {
    if (!mapContainer.current) return;

    mapboxgl.accessToken = 'YOUR_MAPBOX_TOKEN';
    
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/light-v11',
      center: [116.4074, 39.9042],
      zoom: 14,
    });

    map.current.on('load', () => {
      // Add trajectory line
      map.current!.addSource('trajectory', {
        type: 'geojson',
        data: {
          type: 'Feature',
          properties: {},
          geometry: {
            type: 'LineString',
            coordinates: trajectoryData.map(point => point.coordinates)
          }
        }
      });

      map.current!.addLayer({
        id: 'trajectory',
        type: 'line',
        source: 'trajectory',
        layout: {
          'line-join': 'round',
          'line-cap': 'round'
        },
        paint: {
          'line-color': '#fb923c',
          'line-width': 4
        }
      });

      // Add markers for each point
      trajectoryData.forEach((point, index) => {
        const el = document.createElement('div');
        el.className = 'marker';
        el.style.backgroundColor = '#fb923c';
        el.style.width = '20px';
        el.style.height = '20px';
        el.style.borderRadius = '50%';
        el.style.border = '3px solid white';
        el.style.cursor = 'pointer';
        el.style.boxShadow = '0 2px 4px rgba(0,0,0,0.2)';

        el.addEventListener('click', () => {
          setSelectedPoint(point);
        });

        new mapboxgl.Marker(el)
          .setLngLat(point.coordinates as [number, number])
          .addTo(map.current!);
      });
    });

    return () => {
      map.current?.remove();
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-amber-50">
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-md border-b border-orange-100 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => navigate('/')}
              className="rounded-full"
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div>
              <h1 className="text-xl font-bold text-gray-800">历史轨迹</h1>
              <p className="text-sm text-orange-600">今日活动路径</p>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <Card className="bg-white/80 backdrop-blur-sm border-0 rounded-3xl shadow-lg">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-3 text-gray-800 text-lg">
              <div className="bg-gradient-to-r from-orange-400 to-yellow-500 p-2 rounded-xl">
                <MapPin className="h-5 w-5 text-white" />
              </div>
              活动轨迹地图
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative">
              <div 
                ref={mapContainer} 
                className="w-full h-96 rounded-2xl overflow-hidden border border-gray-200"
              />
              
              {selectedPoint && (
                <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm p-4 rounded-2xl shadow-lg min-w-[200px]">
                  <div className="flex items-center gap-2 mb-2">
                    <Info className="h-4 w-4 text-orange-600" />
                    <span className="font-medium text-gray-800">位置详情</span>
                  </div>
                  <div className="space-y-1 text-sm">
                    <div className="flex items-center gap-2">
                      <Clock className="h-3 w-3 text-gray-500" />
                      <span className="text-gray-600">时间：{selectedPoint.time}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-3 w-3 text-gray-500" />
                      <span className="text-gray-600">地点：{selectedPoint.location}</span>
                    </div>
                    <div className="text-gray-600">停留时长：{selectedPoint.duration}</div>
                  </div>
                  <Button 
                    size="sm" 
                    variant="outline"
                    className="mt-3 w-full"
                    onClick={() => setSelectedPoint(null)}
                  >
                    关闭
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default HistoryTracking;
