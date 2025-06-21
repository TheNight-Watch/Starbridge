# 智能硬件视频通信系统 - 完整操作指南

## 📋 系统概述

本系统实现了家长端应用与智能硬件设备之间的实时视频通信，采用WebRTC技术确保低延迟（100-300ms）的高质量视频传输。

### 🏗️ 系统架构

```
智能硬件设备 ←→ 信令服务器 ←→ 家长端应用
     ↓              ↓              ↓
  摄像头/传感器   消息转发/协商    视频播放/控制
     ↓              ↓              ↓
  WebRTC推送      WebSocket       WebRTC接收
```

## 🔧 技术栈

- **前端**: React + TypeScript + WebRTC
- **信令服务器**: Node.js + WebSocket
- **硬件端**: iOS/Android + WebRTC 或 Python + OpenCV
- **网络协议**: WebRTC (P2P) + WebSocket (信令)

## 📦 部署指南

### 1. 前端应用配置

#### 1.1 安装依赖
```bash
cd social-compass-kids
npm install
```

#### 1.2 配置WebRTC服务器
编辑 `src/config/webrtcConfig.ts`:

```typescript
// 开发环境
export const developmentConfig: WebRTCConfig = {
  signalingServer: {
    url: 'ws://localhost:8080', // 本地信令服务器
    reconnectInterval: 3000,
    maxReconnectAttempts: 5
  },
  iceServers: [
    { urls: 'stun:stun.l.google.com:19302' }
  ]
};

// 生产环境
export const productionConfig: WebRTCConfig = {
  signalingServer: {
    url: 'wss://your-domain.com', // 生产环境信令服务器
    reconnectInterval: 5000,
    maxReconnectAttempts: 3
  },
  iceServers: [
    { urls: 'stun:stun.l.google.com:19302' },
    {
      urls: 'turn:your-turn-server.com:3478',
      username: 'your-username',
      credential: 'your-password'
    }
  ]
};
```

### 2. 信令服务器部署

#### 2.1 创建信令服务器
创建 `signaling-server/server.js`:

```javascript
const WebSocket = require('ws');
const express = require('express');
const https = require('https');
const fs = require('fs');

const app = express();
const port = process.env.PORT || 8080;

// 存储连接的设备
const devices = new Map();
const parentClients = new Map();

// 创建WebSocket服务器
const wss = new WebSocket.Server({ port });

console.log(`信令服务器启动在端口 ${port}`);

wss.on('connection', (ws) => {
  console.log('新的WebSocket连接');

  ws.on('message', (message) => {
    try {
      const data = JSON.parse(message);
      handleMessage(ws, data);
    } catch (error) {
      console.error('消息解析错误:', error);
      ws.send(JSON.stringify({ type: 'error', error: '消息格式错误' }));
    }
  });

  ws.on('close', () => {
    console.log('WebSocket连接关闭');
    // 清理断开的连接
    cleanupConnection(ws);
  });

  ws.on('error', (error) => {
    console.error('WebSocket错误:', error);
  });
});

function handleMessage(ws, data) {
  console.log('收到消息:', data.type);

  switch (data.type) {
    case 'connect_device':
      handleDeviceConnection(ws, data);
      break;
    case 'register_hardware':
      registerHardwareDevice(ws, data);
      break;
    case 'offer':
    case 'answer':
    case 'ice_candidate':
      forwardSignalingMessage(ws, data);
      break;
    default:
      console.log('未知消息类型:', data.type);
  }
}

function handleDeviceConnection(ws, data) {
  const { deviceId, clientType } = data;
  
  if (clientType === 'parent_app') {
    parentClients.set(deviceId, ws);
    ws.deviceId = deviceId;
    ws.clientType = 'parent';
    
    // 检查对应的硬件设备是否在线
    if (devices.has(deviceId)) {
      ws.send(JSON.stringify({ type: 'device_connected', deviceId }));
      // 通知硬件设备有家长端连接
      const hardwareWs = devices.get(deviceId);
      hardwareWs.send(JSON.stringify({ type: 'parent_connected', deviceId }));
    } else {
      ws.send(JSON.stringify({ type: 'device_offline', deviceId }));
    }
  }
}

function registerHardwareDevice(ws, data) {
  const { deviceId, deviceInfo } = data;
  
  devices.set(deviceId, ws);
  ws.deviceId = deviceId;
  ws.clientType = 'hardware';
  
  console.log(`硬件设备注册: ${deviceId}`, deviceInfo);
  
  // 通知对应的家长端设备上线
  if (parentClients.has(deviceId)) {
    const parentWs = parentClients.get(deviceId);
    parentWs.send(JSON.stringify({ type: 'device_connected', deviceId }));
  }
}

function forwardSignalingMessage(ws, data) {
  const { deviceId } = data;
  
  if (ws.clientType === 'parent') {
    // 转发给硬件设备
    const hardwareWs = devices.get(deviceId);
    if (hardwareWs) {
      hardwareWs.send(JSON.stringify(data));
    }
  } else if (ws.clientType === 'hardware') {
    // 转发给家长端
    const parentWs = parentClients.get(deviceId);
    if (parentWs) {
      parentWs.send(JSON.stringify(data));
    }
  }
}

function cleanupConnection(ws) {
  if (ws.deviceId) {
    if (ws.clientType === 'hardware') {
      devices.delete(ws.deviceId);
      // 通知家长端设备离线
      if (parentClients.has(ws.deviceId)) {
        const parentWs = parentClients.get(ws.deviceId);
        parentWs.send(JSON.stringify({ type: 'device_disconnected', deviceId: ws.deviceId }));
      }
    } else if (ws.clientType === 'parent') {
      parentClients.delete(ws.deviceId);
      // 通知硬件设备家长端断开
      if (devices.has(ws.deviceId)) {
        const hardwareWs = devices.get(ws.deviceId);
        hardwareWs.send(JSON.stringify({ type: 'parent_disconnected', deviceId: ws.deviceId }));
      }
    }
  }
}
```

#### 2.2 部署信令服务器
```bash
# 创建项目目录
mkdir signaling-server
cd signaling-server

# 初始化项目
npm init -y

# 安装依赖
npm install ws express

# 启动服务器
node server.js
```

### 3. iOS硬件端实现

#### 3.1 创建iOS项目
```swift
// HardwareVideoService.swift
import Foundation
import WebRTC
import AVFoundation

class HardwareVideoService: NSObject {
    private var peerConnection: RTCPeerConnection?
    private var webSocket: URLSessionWebSocketTask?
    private var localVideoTrack: RTCVideoTrack?
    private var localAudioTrack: RTCAudioTrack?
    private var videoCapturer: RTCCameraVideoCapturer?
    
    private let deviceId = "smart_device_vision_001"
    private let signalingServerURL = "ws://your-server.com:8080"
    
    override init() {
        super.init()
        setupWebRTC()
        connectToSignalingServer()
    }
    
    private func setupWebRTC() {
        let config = RTCConfiguration()
        config.iceServers = [
            RTCIceServer(urlStrings: ["stun:stun.l.google.com:19302"])
        ]
        
        let constraints = RTCMediaConstraints(
            mandatoryConstraints: nil,
            optionalConstraints: ["DtlsSrtpKeyAgreement": "true"]
        )
        
        peerConnection = RTCPeerConnectionFactory().peerConnection(
            with: config,
            constraints: constraints,
            delegate: self
        )
        
        setupLocalMedia()
    }
    
    private func setupLocalMedia() {
        let factory = RTCPeerConnectionFactory()
        
        // 设置视频轨道
        let videoSource = factory.videoSource()
        videoCapturer = RTCCameraVideoCapturer(delegate: videoSource)
        localVideoTrack = factory.videoTrack(with: videoSource, trackId: "video0")
        
        // 设置音频轨道
        let audioSource = factory.audioSource(with: nil)
        localAudioTrack = factory.audioTrack(with: audioSource, trackId: "audio0")
        
        // 添加到PeerConnection
        peerConnection?.add(RTCRtpTransceiver(track: localVideoTrack!, kind: .video))
        peerConnection?.add(RTCRtpTransceiver(track: localAudioTrack!, kind: .audio))
        
        // 开始摄像头捕获
        startCameraCapture()
    }
    
    private func startCameraCapture() {
        guard let capturer = videoCapturer else { return }
        
        let devices = RTCCameraVideoCapturer.captureDevices()
        if let frontCamera = devices.first(where: { $0.position == .front }) {
            let formats = RTCCameraVideoCapturer.supportedFormats(for: frontCamera)
            if let format = formats.first {
                capturer.startCapture(
                    with: frontCamera,
                    format: format,
                    fps: 30
                )
            }
        }
    }
    
    private func connectToSignalingServer() {
        guard let url = URL(string: signalingServerURL) else { return }
        
        let session = URLSession(configuration: .default)
        webSocket = session.webSocketTask(with: url)
        webSocket?.resume()
        
        // 注册硬件设备
        sendSignalingMessage([
            "type": "register_hardware",
            "deviceId": deviceId,
            "deviceInfo": [
                "name": "iPhone智能硬件",
                "capabilities": ["video", "audio", "sensors"]
            ]
        ])
        
        receiveSignalingMessage()
    }
    
    private func sendSignalingMessage(_ message: [String: Any]) {
        guard let data = try? JSONSerialization.data(withJSONObject: message),
              let string = String(data: data, encoding: .utf8) else { return }
        
        webSocket?.send(.string(string)) { error in
            if let error = error {
                print("发送信令消息错误: \(error)")
            }
        }
    }
    
    private func receiveSignalingMessage() {
        webSocket?.receive { [weak self] result in
            switch result {
            case .success(let message):
                if case .string(let text) = message,
                   let data = text.data(using: .utf8),
                   let json = try? JSONSerialization.jsonObject(with: data) as? [String: Any] {
                    self?.handleSignalingMessage(json)
                }
                self?.receiveSignalingMessage()
            case .failure(let error):
                print("接收信令消息错误: \(error)")
            }
        }
    }
    
    private func handleSignalingMessage(_ message: [String: Any]) {
        guard let type = message["type"] as? String else { return }
        
        switch type {
        case "parent_connected":
            print("家长端已连接")
            createOffer()
        case "answer":
            if let answerDict = message["answer"] as? [String: Any] {
                handleAnswer(answerDict)
            }
        case "ice_candidate":
            if let candidateDict = message["candidate"] as? [String: Any] {
                handleIceCandidate(candidateDict)
            }
        default:
            print("未知信令消息: \(type)")
        }
    }
    
    private func createOffer() {
        peerConnection?.offer(for: RTCMediaConstraints(mandatoryConstraints: nil, optionalConstraints: nil)) { [weak self] offer, error in
            if let offer = offer {
                self?.peerConnection?.setLocalDescription(offer) { error in
                    if error == nil {
                        self?.sendSignalingMessage([
                            "type": "offer",
                            "offer": [
                                "type": offer.type.rawValue,
                                "sdp": offer.sdp
                            ],
                            "deviceId": self?.deviceId ?? ""
                        ])
                    }
                }
            }
        }
    }
    
    private func handleAnswer(_ answerDict: [String: Any]) {
        guard let type = answerDict["type"] as? String,
              let sdp = answerDict["sdp"] as? String else { return }
        
        let answer = RTCSessionDescription(type: RTCSdpType(rawValue: type) ?? .answer, sdp: sdp)
        peerConnection?.setRemoteDescription(answer, completionHandler: nil)
    }
    
    private func handleIceCandidate(_ candidateDict: [String: Any]) {
        guard let candidate = candidateDict["candidate"] as? String,
              let sdpMLineIndex = candidateDict["sdpMLineIndex"] as? Int32,
              let sdpMid = candidateDict["sdpMid"] as? String else { return }
        
        let iceCandidate = RTCIceCandidate(sdp: candidate, sdpMLineIndex: sdpMLineIndex, sdpMid: sdpMid)
        peerConnection?.add(iceCandidate)
    }
}

// MARK: - RTCPeerConnectionDelegate
extension HardwareVideoService: RTCPeerConnectionDelegate {
    func peerConnection(_ peerConnection: RTCPeerConnection, didChange stateChanged: RTCSignalingState) {
        print("信令状态变化: \(stateChanged)")
    }
    
    func peerConnection(_ peerConnection: RTCPeerConnection, didAdd stream: RTCMediaStream) {
        print("添加远程流")
    }
    
    func peerConnection(_ peerConnection: RTCPeerConnection, didRemove stream: RTCMediaStream) {
        print("移除远程流")
    }
    
    func peerConnection(_ peerConnection: RTCPeerConnection, didGenerate candidate: RTCIceCandidate) {
        sendSignalingMessage([
            "type": "ice_candidate",
            "candidate": [
                "candidate": candidate.sdp,
                "sdpMLineIndex": candidate.sdpMLineIndex,
                "sdpMid": candidate.sdpMid ?? ""
            ],
            "deviceId": deviceId
        ])
    }
    
    func peerConnection(_ peerConnection: RTCPeerConnection, didChange newState: RTCIceConnectionState) {
        print("ICE连接状态: \(newState)")
    }
    
    func peerConnection(_ peerConnection: RTCPeerConnection, didChange newState: RTCIceGatheringState) {
        print("ICE收集状态: \(newState)")
    }
    
    func peerConnection(_ peerConnection: RTCPeerConnection, didRemove candidates: [RTCIceCandidate]) {
        print("移除ICE候选")
    }
    
    func peerConnectionShouldNegotiate(_ peerConnection: RTCPeerConnection) {
        print("需要重新协商")
    }
}
```

## 🚀 使用指南

### 1. 启动系统

#### 1.1 启动信令服务器
```bash
cd signaling-server
node server.js
```

#### 1.2 启动前端应用
```bash
cd social-compass-kids
npm run dev
```

#### 1.3 启动硬件设备
- iOS设备：运行iOS应用
- 其他设备：运行对应的硬件程序

### 2. 操作流程

#### 2.1 家长端操作
1. 打开应用，进入安全页面
2. 点击"实时视频监控"按钮
3. 系统自动连接到智能硬件设备
4. 等待连接建立（通常3-10秒）
5. 开始接收实时视频流

#### 2.2 视频控制功能
- **视频开关**: 暂停/恢复视频显示
- **音频开关**: 静音/取消静音
- **重新连接**: 手动重连设备
- **全屏模式**: 切换全屏显示
- **连接统计**: 查看延迟和传输数据

### 3. 状态指示器

| 状态 | 颜色 | 说明 |
|------|------|------|
| 连接中... | 黄色 | 正在建立连接 |
| 实时连接 | 绿色 | 连接正常，视频流畅 |
| 重连中... | 红色 | 连接中断，自动重连 |
| 连接失败 | 红色 | 连接失败，需要检查设备 |

## 🔍 故障排除

### 常见问题

#### 1. 连接失败
**可能原因**:
- 信令服务器未启动
- 硬件设备离线
- 网络连接问题

**解决方案**:
- 检查信令服务器状态
- 确认硬件设备在线
- 检查网络连接

#### 2. 视频卡顿
**可能原因**:
- 网络带宽不足
- 设备性能问题
- WebRTC连接质量差

**解决方案**:
- 降低视频质量设置
- 检查网络状况
- 尝试重新连接

#### 3. 音频问题
**可能原因**:
- 硬件设备音频未启用
- 浏览器权限问题
- 音频编解码问题

**解决方案**:
- 检查硬件设备音频配置
- 确认浏览器权限
- 重启应用

## 📊 性能优化

### 1. 网络优化
- 使用TURN服务器处理NAT穿透
- 配置自适应码率
- 启用网络质量监控

### 2. 设备优化
- 合理设置视频分辨率
- 启用硬件编解码
- 优化电池使用

### 3. 用户体验优化
- 实现断线重连
- 添加加载状态提示
- 提供连接质量反馈

## 🔒 安全考虑

### 1. 数据传输安全
- 使用HTTPS/WSS协议
- 启用SRTP加密
- 实施端到端加密

### 2. 设备认证
- 设备唯一标识验证
- 用户身份认证
- 访问权限控制

### 3. 隐私保护
- 本地数据加密存储
- 最小化数据收集
- 遵循隐私法规

## 📞 技术支持

如有技术问题，请联系开发团队或查阅以下资源：
- WebRTC官方文档
- 项目GitHub仓库
- 技术支持邮箱

---

**版本**: v1.0.0  
**更新日期**: 2024年12月  
**作者**: 星桥项目开发团队 