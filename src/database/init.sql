-- 创建活动记录表
CREATE TABLE IF NOT EXISTS activity_records (
  id SERIAL PRIMARY KEY,
  timestamp TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  activity VARCHAR(255) NOT NULL,
  location VARCHAR(255) NOT NULL,
  status VARCHAR(100) NOT NULL,
  device_id VARCHAR(100) NOT NULL,
  scene_type VARCHAR(50) NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 创建索引以提升查询性能
CREATE INDEX IF NOT EXISTS idx_activity_records_timestamp ON activity_records(timestamp DESC);
CREATE INDEX IF NOT EXISTS idx_activity_records_device_id ON activity_records(device_id);
CREATE INDEX IF NOT EXISTS idx_activity_records_scene_type ON activity_records(scene_type);

-- 插入一些初始测试数据
INSERT INTO activity_records (timestamp, activity, location, status, device_id, scene_type) VALUES
  (NOW() - INTERVAL '30 minutes', '到达公园', '中心公园', '安全', 'smart_device_001', 'arrive_park'),
  (NOW() - INTERVAL '45 minutes', '离开家', '家', '正常', 'smart_device_001', 'leave_home'),
  (NOW() - INTERVAL '75 minutes', '午餐时间', '家', '完成', 'smart_device_001', 'lunch_time'),
  (NOW() - INTERVAL '90 minutes', '学习时间', '家', '完成', 'smart_device_001', 'study_time'),
  (NOW() - INTERVAL '120 minutes', '进入教室', '学校教室', '安全', 'smart_device_001', 'enter_classroom');

-- 为实时功能启用Row Level Security (RLS)
ALTER TABLE activity_records ENABLE ROW LEVEL SECURITY;

-- 创建允许所有操作的策略（在生产环境中应该更严格）
CREATE POLICY "允许所有用户访问活动记录" ON activity_records
FOR ALL USING (true);

-- 注意：Supabase的实时功能通常默认启用
-- 如果实时功能不工作，可以在Supabase控制台中：
-- 1. 进入 Database → Tables
-- 2. 找到 activity_records 表
-- 3. 确认 "Enable Realtime" 选项已开启

-- 或者运行以下命令（仅在需要时使用）：
-- ALTER publication supabase_realtime ADD TABLE activity_records; 