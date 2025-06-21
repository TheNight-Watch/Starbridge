/**
 * WebRTC 配置文件
 * 用于配置视频通信的服务器地址和连接参数
 */

export interface WebRTCConfig {
  signalingServer: {
    url: string;
    reconnectInterval: number;
    maxReconnectAttempts: number;
  };
  iceServers: RTCIceServer[];
  videoConstraints: MediaStreamConstraints['video'];
  audioConstraints: MediaStreamConstraints['audio'];
}

// 开发环境配置
export const developmentConfig: WebRTCConfig = {
  signalingServer: {
    url: 'ws://localhost:8080', // 本地信令服务器
    reconnectInterval: 3000,
    maxReconnectAttempts: 5
  },
  iceServers: [
    {
      urls: 'stun:stun.l.google.com:19302'
    },
    {
      urls: 'stun:stun1.l.google.com:19302'
    }
  ],
  videoConstraints: {
    width: { min: 640, ideal: 1280, max: 1920 },
    height: { min: 480, ideal: 720, max: 1080 },
    frameRate: { min: 15, ideal: 30, max: 60 }
  },
  audioConstraints: {
    echoCancellation: true,
    noiseSuppression: true,
    autoGainControl: true
  }
};

// 生产环境配置
export const productionConfig: WebRTCConfig = {
  signalingServer: {
    url: 'wss://your-signaling-server.com', // 生产环境信令服务器
    reconnectInterval: 5000,
    maxReconnectAttempts: 3
  },
  iceServers: [
    {
      urls: 'stun:stun.l.google.com:19302'
    },
    {
      urls: 'turn:your-turn-server.com:3478',
      username: 'your-username',
      credential: 'your-credential'
    }
  ],
  videoConstraints: {
    width: { min: 640, ideal: 1280, max: 1920 },
    height: { min: 480, ideal: 720, max: 1080 },
    frameRate: { min: 15, ideal: 30, max: 60 }
  },
  audioConstraints: {
    echoCancellation: true,
    noiseSuppression: true,
    autoGainControl: true
  }
};

// 根据环境获取配置
export const getWebRTCConfig = (): WebRTCConfig => {
  return process.env.NODE_ENV === 'production' ? productionConfig : developmentConfig;
};

// 硬件设备类型配置
export const deviceConfigs = {
  'smart_device_vision_001': {
    name: '智能视觉设备 V1',
    videoQuality: 'high',
    audioEnabled: true,
    features: ['motion_detection', 'night_vision', 'two_way_audio']
  },
  'iphone_prototype': {
    name: 'iPhone 原型设备',
    videoQuality: 'ultra',
    audioEnabled: true,
    features: ['location_tracking', 'sensor_data', 'emergency_call']
  },
  'raspberry_pi_cam': {
    name: 'Raspberry Pi 摄像头',
    videoQuality: 'medium',
    audioEnabled: false,
    features: ['basic_streaming', 'motion_detection']
  }
};

export type DeviceType = keyof typeof deviceConfigs; 