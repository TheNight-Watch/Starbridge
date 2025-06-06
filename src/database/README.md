# 智能硬件活动记录系统 - 数据库设置指南

## 概述

本系统实现了智能硬件设备上传场景数据到Supabase数据库，移动应用实时渲染活动记录的功能。

## 系统架构

```
智能硬件设备 → Supabase数据库 → 移动应用(实时更新)
```

## 设置步骤

### 1. 创建Supabase项目

1. 访问 [Supabase](https://supabase.com) 并创建新项目
2. 记录项目URL和API密钥

### 2. 配置数据库

1. 在Supabase控制台的SQL编辑器中运行 `init.sql` 脚本
2. 确保表创建成功并包含初始数据

### 3. 启用实时功能

**重要**：Supabase的实时功能默认已启用，无需额外配置Replication。

1. 在Supabase控制台中，进入 **Database → Tables**
2. 找到 `activity_records` 表
3. 点击表设置，确认"Enable Realtime"选项已开启
4. 或者运行以下SQL命令（可选）：
   ```sql
   -- 这个命令是可选的，大多数情况下实时功能已经默认启用
   -- ALTER publication supabase_realtime ADD TABLE activity_records;
   ```

**注意**：如果您的项目较新，实时功能应该默认工作。不需要手动配置Replication功能。

### 4. 更新应用配置

创建 `.env` 文件并配置您的项目信息：

```bash
# 复制配置文件
cp .env.example .env

# 编辑 .env 文件，填入您的项目信息
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

## 数据表结构

### activity_records 表

| 字段 | 类型 | 描述 |
|------|------|------|
| id | SERIAL | 主键 |
| timestamp | TIMESTAMPTZ | 活动时间戳 |
| activity | VARCHAR(255) | 活动描述 |
| location | VARCHAR(255) | 活动位置 |
| status | VARCHAR(100) | 活动状态 |
| device_id | VARCHAR(100) | 设备ID |
| scene_type | VARCHAR(50) | 场景类型 |
| created_at | TIMESTAMPTZ | 记录创建时间 |

### 支持的场景类型

**灵活场景类型系统**：现在支持任意场景类型，不再限制为预定义值。智能硬件可以上传任何场景类型，应用会自动匹配合适的图标。

**预定义场景类型**（推荐使用）：
- `enter_classroom`: 进入教室
- `leave_classroom`: 离开教室  
- `leave_home`: 离开家
- `arrive_home`: 到达家
- `arrive_park`: 到达公园
- `lunch_time`: 午餐时间
- `study_time`: 学习时间
- `exercise`: 运动时间
- `rest`: 休息时间
- `play_time`: 游戏时间
- `meet_friend`: 见朋友
- `group_activity`: 集体活动
- `medical_checkup`: 体检
- `therapy_session`: 治疗课程
- `take_bus`: 乘坐公交
- `walk`: 步行

**自定义场景类型**：
系统支持任意自定义场景类型。应用会通过关键词智能匹配图标：
- 包含 "classroom" 或 "school" → 显示教育图标
- 包含 "park" → 显示位置图标  
- 包含 "home" → 显示家庭图标
- 包含 "exercise" 或 "sport" → 显示运动图标
- 包含 "medical" 或 "doctor" → 显示医疗图标
- 包含 "friend" 或 "social" → 显示社交图标
- 其他未匹配类型 → 显示默认时钟图标

**示例自定义场景类型**：
```javascript
// 这些都是有效的场景类型
"swimming_lesson"        // 会匹配到运动图标
"visiting_grandparents"  // 会显示默认图标
"art_therapy"           // 会匹配到治疗图标
"playground_activity"   // 会匹配到游戏图标
"school_pickup"         // 会匹配到教育图标
```

## 智能硬件集成

智能硬件设备可以通过以下方式上传数据：

### HTTP API方式

```bash
curl -X POST 'https://your-project.supabase.co/rest/v1/activity_records' \
  -H "apikey: your-anon-key" \
  -H "Authorization: Bearer your-anon-key" \
  -H "Content-Type: application/json" \
  -d '{
    "timestamp": "2024-01-15T14:30:00Z",
    "activity": "进入教室",
    "location": "学校教室",
    "status": "安全",
    "device_id": "smart_device_001",
    "scene_type": "enter_classroom"
  }'
```

### 使用Supabase客户端（如果硬件支持JavaScript）

```javascript
import { createClient } from '@supabase/supabase-js'

const supabase = createClient('your-url', 'your-key')

await supabase.from('activity_records').insert({
  timestamp: new Date().toISOString(),
  activity: '进入教室',
  location: '学校教室',
  status: '安全',
  device_id: 'smart_device_001',
  scene_type: 'enter_classroom'
})
```

## 应用功能

### 实时活动监控

- 自动接收新的活动记录
- 实时更新活动列表
- 显示最后更新时间

### 模拟功能

应用包含模拟按钮，可以测试硬件数据上传功能：

- 进入教室
- 离开家
- 运动时间
- 休息时间

### 数据展示

- 活动图标和颜色编码
- 时间格式化显示
- 位置和状态信息
- 刷新和加载状态

## 实时功能验证

### 测试实时连接

1. 打开浏览器开发者工具
2. 访问安全页面
3. 点击模拟按钮
4. 观察控制台日志，应该看到：
   ```
   收到活动记录更新: {eventType: 'INSERT', new: {...}}
   ```

### 故障排除实时功能

如果实时功能不工作：

1. **检查网络连接**：确保WebSocket连接正常
2. **验证RLS策略**：确认Row Level Security设置正确
3. **查看控制台错误**：检查是否有JavaScript错误
4. **测试API连接**：确认基本的数据库读写功能正常

## 安全性考虑

### 生产环境建议

1. **Row Level Security (RLS)**
   - 实现基于用户的数据访问控制
   - 限制设备只能访问自己的数据

2. **API密钥管理**
   - 使用环境变量存储敏感信息
   - 为不同环境使用不同的密钥

3. **数据验证**
   - 在客户端和服务端都进行数据验证
   - 实现输入清理和SQL注入防护

4. **设备认证**
   - 为每个硬件设备实现唯一认证
   - 使用JWT或类似的安全令牌

## 故障排除

### 常见问题

1. **实时功能不工作**
   - 检查浏览器控制台是否有WebSocket连接错误
   - 确认项目配置的URL和API密钥正确
   - 验证表的RLS策略允许读取操作

2. **连接失败**
   - 验证Supabase URL和API密钥格式正确
   - 检查网络连接和防火墙设置
   - 确认项目状态正常（未暂停）

3. **数据不显示**
   - 确认表中有测试数据
   - 检查数据类型和字段名称匹配
   - 验证时间戳格式正确

### 调试技巧

1. **查看网络请求**：在浏览器开发者工具中检查API调用
2. **监控WebSocket**：观察实时连接状态
3. **使用模拟功能**：通过模拟按钮测试完整流程
4. **查看Supabase日志**：在控制台查看API使用情况

## 快速验证步骤

1. **创建 `.env` 文件**：复制并配置环境变量
2. **运行初始化脚本**：在SQL编辑器中执行 `init.sql`
3. **启动应用**：`npm run dev`
4. **测试功能**：访问安全页面，点击模拟按钮
5. **观察实时更新**：新数据应该立即显示在列表中

## 扩展功能

### 可能的改进

1. **离线支持**
   - 实现本地存储
   - 网络恢复时同步数据

2. **数据分析**
   - 添加活动统计
   - 生成活动报告

3. **通知系统**
   - 异常活动警告
   - 实时推送通知

4. **多设备支持**
   - 支持多个硬件设备
   - 设备管理界面 