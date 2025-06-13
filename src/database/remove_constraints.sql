-- 移除场景类型的CHECK约束以支持灵活的场景类型
-- 请在Supabase控制台的SQL编辑器中运行此脚本

-- 1. 删除现有的CHECK约束
ALTER TABLE activity_records DROP CONSTRAINT IF EXISTS activity_records_scene_type_check;

-- 2. 验证约束已被移除
-- 您可以运行以下查询来确认约束已被删除：
-- SELECT conname, contype FROM pg_constraint WHERE conrelid = 'activity_records'::regclass;

-- 3. 测试插入新的场景类型
INSERT INTO activity_records (activity, location, status, device_id, scene_type) VALUES
  ('游泳课程', '社区游泳馆', '进行中', 'smart_device_test_001', 'swimming_lesson'),
  ('美术治疗', '康复中心', '完成', 'smart_device_test_001', 'art_therapy'),
  ('看望爷爷奶奶', '爷爷奶奶家', '愉快', 'smart_device_test_001', 'visiting_grandparents');

-- 4. 验证新数据插入成功
SELECT * FROM activity_records WHERE scene_type IN ('swimming_lesson', 'art_therapy', 'visiting_grandparents') ORDER BY created_at DESC; 