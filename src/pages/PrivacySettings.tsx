
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { ArrowLeft, Shield, Eye, Database, Share2, FileText } from "lucide-react";
import { useNavigate } from "react-router-dom";

const PrivacySettings = () => {
  const navigate = useNavigate();
  const [privacySettings, setPrivacySettings] = useState({
    locationSharing: true,
    dataAnalytics: true,
    thirdPartySharing: false,
    behaviorTracking: true,
    anonymousReporting: true,
    researchParticipation: false
  });

  const updateSetting = (key: string, value: boolean) => {
    setPrivacySettings(prev => ({ ...prev, [key]: value }));
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
              <h1 className="text-xl font-bold text-gray-800">隐私设置</h1>
              <p className="text-sm text-orange-600">保护您和孩子的隐私安全</p>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6 space-y-6">
        <Card className="bg-white/80 backdrop-blur-sm border-0 rounded-3xl shadow-lg">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-3 text-gray-800 text-lg">
              <div className="bg-gradient-to-r from-orange-400 to-yellow-500 p-2 rounded-xl">
                <Shield className="h-5 w-5 text-white" />
              </div>
              数据收集与使用
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-white/70 rounded-2xl">
              <div className="flex items-center gap-3">
                <div className="bg-blue-100 p-2 rounded-xl">
                  <Eye className="h-4 w-4 text-blue-600" />
                </div>
                <div>
                  <div className="font-medium text-gray-800">位置信息共享</div>
                  <div className="text-sm text-gray-600">允许收集孩子的位置信息用于安全监护</div>
                </div>
              </div>
              <Switch 
                checked={privacySettings.locationSharing}
                onCheckedChange={(checked) => updateSetting('locationSharing', checked)}
              />
            </div>

            <div className="flex items-center justify-between p-4 bg-white/70 rounded-2xl">
              <div className="flex items-center gap-3">
                <div className="bg-green-100 p-2 rounded-xl">
                  <Database className="h-4 w-4 text-green-600" />
                </div>
                <div>
                  <div className="font-medium text-gray-800">行为数据分析</div>
                  <div className="text-sm text-gray-600">分析孩子行为数据以提供个性化建议</div>
                </div>
              </div>
              <Switch 
                checked={privacySettings.behaviorTracking}
                onCheckedChange={(checked) => updateSetting('behaviorTracking', checked)}
              />
            </div>

            <div className="flex items-center justify-between p-4 bg-white/70 rounded-2xl">
              <div className="flex items-center gap-3">
                <div className="bg-purple-100 p-2 rounded-xl">
                  <FileText className="h-4 w-4 text-purple-600" />
                </div>
                <div>
                  <div className="font-medium text-gray-800">匿名数据报告</div>
                  <div className="text-sm text-gray-600">允许以匿名形式使用数据改进服务</div>
                </div>
              </div>
              <Switch 
                checked={privacySettings.anonymousReporting}
                onCheckedChange={(checked) => updateSetting('anonymousReporting', checked)}
              />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/80 backdrop-blur-sm border-0 rounded-3xl shadow-lg">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-3 text-gray-800 text-lg">
              <div className="bg-gradient-to-r from-red-400 to-rose-500 p-2 rounded-xl">
                <Share2 className="h-5 w-5 text-white" />
              </div>
              第三方共享
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-white/70 rounded-2xl">
              <div className="flex items-center gap-3">
                <div className="bg-orange-100 p-2 rounded-xl">
                  <Share2 className="h-4 w-4 text-orange-600" />
                </div>
                <div>
                  <div className="font-medium text-gray-800">第三方数据共享</div>
                  <div className="text-sm text-gray-600">允许与合作伙伴共享必要数据</div>
                </div>
              </div>
              <Switch 
                checked={privacySettings.thirdPartySharing}
                onCheckedChange={(checked) => updateSetting('thirdPartySharing', checked)}
              />
            </div>

            <div className="flex items-center justify-between p-4 bg-white/70 rounded-2xl">
              <div className="flex items-center gap-3">
                <div className="bg-indigo-100 p-2 rounded-xl">
                  <FileText className="h-4 w-4 text-indigo-600" />
                </div>
                <div>
                  <div className="font-medium text-gray-800">研究项目参与</div>
                  <div className="text-sm text-gray-600">参与特殊需求儿童发展研究项目</div>
                </div>
              </div>
              <Switch 
                checked={privacySettings.researchParticipation}
                onCheckedChange={(checked) => updateSetting('researchParticipation', checked)}
              />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/80 backdrop-blur-sm border-0 rounded-3xl shadow-lg">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-3 text-gray-800 text-lg">
              <div className="bg-gradient-to-r from-amber-400 to-orange-500 p-2 rounded-xl">
                <FileText className="h-5 w-5 text-white" />
              </div>
              数据管理
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button 
              variant="outline" 
              className="w-full rounded-2xl h-12 justify-start"
            >
              <FileText className="h-4 w-4 mr-3" />
              下载我的数据
            </Button>
            <Button 
              variant="outline" 
              className="w-full rounded-2xl h-12 justify-start"
            >
              <Eye className="h-4 w-4 mr-3" />
              查看隐私政策
            </Button>
            <Button 
              variant="outline" 
              className="w-full rounded-2xl h-12 justify-start text-red-600 border-red-200 hover:bg-red-50"
            >
              <Database className="h-4 w-4 mr-3" />
              删除所有数据
            </Button>
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

export default PrivacySettings;
