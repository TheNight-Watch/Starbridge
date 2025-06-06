import { ActivityRecord } from '@/lib/supabase'

/**
 * 智能硬件设备模拟器
 * 模拟真实硬件设备向Supabase上传场景数据的过程
 */
export class HardwareSimulator {
  private deviceId: string
  private supabaseUrl: string
  private supabaseKey: string

  constructor(deviceId: string = 'smart_device_001') {
    this.deviceId = deviceId
    this.supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://your-project.supabase.co'
    this.supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'your-anon-key'
  }

  /**
   * 通过HTTP API上传活动记录
   * 这是硬件设备最常用的方式
   */
  async uploadActivityViaHTTP(activityData: Omit<ActivityRecord, 'id' | 'created_at' | 'device_id'>): Promise<boolean> {
    try {
      const payload = {
        ...activityData,
        device_id: this.deviceId,
        timestamp: activityData.timestamp || new Date().toISOString()
      }

      const response = await fetch(`${this.supabaseUrl}/rest/v1/activity_records`, {
        method: 'POST',
        headers: {
          'apikey': this.supabaseKey,
          'Authorization': `Bearer ${this.supabaseKey}`,
          'Content-Type': 'application/json',
          'Prefer': 'return=minimal'
        },
        body: JSON.stringify(payload)
      })

      if (!response.ok) {
        console.error('硬件上传失败:', response.status, response.statusText)
        return false
      }

      console.log(`✅ 硬件设备 ${this.deviceId} 成功上传活动数据:`, payload.activity)
      return true
    } catch (error) {
      console.error('硬件上传错误:', error)
      return false
    }
  }

  /**
   * 模拟常见的活动场景
   */
  async simulateCommonScenarios(): Promise<void> {
    console.log(`🔄 开始模拟硬件设备 ${this.deviceId} 的日常活动...`)

    const scenarios: Array<Omit<ActivityRecord, 'id' | 'created_at' | 'device_id'>> = [
      {
        timestamp: new Date().toISOString(),
        activity: '设备启动',
        location: '家',
        status: '正常',
        scene_type: 'rest'
      },
      {
        timestamp: new Date(Date.now() + 5000).toISOString(),
        activity: '离开家',
        location: '家门口',
        status: '正常',
        scene_type: 'leave_home'
      },
      {
        timestamp: new Date(Date.now() + 10000).toISOString(),
        activity: '进入教室',
        location: '学校教室',
        status: '安全',
        scene_type: 'enter_classroom'
      }
    ]

    for (let i = 0; i < scenarios.length; i++) {
      await new Promise(resolve => setTimeout(resolve, i * 5000)) // 每5秒上传一次
      await this.uploadActivityViaHTTP(scenarios[i])
    }

    console.log('✅ 硬件设备模拟完成')
  }

  /**
   * 模拟特定场景
   */
  async simulateScenario(sceneType: ActivityRecord['scene_type']): Promise<boolean> {
    const sceneMap = {
      enter_classroom: {
        activity: '进入教室',
        location: '学校教室',
        status: '安全'
      },
      leave_home: {
        activity: '离开家',
        location: '家门口',
        status: '正常'
      },
      arrive_park: {
        activity: '到达公园',
        location: '中心公园',
        status: '安全'
      },
      lunch_time: {
        activity: '午餐时间',
        location: '学校食堂',
        status: '用餐中'
      },
      study_time: {
        activity: '学习时间',
        location: '教室',
        status: '学习中'
      },
      exercise: {
        activity: '运动时间',
        location: '体育馆',
        status: '运动中'
      },
      rest: {
        activity: '休息时间',
        location: '家',
        status: '休息中'
      }
    }

    const scene = sceneMap[sceneType]
    
    return await this.uploadActivityViaHTTP({
      timestamp: new Date().toISOString(),
      activity: scene.activity,
      location: scene.location,
      status: scene.status,
      scene_type: sceneType
    })
  }

  /**
   * 模拟批量数据上传
   */
  async batchUpload(activities: Array<Omit<ActivityRecord, 'id' | 'created_at' | 'device_id'>>): Promise<number> {
    let successCount = 0
    
    for (const activity of activities) {
      const success = await this.uploadActivityViaHTTP(activity)
      if (success) successCount++
      
      // 添加小延迟避免请求过于频繁
      await new Promise(resolve => setTimeout(resolve, 100))
    }

    console.log(`📊 批量上传完成: ${successCount}/${activities.length} 条记录成功`)
    return successCount
  }

  /**
   * 检查设备连接状态
   */
  async checkConnection(): Promise<boolean> {
    try {
      const response = await fetch(`${this.supabaseUrl}/rest/v1/activity_records?limit=1`, {
        method: 'HEAD',
        headers: {
          'apikey': this.supabaseKey,
          'Authorization': `Bearer ${this.supabaseKey}`
        }
      })

      const isConnected = response.ok
      console.log(`📡 设备 ${this.deviceId} 连接状态:`, isConnected ? '✅ 在线' : '❌ 离线')
      return isConnected
    } catch (error) {
      console.error('连接检查失败:', error)
      return false
    }
  }
}

// 导出默认实例
export const defaultHardwareSimulator = new HardwareSimulator()

/**
 * 工具函数：快速模拟活动上传
 */
export const quickSimulate = async (sceneType: ActivityRecord['scene_type']): Promise<boolean> => {
  return await defaultHardwareSimulator.simulateScenario(sceneType)
} 