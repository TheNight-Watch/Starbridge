import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
  Bar
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
  Phone,
  Share2,
  BookOpen,
  Target,
  FileText,
  ShoppingBag,
  Bus,
  Users
} from "lucide-react";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("reports");
  const [reminderFrequency, setReminderFrequency] = useState("中频");
  const [reminderStyle, setReminderStyle] = useState("鼓励");
  const navigate = useNavigate();

  const weeklyProgressData = [
    { name: '周一', 社交互动: 65, 情绪管理: 50, 生活自理: 70 },
    { name: '周二', 社交互动: 68, 情绪管理: 55, 生活自理: 75 },
    { name: '周三', 社交互动: 72, 情绪管理: 58, 生活自理: 78 },
    { name: '周四', 社交互动: 70, 情绪管理: 62, 生活自理: 80 },
    { name: '周五', 社交互动: 75, 情绪管理: 60, 生活自理: 85 },
    { name: '周六', 社交互动: 78, 情绪管理: 65, 生活自理: 88 },
    { name: '周日', 社交互动: 80, 情绪管理: 68, 生活自理: 90 }
  ];

  // 场景数据
  const scenarioData = [
    { 
      id: 1, 
      name: "购物场景", 
      progress: 75, 
      status: "进行中",
      icon: ShoppingBag,
      color: "bg-blue-100 text-blue-600",
      description: "独立完成排队付款、选择商品"
    },
    { 
      id: 2, 
      name: "乘车场景", 
      progress: 60, 
      status: "进行中",
      icon: Bus,
      color: "bg-green-100 text-green-600",
      description: "公交车上保持安静、主动让座"
    },
    { 
      id: 3, 
      name: "社交场景", 
      progress: 40, 
      status: "进行中",
      icon: Users,
      color: "bg-purple-100 text-purple-600",
      description: "主动与同龄人打招呼、参与集体活动"
    },
  ];

  const handleTabNavigation = (tabValue: string) => {
    if (tabValue === "safety") {
      navigate('/');
    } else {
      setActiveTab(tabValue);
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
        <Tabs value={activeTab} onValueChange={handleTabNavigation} className="h-full">
          {/* Tab Content */}
          <div className="container mx-auto px-4 py-6">
            {/* Reports Tab */}
            <TabsContent value="reports" className="space-y-6 mt-0">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="bg-gradient-to-br from-orange-400 to-orange-500 text-white border-0 rounded-3xl shadow-xl overflow-hidden">
                  <CardContent className="p-6 relative">
                    <div className="flex items-center justify-between relative z-10">
                      <div>
                        <p className="text-orange-100 text-sm font-medium">本周进步</p>
                        <p className="text-3xl font-bold mt-1">+15%</p>
                      </div>
                      <div className="bg-white/20 p-3 rounded-2xl">
                        <TrendingUp className="h-8 w-8 text-white" />
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
                        <p className="text-yellow-100 text-sm font-medium">成功率</p>
                        <p className="text-3xl font-bold mt-1">78%</p>
                      </div>
                      <div className="bg-white/20 p-3 rounded-2xl">
                        <Award className="h-8 w-8 text-white" />
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
                        <p className="text-rose-100 text-sm font-medium">活跃天数</p>
                        <p className="text-3xl font-bold mt-1">27天</p>
                      </div>
                      <div className="bg-white/20 p-3 rounded-2xl">
                        <Calendar className="h-8 w-8 text-white" />
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
                      <BarChart3 className="h-5 w-5 text-white" />
                    </div>
                    技能发展趋势
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={weeklyProgressData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                        <XAxis dataKey="name" stroke="#666" />
                        <YAxis stroke="#666" />
                        <Tooltip 
                          contentStyle={{ 
                            backgroundColor: 'white', 
                            border: 'none', 
                            borderRadius: '12px', 
                            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' 
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
                          stroke="#fbbf24" 
                          strokeWidth={3}
                          dot={{ fill: '#fbbf24', strokeWidth: 2, r: 4 }}
                        />
                        <Line 
                          type="monotone" 
                          dataKey="生活自理" 
                          stroke="#f472b6" 
                          strokeWidth={3}
                          dot={{ fill: '#f472b6', strokeWidth: 2, r: 4 }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/80 backdrop-blur-sm border-0 rounded-3xl shadow-lg">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center gap-3 text-gray-800 text-lg">
                    <div className="bg-gradient-to-r from-orange-400 to-yellow-500 p-2 rounded-xl">
                      <FileText className="h-5 w-5 text-white" />
                    </div>
                    详细报告
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    { 
                      title: "社交技能评估报告", 
                      date: "2024年3月", 
                      progress: 85, 
                      desc: "主动交流能力显著提升"
                    },
                    { 
                      title: "情绪管理能力报告", 
                      date: "2024年3月", 
                      progress: 70, 
                      desc: "自我调节能力稳步改善"
                    },
                    { 
                      title: "生活自理能力报告", 
                      date: "2024年3月", 
                      progress: 90, 
                      desc: "独立完成日常任务表现优秀"
                    }
                  ].map((report, index) => (
                    <div key={index} className="bg-white/70 rounded-2xl p-5 hover:bg-white/90 transition-all duration-300">
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <h3 className="font-medium text-gray-800">{report.title}</h3>
                          <p className="text-sm text-gray-600">{report.date}</p>
                        </div>
                        <Badge className="bg-gradient-to-r from-blue-400 to-cyan-500 text-white border-0 rounded-full px-3 py-1">
                          查看详情
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600 mb-3">{report.desc}</p>
                      <div className="flex items-center gap-3">
                        <Progress value={report.progress} className="flex-1 h-2" />
                        <span className="text-sm font-medium text-gray-600">{report.progress}%</span>
                      </div>
                    </div>
                  ))}
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
                    孩子档案与学习场景
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
                      当前学习场景
                    </h3>
                    
                    {scenarioData.map((scenario, index) => (
                      <div 
                        key={index} 
                        className="bg-white/70 rounded-2xl p-5 cursor-pointer hover:bg-white/90 transition-all duration-300"
                        onClick={() => navigate(`/goal-detail/${scenario.id}`)}
                      >
                        <div className="flex items-center gap-4 mb-3">
                          <div className={`p-2 rounded-xl ${scenario.color}`}>
                            <scenario.icon className="h-5 w-5" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <span className="font-medium text-gray-800">{scenario.name}</span>
                              <Badge className="bg-gradient-to-r from-blue-400 to-cyan-500 text-white border-0 rounded-full px-3 py-1">
                                {scenario.status}
                              </Badge>
                            </div>
                            <p className="text-sm text-gray-600 mt-1">{scenario.description}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <Progress value={scenario.progress} className="flex-1 h-2" />
                          <span className="text-sm font-medium text-gray-600">{scenario.progress}%</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  <Button 
                    className="w-full bg-gradient-to-r from-orange-400 to-yellow-500 hover:from-orange-500 hover:to-yellow-600 text-white border-0 rounded-2xl h-12 font-medium shadow-lg"
                    onClick={() => navigate('/add-goal')}
                  >
                    <Target className="h-4 w-4 mr-2" />
                    添加新场景
                  </Button>
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
                    { 
                      icon: User, 
                      title: "账户管理", 
                      desc: "修改个人信息和密码", 
                      color: "bg-blue-100 text-blue-600",
                      path: "/account-management"
                    },
                    { 
                      icon: Bell, 
                      title: "通知设置", 
                      desc: "管理推送通知偏好", 
                      color: "bg-green-100 text-green-600",
                      path: "/notification-settings"
                    },
                    { 
                      icon: Shield, 
                      title: "隐私设置", 
                      desc: "数据授权和隐私管理", 
                      color: "bg-purple-100 text-purple-600",
                      path: "/privacy-settings"
                    },
                    { 
                      icon: BookOpen, 
                      title: "帮助中心", 
                      desc: "使用教程和常见问题", 
                      color: "bg-orange-100 text-orange-600",
                      path: "/help-center"
                    },
                    { 
                      icon: Heart, 
                      title: "社区资源", 
                      desc: "康复支持和家长交流", 
                      color: "bg-rose-100 text-rose-600",
                      path: "/community-resources"
                    },
                  ].map((item, index) => (
                    <div 
                      key={index} 
                      className="flex items-center gap-4 p-4 bg-white/70 rounded-2xl hover:bg-white/90 transition-all duration-300 cursor-pointer"
                      onClick={() => navigate(item.path)}
                    >
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

export default Dashboard;
