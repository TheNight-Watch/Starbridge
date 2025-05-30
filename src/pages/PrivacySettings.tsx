import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { ArrowLeft, Shield, Eye, Database, UserCheck, Download, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

const PrivacySettings = () => {
  const navigate = useNavigate();
  const [shareUsageData, setShareUsageData] = useState(true);
  const [showProfileToPublic, setShowProfileToPublic] = useState(false);
  const [allowTargetedAds, setAllowTargetedAds] = useState(true);

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-amber-50">
      <header className="bg-white/90 backdrop-blur-md border-b border-orange-100 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => navigate(-1)}
              className="rounded-full"
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div>
              <h1 className="text-xl font-bold text-gray-800">隐私设置</h1>
              <p className="text-sm text-orange-600">管理您的数据隐私选项</p>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6 space-y-6">
        {/* 数据共享 */}
        <Card className="bg-white/80 backdrop-blur-sm border-0 rounded-3xl shadow-lg">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-3 text-gray-800 text-lg">
              <div className="bg-gradient-to-r from-orange-400 to-yellow-500 p-2 rounded-xl">
                <Database className="h-5 w-5 text-white" />
              </div>
              数据共享
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <h3 className="text-gray-800 font-medium">分享使用数据</h3>
                <p className="text-sm text-gray-500">
                  允许我们收集匿名使用数据，以改进产品体验
                </p>
              </div>
              <Switch id="usage-data" checked={shareUsageData} onCheckedChange={setShareUsageData} />
            </div>
          </CardContent>
        </Card>

        {/* 个人资料可见性 */}
        <Card className="bg-white/80 backdrop-blur-sm border-0 rounded-3xl shadow-lg">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-3 text-gray-800 text-lg">
              <div className="bg-gradient-to-r from-blue-400 to-cyan-500 p-2 rounded-xl">
                <Eye className="h-5 w-5 text-white" />
              </div>
              个人资料可见性
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <h3 className="text-gray-800 font-medium">公开我的个人资料</h3>
                <p className="text-sm text-gray-500">
                  让其他用户可以查看您的个人资料信息
                </p>
              </div>
              <Switch id="public-profile" checked={showProfileToPublic} onCheckedChange={setShowProfileToPublic} />
            </div>
          </CardContent>
        </Card>

        {/* 定向广告 */}
        <Card className="bg-white/80 backdrop-blur-sm border-0 rounded-3xl shadow-lg">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-3 text-gray-800 text-lg">
              <div className="bg-gradient-to-r from-green-400 to-emerald-500 p-2 rounded-xl">
                <Shield className="h-5 w-5 text-white" />
              </div>
              定向广告
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <h3 className="text-gray-800 font-medium">允许个性化广告</h3>
                <p className="text-sm text-gray-500">
                  根据您的兴趣展示个性化的广告内容
                </p>
              </div>
              <Switch id="targeted-ads" checked={allowTargetedAds} onCheckedChange={setAllowTargetedAds} />
            </div>
          </CardContent>
        </Card>

        {/* 账号安全 */}
        <Card className="bg-white/80 backdrop-blur-sm border-0 rounded-3xl shadow-lg">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-3 text-gray-800 text-lg">
              <div className="bg-gradient-to-r from-red-400 to-rose-500 p-2 rounded-xl">
                <UserCheck className="h-5 w-5 text-white" />
              </div>
              账号安全
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button variant="outline" className="w-full rounded-2xl h-12 justify-start">
              <Download className="h-4 w-4 mr-3" />
              导出我的数据
            </Button>
            <Button variant="destructive" className="w-full rounded-2xl h-12 justify-start">
              <Trash2 className="h-4 w-4 mr-3" />
              删除我的账号
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PrivacySettings;
