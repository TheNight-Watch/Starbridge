import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import { useNavigate } from "react-router-dom";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { 
  Heart, 
  Smartphone, 
  MapPin, 
  BarChart3, 
  Settings, 
  User, 
  Battery, 
  Wifi, 
  Shield, 
  Bell,
  Calendar,
  Clock,
  TrendingUp,
  Award,
  AlertTriangle,
  Phone,
  Share2,
  BookOpen,
  Target,
  Volume2
} from "lucide-react";

const Index = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [reminderFrequency, setReminderFrequency] = useState("中频");
  const [reminderStyle, setReminderStyle] = useState("鼓励");
  const [volume, setVolume] = useState([60]);
  const [reportType, setReportType] = useState("周报");
  const navigate = useNavigate();

  // 图表数据
  const weeklyProgressData = [
    { name: '周一', 社交互动: 65, 情绪管理: 50, 生活自理: 70 },
    { name: '周二', 社交互动: 68, 情绪管理: 55, 生活自理: 75 },
    { name: '周三', 社交互动: 72, 情绪管理: 58, 生活自理: 78 },
    { name: '周四', 社交互动: 70, 情绪管理: 62, 生活自理: 80 },
    { name: '周五', 社交互动: 75, 情绪管理: 60, 生活自理: 85 },
    { name: '周六', 社交互动: 78, 情绪管理: 65, 生活自理: 88 },
    { name: '周日', 社交互动: 80, 情绪管理: 68, 生活自理: 90 }
  ];

  const dailyData = [
    { name: '8:00', 社交互动: 60, 情绪管理: 45, 生活自理: 70 },
    { name: '10:00', 社交互动: 65, 情绪管理: 50, 生活自理: 75 },
    { name: '12:00', 社交互动: 70, 情绪管理: 55, 生活自理: 80 },
    { name: '14:00', 社交互动: 75, 情绪管理: 60, 生活自理: 85 },
    { name: '16:00', 社交互动: 80, 情绪管理: 65, 生活自理: 88 },
    { name: '18:00', 社交互动: 85, 情绪管理: 70, 生活自理: 90 }
  ];

  const monthlyData = [
    { name: '第1周', 社交互动: 55, 情绪管理: 40, 生活自理: 65 },
    { name: '第2周', 社交互动: 62, 情绪管理: 48, 生活自理: 72 },
    { name: '第3周', 社交互动: 68, 情绪管理: 55, 生活自理: 78 },
    { name: '第4周', 社交互动: 75, 情绪管理: 62, 生活自理: 85 }
  ];

  const practiceFrequencyData = [
    { skill: '排队付款', frequency: 12, success: 85 },
    { skill: '公交礼仪', frequency: 8, success: 70 },
    { skill: '主动问候', frequency: 15, success: 60 },
    { skill: '情绪表达', frequency: 10, success: 75 }
  ];

  const successTrendData = [
    { period: '第1天', success: 45 },
    { period: '第2天', success: 52 },
    { period: '第3天', success: 48 },
    { period: '第4天', success: 58 },
    { period: '第5天', success: 65 },
    { period: '第6天', success: 70 },
    { period: '第7天', success: 75 }
  ];

  const getReportData = () => {
    switch (reportType) {
      case "日报": return dailyData;
      case "月报": return monthlyData;
      default: return weeklyProgressData;
    }
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
            {/* Dashboard Tab */}
            <TabsContent value="dashboard" className="space-y-6 mt-0">
              {/* Quick Status Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="bg-gradient-to-br from-orange-400 to-orange-500 text-white border-0 rounded-3xl shadow-xl overflow-hidden">
                  <CardContent className="p-6 relative">
                    <div className="flex items-center justify-between relative z-10">
                      <div>
                        <p className="text-orange-100 text-sm font-medium">今日活动时长</p>
                        <p className="text-3xl font-bold mt-1">6小时23分</p>
                      </div>
                      <div className="bg-white/20 p-3 rounded-2xl">
                        <Clock className="h-8 w-8 text-white" />
                      </div>
                    </div>
                    <div className="absolute -right-4 -bottom-4 w-20 h-20 bg-white/10 rounded-full"></div>
                    <div className="absolute -right-8 -top-8 w-16 h-16 bg-white/10 rounded-full"></div>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-yellow-400 to-amber-500 text-white border-0 rounded-3xl shadow-xl overflow-hidden">
                  <CardContent className="p-6 relative">
                    <div className="flex items-center justify-between relative z-10">
                      <div>
                        <p className="text-yellow-100 text-sm font-medium">成功互动次数</p>
                        <p className="text-3xl font-bold mt-1">24次</p>
                      </div>
                      <div className="bg-white/20 p-3 rounded-2xl">
                        <TrendingUp className="h-8 w-8 text-white" />
                      </div>
                    </div>
                    <div className="absolute -left-4 -bottom-4 w-20 h-20 bg-white/10 rounded-full"></div>
                    <div className="absolute -left-8 -top-8 w-16 h-16 bg-white/10 rounded-full"></div>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-rose-400 to-pink-500 text-white border-0 rounded-3xl shadow-xl overflow-hidden">
                  <CardContent className="p-6 relative">
                    <div className="flex items-center justify-between relative z-10">
                      <div>
                        <p className="text-rose-100 text-sm font-medium">本周进步评分</p>
                        <p className="text-3xl font-bold mt-1">8.6分</p>
                      </div>
                      <div className="bg-white/20 p-3 rounded-2xl">
                        <Award className="h-8 w-8 text-white" />
                      </div>
                    </div>
                    <div className="absolute -right-4 -top-4 w-20 h-20 bg-white/10 rounded-full"></div>
                    <div className="absolute -left-8 -bottom-8 w-16 h-16 bg-white/10 rounded-full"></div>
                  </CardContent>
                </Card>
              </div>

              <Card className="bg-white/80 backdrop-blur-sm border-0 rounded-3xl shadow-lg">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center gap-3 text-gray-800 text-lg">
                    <div className="bg-gradient-to-r from-orange-400 to-yellow-500 p-2 rounded-xl">
                      <Calendar className="h-5 w-5 text-white" />
                    </div>
                    今日活动时间轴
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-4">
                    {[
                      { time: "08:30", activity: "早餐时光", status: "成功", desc: "独立完成洗手和准备餐具", color: "from-green-400 to-emerald-500" },
                      { time: "10:15", activity: "公园游玩", status: "良好", desc: "与其他小朋友友好互动", color: "from-blue-400 to-cyan-500" },
                      { time: "12:00", activity: "午餐时间", status: "需关注", desc: "用餐礼仪需要提醒", color: "from-amber-400 to-orange-500" },
                      { time: "14:30", activity: "超市购物", status: "成功", desc: "成功完成排队和付款", color: "from-green-400 to-emerald-500" },
                    ].map((item, index) => (
                      <div key={index} className="flex items-center space-x-4 p-4 rounded-2xl bg-white/60 hover:bg-white/80 transition-all duration-300">
                        <div className="text-sm font-bold text-gray-700 w-16 bg-gray-100 rounded-xl px-3 py-2 text-center">
                          {item.time}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <span className="font-bold text-gray-800">{item.activity}</span>
                            <Badge 
                              className={`text-xs font-medium text-white border-0 px-3 py-1 rounded-full bg-gradient-to-r ${
                                item.status === "成功" ? "from-green-400 to-emerald-500" : 
                                item.status === "良好" ? "from-blue-400 to-cyan-500" : 
                                "from-amber-400 to-orange-500"
                              }`}
                            >
                              {item.status}
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-600">{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Device Management Tab */}
            <TabsContent value="device" className="space-y-6 mt-0">
              <Card className="bg-white/80 backdrop-blur-sm border-0 rounded-3xl shadow-lg">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center gap-3 text-gray-800 text-lg">
                    <div className="bg-gradient-to-r from-orange-400 to-yellow-500 p-2 rounded-xl">
                      <Smartphone className="h-5 w-5 text-white" />
                    </div>
                    设备状态监控
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center justify-between p-5 bg-white/70 rounded-2xl border border-gray-100">
                      <div className="flex items-center gap-3">
                        <div className="bg-green-100 p-2 rounded-xl">
                          <Battery className="h-5 w-5 text-green-600" />
                        </div>
                        <span className="font-medium text-gray-800">电量状态</span>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-green-600">78%</div>
                        <div className="text-sm text-gray-500">约12小时</div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-5 bg-white/70 rounded-2xl border border-gray-100">
                      <div className="flex items-center gap-3">
                        <div className="bg-blue-100 p-2 rounded-xl">
                          <Wifi className="h-5 w-5 text-blue-600" />
                        </div>
                        <span className="font-medium text-gray-800">网络连接</span>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-blue-600">良好</div>
                        <div className="text-sm text-gray-500">4G网络</div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <h3 className="font-bold text-gray-800 text-lg">硬件行为控制</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-3">
                        <label className="text-sm font-medium text-gray-700">提示频率</label>
                        <div className="flex gap-2">
                          {["低频", "中频", "高频"].map((freq) => (
                            <Button 
                              key={freq}
                              variant={freq === reminderFrequency ? "default" : "outline"}
                              size="sm"
                              onClick={() => setReminderFrequency(freq)}
                              className={`flex-1 rounded-2xl font-medium ${
                                freq === reminderFrequency 
                                  ? "bg-gradient-to-r from-orange-400 to-yellow-500 text-white border-0 shadow-lg" 
                                  : "bg-white/70 border-gray-200 text-gray-700 hover:bg-orange-50"
                              }`}
                            >
                              {freq}
                            </Button>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-3">
                        <label className="text-sm font-medium text-gray-700">提示风格</label>
                        <div className="flex gap-2">
                          {["温和", "鼓励", "指导"].map((style) => (
                            <Button 
                              key={style}
                              variant={style === reminderStyle ? "default" : "outline"}
                              size="sm"
                              onClick={() => setReminderStyle(style)}
                              className={`flex-1 rounded-2xl font-medium ${
                                style === reminderStyle 
                                  ? "bg-gradient-to-r from-orange-400 to-yellow-500 text-white border-0 shadow-lg" 
                                  : "bg-white/70 border-gray-200 text-gray-700 hover:bg-orange-50"
                              }`}
                            >
                              {style}
                            </Button>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <label className="text-sm font-medium text-gray-700">音量调节</label>
                      <div className="flex items-center gap-3 p-4 bg-white/70 rounded-2xl">
                        <div className="bg-orange-100 p-2 rounded-xl">
                          <Volume2 className="h-4 w-4 text-orange-600" />
                        </div>
                        <Slider 
                          value={volume} 
                          onValueChange={setVolume}
                          max={100} 
                          step={1} 
                          className="flex-1"
                        />
                        <span className="text-sm font-medium text-gray-600 min-w-[40px]">{volume[0]}%</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Child Profile Tab */}
            <TabsContent value="profile" className="space-y-6 mt-0">
              <Card className="bg-white/80 backdrop-blur-sm border-0 rounded-3xl shadow-lg">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center gap-3 text-gray-800 text-lg">
                    <div className="bg-gradient-to-r from-orange-400 to-yellow-500 p-2 rounded-xl">
                      <User className="h-5 w-5 text-white" />
                    </div>
                    孩子档案与学习目标
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="bg-white/70 rounded-2xl p-5">
                    <h3 className="font-bold text-gray-800 mb-3">基本信息</h3>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-600">昵称：</span>
                        <span className="font-medium">小明</span>
                      </div>
                      <div>
                        <span className="text-gray-600">年龄：</span>
                        <span className="font-medium">8岁</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-bold text-gray-800 flex items-center gap-3">
                      <div className="bg-blue-100 p-2 rounded-xl">
                        <Target className="h-4 w-4 text-blue-600" />
                      </div>
                      当前学习目标
                    </h3>
                    
                    {[
                      { id: 1, goal: "独立完成排队付款", progress: 75, status: "进行中" },
                      { id: 2, goal: "公交车上保持安静", progress: 60, status: "进行中" },
                      { id: 3, goal: "主动与同龄人打招呼", progress: 40, status: "进行中" },
                    ].map((item, index) => (
                      <div 
                        key={index} 
                        className="bg-white/70 rounded-2xl p-5 cursor-pointer hover:bg-white/90 transition-all duration-300"
                        onClick={() => navigate(`/goal-detail/${item.id}`)}
                      >
                        <div className="flex items-center justify-between mb-3">
                          <span className="font-medium text-gray-800">{item.goal}</span>
                          <Badge className="bg-gradient-to-r from-blue-400 to-cyan-500 text-white border-0 rounded-full px-3 py-1">
                            {item.status}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-3">
                          <Progress value={item.progress} className="flex-1 h-2" />
                          <span className="text-sm font-medium text-gray-600">{item.progress}%</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  <Button 
                    className="w-full bg-gradient-to-r from-orange-400 to-yellow-500 hover:from-orange-500 hover:to-yellow-600 text-white border-0 rounded-2xl h-12 font-medium shadow-lg"
                    onClick={() => navigate('/add-goal')}
                  >
                    <Target className="h-4 w-4 mr-2" />
                    添加新目标
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Reports Tab - 更新后的报告页面 */}
            <TabsContent value="reports" className="space-y-6 mt-0">
              <Card className="bg-white/80 backdrop-blur-sm border-0 rounded-3xl shadow-lg">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-3 text-gray-800 text-lg">
                      <div className="bg-gradient-to-r from-orange-400 to-yellow-500 p-2 rounded-xl">
                        <BookOpen className="h-5 w-5 text-white" />
                      </div>
                      数据报告与分析
                    </CardTitle>
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="rounded-2xl font-medium bg-white/70 border-gray-200 hover:bg-orange-50"
                    >
                      <Share2 className="h-4 w-4 mr-2" />
                      分享报告
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* 报告类型切换按钮 */}
                  <div className="flex gap-2">
                    {["日报", "周报", "月报"].map((type) => (
                      <Button 
                        key={type}
                        variant={type === reportType ? "default" : "outline"}
                        size="sm"
                        onClick={() => setReportType(type)}
                        className={`flex-1 rounded-2xl font-medium ${
                          type === reportType 
                            ? "bg-gradient-to-r from-orange-400 to-yellow-500 text-white border-0 shadow-lg" 
                            : "bg-white/70 border-gray-200 text-gray-700 hover:bg-orange-50"
                        }`}
                      >
                        {type}
                      </Button>
                    ))}
                  </div>

                  {/* 技能进步趋势图 */}
                  <div className="bg-white/70 rounded-2xl p-5">
                    <h3 className="font-bold text-gray-800 mb-4">技能进步趋势</h3>
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={getReportData()}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                          <XAxis dataKey="name" stroke="#666" fontSize={12} />
                          <YAxis stroke="#666" fontSize={12} />
                          <Tooltip 
                            contentStyle={{ 
                              backgroundColor: '#fff', 
                              border: '1px solid #e5e5e5', 
                              borderRadius: '12px',
                              boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                            }} 
                          />
                          <Line 
                            type="monotone" 
                            dataKey="社交互动" 
                            stroke="#fb923c" 
                            strokeWidth={3}
                            dot={{ fill: '#fb923c', strokeWidth: 2, r: 4 }}
                          />
                          <Line 
                            type="monotone" 
                            dataKey="情绪管理" 
                            stroke="#06b6d4" 
                            strokeWidth={3}
                            dot={{ fill: '#06b6d4', strokeWidth: 2, r: 4 }}
                          />
                          <Line 
                            type="monotone" 
                            dataKey="生活自理" 
                            stroke="#f43f5e" 
                            strokeWidth={3}
                            dot={{ fill: '#f43f5e', strokeWidth: 2, r: 4 }}
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </div>

                  {/* 练习频率分析 */}
                  <div className="bg-white/70 rounded-2xl p-5">
                    <h3 className="font-bold text-gray-800 mb-4">练习频率分析</h3>
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={practiceFrequencyData}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                          <XAxis dataKey="skill" stroke="#666" fontSize={12} />
                          <YAxis stroke="#666" fontSize={12} />
                          <Tooltip 
                            contentStyle={{ 
                              backgroundColor: '#fff', 
                              border: '1px solid #e5e5e5', 
                              borderRadius: '12px',
                              boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                            }} 
                          />
                          <Bar dataKey="frequency" fill="#fbbf24" radius={[4, 4, 0, 0]} />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>

                  {/* 成功率变化趋势 */}
                  <div className="bg-white/70 rounded-2xl p-5">
                    <h3 className="font-bold text-gray-800 mb-4">成功率变化趋势</h3>
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={successTrendData}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                          <XAxis dataKey="period" stroke="#666" fontSize={12} />
                          <YAxis stroke="#666" fontSize={12} />
                          <Tooltip 
                            contentStyle={{ 
                              backgroundColor: '#fff', 
                              border: '1px solid #e5e5e5', 
                              borderRadius: '12px',
                              boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                            }} 
                          />
                          <Line 
                            type="monotone" 
                            dataKey="success" 
                            stroke="#10b981" 
                            strokeWidth={3}
                            dot={{ fill: '#10b981', strokeWidth: 2, r: 4 }}
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </div>

                  {/* 本周进展概览 - 改为折线图 */}
                  <div className="bg-white/70 rounded-2xl p-5">
                    <h3 className="font-bold text-gray-800 mb-4">本周进展概览</h3>
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={weeklyProgressData}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                          <XAxis dataKey="name" stroke="#666" fontSize={12} />
                          <YAxis stroke="#666" fontSize={12} />
                          <Tooltip 
                            contentStyle={{ 
                              backgroundColor: '#fff', 
                              border: '1px solid #e5e5e5', 
                              borderRadius: '12px',
                              boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                            }} 
                          />
                          <Line 
                            type="monotone" 
                            dataKey="社交互动" 
                            stroke="#fb923c" 
                            strokeWidth={2}
                            dot={{ fill: '#fb923c', strokeWidth: 2, r: 3 }}
                          />
                          <Line 
                            type="monotone" 
                            dataKey="情绪管理" 
                            stroke="#06b6d4" 
                            strokeWidth={2}
                            dot={{ fill: '#06b6d4', strokeWidth: 2, r: 3 }}
                          />
                          <Line 
                            type="monotone" 
                            dataKey="生活自理" 
                            stroke="#f43f5e" 
                            strokeWidth={2}
                            dot={{ fill: '#f43f5e', strokeWidth: 2, r: 3 }}
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

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
                    <div className="bg-gradient-to-br from-orange-100 to-yellow-100 rounded-2xl p-8 text-center">
                      <div className="bg-gradient-to-r from-orange-400 to-yellow-500 p-4 rounded-2xl w-fit mx-auto mb-3">
                        <MapPin className="h-12 w-12 text-white" />
                      </div>
                      <p className="text-gray-800 font-medium">当前位置：家附近公园</p>
                      <p className="text-sm text-gray-600 mt-1">更新时间：2分钟前</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Button variant="outline" className="p-6 h-auto rounded-2xl bg-white/70 border-gray-200 hover:bg-orange-50">
                      <div className="text-center">
                        <div className="bg-blue-100 p-3 rounded-xl mb-2 mx-auto w-fit">
                          <MapPin className="h-6 w-6 text-blue-600" />
                        </div>
                        <div className="font-medium text-gray-800">历史轨迹</div>
                        <div className="text-sm text-gray-500">查看活动路径</div>
                      </div>
                    </Button>

                    <Button variant="outline" className="p-6 h-auto rounded-2xl bg-white/70 border-gray-200 hover:bg-orange-50">
                      <div className="text-center">
                        <div className="bg-green-100 p-3 rounded-xl mb-2 mx-auto w-fit">
                          <Shield className="h-6 w-6 text-green-600" />
                        </div>
                        <div className="font-medium text-gray-800">电子围栏</div>
                        <div className="text-sm text-gray-500">设置安全区域</div>
                      </div>
                    </Button>
                  </div>

                  <div className="bg-gradient-to-r from-orange-50 to-yellow-50 border border-orange-200 rounded-2xl p-5">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="bg-orange-100 p-2 rounded-xl">
                        <AlertTriangle className="h-5 w-5 text-orange-600" />
                      </div>
                      <h3 className="font-bold text-orange-800">紧急联系人</h3>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 bg-white/70 rounded-xl">
                        <span className="text-gray-700 font-medium">妈妈</span>
                        <Button size="sm" className="bg-gradient-to-r from-orange-400 to-yellow-500 text-white border-0 rounded-xl hover:from-orange-500 hover:to-yellow-600">
                          <Phone className="h-3 w-3 mr-1" />
                          呼叫
                        </Button>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-white/70 rounded-xl">
                        <span className="text-gray-700 font-medium">爸爸</span>
                        <Button size="sm" className="bg-gradient-to-r from-orange-400 to-yellow-500 text-white border-0 rounded-xl hover:from-orange-500 hover:to-yellow-600">
                          <Phone className="h-3 w-3 mr-1" />
                          呼叫
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="settings" className="space-y-6 mt-0">
              <Card className="bg-white/80 backdrop-blur-sm border-0 rounded-3xl shadow-lg">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center gap-3 text-gray-800 text-lg">
                    <div className="bg-gradient-to-r from-orange-400 to-yellow-500 p-2 rounded-xl">
                      <Settings className="h-5 w-5 text-white" />
                    </div>
                    个人中心与支持
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    { icon: User, title: "账户管理", desc: "修改个人信息和密码", color: "bg-blue-100 text-blue-600" },
                    { icon: Bell, title: "通知设置", desc: "管理推送通知偏好", color: "bg-green-100 text-green-600" },
                    { icon: Shield, title: "隐私设置", desc: "数据授权和隐私管理", color: "bg-purple-100 text-purple-600" },
                    { icon: BookOpen, title: "帮助中心", desc: "使用教程和常见问题", color: "bg-orange-100 text-orange-600" },
                    { icon: Heart, title: "社区资源", desc: "康复支持和家长交流", color: "bg-rose-100 text-rose-600" },
                  ].map((item, index) => (
                    <div key={index} className="flex items-center gap-4 p-4 bg-white/70 rounded-2xl hover:bg-white/90 transition-all duration-300 cursor-pointer">
                      <div className={`p-2 rounded-xl ${item.color}`}>
                        <item.icon className="h-5 w-5" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-800">{item.title}</h3>
                        <p className="text-sm text-gray-600">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>
          </div>
        </Tabs>
      </div>

      {/* Fixed Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 border-t border-orange-100 bg-white/95 backdrop-blur-md z-50">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-6 bg-transparent border-0 h-16 rounded-none">
            <TabsTrigger value="dashboard" className="flex flex-col items-center gap-1 py-2 data-[state=active]:bg-gradient-to-t data-[state=active]:from-orange-50 data-[state=active]:to-yellow-50 data-[state=active]:text-orange-600 rounded-2xl mx-1">
              <BarChart3 className="h-5 w-5" />
              <span className="text-xs font-medium">首页</span>
            </TabsTrigger>
            <TabsTrigger value="device" className="flex flex-col items-center gap-1 py-2 data-[state=active]:bg-gradient-to-t data-[state=active]:from-orange-50 data-[state=active]:to-yellow-50 data-[state=active]:text-orange-600 rounded-2xl mx-1">
              <Smartphone className="h-5 w-5" />
              <span className="text-xs font-medium">设备</span>
            </TabsTrigger>
            <TabsTrigger value="profile" className="flex flex-col items-center gap-1 py-2 data-[state=active]:bg-gradient-to-t data-[state=active]:from-orange-50 data-[state=active]:to-yellow-50 data-[state=active]:text-orange-600 rounded-2xl mx-1">
              <User className="h-5 w-5" />
              <span className="text-xs font-medium">档案</span>
            </TabsTrigger>
            <TabsTrigger value="reports" className="flex flex-col items-center gap-1 py-2 data-[state=active]:bg-gradient-to-t data-[state=active]:from-orange-50 data-[state=active]:to-yellow-50 data-[state=active]:text-orange-600 rounded-2xl mx-1">
              <BookOpen className="h-5 w-5" />
              <span className="text-xs font-medium">报告</span>
            </TabsTrigger>
            <TabsTrigger value="safety" className="flex flex-col items-center gap-1 py-2 data-[state=active]:bg-gradient-to-t data-[state=active]:from-orange-50 data-[state=active]:to-yellow-50 data-[state=active]:text-orange-600 rounded-2xl mx-1">
              <Shield className="h-5 w-5" />
              <span className="text-xs font-medium">安全</span>
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex flex-col items-center gap-1 py-2 data-[state=active]:bg-gradient-to-t data-[state=active]:from-orange-50 data-[state=active]:to-yellow-50 data-[state=active]:text-orange-600 rounded-2xl mx-1">
              <Settings className="h-5 w-5" />
              <span className="text-xs font-medium">设置</span>
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;
