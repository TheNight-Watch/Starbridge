import { supabase, ActivityRecord, ActivityRecordUpdate } from '@/lib/supabase'
import { RealtimeChannel } from '@supabase/supabase-js'

class ActivityService {
  private channel: RealtimeChannel | null = null

  // 获取最新的活动记录
  async getRecentActivities(limit: number = 10): Promise<ActivityRecord[]> {
    try {
      const { data, error } = await supabase
        .from('activity_records')
        .select('*')
        .order('timestamp', { ascending: false })
        .limit(limit)

      if (error) {
        console.error('获取活动记录失败:', error)
        return this.getMockData() // 如果数据库连接失败，返回模拟数据
      }

      return data || []
    } catch (error) {
      console.error('活动服务错误:', error)
      return this.getMockData()
    }
  }

  // 添加新的活动记录 (模拟智能硬件上传)
  async addActivity(activity: Omit<ActivityRecord, 'id' | 'created_at'>): Promise<ActivityRecord | null> {
    try {
      const { data, error } = await supabase
        .from('activity_records')
        .insert([activity])
        .select()
        .single()

      if (error) {
        console.error('添加活动记录失败:', error)
        return null
      }

      return data
    } catch (error) {
      console.error('添加活动记录错误:', error)
      return null
    }
  }

  // 实时监听活动记录变化
  subscribeToActivities(callback: (update: ActivityRecordUpdate) => void): () => void {
    try {
      this.channel = supabase
        .channel('activity_records_changes')
        .on(
          'postgres_changes',
          {
            event: '*',
            schema: 'public',
            table: 'activity_records'
          },
          (payload) => {
            const update: ActivityRecordUpdate = {
              eventType: payload.eventType as 'INSERT' | 'UPDATE' | 'DELETE',
              new: payload.new as ActivityRecord,
              old: payload.old as ActivityRecord
            }
            callback(update)
          }
        )
        .subscribe()

      // 返回取消订阅函数
      return () => {
        if (this.channel) {
          supabase.removeChannel(this.channel)
          this.channel = null
        }
      }
    } catch (error) {
      console.error('订阅活动记录变化失败:', error)
      return () => {} // 返回空函数作为占位符
    }
  }

  // 模拟智能硬件上传场景数据
  async simulateHardwareUpload(sceneType: ActivityRecord['scene_type']): Promise<void> {
    const sceneMap = {
      enter_classroom: {
        activity: '进入教室',
        location: '学校教室',
        status: '安全'
      },
      leave_home: {
        activity: '离开家',
        location: '家',
        status: '正常'
      },
      arrive_park: {
        activity: '到达公园',
        location: '中心公园',
        status: '安全'
      },
      lunch_time: {
        activity: '午餐时间',
        location: '家',
        status: '完成'
      },
      study_time: {
        activity: '学习时间',
        location: '家',
        status: '完成'
      },
      exercise: {
        activity: '运动时间',
        location: '体育馆',
        status: '进行中'
      },
      rest: {
        activity: '休息时间',
        location: '家',
        status: '正常'
      }
    }

    const scene = sceneMap[sceneType]
    const now = new Date().toISOString()

    await this.addActivity({
      timestamp: now,
      activity: scene.activity,
      location: scene.location,
      status: scene.status,
      device_id: 'smart_device_001',
      scene_type: sceneType
    })
  }

  // 模拟数据（当数据库不可用时使用）
  private getMockData(): ActivityRecord[] {
    return [
      {
        id: 1,
        timestamp: new Date(Date.now() - 30 * 60 * 1000).toISOString(), // 30分钟前
        activity: "到达公园",
        location: "中心公园",
        status: "安全",
        device_id: "smart_device_001",
        scene_type: "arrive_park",
        created_at: new Date().toISOString()
      },
      {
        id: 2,
        timestamp: new Date(Date.now() - 45 * 60 * 1000).toISOString(), // 45分钟前
        activity: "离开家",
        location: "家",
        status: "正常",
        device_id: "smart_device_001",
        scene_type: "leave_home",
        created_at: new Date().toISOString()
      },
      {
        id: 3,
        timestamp: new Date(Date.now() - 75 * 60 * 1000).toISOString(), // 75分钟前
        activity: "午餐时间",
        location: "家",
        status: "完成",
        device_id: "smart_device_001",
        scene_type: "lunch_time",
        created_at: new Date().toISOString()
      },
      {
        id: 4,
        timestamp: new Date(Date.now() - 90 * 60 * 1000).toISOString(), // 90分钟前
        activity: "学习时间",
        location: "家",
        status: "完成",
        device_id: "smart_device_001",
        scene_type: "study_time",
        created_at: new Date().toISOString()
      }
    ]
  }
}

export const activityService = new ActivityService() 