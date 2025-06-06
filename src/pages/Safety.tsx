import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useNavigate } from "react-router-dom";
import LocationMap from "@/components/LocationMap";
import { activityService } from "@/services/activityService";
import { ActivityRecord, ActivityRecordUpdate } from "@/lib/supabase";
import { 
  Heart, 
  Smartphone, 
  MapPin, 
  BarChart3, 
  Settings, 
  User, 
  Shield, 
  Bell,
  BookOpen,
  AlertTriangle,
  Phone,
  Clock,
  FileText,
  Edit3,
  Save,
  RefreshCw,
  Zap
} from "lucide-react";

const Safety = () => {
  const [activeTab, setActiveTab] = useState("safety");
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [activityData, setActivityData] = useState<ActivityRecord[]>([]);
  const [isLoadingActivities, setIsLoadingActivities] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());
  const navigate = useNavigate();

  // 孩子档案数据
  const [profileData, setProfileData] = useState({
    basicInfo: {
      name: "小明",
      age: "8岁",
      gender: "男",
      diagnosisDate: "2023年3月"
    },
    dsm5Level: "二级",
    cognitiveLevel: "边缘智力",
    languageAbility: "有口语但能力有限",
    sensoryProcessing: "感觉过度反应"
  });

  // 场景类型到图标和颜色的映射 - 支持动态扩展
  const getActivityIcon = (sceneType: ActivityRecord['scene_type']) => {
    // 预定义的场景类型映射
    const iconMap: Record<string, { icon: any, color: string }> = {
      // 教育相关
      enter_classroom: { icon: BookOpen, color: "text-blue-600 bg-blue-100" },
      leave_classroom: { icon: BookOpen, color: "text-blue-500 bg-blue-50" },
      study_time: { icon: BookOpen, color: "text-purple-600 bg-purple-100" },
      
      // 位置相关
      arrive_park: { icon: MapPin, color: "text-green-600 bg-green-100" },
      leave_home: { icon: Clock, color: "text-blue-600 bg-blue-100" },
      arrive_home: { icon: Heart, color: "text-pink-600 bg-pink-100" },
      
      // 活动相关
      lunch_time: { icon: Heart, color: "text-orange-600 bg-orange-100" },
      exercise: { icon: Zap, color: "text-red-600 bg-red-100" },
      rest: { icon: Clock, color: "text-gray-600 bg-gray-100" },
      play_time: { icon: Zap, color: "text-yellow-600 bg-yellow-100" },
      
      // 社交相关
      meet_friend: { icon: Heart, color: "text-purple-600 bg-purple-100" },
      group_activity: { icon: Heart, color: "text-indigo-600 bg-indigo-100" },
      
      // 健康相关
      medical_checkup: { icon: Shield, color: "text-red-600 bg-red-100" },
      therapy_session: { icon: Heart, color: "text-teal-600 bg-teal-100" },
      
      // 交通相关
      take_bus: { icon: MapPin, color: "text-blue-600 bg-blue-100" },
      walk: { icon: Clock, color: "text-green-600 bg-green-100" }
    };

    // 如果有精确匹配，直接返回
    if (iconMap[sceneType]) {
      return iconMap[sceneType];
    }

    // 智能匹配：根据关键词推断图标
    const smartMatch = (keyword: string, icon: any, color: string) => {
      if (sceneType.toLowerCase().includes(keyword.toLowerCase())) {
        return { icon, color };
      }
      return null;
    };

    // 尝试智能匹配
    const matches = [
      smartMatch('classroom', BookOpen, "text-blue-600 bg-blue-100"),
      smartMatch('school', BookOpen, "text-blue-600 bg-blue-100"),
      smartMatch('study', BookOpen, "text-purple-600 bg-purple-100"),
      smartMatch('learn', BookOpen, "text-purple-600 bg-purple-100"),
      smartMatch('park', MapPin, "text-green-600 bg-green-100"),
      smartMatch('home', Heart, "text-pink-600 bg-pink-100"),
      smartMatch('arrive', MapPin, "text-green-600 bg-green-100"),
      smartMatch('leave', Clock, "text-blue-600 bg-blue-100"),
      smartMatch('lunch', Heart, "text-orange-600 bg-orange-100"),
      smartMatch('dinner', Heart, "text-orange-600 bg-orange-100"),
      smartMatch('meal', Heart, "text-orange-600 bg-orange-100"),
      smartMatch('exercise', Zap, "text-red-600 bg-red-100"),
      smartMatch('sport', Zap, "text-red-600 bg-red-100"),
      smartMatch('play', Zap, "text-yellow-600 bg-yellow-100"),
      smartMatch('rest', Clock, "text-gray-600 bg-gray-100"),
      smartMatch('sleep', Clock, "text-gray-600 bg-gray-100"),
      smartMatch('friend', Heart, "text-purple-600 bg-purple-100"),
      smartMatch('social', Heart, "text-purple-600 bg-purple-100"),
      smartMatch('medical', Shield, "text-red-600 bg-red-100"),
      smartMatch('doctor', Shield, "text-red-600 bg-red-100"),
      smartMatch('therapy', Heart, "text-teal-600 bg-teal-100"),
      smartMatch('bus', MapPin, "text-blue-600 bg-blue-100"),
      smartMatch('transport', MapPin, "text-blue-600 bg-blue-100"),
      smartMatch('walk', Clock, "text-green-600 bg-green-100")
    ].find(match => match !== null);

    // 返回匹配结果或默认图标
    return matches || { icon: Clock, color: "text-gray-600 bg-gray-100" };
  };

  // 格式化时间显示
  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString('zh-CN', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: false 
    });
  };

  // 加载活动记录
  const loadActivities = async () => {
    setIsLoadingActivities(true);
    try {
      const activities = await activityService.getRecentActivities(8);
      setActivityData(activities);
      setLastUpdated(new Date());
    } catch (error) {
      console.error('加载活动记录失败:', error);
    } finally {
      setIsLoadingActivities(false);
    }
  };

  // 模拟硬件数据上传
  const simulateHardwareData = async (sceneType: ActivityRecord['scene_type']) => {
    try {
      await activityService.simulateHardwareUpload(sceneType);
      // 数据会通过实时订阅自动更新，无需手动刷新
    } catch (error) {
      console.error('模拟硬件数据上传失败:', error);
    }
  };

  // 设置实时订阅和初始数据加载
  useEffect(() => {
    // 初始加载数据
    loadActivities();

    // 设置实时订阅
    const unsubscribe = activityService.subscribeToActivities((update: ActivityRecordUpdate) => {
      console.log('收到活动记录更新:', update);
      
      if (update.eventType === 'INSERT' && update.new) {
        // 新增记录时，添加到列表顶部
        setActivityData(prev => [update.new!, ...prev.slice(0, 7)]); // 保持最多8条记录
        setLastUpdated(new Date());
      } else if (update.eventType === 'UPDATE' && update.new) {
        // 更新记录
        setActivityData(prev => 
          prev.map(item => item.id === update.new!.id ? update.new! : item)
        );
        setLastUpdated(new Date());
      } else if (update.eventType === 'DELETE' && update.old) {
        // 删除记录
        setActivityData(prev => 
          prev.filter(item => item.id !== update.old!.id)
        );
        setLastUpdated(new Date());
      }
    });

    // 清理订阅
    return () => {
      unsubscribe();
    };
  }, []);

  const handleTabNavigation = (tabValue: string) => {
    if (tabValue === "safety") {
      // Stay on current page
      setActiveTab(tabValue);
    } else {
      // Navigate to dashboard with the specific tab
      navigate('/dashboard', { state: { activeTab: tabValue } });
    }
  };

  const handleProfileSave = () => {
    // Save profile data logic would go here
    setIsEditingProfile(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-amber-50 flex flex-col">
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-md border-b border-orange-100 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-orange-400 to-yellow-500 p-3 rounded-2xl shadow-lg">
                <Heart className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-800">小天使守护</h1>
                <p className="text-sm text-orange-600">让爱成长，让关怀相伴</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 rounded-full px-3 py-1">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                设备在线
              </Badge>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content - takes remaining space, with bottom padding for fixed nav */}
      <div className="flex-1 overflow-auto pb-20">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full">
          {/* Tab Content */}
          <div className="container mx-auto px-4 py-6">
            {/* Safety Tab - Default */}
            <TabsContent value="safety" className="space-y-6 mt-0">
              <Card className="bg-white/80 backdrop-blur-sm border-0 rounded-3xl shadow-lg">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center gap-3 text-gray-800 text-lg">
                    <div className="bg-gradient-to-r from-orange-400 to-yellow-500 p-2 rounded-xl">
                      <Shield className="h-5 w-5 text-white" />
                    </div>
                    安全守护
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="bg-white/70 rounded-2xl p-5">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-bold text-gray-800">实时位置</h3>
                      <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 rounded-full px-3 py-1">
                        <MapPin className="h-3 w-3 mr-1" />
                        安全区域内
                      </Badge>
                    </div>
                    <div className="space-y-3">
                      <LocationMap height="250px" />
                      <div className="text-center">
                        <p className="text-gray-800 font-medium">当前位置：家附近公园</p>
                        <p className="text-sm text-gray-600 mt-1">更新时间：2分钟前</p>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Button 
                      variant="outline" 
                      className="flex items-center gap-3 p-4 h-16 rounded-2xl bg-white/70 border-gray-200 hover:bg-orange-50 justify-start"
                      onClick={() => navigate('/history-tracking')}
                    >
                      <div className="bg-blue-100 p-2 rounded-xl">
                        <MapPin className="h-5 w-5 text-blue-600" />
                      </div>
                      <div className="text-left">
                        <div className="font-medium text-gray-800">历史轨迹</div>
                        <div className="text-sm text-gray-500">查看活动路径</div>
                      </div>
                    </Button>

                    <Dialog>
                      <DialogTrigger asChild>
                        <Button 
                          variant="outline" 
                          className="flex items-center gap-3 p-4 h-16 rounded-2xl bg-red-500 hover:bg-red-600 border-0 text-white justify-start"
                        >
                          <div className="bg-white/20 p-2 rounded-xl">
                            <Phone className="h-5 w-5 text-white" />
                          </div>
                          <div className="text-left">
                            <div className="font-medium text-white">紧急呼叫</div>
                            <div className="text-sm text-red-100">一键求助</div>
                          </div>
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="bg-white rounded-3xl border-0 shadow-xl">
                        <DialogHeader>
                          <DialogTitle className="text-center text-lg font-bold text-gray-800">紧急呼叫</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4 py-4">
                          <p className="text-center text-gray-600">请选择呼叫方式，我们将立即为您提供帮助</p>
                          <div className="space-y-3">
                            <Button 
                              className="w-full bg-gradient-to-r from-green-400 to-emerald-500 hover:from-green-500 hover:to-emerald-600 text-white border-0 rounded-2xl h-12 font-medium"
                            >
                              <Phone className="h-4 w-4 mr-2" />
                              呼叫孩子
                            </Button>
                            <Button 
                              className="w-full bg-gradient-to-r from-red-400 to-rose-500 hover:from-red-500 hover:to-rose-600 text-white border-0 rounded-2xl h-12 font-medium"
                            >
                              <AlertTriangle className="h-4 w-4 mr-2" />
                              设备报警
                            </Button>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                </CardContent>
              </Card>

              {/* 活动记录板块 - 集成Supabase实时数据 */}
              <Card className="bg-white/80 backdrop-blur-sm border-0 rounded-3xl shadow-lg">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-3 text-gray-800 text-lg">
                      <div className="bg-gradient-to-r from-orange-400 to-yellow-500 p-2 rounded-xl">
                        <Clock className="h-5 w-5 text-white" />
                      </div>
                      实时活动记录
                    </CardTitle>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={loadActivities}
                        disabled={isLoadingActivities}
                        className="rounded-xl"
                      >
                        <RefreshCw className={`h-4 w-4 mr-2 ${isLoadingActivities ? 'animate-spin' : ''}`} />
                        刷新
                      </Button>
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">
                    最后更新: {lastUpdated.toLocaleTimeString('zh-CN')}
                  </p>
                </CardHeader>
                <CardContent className="space-y-4">
                  {isLoadingActivities ? (
                    <div className="flex items-center justify-center py-8">
                      <RefreshCw className="h-6 w-6 animate-spin text-orange-500" />
                      <span className="ml-2 text-gray-600">加载中...</span>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {activityData.length === 0 ? (
                        <div className="text-center py-8 text-gray-500">
                          暂无活动记录
                        </div>
                      ) : (
                        activityData.map((item, index) => {
                          const { icon: IconComponent, color } = getActivityIcon(item.scene_type);
                          return (
                            <div key={item.id || index} className="flex items-center gap-4 p-4 bg-white/70 rounded-2xl">
                              <div className={`p-2 rounded-xl ${color}`}>
                                <IconComponent className="h-4 w-4" />
                              </div>
                              <div className="flex-1">
                                <div className="flex items-center justify-between">
                                  <span className="font-medium text-gray-800">{item.activity}</span>
                                  <span className="text-sm text-gray-500">{formatTime(item.timestamp)}</span>
                                </div>
                                <div className="flex items-center justify-between mt-1">
                                  <span className="text-sm text-gray-600">{item.location}</span>
                                  <Badge variant="outline" className="text-xs">
                                    {item.status}
                                  </Badge>
                                </div>
                              </div>
                            </div>
                          );
                        })
                      )}
                    </div>
                  )}
                  
                  {/* 模拟硬件数据上传按钮 - 用于测试 */}
                  <div className="mt-6 p-4 bg-blue-50/70 rounded-2xl border border-blue-200">
                    <h4 className="font-medium text-blue-800 mb-3">模拟智能设备数据上传</h4>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => simulateHardwareData('enter_classroom')}
                        className="text-xs"
                      >
                        进入教室
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => simulateHardwareData('leave_home')}
                        className="text-xs"
                      >
                        离开家
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => simulateHardwareData('exercise')}
                        className="text-xs"
                      >
                        运动时间
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => simulateHardwareData('rest')}
                        className="text-xs"
                      >
                        休息时间
                      </Button>
                    </div>
                  </div>
                  
                  <Button 
                    variant="outline"
                    className="w-full mt-4 rounded-2xl bg-white/70 border-gray-200 hover:bg-orange-50"
                    onClick={() => navigate('/history-tracking')}
                  >
                    查看详细记录
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Child Profile Tab */}
            <TabsContent value="profile" className="space-y-6 mt-0">
              <Card className="bg-white/80 backdrop-blur-sm border-0 rounded-3xl shadow-lg">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center justify-between">
                    <div className="flex items-center gap-3 text-gray-800 text-lg">
                      <div className="bg-gradient-to-r from-orange-400 to-yellow-500 p-2 rounded-xl">
                        <User className="h-5 w-5 text-white" />
                      </div>
                      孩子档案
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setIsEditingProfile(!isEditingProfile)}
                      className="rounded-xl"
                    >
                      {isEditingProfile ? (
                        <>
                          <Save className="h-4 w-4 mr-2" />
                          保存
                        </>
                      ) : (
                        <>
                          <Edit3 className="h-4 w-4 mr-2" />
                          编辑
                        </>
                      )}
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* 基本信息 */}
                  <div className="bg-white/70 rounded-2xl p-5">
                    <h3 className="font-bold text-gray-800 mb-4">基本信息</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">姓名</Label>
                        {isEditingProfile ? (
                          <Input 
                            id="name" 
                            value={profileData.basicInfo.name}
                            onChange={(e) => setProfileData({
                              ...profileData,
                              basicInfo: { ...profileData.basicInfo, name: e.target.value }
                            })}
                          />
                        ) : (
                          <p className="text-gray-800 font-medium">{profileData.basicInfo.name}</p>
                        )}
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="age">年龄</Label>
                        {isEditingProfile ? (
                          <Input 
                            id="age" 
                            value={profileData.basicInfo.age}
                            onChange={(e) => setProfileData({
                              ...profileData,
                              basicInfo: { ...profileData.basicInfo, age: e.target.value }
                            })}
                          />
                        ) : (
                          <p className="text-gray-800 font-medium">{profileData.basicInfo.age}</p>
                        )}
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="gender">性别</Label>
                        {isEditingProfile ? (
                          <Select 
                            value={profileData.basicInfo.gender}
                            onValueChange={(value) => setProfileData({
                              ...profileData,
                              basicInfo: { ...profileData.basicInfo, gender: value }
                            })}
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="男">男</SelectItem>
                              <SelectItem value="女">女</SelectItem>
                            </SelectContent>
                          </Select>
                        ) : (
                          <p className="text-gray-800 font-medium">{profileData.basicInfo.gender}</p>
                        )}
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="diagnosisDate">诊断日期</Label>
                        {isEditingProfile ? (
                          <Input 
                            id="diagnosisDate" 
                            value={profileData.basicInfo.diagnosisDate}
                            onChange={(e) => setProfileData({
                              ...profileData,
                              basicInfo: { ...profileData.basicInfo, diagnosisDate: e.target.value }
                            })}
                          />
                        ) : (
                          <p className="text-gray-800 font-medium">{profileData.basicInfo.diagnosisDate}</p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* 专业评估信息 */}
                  <div className="bg-white/70 rounded-2xl p-5">
                    <h3 className="font-bold text-gray-800 mb-4">专业评估信息</h3>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="dsm5Level">DSM-5 诊断严重程度等级</Label>
                        {isEditingProfile ? (
                          <Select 
                            value={profileData.dsm5Level}
                            onValueChange={(value) => setProfileData({ ...profileData, dsm5Level: value })}
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="一级">一级：需要支持</SelectItem>
                              <SelectItem value="二级">二级：需要大量支持</SelectItem>
                              <SelectItem value="三级">三级：需要非常大量的支持</SelectItem>
                            </SelectContent>
                          </Select>
                        ) : (
                          <div className="flex items-center gap-2">
                            <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">
                              {profileData.dsm5Level}
                            </Badge>
                            <span className="text-sm text-gray-600">
                              {profileData.dsm5Level === "一级" && "需要支持"}
                              {profileData.dsm5Level === "二级" && "需要大量支持"}
                              {profileData.dsm5Level === "三级" && "需要非常大量的支持"}
                            </span>
                          </div>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="cognitiveLevel">认知水平</Label>
                        {isEditingProfile ? (
                          <Select 
                            value={profileData.cognitiveLevel}
                            onValueChange={(value) => setProfileData({ ...profileData, cognitiveLevel: value })}
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="极重度智力障碍">极重度智力障碍</SelectItem>
                              <SelectItem value="重度智力障碍">重度智力障碍</SelectItem>
                              <SelectItem value="中度智力障碍">中度智力障碍</SelectItem>
                              <SelectItem value="轻度智力障碍">轻度智力障碍</SelectItem>
                              <SelectItem value="边缘智力">边缘智力</SelectItem>
                              <SelectItem value="平均水平">平均水平</SelectItem>
                              <SelectItem value="高于平均水平">高于平均水平</SelectItem>
                              <SelectItem value="优秀">优秀</SelectItem>
                              <SelectItem value="极优秀">极优秀</SelectItem>
                            </SelectContent>
                          </Select>
                        ) : (
                          <Badge className="bg-blue-100 text-blue-800 border-blue-200">
                            {profileData.cognitiveLevel}
                          </Badge>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="languageAbility">语言能力</Label>
                        {isEditingProfile ? (
                          <Select 
                            value={profileData.languageAbility}
                            onValueChange={(value) => setProfileData({ ...profileData, languageAbility: value })}
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="无口语">无口语</SelectItem>
                              <SelectItem value="有口语但能力有限">有口语但能力有限</SelectItem>
                              <SelectItem value="语言通常但语用异常">语言通常但语用异常</SelectItem>
                            </SelectContent>
                          </Select>
                        ) : (
                          <Badge className="bg-green-100 text-green-800 border-green-200">
                            {profileData.languageAbility}
                          </Badge>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="sensoryProcessing">感官处理</Label>
                        {isEditingProfile ? (
                          <Select 
                            value={profileData.sensoryProcessing}
                            onValueChange={(value) => setProfileData({ ...profileData, sensoryProcessing: value })}
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="感觉过度反应">感觉过度反应</SelectItem>
                              <SelectItem value="感觉低度反应">感觉低度反应</SelectItem>
                              <SelectItem value="感觉寻求">感觉寻求</SelectItem>
                              <SelectItem value="感觉辨别困难">感觉辨别困难</SelectItem>
                            </SelectContent>
                          </Select>
                        ) : (
                          <Badge className="bg-purple-100 text-purple-800 border-purple-200">
                            {profileData.sensoryProcessing}
                          </Badge>
                        )}
                      </div>
                    </div>

                    {isEditingProfile && (
                      <div className="mt-6 flex justify-end">
                        <Button 
                          onClick={handleProfileSave}
                          className="bg-gradient-to-r from-orange-400 to-yellow-500 text-white"
                        >
                          保存档案信息
                        </Button>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </div>
        </Tabs>
      </div>

      {/* Fixed Bottom Navigation - Updated with Safety as center home */}
      <div className="fixed bottom-0 left-0 right-0 border-t border-orange-100 bg-white/95 backdrop-blur-md z-50">
        <Tabs value={activeTab} onValueChange={handleTabNavigation}>
          <TabsList className="grid w-full grid-cols-5 bg-transparent border-0 h-20 rounded-none">
            <TabsTrigger 
              value="reports" 
              className="flex flex-col items-center gap-1 py-2 data-[state=active]:bg-gradient-to-t data-[state=active]:from-orange-50 data-[state=active]:to-yellow-50 data-[state=active]:text-orange-600 rounded-2xl mx-1"
            >
              <FileText className="h-4 w-4" />
              <span className="text-xs font-medium">报告</span>
            </TabsTrigger>
            
            <TabsTrigger 
              value="device" 
              className="flex flex-col items-center gap-1 py-2 data-[state=active]:bg-gradient-to-t data-[state=active]:from-orange-50 data-[state=active]:to-yellow-50 data-[state=active]:text-orange-600 rounded-2xl mx-1"
            >
              <Smartphone className="h-4 w-4" />
              <span className="text-xs font-medium">设备</span>
            </TabsTrigger>
            
            {/* Center Safety Tab - Enlarged */}
            <TabsTrigger 
              value="safety" 
              className="flex flex-col items-center gap-1 py-1 data-[state=active]:bg-gradient-to-br data-[state=active]:from-orange-400 data-[state=active]:to-yellow-500 data-[state=active]:text-white data-[state=active]:shadow-lg rounded-2xl mx-1 relative transform data-[state=active]:scale-110 data-[state=active]:-translate-y-1 transition-all duration-300"
            >
              <div className="bg-gradient-to-br from-orange-400 to-yellow-500 p-3 rounded-full shadow-md">
                <Shield className="h-6 w-6 text-white" />
              </div>
              <span className="text-xs font-bold">安全</span>
            </TabsTrigger>
            
            <TabsTrigger 
              value="profile" 
              className="flex flex-col items-center gap-1 py-2 data-[state=active]:bg-gradient-to-t data-[state=active]:from-orange-50 data-[state=active]:to-yellow-50 data-[state=active]:text-orange-600 rounded-2xl mx-1"
            >
              <User className="h-4 w-4" />
              <span className="text-xs font-medium">档案</span>
            </TabsTrigger>
            
            <TabsTrigger 
              value="settings" 
              className="flex flex-col items-center gap-1 py-2 data-[state=active]:bg-gradient-to-t data-[state=active]:from-orange-50 data-[state=active]:to-yellow-50 data-[state=active]:text-orange-600 rounded-2xl mx-1"
            >
              <Settings className="h-4 w-4" />
              <span className="text-xs font-medium">设置</span>
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
    </div>
  );
};

export default Safety;
