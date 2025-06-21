import React, { useState, useEffect, useRef } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { WebRTCVideoService, VideoStreamConfig, ConnectionStats } from "@/services/webrtcService";
import { 
  Video, 
  VideoOff, 
  Volume2, 
  VolumeX, 
  RotateCcw, 
  Maximize2, 
  Minimize2,
  Wifi,
  WifiOff,
  Camera,
  Signal,
  Activity
} from "lucide-react";

interface LiveVideoStreamProps {
  isOpen: boolean;
  onClose: () => void;
  deviceId?: string;
}

const LiveVideoStream: React.FC<LiveVideoStreamProps> = ({ 
  isOpen, 
  onClose, 
  deviceId = "smart_device_vision_001" 
}) => {
  const [isConnected, setIsConnected] = useState(false);
  const [isVideoEnabled, setIsVideoEnabled] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState<'connecting' | 'connected' | 'disconnected'>('disconnected');
  const [connectionStats, setConnectionStats] = useState<ConnectionStats | null>(null);
  const [retryCount, setRetryCount] = useState(0);
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const webrtcServiceRef = useRef<WebRTCVideoService | null>(null);

  // WebRTC服务初始化
  useEffect(() => {
    if (isOpen && !webrtcServiceRef.current) {
      const config: VideoStreamConfig = {
        deviceId,
        quality: 'medium',
        enableAudio: true
      };
      
      webrtcServiceRef.current = new WebRTCVideoService(config);
      
      // 设置回调函数
      webrtcServiceRef.current.onRemoteStream((stream) => {
        console.log('收到远程视频流');
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          setIsConnected(true);
          setConnectionStatus('connected');
        }
      });
      
      webrtcServiceRef.current.onConnectionStateChange((state) => {
        console.log('连接状态变化:', state);
        switch (state) {
          case 'connecting':
            setConnectionStatus('connecting');
            setIsConnected(false);
            break;
          case 'connected':
            setConnectionStatus('connected');
            setIsConnected(true);
            setRetryCount(0);
            break;
          case 'disconnected':
          case 'failed':
          case 'closed':
            setConnectionStatus('disconnected');
            setIsConnected(false);
            handleAutoReconnect();
            break;
        }
      });
      
      webrtcServiceRef.current.onStats((stats) => {
        setConnectionStats(stats);
      });
      
      // 开始连接
      connectToDevice();
    }
    
    return () => {
      if (!isOpen && webrtcServiceRef.current) {
        cleanup();
      }
    };
  }, [isOpen, deviceId]);

  // 连接到设备
  const connectToDevice = async () => {
    if (webrtcServiceRef.current) {
      setConnectionStatus('connecting');
      setRetryCount(prev => prev + 1);
      
      try {
        const success = await webrtcServiceRef.current.connectToDevice();
        if (!success) {
          setConnectionStatus('disconnected');
          handleAutoReconnect();
        }
      } catch (error) {
        console.error('连接失败:', error);
        setConnectionStatus('disconnected');
        handleAutoReconnect();
      }
    }
  };

  // 自动重连逻辑
  const handleAutoReconnect = () => {
    if (retryCount < 5 && isOpen) {
      const delay = Math.min(1000 * Math.pow(2, retryCount), 30000); // 指数退避，最大30秒
      console.log(`${delay/1000}秒后重试连接...`);
      
      setTimeout(() => {
        if (isOpen) {
          connectToDevice();
        }
      }, delay);
    }
  };

  // 清理资源
  const cleanup = async () => {
    if (webrtcServiceRef.current) {
      await webrtcServiceRef.current.stopStream();
      webrtcServiceRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    setIsConnected(false);
    setConnectionStatus('disconnected');
    setRetryCount(0);
  };

  // 手动重连
  const manualReconnect = () => {
    setRetryCount(0);
    connectToDevice();
  };

  // 切换视频开关
  const toggleVideo = () => {
    setIsVideoEnabled(!isVideoEnabled);
  };

  // 切换音频开关
  const toggleAudio = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  };

  // 切换全屏
  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  // 获取连接状态信息
  const getConnectionInfo = () => {
    switch (connectionStatus) {
      case 'connecting':
        return { 
          color: 'bg-yellow-100 text-yellow-700 border-yellow-200', 
          text: `连接中... (${retryCount}/5)`, 
          icon: Activity 
        };
      case 'connected':
        return { 
          color: 'bg-green-100 text-green-700 border-green-200', 
          text: '实时连接', 
          icon: Wifi 
        };
      case 'disconnected':
        return { 
          color: 'bg-red-100 text-red-700 border-red-200', 
          text: retryCount >= 5 ? '连接失败' : '重连中...', 
          icon: WifiOff 
        };
      default:
        return { 
          color: 'bg-gray-100 text-gray-700 border-gray-200', 
          text: '未知状态', 
          icon: WifiOff 
        };
    }
  };

  // 格式化数据传输量
  const formatBytes = (bytes: number) => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const connectionInfo = getConnectionInfo();
  const ConnectionIcon = connectionInfo.icon;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className={`${isFullscreen ? 'max-w-full w-screen h-screen' : 'max-w-4xl w-[90vw] h-[80vh]'} bg-white rounded-3xl border-0 shadow-xl p-0 overflow-hidden`}>
        <DialogHeader className="p-6 pb-4 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <DialogTitle className="flex items-center gap-3 text-lg font-bold text-gray-800">
              <div className="bg-gradient-to-r from-orange-400 to-yellow-500 p-2 rounded-xl">
                <Camera className="h-5 w-5 text-white" />
              </div>
              智能硬件实时监控
            </DialogTitle>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className={`rounded-full px-3 py-1 ${connectionInfo.color}`}>
                <ConnectionIcon className="h-3 w-3 mr-1" />
                {connectionInfo.text}
              </Badge>
              {connectionStats && (
                <Badge variant="outline" className="rounded-full px-2 py-1 text-xs">
                  <Signal className="h-3 w-3 mr-1" />
                  {Math.round(connectionStats.roundTripTime * 1000)}ms
                </Badge>
              )}
            </div>
          </div>
          <div className="flex items-center justify-between mt-2">
            <p className="text-sm text-gray-500">
              设备ID: {deviceId} • WebRTC实时传输
            </p>
            {connectionStats && (
              <p className="text-xs text-gray-400">
                接收: {formatBytes(connectionStats.bytesReceived)} • 
                丢包: {connectionStats.packetsLost}
              </p>
            )}
          </div>
        </DialogHeader>

        <div className="flex-1 relative bg-black">
          {connectionStatus === 'connecting' ? (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-900">
              <div className="text-center text-white">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
                <p className="text-lg font-medium">正在连接智能硬件...</p>
                <p className="text-sm text-gray-300 mt-2">
                  {retryCount > 1 ? `第${retryCount}次重试` : '建立WebRTC连接中'}
                </p>
                <div className="mt-4 bg-gray-800 rounded-lg p-3 text-xs">
                  <p>• 正在连接信令服务器</p>
                  <p>• 等待硬件设备响应</p>
                  <p>• 建立P2P视频连接</p>
                </div>
              </div>
            </div>
          ) : connectionStatus === 'disconnected' ? (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-900">
              <div className="text-center text-white">
                <VideoOff className="h-16 w-16 mx-auto mb-4 text-gray-400" />
                <p className="text-lg font-medium">
                  {retryCount >= 5 ? '连接失败' : '连接中断'}
                </p>
                <p className="text-sm text-gray-300 mt-2">
                  {retryCount >= 5 
                    ? '无法连接到智能硬件设备，请检查设备状态' 
                    : '正在尝试重新连接...'}
                </p>
                <div className="mt-4 space-x-2">
                  <Button 
                    onClick={manualReconnect}
                    className="bg-orange-500 hover:bg-orange-600 text-white rounded-xl"
                    disabled={connectionStatus === 'connecting'}
                  >
                    <RotateCcw className="h-4 w-4 mr-2" />
                    重新连接
                  </Button>
                </div>
                {retryCount >= 5 && (
                  <div className="mt-4 bg-red-900/50 rounded-lg p-3 text-xs">
                    <p>• 检查智能硬件设备是否在线</p>
                    <p>• 确认网络连接是否正常</p>
                    <p>• 联系技术支持获取帮助</p>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <>
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted={isMuted}
                className={`w-full h-full object-cover ${!isVideoEnabled ? 'opacity-0' : ''}`}
              />
              {!isVideoEnabled && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-900">
                  <div className="text-center text-white">
                    <VideoOff className="h-16 w-16 mx-auto mb-4 text-gray-400" />
                    <p className="text-lg font-medium">视频已暂停</p>
                  </div>
                </div>
              )}
              
              {/* 视频控制栏 */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={toggleVideo}
                      className="text-white hover:bg-white/20 rounded-xl"
                    >
                      {isVideoEnabled ? <Video className="h-5 w-5" /> : <VideoOff className="h-5 w-5" />}
                    </Button>
                    
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={toggleAudio}
                      className="text-white hover:bg-white/20 rounded-xl"
                    >
                      {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
                    </Button>
                    
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={manualReconnect}
                      className="text-white hover:bg-white/20 rounded-xl"
                      disabled={connectionStatus === 'connecting'}
                    >
                      <RotateCcw className="h-5 w-5" />
                    </Button>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={toggleFullscreen}
                      className="text-white hover:bg-white/20 rounded-xl"
                    >
                      {isFullscreen ? <Minimize2 className="h-5 w-5" /> : <Maximize2 className="h-5 w-5" />}
                    </Button>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LiveVideoStream; 