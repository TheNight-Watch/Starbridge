import { createClient } from '@supabase/supabase-js'

// 从环境变量获取配置，如果没有则使用占位符
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://your-project.supabase.co'
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'your-anon-key'

export const supabase = createClient(supabaseUrl, supabaseKey, {
  realtime: {
    params: {
      eventsPerSecond: 10
    }
  }
})

// 数据库表结构定义
export interface ActivityRecord {
  id?: number
  timestamp: string
  activity: string
  location: string
  status: string
  device_id: string
  scene_type: 'enter_classroom' | 'leave_home' | 'arrive_park' | 'lunch_time' | 'study_time' | 'exercise' | 'rest'
  created_at?: string
}

// 实时监听活动记录的类型
export type ActivityRecordUpdate = {
  eventType: 'INSERT' | 'UPDATE' | 'DELETE'
  new?: ActivityRecord
  old?: ActivityRecord
} 