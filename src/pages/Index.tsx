import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex flex-col">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-blue-100 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-2 rounded-xl">
                <Heart className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-800">小天使守护</h1>
                <p className="text-sm text-gray-500">让爱成长，让关怀相伴</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                设备在线
              </Badge>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content - grows to fill space */}
      <div className="flex-1 overflow-auto">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full flex flex-col">
          {/* Tab Content - takes up remaining space */}
          <div className="flex-1 container mx-auto px-4 py-6">
            {/* Dashboard Tab */}
            <TabsContent value="dashboard" className="space-y-6 mt-0">
              {/* Quick Status Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white border-0">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-blue-100 text-sm">今日活动时长</p>
                        <p className="text-2xl font-bold">6小时23分</p>
                      </div>
                      <Clock className="h-8 w-8 text-blue-200" />
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-r from-green-500 to-emerald-600 text-white border-0">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-green-100 text-sm">成功互动次数</p>
                        <p className="text-2xl font-bold">24次</p>
                      </div>
                      <TrendingUp className="h-8 w-8 text-green-200" />
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-r from-purple-500 to-pink-600 text-white border-0">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-purple-100 text-sm">本周进步评分</p>
                        <p className="text-2xl font-bold">8.6分</p>
                      </div>
                      <Award className="h-8 w-8 text-purple-200" />
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Today's Activity Timeline */}
              <Card className="bg-white/70 backdrop-blur-sm border border-blue-100">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-gray-800">
                    <Calendar className="h-5 w-5 text-blue-600" />
                    今日活动时间轴
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    {[
                      { time: "08:30", activity: "早餐时光", status: "成功", desc: "独立完成洗手和准备餐具" },
                      { time: "10:15", activity: "公园游玩", status: "良好", desc: "与其他小朋友友好互动" },
                      { time: "12:00", activity: "午餐时间", status: "需关注", desc: "用餐礼仪需要提醒" },
                      { time: "14:30", activity: "超市购物", status: "成功", desc: "成功完成排队和付款" },
                    ].map((item, index) => (
                      <div key={index} className="flex items-center space-x-4 p-3 rounded-lg bg-white/50">
                        <div className="text-sm font-medium text-gray-600 w-16">{item.time}</div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <span className="font-medium text-gray-800">{item.activity}</span>
                            <Badge 
                              variant={item.status === "成功" ? "default" : item.status === "良好" ? "secondary" : "destructive"}
                              className="text-xs"
                            >
                              {item.status}
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-600 mt-1">{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Device Management Tab */}
            <TabsContent value="device" className="space-y-6 mt-0">
              <Card className="bg-white/70 backdrop-blur-sm border border-blue-100">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-gray-800">
                    <Smartphone className="h-5 w-5 text-blue-600" />
                    设备状态监控
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center justify-between p-4 bg-white/50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <Battery className="h-5 w-5 text-green-600" />
                        <span className="font-medium text-gray-800">电量状态</span>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-green-600">78%</div>
                        <div className="text-sm text-gray-500">约12小时</div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-white/50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <Wifi className="h-5 w-5 text-blue-600" />
                        <span className="font-medium text-gray-800">网络连接</span>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-blue-600">良好</div>
                        <div className="text-sm text-gray-500">4G网络</div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-medium text-gray-800">硬件行为控制</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-3">
                        <label className="text-sm font-medium text-gray-700">提示频率</label>
                        <div className="flex gap-2">
                          {["低频", "中频", "高频"].map((freq) => (
                            <Button 
                              key={freq}
                              variant={freq === "中频" ? "default" : "outline"}
                              size="sm"
                              className="flex-1"
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
                              variant={style === "鼓励" ? "default" : "outline"}
                              size="sm"
                              className="flex-1"
                            >
                              {style}
                            </Button>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <label className="text-sm font-medium text-gray-700">音量调节</label>
                      <div className="flex items-center gap-3">
                        <Volume2 className="h-4 w-4 text-gray-600" />
                        <Progress value={60} className="flex-1" />
                        <span className="text-sm text-gray-600">60%</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Child Profile Tab */}
            <TabsContent value="profile" className="space-y-6 mt-0">
              <Card className="bg-white/70 backdrop-blur-sm border border-blue-100">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-gray-800">
                    <User className="h-5 w-5 text-blue-600" />
                    孩子档案与学习目标
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="bg-white/50 rounded-lg p-4">
                    <h3 className="font-medium text-gray-800 mb-3">基本信息</h3>
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
                    <h3 className="font-medium text-gray-800 flex items-center gap-2">
                      <Target className="h-4 w-4 text-blue-600" />
                      当前学习目标
                    </h3>
                    
                    {[
                      { goal: "独立完成排队付款", progress: 75, status: "进行中" },
                      { goal: "公交车上保持安静", progress: 60, status: "进行中" },
                      { goal: "主动与同龄人打招呼", progress: 40, status: "进行中" },
                    ].map((item, index) => (
                      <div key={index} className="bg-white/50 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium text-gray-800">{item.goal}</span>
                          <Badge variant="secondary">{item.status}</Badge>
                        </div>
                        <div className="flex items-center gap-3">
                          <Progress value={item.progress} className="flex-1" />
                          <span className="text-sm text-gray-600">{item.progress}%</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  <Button className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700">
                    <Target className="h-4 w-4 mr-2" />
                    添加新目标
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Reports Tab */}
            <TabsContent value="reports" className="space-y-6 mt-0">
              <Card className="bg-white/70 backdrop-blur-sm border border-blue-100">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-gray-800">
                    <BookOpen className="h-5 w-5 text-blue-600" />
                    数据报告与分析
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {["日报", "周报", "月报"].map((type) => (
                      <Card key={type} className="bg-white/50 border border-gray-200 hover:shadow-md transition-shadow cursor-pointer">
                        <CardContent className="p-4">
                          <div className="text-center">
                            <BarChart3 className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                            <h3 className="font-medium text-gray-800">{type}</h3>
                            <p className="text-sm text-gray-600 mt-1">查看详细分析</p>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>

                  <div className="bg-white/50 rounded-lg p-4">
                    <h3 className="font-medium text-gray-800 mb-3">本周进展概览</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">社交互动技能</span>
                        <div className="flex items-center gap-2">
                          <Progress value={75} className="w-20" />
                          <span className="text-sm font-medium text-green-600">↗ +15%</span>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">情绪管理能力</span>
                        <div className="flex items-center gap-2">
                          <Progress value={60} className="w-20" />
                          <span className="text-sm font-medium text-green-600">↗ +8%</span>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">生活自理能力</span>
                        <div className="flex items-center gap-2">
                          <Progress value={85} className="w-20" />
                          <span className="text-sm font-medium text-green-600">↗ +12%</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <Button variant="outline" className="w-full">
                    <Share2 className="h-4 w-4 mr-2" />
                    分享报告给专业人士
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Safety Tab */}
            <TabsContent value="safety" className="space-y-6 mt-0">
              <Card className="bg-white/70 backdrop-blur-sm border border-blue-100">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-gray-800">
                    <Shield className="h-5 w-5 text-blue-600" />
                    安全守护
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="bg-white/50 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-medium text-gray-800">实时位置</h3>
                      <Badge variant="outline" className="bg-green-50 text-green-700">
                        <MapPin className="h-3 w-3 mr-1" />
                        安全区域内
                      </Badge>
                    </div>
                    <div className="bg-gradient-to-r from-blue-100 to-indigo-100 rounded-lg p-6 text-center">
                      <MapPin className="h-12 w-12 text-blue-600 mx-auto mb-2" />
                      <p className="text-gray-700">当前位置：家附近公园</p>
                      <p className="text-sm text-gray-500 mt-1">更新时间：2分钟前</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Button variant="outline" className="p-4 h-auto">
                      <div className="text-center">
                        <MapPin className="h-6 w-6 mx-auto mb-2 text-blue-600" />
                        <div className="font-medium">历史轨迹</div>
                        <div className="text-sm text-gray-500">查看活动路径</div>
                      </div>
                    </Button>

                    <Button variant="outline" className="p-4 h-auto">
                      <div className="text-center">
                        <Shield className="h-6 w-6 mx-auto mb-2 text-green-600" />
                        <div className="font-medium">电子围栏</div>
                        <div className="text-sm text-gray-500">设置安全区域</div>
                      </div>
                    </Button>
                  </div>

                  <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <AlertTriangle className="h-5 w-5 text-orange-600" />
                      <h3 className="font-medium text-orange-800">紧急联系人</h3>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-700">妈妈</span>
                        <Button size="sm" variant="outline">
                          <Phone className="h-3 w-3 mr-1" />
                          呼叫
                        </Button>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-700">爸爸</span>
                        <Button size="sm" variant="outline">
                          <Phone className="h-3 w-3 mr-1" />
                          呼叫
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Settings Tab */}
            <TabsContent value="settings" className="space-y-6 mt-0">
              <Card className="bg-white/70 backdrop-blur-sm border border-blue-100">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-gray-800">
                    <Settings className="h-5 w-5 text-blue-600" />
                    个人中心与支持
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    { icon: User, title: "账户管理", desc: "修改个人信息和密码" },
                    { icon: Bell, title: "通知设置", desc: "管理推送通知偏好" },
                    { icon: Shield, title: "隐私设置", desc: "数据授权和隐私管理" },
                    { icon: BookOpen, title: "帮助中心", desc: "使用教程和常见问题" },
                    { icon: Heart, title: "社区资源", desc: "康复支持和家长交流" },
                  ].map((item, index) => (
                    <div key={index} className="flex items-center gap-4 p-3 bg-white/50 rounded-lg hover:bg-white/70 transition-colors cursor-pointer">
                      <item.icon className="h-5 w-5 text-blue-600" />
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

          {/* Bottom Navigation */}
          <div className="border-t border-blue-100 bg-white/80 backdrop-blur-md">
            <TabsList className="grid w-full grid-cols-6 bg-transparent border-0 h-16 rounded-none">
              <TabsTrigger value="dashboard" className="flex flex-col items-center gap-1 py-2 data-[state=active]:bg-blue-50 data-[state=active]:text-blue-600">
                <BarChart3 className="h-5 w-5" />
                <span className="text-xs">首页</span>
              </TabsTrigger>
              <TabsTrigger value="device" className="flex flex-col items-center gap-1 py-2 data-[state=active]:bg-blue-50 data-[state=active]:text-blue-600">
                <Smartphone className="h-5 w-5" />
                <span className="text-xs">设备</span>
              </TabsTrigger>
              <TabsTrigger value="profile" className="flex flex-col items-center gap-1 py-2 data-[state=active]:bg-blue-50 data-[state=active]:text-blue-600">
                <User className="h-5 w-5" />
                <span className="text-xs">孩子档案</span>
              </TabsTrigger>
              <TabsTrigger value="reports" className="flex flex-col items-center gap-1 py-2 data-[state=active]:bg-blue-50 data-[state=active]:text-blue-600">
                <BookOpen className="h-5 w-5" />
                <span className="text-xs">报告</span>
              </TabsTrigger>
              <TabsTrigger value="safety" className="flex flex-col items-center gap-1 py-2 data-[state=active]:bg-blue-50 data-[state=active]:text-blue-600">
                <Shield className="h-5 w-5" />
                <span className="text-xs">安全</span>
              </TabsTrigger>
              <TabsTrigger value="settings" className="flex flex-col items-center gap-1 py-2 data-[state=active]:bg-blue-50 data-[state=active]:text-blue-600">
                <Settings className="h-5 w-5" />
                <span className="text-xs">设置</span>
              </TabsTrigger>
            </TabsList>
          </div>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;
