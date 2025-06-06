
import React, { useState } from 'react';
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
  Save
} from "lucide-react";

const Safety = () => {
  const [activeTab, setActiveTab] = useState("safety");
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const navigate = useNavigate();

  // 活动记录数据
  const activityData = [
    {
      time: "14:30",
      activity: "到达公园",
      location: "中心公园",
      status: "安全",
      icon: MapPin,
      color: "text-green-600 bg-green-100"
    },
    {
      time: "14:15",
      activity: "离开家",
      location: "家",
      status: "正常",
      icon: Clock,
      color: "text-blue-600 bg-blue-100"
    },
    {
      time: "13:45",
      activity: "午餐时间",
      location: "家",
      status: "完成",
      icon: Heart,
      color: "text-orange-600 bg-orange-100"
    },
    {
      time: "12:30",
      activity: "学习时间",
      location: "家",
      status: "完成",
      icon: BookOpen,
      color: "text-purple-600 bg-purple-100"
    }
  ];

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

              {/* 活动记录板块 */}
              <Card className="bg-white/80 backdrop-blur-sm border-0 rounded-3xl shadow-lg">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center gap-3 text-gray-800 text-lg">
                    <div className="bg-gradient-to-r from-orange-400 to-yellow-500 p-2 rounded-xl">
                      <Clock className="h-5 w-5 text-white" />
                    </div>
                    活动记录
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    {activityData.map((item, index) => (
                      <div key={index} className="flex items-center gap-4 p-4 bg-white/70 rounded-2xl">
                        <div className={`p-2 rounded-xl ${item.color}`}>
                          <item.icon className="h-4 w-4" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <span className="font-medium text-gray-800">{item.activity}</span>
                            <span className="text-sm text-gray-500">{item.time}</span>
                          </div>
                          <div className="flex items-center justify-between mt-1">
                            <span className="text-sm text-gray-600">{item.location}</span>
                            <Badge variant="outline" className="text-xs">
                              {item.status}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    ))}
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
