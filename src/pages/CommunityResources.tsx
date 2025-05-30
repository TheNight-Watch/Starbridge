import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Heart, Users, Calendar, MapPin, Star, MessageCircle, BookOpen, Award } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const CommunityResources = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("support");

  const supportGroups = [
    {
      name: "北京特殊需求儿童家长互助群",
      members: 256,
      location: "北京市",
      lastActivity: "2小时前",
      description: "为北京地区特殊需求儿童家长提供经验分享和情感支持",
      tags: ["经验分享", "情感支持", "线下聚会"]
    },
    {
      name: "自闭症康复训练交流组",
      members: 189,
      location: "全国",
      lastActivity: "30分钟前",
      description: "专注于自闭症儿童康复训练方法和资源分享",
      tags: ["康复训练", "专业指导", "资源分享"]
    },
    {
      name: "感统训练家长学习群",
      members: 145,
      location: "上海市",
      lastActivity: "1小时前",
      description: "感统失调儿童的训练方法和家庭康复指导",
      tags: ["感统训练", "家庭康复", "专业培训"]
    }
  ];

  const activities = [
    {
      title: "特殊需求儿童艺术治疗工作坊",
      date: "2024年1月15日",
      time: "14:00-17:00",
      location: "朝阳区康复中心",
      participants: 24,
      maxParticipants: 30,
      price: "免费",
      organizer: "北京儿童康复协会",
      description: "通过艺术创作帮助特殊需求儿童表达情感，提升社交能力"
    },
    {
      title: "家长心理健康讲座",
      date: "2024年1月20日",
      time: "19:00-21:00",
      location: "线上直播",
      participants: 156,
      maxParticipants: 200,
      price: "免费",
      organizer: "专业心理咨询师团队",
      description: "帮助家长缓解育儿压力，建立积极的心态"
    },
    {
      title: "亲子户外体验活动",
      date: "2024年1月25日",
      time: "9:00-16:00",
      location: "奥林匹克森林公园",
      participants: 18,
      maxParticipants: 25,
      price: "50元/家庭",
      organizer: "爱心志愿者协会",
      description: "在大自然中进行亲子互动，提升孩子的适应能力"
    }
  ];

  const resources = [
    {
      title: "特殊需求儿童教育指南",
      type: "电子书",
      author: "康复教育专家团队",
      rating: 4.8,
      downloads: 2156,
      description: "全面的特殊需求儿童教育方法和策略指导"
    },
    {
      title: "家庭康复训练视频集",
      type: "视频课程",
      author: "资深康复治疗师",
      rating: 4.9,
      downloads: 1843,
      description: "适合在家进行的康复训练方法演示"
    },
    {
      title: "社交技能训练游戏包",
      type: "互动游戏",
      author: "儿童心理学家",
      rating: 4.7,
      downloads: 3421,
      description: "通过游戏提升孩子社交能力的实用工具"
    },
    {
      title: "情绪管理小贴士",
      type: "图文资料",
      author: "行为分析师",
      rating: 4.6,
      downloads: 2789,
      description: "帮助孩子和家长更好地管理情绪的实用建议"
    }
  ];

  const achievements = [
    {
      title: "积极参与者",
      description: "连续30天参与社区互动",
      icon: "🏆",
      progress: 85,
      unlocked: false
    },
    {
      title: "经验分享达人",
      description: "分享了10次育儿经验",
      icon: "⭐",
      progress: 100,
      unlocked: true
    },
    {
      title: "互助小天使",
      description: "帮助了5位其他家长",
      icon: "💝",
      progress: 60,
      unlocked: false
    }
  ];

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
              <h1 className="text-xl font-bold text-gray-800">社区资源</h1>
              <p className="text-sm text-orange-600">康复支持和家长交流平台</p>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-white/80 rounded-2xl p-1">
            <TabsTrigger value="support" className="rounded-xl">互助群组</TabsTrigger>
            <TabsTrigger value="activities" className="rounded-xl">活动报名</TabsTrigger>
            <TabsTrigger value="resources" className="rounded-xl">学习资源</TabsTrigger>
            <TabsTrigger value="achievements" className="rounded-xl">我的成就</TabsTrigger>
          </TabsList>

          <TabsContent value="support" className="space-y-4">
            {supportGroups.map((group, index) => (
              <Card key={index} className="bg-white/80 backdrop-blur-sm border-0 rounded-3xl shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="font-bold text-gray-800 text-lg mb-2">{group.name}</h3>
                      <p className="text-gray-600 text-sm mb-3">{group.description}</p>
                      <div className="flex flex-wrap gap-2 mb-3">
                        {group.tags.map((tag, tagIndex) => (
                          <Badge key={tagIndex} variant="outline" className="bg-orange-50 text-orange-700 border-orange-200 rounded-full">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <Users className="h-4 w-4" />
                        <span>{group.members}人</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        <span>{group.location}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MessageCircle className="h-4 w-4" />
                        <span>{group.lastActivity}</span>
                      </div>
                    </div>
                    <Button className="bg-gradient-to-r from-orange-400 to-yellow-500 hover:from-orange-500 hover:to-yellow-600 text-white border-0 rounded-2xl">
                      加入群组
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="activities" className="space-y-4">
            {activities.map((activity, index) => (
              <Card key={index} className="bg-white/80 backdrop-blur-sm border-0 rounded-3xl shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="font-bold text-gray-800 text-lg mb-2">{activity.title}</h3>
                      <p className="text-gray-600 text-sm mb-3">{activity.description}</p>
                      <div className="grid grid-cols-2 gap-4 text-sm text-gray-600 mb-3">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4" />
                          <span>{activity.date} {activity.time}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4" />
                          <span>{activity.location}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Users className="h-4 w-4" />
                          <span>{activity.participants}/{activity.maxParticipants}人</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Heart className="h-4 w-4" />
                          <span>{activity.organizer}</span>
                        </div>
                      </div>
                      <Badge className="bg-green-100 text-green-700 border-green-200 rounded-full">
                        {activity.price}
                      </Badge>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="text-sm text-gray-600">
                      还有 {activity.maxParticipants - activity.participants} 个名额
                    </div>
                    <Button className="bg-gradient-to-r from-blue-400 to-cyan-500 hover:from-blue-500 hover:to-cyan-600 text-white border-0 rounded-2xl">
                      立即报名
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="resources" className="space-y-4">
            {resources.map((resource, index) => (
              <Card key={index} className="bg-white/80 backdrop-blur-sm border-0 rounded-3xl shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-bold text-gray-800 text-lg">{resource.title}</h3>
                        <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 rounded-full">
                          {resource.type}
                        </Badge>
                      </div>
                      <p className="text-gray-600 text-sm mb-3">{resource.description}</p>
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <span>作者：{resource.author}</span>
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 text-yellow-500" />
                          <span>{resource.rating}</span>
                        </div>
                        <span>{resource.downloads} 下载</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <Button className="bg-gradient-to-r from-green-400 to-emerald-500 hover:from-green-500 hover:to-emerald-600 text-white border-0 rounded-2xl">
                      <BookOpen className="h-4 w-4 mr-2" />
                      获取资源
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="achievements" className="space-y-4">
            {achievements.map((achievement, index) => (
              <Card key={index} className={`backdrop-blur-sm border-0 rounded-3xl shadow-lg ${achievement.unlocked ? 'bg-gradient-to-r from-yellow-50 to-orange-50' : 'bg-white/80'}`}>
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className={`text-4xl ${achievement.unlocked ? '' : 'grayscale opacity-50'}`}>
                      {achievement.icon}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-bold text-gray-800 text-lg">{achievement.title}</h3>
                        {achievement.unlocked && (
                          <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white border-0 rounded-full">
                            <Award className="h-3 w-3 mr-1" />
                            已解锁
                          </Badge>
                        )}
                      </div>
                      <p className="text-gray-600 text-sm mb-3">{achievement.description}</p>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${achievement.unlocked ? 'bg-gradient-to-r from-yellow-400 to-orange-500' : 'bg-gray-400'}`}
                          style={{ width: `${achievement.progress}%` }}
                        ></div>
                      </div>
                      <div className="text-sm text-gray-600 mt-1">
                        进度：{achievement.progress}%
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default CommunityResources;
