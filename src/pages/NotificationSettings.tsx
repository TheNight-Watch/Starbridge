
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { ArrowLeft, Bell, Smartphone, Clock, AlertTriangle } from "lucide-react";
import { useNavigate } from "react-router-dom";

const NotificationSettings = () => {
  const navigate = useNavigate();
  const [settings, setSettings] = useState({
    dailyReport: true,
    goalProgress: true,
    emergencyAlert: true,
    deviceOffline: true,
    behaviorReminder: false,
    locationUpdate: true,
    achievementCelebration: true,
    parentalGuidance: false
  });

  const updateSetting = (key: string, value: boolean) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-amber-50">
      <header className="bg-white/90 backdrop-blur-md border-b border-orange-100 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => navigate('/')}
              className="rounded-full"
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div>
              <h1 className="text-xl font-bold text-gray-800">通知设置</h1>
              <p className="text-sm text-orange-600">管理您的推送通知偏好</p>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6 space-y-6">
        <Card className="bg-white/80 backdrop-blur-sm border-0 rounded-3xl shadow-lg">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-3 text-gray-800 text-lg">
              <div className="bg-gradient-to-r from-orange-400 to-yellow-500 p-2 rounded-xl">
                <Bell className="h-5 w-5 text-white" />
              </div>
              日常提醒
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-white/70 rounded-2xl">
              <div className="flex items-center gap-3">
                <div className="bg-blue-100 p-2 rounded-xl">
                  <Clock className="h-4 w-4 text-blue-600" />
                </div>
                <div>
                  <div className="font-medium text-gray-800">每日报告</div>
                  <div className="text-sm text-gray-600">每天晚上推送孩子活动总结</div>
                </div>
              </div>
              <Switch 
                checked={settings.dailyReport}
                onCheckedChange={(checked) => updateSetting('dailyReport', checked)}
              />
            </div>

            <div className="flex items-center justify-between p-4 bg-white/70 rounded-2xl">
              <div className="flex items-center gap-3">
                <div className="bg-green-100 p-2 rounded-xl">
                  <Bell className="h-4 w-4 text-green-600" />
                </div>
                <div>
                  <div className="font-medium text-gray-800">目标进度</div>
                  <div className="text-sm text-gray-600">孩子学习目标达成时通知</div>
                </div>
              </div>
              <Switch 
                checked={settings.goalProgress}
                onCheckedChange={(checked) => updateSetting('goalProgress', checked)}
              />
            </div>

            <div className="flex items-center justify-between p-4 bg-white/70 rounded-2xl">
              <div className="flex items-center gap-3">
                <div className="bg-purple-100 p-2 rounded-xl">
                  <Bell className="h-4 w-4 text-purple-600" />
                </div>
                <div>
                  <div className="font-medium text-gray-800">成就庆祝</div>
                  <div className="text-sm text-gray-600">孩子获得新成就时通知</div>
                </div>
              </div>
              <Switch 
                checked={settings.achievementCelebration}
                onCheckedChange={(checked) => updateSetting('achievementCelebration', checked)}
              />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/80 backdrop-blur-sm border-0 rounded-3xl shadow-lg">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-3 text-gray-800 text-lg">
              <div className="bg-gradient-to-r from-red-400 to-rose-500 p-2 rounded-xl">
                <AlertTriangle className="h-5 w-5 text-white" />
              </div>
              安全提醒
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-white/70 rounded-2xl">
              <div className="flex items-center gap-3">
                <div className="bg-red-100 p-2 rounded-xl">
                  <AlertTriangle className="h-4 w-4 text-red-600" />
                </div>
                <div>
                  <div className="font-medium text-gray-800">紧急警报</div>
                  <div className="text-sm text-gray-600">紧急情况立即通知</div>
                </div>
              </div>
              <Switch 
                checked={settings.emergencyAlert}
                onCheckedChange={(checked) => updateSetting('emergencyAlert', checked)}
              />
            </div>

            <div className="flex items-center justify-between p-4 bg-white/70 rounded-2xl">
              <div className="flex items-center gap-3">
                <div className="bg-orange-100 p-2 rounded-xl">
                  <Smartphone className="h-4 w-4 text-orange-600" />
                </div>
                <div>
                  <div className="font-medium text-gray-800">设备离线</div>
                  <div className="text-sm text-gray-600">设备断线时通知</div>
                </div>
              </div>
              <Switch 
                checked={settings.deviceOffline}
                onCheckedChange={(checked) => updateSetting('deviceOffline', checked)}
              />
            </div>

            <div className="flex items-center justify-between p-4 bg-white/70 rounded-2xl">
              <div className="flex items-center gap-3">
                <div className="bg-indigo-100 p-2 rounded-xl">
                  <Bell className="h-4 w-4 text-indigo-600" />
                </div>
                <div>
                  <div className="font-medium text-gray-800">位置更新</div>
                  <div className="text-sm text-gray-600">孩子位置发生变化时通知</div>
                </div>
              </div>
              <Switch 
                checked={settings.locationUpdate}
                onCheckedChange={(checked) => updateSetting('locationUpdate', checked)}
              />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/80 backdrop-blur-sm border-0 rounded-3xl shadow-lg">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-3 text-gray-800 text-lg">
              <div className="bg-gradient-to-r from-amber-400 to-orange-500 p-2 rounded-xl">
                <Bell className="h-5 w-5 text-white" />
              </div>
              辅助功能
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-white/70 rounded-2xl">
              <div className="flex items-center gap-3">
                <div className="bg-teal-100 p-2 rounded-xl">
                  <Bell className="h-4 w-4 text-teal-600" />
                </div>
                <div>
                  <div className="font-medium text-gray-800">行为提醒</div>
                  <div className="text-sm text-gray-600">需要行为引导时提醒</div>
                </div>
              </div>
              <Switch 
                checked={settings.behaviorReminder}
                onCheckedChange={(checked) => updateSetting('behaviorReminder', checked)}
              />
            </div>

            <div className="flex items-center justify-between p-4 bg-white/70 rounded-2xl">
              <div className="flex items-center gap-3">
                <div className="bg-cyan-100 p-2 rounded-xl">
                  <Bell className="h-4 w-4 text-cyan-600" />
                </div>
                <div>
                  <div className="font-medium text-gray-800">家长指导</div>
                  <div className="text-sm text-gray-600">推送育儿建议和指导</div>
                </div>
              </div>
              <Switch 
                checked={settings.parentalGuidance}
                onCheckedChange={(checked) => updateSetting('parentalGuidance', checked)}
              />
            </div>
          </CardContent>
        </Card>

        <Button 
          className="w-full bg-gradient-to-r from-orange-400 to-yellow-500 hover:from-orange-500 hover:to-yellow-600 text-white border-0 rounded-2xl h-12 font-medium"
        >
          保存设置
        </Button>
      </div>
    </div>
  );
};

export default NotificationSettings;
