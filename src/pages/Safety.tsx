
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
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
  Clock
} from "lucide-react";

const Safety = () => {
  const [activeTab, setActiveTab] = useState("safety");
  const navigate = useNavigate();

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
            </TabsContent>
          </div>
        </Tabs>
      </div>

      {/* Fixed Bottom Navigation - Updated with Safety as center home */}
      <div className="fixed bottom-0 left-0 right-0 border-t border-orange-100 bg-white/95 backdrop-blur-md z-50">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-5 bg-transparent border-0 h-20 rounded-none">
            <TabsTrigger 
              value="dashboard" 
              className="flex flex-col items-center gap-1 py-2 data-[state=active]:bg-gradient-to-t data-[state=active]:from-orange-50 data-[state=active]:to-yellow-50 data-[state=active]:text-orange-600 rounded-2xl mx-1"
              onClick={() => navigate('/dashboard')}
            >
              <BarChart3 className="h-4 w-4" />
              <span className="text-xs font-medium">首页</span>
            </TabsTrigger>
            
            <TabsTrigger 
              value="device" 
              className="flex flex-col items-center gap-1 py-2 data-[state=active]:bg-gradient-to-t data-[state=active]:from-orange-50 data-[state=active]:to-yellow-50 data-[state=active]:text-orange-600 rounded-2xl mx-1"
              onClick={() => navigate('/dashboard')}
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
              onClick={() => navigate('/dashboard')}
            >
              <User className="h-4 w-4" />
              <span className="text-xs font-medium">档案</span>
            </TabsTrigger>
            
            <TabsTrigger 
              value="settings" 
              className="flex flex-col items-center gap-1 py-2 data-[state=active]:bg-gradient-to-t data-[state=active]:from-orange-50 data-[state=active]:to-yellow-50 data-[state=active]:text-orange-600 rounded-2xl mx-1"
              onClick={() => navigate('/dashboard')}
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
