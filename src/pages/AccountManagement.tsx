
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, User, Phone, Mail, Lock, Edit } from "lucide-react";
import { useNavigate } from "react-router-dom";

const AccountManagement = () => {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [userInfo, setUserInfo] = useState({
    parentName: "张女士",
    phone: "138****5678",
    email: "zhang***@example.com",
    childName: "小明",
    childAge: "8岁",
    relationship: "母亲"
  });

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
              <h1 className="text-xl font-bold text-gray-800">账户管理</h1>
              <p className="text-sm text-orange-600">管理您的个人信息</p>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6 space-y-6">
        <Card className="bg-white/80 backdrop-blur-sm border-0 rounded-3xl shadow-lg">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-3 text-gray-800 text-lg">
                <div className="bg-gradient-to-r from-orange-400 to-yellow-500 p-2 rounded-xl">
                  <User className="h-5 w-5 text-white" />
                </div>
                家长信息
              </CardTitle>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setIsEditing(!isEditing)}
                className="rounded-2xl"
              >
                <Edit className="h-4 w-4 mr-2" />
                {isEditing ? "取消编辑" : "编辑信息"}
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-gray-700">家长姓名</Label>
                {isEditing ? (
                  <Input 
                    value={userInfo.parentName}
                    onChange={(e) => setUserInfo({...userInfo, parentName: e.target.value})}
                    className="rounded-xl"
                  />
                ) : (
                  <div className="p-3 bg-gray-50 rounded-xl text-gray-800">{userInfo.parentName}</div>
                )}
              </div>
              <div className="space-y-2">
                <Label className="text-gray-700">联系电话</Label>
                {isEditing ? (
                  <Input 
                    value={userInfo.phone}
                    onChange={(e) => setUserInfo({...userInfo, phone: e.target.value})}
                    className="rounded-xl"
                  />
                ) : (
                  <div className="p-3 bg-gray-50 rounded-xl text-gray-800">{userInfo.phone}</div>
                )}
              </div>
              <div className="space-y-2">
                <Label className="text-gray-700">邮箱地址</Label>
                {isEditing ? (
                  <Input 
                    value={userInfo.email}
                    onChange={(e) => setUserInfo({...userInfo, email: e.target.value})}
                    className="rounded-xl"
                  />
                ) : (
                  <div className="p-3 bg-gray-50 rounded-xl text-gray-800">{userInfo.email}</div>
                )}
              </div>
              <div className="space-y-2">
                <Label className="text-gray-700">与孩子关系</Label>
                {isEditing ? (
                  <Input 
                    value={userInfo.relationship}
                    onChange={(e) => setUserInfo({...userInfo, relationship: e.target.value})}
                    className="rounded-xl"
                  />
                ) : (
                  <div className="p-3 bg-gray-50 rounded-xl text-gray-800">{userInfo.relationship}</div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/80 backdrop-blur-sm border-0 rounded-3xl shadow-lg">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-3 text-gray-800 text-lg">
              <div className="bg-gradient-to-r from-blue-400 to-cyan-500 p-2 rounded-xl">
                <User className="h-5 w-5 text-white" />
              </div>
              孩子信息
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-gray-700">孩子姓名</Label>
                {isEditing ? (
                  <Input 
                    value={userInfo.childName}
                    onChange={(e) => setUserInfo({...userInfo, childName: e.target.value})}
                    className="rounded-xl"
                  />
                ) : (
                  <div className="p-3 bg-gray-50 rounded-xl text-gray-800">{userInfo.childName}</div>
                )}
              </div>
              <div className="space-y-2">
                <Label className="text-gray-700">年龄</Label>
                {isEditing ? (
                  <Input 
                    value={userInfo.childAge}
                    onChange={(e) => setUserInfo({...userInfo, childAge: e.target.value})}
                    className="rounded-xl"
                  />
                ) : (
                  <div className="p-3 bg-gray-50 rounded-xl text-gray-800">{userInfo.childAge}</div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/80 backdrop-blur-sm border-0 rounded-3xl shadow-lg">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-3 text-gray-800 text-lg">
              <div className="bg-gradient-to-r from-red-400 to-rose-500 p-2 rounded-xl">
                <Lock className="h-5 w-5 text-white" />
              </div>
              安全设置
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button 
              variant="outline" 
              className="w-full rounded-2xl h-12 justify-start"
            >
              <Lock className="h-4 w-4 mr-3" />
              修改密码
            </Button>
            <Button 
              variant="outline" 
              className="w-full rounded-2xl h-12 justify-start"
            >
              <Phone className="h-4 w-4 mr-3" />
              更换绑定手机
            </Button>
          </CardContent>
        </Card>

        {isEditing && (
          <Button 
            className="w-full bg-gradient-to-r from-orange-400 to-yellow-500 hover:from-orange-500 hover:to-yellow-600 text-white border-0 rounded-2xl h-12 font-medium"
            onClick={() => setIsEditing(false)}
          >
            保存修改
          </Button>
        )}
      </div>
    </div>
  );
};

export default AccountManagement;
