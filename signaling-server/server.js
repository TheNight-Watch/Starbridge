/**
 * WebRTC信令服务器
 * 用于协调智能硬件设备和家长端应用之间的连接
 */

const WebSocket = require('ws');
const http = require('http');

const PORT = process.env.PORT || 8080;

// 创建HTTP服务器
const server = http.createServer();

// 创建WebSocket服务器
const wss = new WebSocket.Server({ server });

// 存储连接的客户端
const clients = new Map();
const rooms = new Map();

console.log(`🚀 信令服务器启动于端口 ${PORT}`);

wss.on('connection', (ws, req) => {
  console.log('新的WebSocket连接建立');
  
  // 为每个连接分配唯一ID
  const clientId = generateClientId();
  clients.set(clientId, {
    ws,
    id: clientId,
    type: null,
    deviceId: null,
    connectedAt: new Date()
  });

  // 发送连接确认
  ws.send(JSON.stringify({
    type: 'connection_established',
    clientId: clientId
  }));

  ws.on('message', (message) => {
    try {
      const data = JSON.parse(message);
      handleMessage(clientId, data);
    } catch (error) {
      console.error('解析消息失败:', error);
      sendError(clientId, '无效的消息格式');
    }
  });

  ws.on('close', () => {
    console.log(`客户端断开连接: ${clientId}`);
    handleClientDisconnect(clientId);
  });

  ws.on('error', (error) => {
    console.error(`WebSocket错误 (${clientId}):`, error);
  });
});

// 处理客户端消息
function handleMessage(clientId, data) {
  const client = clients.get(clientId);
  if (!client) return;

  console.log(`收到消息 [${client.type || '未知'}/${clientId}]:`, data.type);

  switch (data.type) {
    case 'register_device':
      handleDeviceRegistration(clientId, data);
      break;
    
    case 'connect_device':
      handleDeviceConnection(clientId, data);
      break;
    
    case 'offer':
      forwardToDevice(data.deviceId, { ...data, from: clientId });
      break;
    
    case 'answer':
      forwardToParent(data.deviceId, { ...data, from: clientId });
      break;
    
    case 'ice_candidate':
      forwardMessage(clientId, data);
      break;
    
    case 'device_status':
      broadcastDeviceStatus(clientId, data);
      break;
    
    default:
      console.log(`未知消息类型: ${data.type}`);
  }
}

// 处理设备注册
function handleDeviceRegistration(clientId, data) {
  const client = clients.get(clientId);
  if (!client) return;

  client.type = data.clientType; // 'hardware_device' 或 'parent_app'
  client.deviceId = data.deviceId;

  console.log(`设备注册: ${data.clientType} - ${data.deviceId}`);

  // 如果是硬件设备，创建或加入房间
  if (data.clientType === 'hardware_device') {
    if (!rooms.has(data.deviceId)) {
      rooms.set(data.deviceId, {
        hardwareClient: clientId,
        parentClients: new Set(),
        createdAt: new Date()
      });
    }
  }

  // 发送注册确认
  client.ws.send(JSON.stringify({
    type: 'registration_confirmed',
    clientId: clientId,
    deviceId: data.deviceId
  }));
}

// 处理设备连接请求
function handleDeviceConnection(clientId, data) {
  const client = clients.get(clientId);
  if (!client) return;

  const room = rooms.get(data.deviceId);
  if (!room) {
    sendError(clientId, `设备 ${data.deviceId} 不在线`);
    return;
  }

  // 将家长端添加到房间
  if (data.clientType === 'parent_app') {
    room.parentClients.add(clientId);
    client.deviceId = data.deviceId;

    console.log(`家长端连接到设备: ${data.deviceId}`);

    // 通知硬件设备有新的家长端连接
    const hardwareClient = clients.get(room.hardwareClient);
    if (hardwareClient && hardwareClient.ws.readyState === WebSocket.OPEN) {
      hardwareClient.ws.send(JSON.stringify({
        type: 'parent_connected',
        parentId: clientId,
        deviceId: data.deviceId
      }));
    }

    // 通知家长端连接成功
    client.ws.send(JSON.stringify({
      type: 'device_connected',
      deviceId: data.deviceId,
      status: 'ready'
    }));
  }
}

// 转发消息到指定设备
function forwardToDevice(deviceId, message) {
  const room = rooms.get(deviceId);
  if (!room) return;

  const hardwareClient = clients.get(room.hardwareClient);
  if (hardwareClient && hardwareClient.ws.readyState === WebSocket.OPEN) {
    hardwareClient.ws.send(JSON.stringify(message));
  }
}

// 转发消息到家长端
function forwardToParent(deviceId, message) {
  const room = rooms.get(deviceId);
  if (!room) return;

  room.parentClients.forEach(parentId => {
    const parentClient = clients.get(parentId);
    if (parentClient && parentClient.ws.readyState === WebSocket.OPEN) {
      parentClient.ws.send(JSON.stringify(message));
    }
  });
}

// 转发消息
function forwardMessage(fromClientId, data) {
  const fromClient = clients.get(fromClientId);
  if (!fromClient) return;

  const room = rooms.get(fromClient.deviceId);
  if (!room) return;

  // 根据发送者类型转发到对应的接收者
  if (fromClient.type === 'hardware_device') {
    // 硬件设备发送，转发给所有连接的家长端
    room.parentClients.forEach(parentId => {
      const parentClient = clients.get(parentId);
      if (parentClient && parentClient.ws.readyState === WebSocket.OPEN) {
        parentClient.ws.send(JSON.stringify({ ...data, from: fromClientId }));
      }
    });
  } else if (fromClient.type === 'parent_app') {
    // 家长端发送，转发给硬件设备
    const hardwareClient = clients.get(room.hardwareClient);
    if (hardwareClient && hardwareClient.ws.readyState === WebSocket.OPEN) {
      hardwareClient.ws.send(JSON.stringify({ ...data, from: fromClientId }));
    }
  }
}

// 广播设备状态
function broadcastDeviceStatus(clientId, data) {
  const client = clients.get(clientId);
  if (!client || client.type !== 'hardware_device') return;

  const room = rooms.get(client.deviceId);
  if (!room) return;

  // 向所有连接的家长端广播状态
  room.parentClients.forEach(parentId => {
    const parentClient = clients.get(parentId);
    if (parentClient && parentClient.ws.readyState === WebSocket.OPEN) {
      parentClient.ws.send(JSON.stringify({
        type: 'device_status_update',
        deviceId: client.deviceId,
        status: data.status,
        timestamp: new Date().toISOString()
      }));
    }
  });
}

// 处理客户端断开连接
function handleClientDisconnect(clientId) {
  const client = clients.get(clientId);
  if (!client) return;

  if (client.type === 'hardware_device') {
    // 硬件设备断开，通知所有连接的家长端
    const room = rooms.get(client.deviceId);
    if (room) {
      room.parentClients.forEach(parentId => {
        const parentClient = clients.get(parentId);
        if (parentClient && parentClient.ws.readyState === WebSocket.OPEN) {
          parentClient.ws.send(JSON.stringify({
            type: 'device_disconnected',
            deviceId: client.deviceId
          }));
        }
      });
      rooms.delete(client.deviceId);
    }
  } else if (client.type === 'parent_app') {
    // 家长端断开，从房间中移除
    const room = rooms.get(client.deviceId);
    if (room) {
      room.parentClients.delete(clientId);
    }
  }

  clients.delete(clientId);
}

// 发送错误消息
function sendError(clientId, error) {
  const client = clients.get(clientId);
  if (client && client.ws.readyState === WebSocket.OPEN) {
    client.ws.send(JSON.stringify({
      type: 'error',
      error: error,
      timestamp: new Date().toISOString()
    }));
  }
}

// 生成客户端ID
function generateClientId() {
  return Math.random().toString(36).substr(2, 9);
}

// 定期清理无效连接
setInterval(() => {
  const now = Date.now();
  clients.forEach((client, clientId) => {
    if (client.ws.readyState === WebSocket.CLOSED) {
      console.log(`清理无效连接: ${clientId}`);
      handleClientDisconnect(clientId);
    }
  });
}, 60000); // 每分钟清理一次

// 健康检查端点
server.on('request', (req, res) => {
  if (req.url === '/health') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      status: 'healthy',
      connections: clients.size,
      rooms: rooms.size,
      uptime: process.uptime()
    }));
  } else if (req.url === '/stats') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      clients: clients.size,
      rooms: Array.from(rooms.entries()).map(([deviceId, room]) => ({
        deviceId,
        parentClients: room.parentClients.size,
        createdAt: room.createdAt
      }))
    }));
  } else {
    res.writeHead(404);
    res.end('Not Found');
  }
});

// 启动服务器
server.listen(PORT, () => {
  console.log(`✅ WebRTC信令服务器运行在 http://localhost:${PORT}`);
  console.log(`📊 健康检查: http://localhost:${PORT}/health`);
  console.log(`📈 统计信息: http://localhost:${PORT}/stats`);
}); 