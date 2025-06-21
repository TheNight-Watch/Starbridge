# 🎥 星桥实时视频通信系统操作指南

## 📋 系统概览

### 架构组件
- **家长端应用**: React + TypeScript Web应用
- **智能硬件端**: iOS设备(iPhone原型)
- **信令服务器**: Node.js WebSocket服务器
- **数据后端**: Supabase实时数据库

### 技术栈
- **前端**: React, WebRTC, WebSocket
- **后端**: Node.js, WebSocket (ws)
- **数据库**: Supabase
- **通信协议**: WebRTC + WebSocket信令

---

## 🚀 快速开始

### 1. 启动信令服务器

```bash
# 进入信令服务器目录
cd social-compass-kids/signaling-server

# 安装依赖
npm install

# 启动服务器
npm start

# 或者开发模式(自动重启)
npm run dev
```

服务器启动后会显示：
```
🚀 信令服务器启动于端口 8080
✅ WebRTC信令服务器运行在 http://localhost:8080
📊 健康检查: http://localhost:8080/health
📈 统计信息: http://localhost:8080/stats
```

### 2. 启动家长端应用

```bash
# 在项目根目录
cd social-compass-kids

# 安装依赖(如果还未安装)
npm install

# 启动开发服务器
npm run dev
```

### 3. 配置WebRTC设置

检查 `src/config/webrtcConfig.ts` 文件中的配置：

```typescript
// 开发环境配置
export const developmentConfig: WebRTCConfig = {
  signalingServer: {
    url: 'ws://localhost:8080', // 确保与信令服务器地址一致
    reconnectInterval: 3000,
    maxReconnectAttempts: 5
  },
  // ... 其他配置
};
```

---

## 🔧 使用说明

### 家长端操作步骤

1. **打开安全页面**
   - 在应用中导航到"安全"页面
   - 找到实时视频监控区域

2. **启动视频连接**
   - 点击"查看实时视频"按钮
   - 系统会自动连接到智能硬件设备

3. **连接状态指示**
   - 🟡 **连接中**: 正在建立连接
   - 🟢 **实时连接**: 连接成功，可以查看视频
   - 🔴 **连接失败**: 连接失败，可手动重试

4. **视频控制功能**
   - 📹 **视频开关**: 暂停/恢复视频显示
   - 🔊 **音频开关**: 静音/开启音频
   - 🔄 **重新连接**: 手动重试连接
   - ⛶ **全屏模式**: 切换全屏显示

### 智能硬件端(iPhone)操作

> 注意: 智能硬件端的WebRTC功能需要在iOS应用中实现。以下是需要实现的功能：

1. **设备注册**
   ```swift
   // 连接到信令服务器并注册为硬件设备
   websocket.send(JSON.stringify({
     type: 'register_device',
     clientType: 'hardware_device',
     deviceId: 'smart_device_vision_001'
   }))
   ```

2. **视频流推送**
   - 使用AVFoundation获取摄像头画面
   - 通过WebRTC发送视频流到家长端

3. **响应连接请求**
   - 监听来自家长端的连接请求
   - 建立WebRTC peer connection

---

## 🔍 故障排除

### 常见问题及解决方案

#### 1. 连接失败
**问题**: 显示"连接失败"或"设备不在线"

**解决方案**:
- 确认信令服务器正在运行 (`http://localhost:8080/health`)
- 检查智能硬件设备是否已启动并连接到同一网络
- 查看浏览器控制台和信令服务器日志

#### 2. 视频无法显示
**问题**: 连接成功但看不到视频

**解决方案**:
- 检查智能硬件端是否正确推送视频流
- 确认WebRTC连接状态为"connected"
- 检查浏览器的媒体权限设置

#### 3. 音频问题
**问题**: 视频正常但听不到声音

**解决方案**:
- 点击音频按钮取消静音
- 检查浏览器音频权限
- 确认智能硬件端启用了音频传输

#### 4. 网络连接不稳定
**问题**: 频繁断线重连

**解决方案**:
- 检查网络稳定性
- 调整WebRTC配置中的重连参数
- 考虑使用TURN服务器改善NAT穿透

### 日志查看

#### 浏览器控制台
打开开发者工具查看详细日志：
```
F12 -> Console选项卡
```

关键日志信息：
- `WebRTC服务初始化`
- `信令服务器连接成功`
- `收到远程视频流`
- `WebRTC连接状态变化`

#### 信令服务器日志
```bash
# 查看服务器实时日志
tail -f signaling-server.log

# 或者在开发模式下直接查看控制台输出
```

关键日志信息：
- `新的WebSocket连接建立`
- `设备注册: parent_app`
- `家长端连接到设备`

---

## 📊 监控和统计

### 连接统计信息

在视频界面可以查看实时统计：
- **延迟**: 网络往返时间(RTT)
- **数据接收量**: 已接收的视频数据量
- **丢包数**: 网络丢包统计

### 服务器统计

访问 `http://localhost:8080/stats` 查看：
```json
{
  "clients": 2,
  "rooms": [
    {
      "deviceId": "smart_device_vision_001",
      "parentClients": 1,
      "createdAt": "2024-01-20T10:30:00.000Z"
    }
  ]
}
```

---

## 🛠 开发和调试

### 本地开发环境

1. **启动完整开发环境**
```bash
# 终端1: 启动信令服务器
cd signaling-server && npm run dev

# 终端2: 启动前端应用
cd .. && npm run dev
```

2. **模拟设备连接**
   - 可以使用WebSocket测试工具模拟硬件设备连接
   - 或者创建简单的测试页面

### 测试工具

#### WebSocket测试
使用浏览器扩展或在线工具测试WebSocket连接：
```
URL: ws://localhost:8080
发送消息: {"type":"register_device","clientType":"hardware_device","deviceId":"test_device"}
```

#### WebRTC测试
在浏览器中打开 `chrome://webrtc-internals/` 查看WebRTC连接详情

---

## 🔒 安全配置

### 生产环境部署

1. **HTTPS/WSS**
   - 生产环境必须使用HTTPS和WSS
   - 配置SSL证书

2. **防火墙设置**
   - 开放信令服务器端口(默认8080)
   - 配置STUN/TURN服务器

3. **认证和授权**
   - 添加设备认证机制
   - 实现用户权限控制

### 网络配置

#### STUN/TURN服务器
```typescript
// 生产环境配置示例
iceServers: [
  { urls: 'stun:stun.l.google.com:19302' },
  {
    urls: 'turn:your-turn-server.com:3478',
    username: 'your-username',
    credential: 'your-credential'
  }
]
```

---

## 📱 iOS设备集成指南

### 所需实现的功能

1. **WebRTC集成**
```swift
import WebRTC

class HardwareVideoStreaming {
    private var peerConnection: RTCPeerConnection?
    private var localVideoTrack: RTCVideoTrack?
    
    func startStreaming() {
        // 初始化摄像头
        // 创建WebRTC连接
        // 发送视频流
    }
}
```

2. **信令通信**
```swift
import Starscream

class SignalingClient {
    private var socket: WebSocket?
    
    func connect() {
        socket = WebSocket(url: URL(string: "ws://localhost:8080")!)
        socket?.connect()
    }
    
    func registerDevice() {
        let message = [
            "type": "register_device",
            "clientType": "hardware_device",
            "deviceId": "smart_device_vision_001"
        ]
        socket?.write(string: JSONSerialization.jsonString(message))
    }
}
```

---

## 🆘 支持和帮助

### 常用命令

```bash
# 检查信令服务器状态
curl http://localhost:8080/health

# 查看连接统计
curl http://localhost:8080/stats

# 重启信令服务器
pm2 restart signaling-server

# 查看应用日志
npm run dev -- --verbose
```

### 联系支持

如果遇到技术问题，请提供：
1. 错误日志(浏览器控制台和服务器日志)
2. 网络环境信息
3. 设备型号和操作系统版本
4. 复现步骤描述

---

## 🔄 版本更新

### 当前版本: v1.0.0

**新功能**:
- ✅ WebRTC实时视频传输
- ✅ 自动重连机制
- ✅ 连接状态监控
- ✅ 实时统计信息
- ✅ 全屏模式支持

**计划功能**:
- 🔲 录制功能
- 🔲 多设备连接
- 🔲 视频质量自适应
- 🔲 移动端优化

---

这个系统现在已经具备了完整的实时视频通信能力，可以支持家长端和智能硬件设备之间的实时视频监控。通过WebRTC技术确保了低延迟的视频传输，非常适合实时监护场景。 