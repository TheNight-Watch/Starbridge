import React, { useEffect, useRef } from 'react';
import { Badge } from "@/components/ui/badge";
import { MapPin, Navigation, Smartphone } from 'lucide-react';

declare global {
  interface Window {
    AMap: any;
    _AMapSecurityConfig: any;
  }
}

interface AMapComponentProps {
  className?: string;
  height?: string;
}

const AMapComponent: React.FC<AMapComponentProps> = ({ 
  className = "", 
  height = "300px" 
}) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<any>(null);
  const markerInstance = useRef<any>(null);

  // 模拟孩子的实时位置（北京市中心区域）
  const currentPosition = [116.39, 39.92]; // 经纬度
  const locationName = "北京市朝阳区";
  const accuracy = "精确到10米";

  useEffect(() => {
    if (!mapContainer.current) return;

    // 设置安全密钥（如果需要的话）
    window._AMapSecurityConfig = {
      securityJsCode: "", // 生产环境需要配置
    };

    // 动态加载高德地图JS API
    const loadAMapScript = () => {
      return new Promise((resolve, reject) => {
        if (window.AMap) {
          resolve(window.AMap);
          return;
        }

        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = `https://webapi.amap.com/maps?v=2.0&key=9684eb8b5d8b8b3708a456e905bd084d`;
        script.onload = () => resolve(window.AMap);
        script.onerror = reject;
        document.head.appendChild(script);
      });
    };

    // 初始化地图
    const initMap = async () => {
      try {
        await loadAMapScript();
        
        if (!window.AMap || !mapContainer.current) return;

        // 创建地图实例
        mapInstance.current = new window.AMap.Map(mapContainer.current, {
          zoom: 15, // 缩放级别
          center: currentPosition, // 中心点坐标
          resizeEnable: true, // 是否监控地图容器尺寸变化
          mapStyle: 'amap://styles/fresh', // 设置地图样式
        });

        // 创建自定义图标
        const customIcon = new window.AMap.Icon({
          size: new window.AMap.Size(40, 50),
          image: 'data:image/svg+xml;base64,' + btoa(`
            <svg width="40" height="50" viewBox="0 0 40 50" fill="none" xmlns="http://www.w3.org/2000/svg">
              <ellipse cx="20" cy="45" rx="8" ry="5" fill="#000" fill-opacity="0.2"/>
              <path d="M20 0C8.954 0 0 8.954 0 20C0 31.046 20 50 20 50S40 31.046 40 20C40 8.954 31.046 0 20 0Z" fill="#FF6B6B"/>
              <circle cx="20" cy="20" r="12" fill="#FFF"/>
              <circle cx="20" cy="20" r="8" fill="#FF6B6B"/>
              <circle cx="20" cy="20" r="4" fill="#FFF"/>
            </svg>
          `),
          imageOffset: new window.AMap.Pixel(-20, -50)
        });

        // 创建点标记
        markerInstance.current = new window.AMap.Marker({
          position: new window.AMap.LngLat(currentPosition[0], currentPosition[1]),
          icon: customIcon,
          offset: new window.AMap.Pixel(-20, -50),
          animation: 'AMAP_ANIMATION_BOUNCE' // 弹跳动画
        });

        // 添加标记到地图
        mapInstance.current.add(markerInstance.current);

        // 创建信息窗体
        const infoWindow = new window.AMap.InfoWindow({
          isCustom: true,
          content: `
            <div style="
              background: white; 
              padding: 12px 16px; 
              border-radius: 12px; 
              box-shadow: 0 4px 12px rgba(0,0,0,0.15);
              border: 0;
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            ">
              <div style="display: flex; align-items: center; margin-bottom: 8px;">
                <div style="
                  width: 8px; 
                  height: 8px; 
                  background: #10B981; 
                  border-radius: 50%; 
                  margin-right: 8px;
                "></div>
                <span style="font-weight: 600; color: #1F2937; font-size: 14px;">小明的位置</span>
              </div>
              <div style="color: #6B7280; font-size: 12px; margin-bottom: 4px;">${locationName}</div>
              <div style="color: #10B981; font-size: 11px; font-weight: 500;">${accuracy}</div>
            </div>
          `,
          offset: new window.AMap.Pixel(0, -50)
        });

        // 点击标记显示信息窗体
        markerInstance.current.on('click', () => {
          infoWindow.open(mapInstance.current, markerInstance.current.getPosition());
        });

        // 创建定位精度圈
        const accuracyCircle = new window.AMap.Circle({
          center: currentPosition,
          radius: 50, // 50米精度
          strokeColor: '#FF6B6B',
          strokeWeight: 2,
          strokeOpacity: 0.8,
          fillColor: '#FF6B6B',
          fillOpacity: 0.2,
        });
        mapInstance.current.add(accuracyCircle);

        // 添加缩放控制
        mapInstance.current.addControl(new window.AMap.Scale());
        mapInstance.current.addControl(new window.AMap.ToolBar({
          locate: false,
          noIpLocate: true,
          locationMarker: false,
          useNative: false
        }));

      } catch (error) {
        console.error('地图初始化失败:', error);
      }
    };

    initMap();

    // 清理函数
    return () => {
      if (mapInstance.current) {
        mapInstance.current.destroy();
        mapInstance.current = null;
      }
    };
  }, []);

  // 模拟实时位置更新
  useEffect(() => {
    const updateLocation = () => {
      if (mapInstance.current && markerInstance.current) {
        // 模拟轻微的位置变化
        const randomOffset = 0.001;
        const newLng = currentPosition[0] + (Math.random() - 0.5) * randomOffset;
        const newLat = currentPosition[1] + (Math.random() - 0.5) * randomOffset;
        const newPosition = [newLng, newLat];
        
        // 更新标记位置（平滑移动）
        markerInstance.current.moveTo(newPosition, 1000);
      }
    };

    // 每30秒更新一次位置（模拟实时追踪）
    const locationInterval = setInterval(updateLocation, 30000);

    return () => clearInterval(locationInterval);
  }, []);

  return (
    <div className={`relative ${className}`}>
      {/* 地图容器 */}
      <div 
        ref={mapContainer}
        style={{ height }}
        className="w-full rounded-xl overflow-hidden border border-gray-200"
      />
      
      {/* 地图状态信息覆盖层 */}
      <div className="absolute top-3 left-3 flex flex-col gap-2">
        <Badge variant="outline" className="bg-white/90 backdrop-blur-sm text-green-700 border-green-200 rounded-full px-3 py-1 shadow-sm">
          <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
          实时跟踪
        </Badge>
      </div>

      <div className="absolute top-3 right-3 flex flex-col gap-2">
        <Badge variant="outline" className="bg-white/90 backdrop-blur-sm text-blue-700 border-blue-200 rounded-full px-3 py-1 shadow-sm">
          <Navigation className="w-3 h-3 mr-1" />
          GPS信号强
        </Badge>
      </div>

      {/* 底部位置信息 */}
      <div className="absolute bottom-3 left-3 right-3">
        <div className="bg-white/95 backdrop-blur-sm rounded-xl p-3 shadow-lg border border-gray-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="bg-red-100 p-1.5 rounded-lg">
                <MapPin className="h-4 w-4 text-red-600" />
              </div>
              <div>
                <div className="font-medium text-gray-800 text-sm">{locationName}</div>
                <div className="text-xs text-gray-500">{accuracy}</div>
              </div>
            </div>
            <div className="flex items-center gap-1 text-xs text-gray-500">
              <Smartphone className="h-3 w-3" />
              <span>刚刚更新</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AMapComponent; 