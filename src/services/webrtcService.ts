/**
 * WebRTC 视频服务
 * 用于与智能硬件设备建立实时视频通信连接
 */

import { getWebRTCConfig, deviceConfigs, DeviceType } from '@/config/webrtcConfig';

export interface VideoStreamConfig {
  deviceId: string;
  quality: 'low' | 'medium' | 'high' | 'ultra';
  enableAudio: boolean;
  deviceType?: DeviceType;
}

export interface ConnectionStats {
  bytesReceived: number;
  bytesSent: number;
  packetsReceived: number;
  packetsLost: number;
  roundTripTime: number;
  jitter: number;
  connectionState: RTCPeerConnectionState;
}

export class WebRTCVideoService {
  private peerConnection: RTCPeerConnection | null = null;
  private websocket: WebSocket | null = null;
  private localStream: MediaStream | null = null;
  private remoteStream: MediaStream | null = null;
  private config: VideoStreamConfig;
  private webrtcConfig = getWebRTCConfig();
  private reconnectAttempts = 0;
  private reconnectTimer: NodeJS.Timeout | null = null;
  private statsInterval: NodeJS.Timeout | null = null;
  private isConnecting = false;

  // 回调函数
  private onRemoteStreamCallback?: (stream: MediaStream) => void;
  private onConnectionStateCallback?: (state: RTCPeerConnectionState) => void;
  private onStatsCallback?: (stats: ConnectionStats) => void;
  private onErrorCallback?: (error: Error) => void;

  constructor(config: VideoStreamConfig) {
    this.config = config;
    console.log('WebRTC服务初始化:', config);
  }

  // 设置远程流回调
  onRemoteStream(callback: (stream: MediaStream) => void) {
    this.onRemoteStreamCallback = callback;
  }

  // 设置连接状态回调
  onConnectionStateChange(callback: (state: RTCPeerConnectionState) => void) {
    this.onConnectionStateCallback = callback;
  }

  // 设置统计数据回调
  onStats(callback: (stats: ConnectionStats) => void) {
    this.onStatsCallback = callback;
  }

  // 设置错误回调
  onError(callback: (error: Error) => void) {
    this.onErrorCallback = callback;
  }

  // 连接到设备
  async connectToDevice(): Promise<boolean> {
    if (this.isConnecting) {
      console.log('正在连接中，跳过重复连接请求');
      return false;
    }

    this.isConnecting = true;
    
    try {
      console.log(`开始连接设备: ${this.config.deviceId}`);
      
      // 1. 建立WebSocket连接到信令服务器
      await this.connectSignalingServer();
      
      // 2. 初始化RTCPeerConnection
      await this.initializePeerConnection();
      
      // 3. 发送连接请求到硬件设备
      this.sendSignalingMessage({
        type: 'connect_device',
        deviceId: this.config.deviceId,
        clientType: 'parent_app'
      });

      // 4. 开始收集连接统计
      this.startStatsCollection();

      this.isConnecting = false;
      return true;

    } catch (error) {
      console.error('连接设备失败:', error);
      this.isConnecting = false;
      this.onErrorCallback?.(error as Error);
      return false;
    }
  }

  // 连接信令服务器
  private async connectSignalingServer(): Promise<void> {
    return new Promise((resolve, reject) => {
      try {
        this.websocket = new WebSocket(this.webrtcConfig.signalingServer.url);
        
        this.websocket.onopen = () => {
          console.log('信令服务器连接成功');
          this.reconnectAttempts = 0;
          resolve();
        };

        this.websocket.onmessage = (event) => {
          this.handleSignalingMessage(JSON.parse(event.data));
        };

        this.websocket.onclose = () => {
          console.log('信令服务器连接关闭');
          this.handleSignalingDisconnect();
        };

        this.websocket.onerror = (error) => {
          console.error('信令服务器连接错误:', error);
          reject(new Error('信令服务器连接失败'));
        };

        // 连接超时
        setTimeout(() => {
          if (this.websocket?.readyState !== WebSocket.OPEN) {
            reject(new Error('信令服务器连接超时'));
          }
        }, 10000);

      } catch (error) {
        reject(error);
      }
    });
  }

  // 初始化RTCPeerConnection
  private async initializePeerConnection(): Promise<void> {
    const configuration: RTCConfiguration = {
      iceServers: this.webrtcConfig.iceServers,
      iceCandidatePoolSize: 10
    };

    this.peerConnection = new RTCPeerConnection(configuration);

    // 监听连接状态变化
    this.peerConnection.onconnectionstatechange = () => {
      const state = this.peerConnection?.connectionState;
      console.log('连接状态变化:', state);
      if (state) {
        this.onConnectionStateCallback?.(state);
        
        if (state === 'failed' || state === 'disconnected') {
          this.handleConnectionFailure();
        }
      }
    };

    // 监听ICE候选
    this.peerConnection.onicecandidate = (event) => {
      if (event.candidate) {
        this.sendSignalingMessage({
          type: 'ice_candidate',
          candidate: event.candidate,
          deviceId: this.config.deviceId
        });
      }
    };

    // 监听远程流
    this.peerConnection.ontrack = (event) => {
      console.log('收到远程轨道:', event.track.kind);
      const [remoteStream] = event.streams;
      if (remoteStream) {
        this.remoteStream = remoteStream;
        this.onRemoteStreamCallback?.(remoteStream);
      }
    };

    console.log('RTCPeerConnection 初始化完成');
  }

  // 处理信令消息
  private async handleSignalingMessage(message: any) {
    console.log('收到信令消息:', message.type);

    try {
      switch (message.type) {
        case 'device_connected':
          console.log('设备已连接，等待offer');
          break;

        case 'offer':
          await this.handleOffer(message.offer);
          break;

        case 'answer':
          await this.handleAnswer(message.answer);
          break;

        case 'ice_candidate':
          await this.handleIceCandidate(message.candidate);
          break;

        case 'device_disconnected':
          console.log('设备已断开连接');
          this.onConnectionStateCallback?.('disconnected');
          break;

        case 'error':
          console.error('信令错误:', message.error);
          this.onErrorCallback?.(new Error(message.error));
          break;

        default:
          console.log('未知信令消息类型:', message.type);
      }
    } catch (error) {
      console.error('处理信令消息失败:', error);
      this.onErrorCallback?.(error as Error);
    }
  }

  // 处理Offer
  private async handleOffer(offer: RTCSessionDescriptionInit) {
    if (!this.peerConnection) return;

    await this.peerConnection.setRemoteDescription(offer);
    
    // 创建Answer
    const answer = await this.peerConnection.createAnswer();
    await this.peerConnection.setLocalDescription(answer);
    
    // 发送Answer
    this.sendSignalingMessage({
      type: 'answer',
      answer: answer,
      deviceId: this.config.deviceId
    });
  }

  // 处理Answer
  private async handleAnswer(answer: RTCSessionDescriptionInit) {
    if (!this.peerConnection) return;
    await this.peerConnection.setRemoteDescription(answer);
  }

  // 处理ICE候选
  private async handleIceCandidate(candidate: RTCIceCandidateInit) {
    if (!this.peerConnection) return;
    await this.peerConnection.addIceCandidate(candidate);
  }

  // 发送信令消息
  private sendSignalingMessage(message: any) {
    if (this.websocket?.readyState === WebSocket.OPEN) {
      this.websocket.send(JSON.stringify(message));
    } else {
      console.error('信令服务器未连接，无法发送消息');
    }
  }

  // 处理信令服务器断开
  private handleSignalingDisconnect() {
    if (this.reconnectAttempts < this.webrtcConfig.signalingServer.maxReconnectAttempts) {
      this.reconnectAttempts++;
      console.log(`尝试重连信令服务器 (${this.reconnectAttempts}/${this.webrtcConfig.signalingServer.maxReconnectAttempts})`);
      
      this.reconnectTimer = setTimeout(() => {
        this.connectSignalingServer().catch(console.error);
      }, this.webrtcConfig.signalingServer.reconnectInterval);
    } else {
      console.error('信令服务器重连次数已达上限');
      this.onConnectionStateCallback?.('failed');
    }
  }

  // 处理连接失败
  private handleConnectionFailure() {
    console.log('WebRTC连接失败，尝试重新连接');
    // 可以在这里实现重连逻辑
  }

  // 开始收集统计数据
  private startStatsCollection() {
    if (this.statsInterval) {
      clearInterval(this.statsInterval);
    }

    this.statsInterval = setInterval(async () => {
      if (this.peerConnection && this.peerConnection.connectionState === 'connected') {
        try {
          const stats = await this.collectConnectionStats();
          this.onStatsCallback?.(stats);
        } catch (error) {
          console.error('收集统计数据失败:', error);
        }
      }
    }, 2000); // 每2秒收集一次
  }

  // 收集连接统计
  private async collectConnectionStats(): Promise<ConnectionStats> {
    if (!this.peerConnection) {
      throw new Error('PeerConnection 未初始化');
    }

    const stats = await this.peerConnection.getStats();
    let bytesReceived = 0;
    let bytesSent = 0;
    let packetsReceived = 0;
    let packetsLost = 0;
    let roundTripTime = 0;
    let jitter = 0;

    stats.forEach((report) => {
      if (report.type === 'inbound-rtp' && report.mediaType === 'video') {
        bytesReceived += report.bytesReceived || 0;
        packetsReceived += report.packetsReceived || 0;
        packetsLost += report.packetsLost || 0;
        jitter = report.jitter || 0;
      }
      
      if (report.type === 'outbound-rtp' && report.mediaType === 'video') {
        bytesSent += report.bytesSent || 0;
      }
      
      if (report.type === 'candidate-pair' && report.state === 'succeeded') {
        roundTripTime = report.currentRoundTripTime || 0;
      }
    });

    return {
      bytesReceived,
      bytesSent,
      packetsReceived,
      packetsLost,
      roundTripTime,
      jitter,
      connectionState: this.peerConnection.connectionState
    };
  }

  // 获取设备信息
  getDeviceInfo() {
    const deviceType = this.config.deviceType || 'smart_device_vision_001';
    return deviceConfigs[deviceType] || deviceConfigs['smart_device_vision_001'];
  }

  // 停止视频流
  async stopStream(): Promise<void> {
    console.log('停止视频流');

    // 清理定时器
    if (this.reconnectTimer) {
      clearTimeout(this.reconnectTimer);
      this.reconnectTimer = null;
    }

    if (this.statsInterval) {
      clearInterval(this.statsInterval);
      this.statsInterval = null;
    }

    // 关闭WebSocket
    if (this.websocket) {
      this.websocket.close();
      this.websocket = null;
    }

    // 停止本地流
    if (this.localStream) {
      this.localStream.getTracks().forEach(track => track.stop());
      this.localStream = null;
    }

    // 关闭PeerConnection
    if (this.peerConnection) {
      this.peerConnection.close();
      this.peerConnection = null;
    }

    // 清理状态
    this.remoteStream = null;
    this.isConnecting = false;
    this.reconnectAttempts = 0;

    console.log('视频流已停止，资源已清理');
  }
} 