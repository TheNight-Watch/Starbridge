import React, { useState, useEffect, useRef } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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
  Camera
} from "lucide-react";

interface LiveVideoStreamProps {
  isOpen: boolean;
  onClose: () => void;
  deviceId?: string;
}

const LiveVideoStream: React.FC<LiveVideoStreamProps> = ({ 
  isOpen, 
  onClose, 
  deviceId = "smart_device_001" 
}) => {
  const [isConnected, setIsConnected] = useState(false);
  const [isVideoEnabled, setIsVideoEnabled] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState<'connecting' | 'connected' | 'disconnected'>('connecting');
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  // 模拟连接状态
  useEffect(() => {
    if (isOpen) {
      setConnectionStatus('connecting');
      
      // 模拟连接过程
      const connectTimer = setTimeout(() => {
        setConnectionStatus('connected');
        setIsConnected(true);
        initializeVideoStream();
      }, 2000);

      return () => {
        clearTimeout(connectTimer);
        cleanup();
      };
    } else {
      cleanup();
    }
  }, [isOpen]);

  // 初始化视频流（模拟摄像头）
  const initializeVideoStream = async () => {
    try {
      // 在实际应用中，这里会连接到硬件设备的视频流
      // 现在我们使用用户的摄像头作为演示
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { 
          width: { ideal: 1280 }, 
          height: { ideal: 720 } 
        }, 
        audio: true 
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        streamRef.current = stream;
      }
    } catch (error) {
      console.error('获取视频流失败:', error);
      setConnectionStatus('disconnected');
      setIsConnected(false);
    }
  };

  // 清理资源
  const cleanup = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    setIsConnected(false);
    setConnectionStatus('disconnected');
  };

  // 切换视频开关
  const toggleVideo = () => {
    if (streamRef.current) {
      const videoTrack = streamRef.current.getVideoTracks()[0];
      if (videoTrack) {
        videoTrack.enabled = !videoTrack.enabled;
        setIsVideoEnabled(videoTrack.enabled);
      }
    }
  };

  // 切换音频开关
  const toggleAudio = () => {
    if (streamRef.current) {
      const audioTrack = streamRef.current.getAudioTracks()[0];
      if (audioTrack) {
        audioTrack.enabled = !audioTrack.enabled;
        setIsMuted(!audioTrack.enabled);
      }
    }
  };

  // 重新连接
  const reconnect = () => {
    cleanup();
    setConnectionStatus('connecting');
    setTimeout(() => {
      initializeVideoStream();
    }, 1000);
  };

  // 获取连接状态颜色和文本
  const getConnectionInfo = () => {
    switch (connectionStatus) {
      case 'connecting':
        return { color: 'bg-yellow-100 text-yellow-700 border-yellow-200', text: '连接中...', icon: Wifi };
      case 'connected':
        return { color: 'bg-green-100 text-green-700 border-green-200', text: '已连接', icon: Wifi };
      case 'disconnected':
        return { color: 'bg-red-100 text-red-700 border-red-200', text: '连接断开', icon: WifiOff };
      default:
        return { color: 'bg-gray-100 text-gray-700 border-gray-200', text: '未知状态', icon: WifiOff };
    }
  };

  const connectionInfo = getConnectionInfo();
  const ConnectionIcon = connectionInfo.icon;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl w-[90vw] h-[80vh] bg-white rounded-3xl border-0 shadow-xl p-0 overflow-hidden">
        <DialogHeader className="p-6 pb-4 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <DialogTitle className="flex items-center gap-3 text-lg font-bold text-gray-800">
              <div className="bg-gradient-to-r from-orange-400 to-yellow-500 p-2 rounded-xl">
                <Camera className="h-5 w-5 text-white" />
              </div>
              即时视频监控
            </DialogTitle>
            <Badge variant="outline" className={`rounded-full px-3 py-1 ${connectionInfo.color}`}>
              <ConnectionIcon className="h-3 w-3 mr-1" />
              {connectionInfo.text}
            </Badge>
          </div>
          <p className="text-sm text-gray-500 mt-2">
            设备ID: {deviceId} • 实时监控孩子的活动状态
          </p>
        </DialogHeader>

        <div className="flex-1 relative bg-black">
          {connectionStatus === 'connecting' ? (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-900">
              <div className="text-center text-white">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
                <p className="text-lg font-medium">正在连接设备...</p>
                <p className="text-sm text-gray-300 mt-2">请稍候，正在建立视频连接</p>
              </div>
            </div>
          ) : connectionStatus === 'disconnected' ? (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-900">
              <div className="text-center text-white">
                <VideoOff className="h-16 w-16 mx-auto mb-4 text-gray-400" />
                <p className="text-lg font-medium">连接失败</p>
                <p className="text-sm text-gray-300 mt-2">无法连接到设备摄像头</p>
                <Button 
                  onClick={reconnect}
                  className="mt-4 bg-orange-500 hover:bg-orange-600 text-white rounded-xl"
                >
                  <RotateCcw className="h-4 w-4 mr-2" />
                  重新连接
                </Button>
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
                    <p className="text-lg font-medium">摄像头已关闭</p>
                  </div>
                </div>
              )}
            </>
          )}

          {/* 控制栏 */}
          {isConnected && (
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
              <div className="flex items-center justify-center space-x-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={toggleVideo}
                  className={`rounded-xl border-white/20 text-white hover:bg-white/20 ${
                    !isVideoEnabled ? 'bg-red-500/80 hover:bg-red-600/80' : 'bg-white/10'
                  }`}
                >
                  {isVideoEnabled ? (
                    <Video className="h-4 w-4" />
                  ) : (
                    <VideoOff className="h-4 w-4" />
                  )}
                </Button>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={toggleAudio}
                  className={`rounded-xl border-white/20 text-white hover:bg-white/20 ${
                    isMuted ? 'bg-red-500/80 hover:bg-red-600/80' : 'bg-white/10'
                  }`}
                >
                  {isMuted ? (
                    <VolumeX className="h-4 w-4" />
                  ) : (
                    <Volume2 className="h-4 w-4" />
                  )}
                </Button>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={reconnect}
                  className="rounded-xl border-white/20 bg-white/10 text-white hover:bg-white/20"
                >
                  <RotateCcw className="h-4 w-4" />
                </Button>

                <div className="flex-1"></div>

                <div className="text-xs text-white/80 bg-black/20 px-3 py-1 rounded-full">
                  🔴 实时直播
                </div>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LiveVideoStream; 