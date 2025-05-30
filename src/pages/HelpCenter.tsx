
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, BookOpen, Search, Phone, Mail, MessageCircle, Video, HelpCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const HelpCenter = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const faqData = [
    {
      question: "如何开始使用小天使守护？",
      answer: "首先需要为孩子佩戴智能设备，然后在APP中完成初始设置，包括孩子的基本信息、学习目标等。系统会根据孩子的特点提供个性化的引导方案。"
    },
    {
      question: "设备电量不足时会怎样？",
      answer: "当设备电量低于20%时，系统会自动推送提醒给家长。当电量低于10%时，设备会进入省电模式，保留基本的定位和紧急呼叫功能。"
    },
    {
      question: "孩子不愿意佩戴设备怎么办？",
      answer: "我们建议采用渐进式的方式，让孩子逐步适应。可以先让孩子短时间佩戴，配合奖励机制。设备设计考虑了儿童的舒适度，材质安全无害。"
    },
    {
      question: "如何设置学习目标？",
      answer: "在'档案'页面中点击'添加新目标'，根据孩子的实际情况选择合适的技能目标。建议从简单的日常生活技能开始，逐步增加难度。"
    },
    {
      question: "数据安全如何保障？",
      answer: "我们采用端到端加密技术保护所有数据传输，服务器部署在国内，符合相关法规要求。您可以在隐私设置中控制数据的使用权限。"
    }
  ];

  const tutorialVideos = [
    { title: "设备初始设置教程", duration: "5分钟", category: "设备使用" },
    { title: "学习目标设定指南", duration: "8分钟", category: "功能使用" },
    { title: "安全功能使用说明", duration: "6分钟", category: "安全守护" },
    { title: "数据报告解读", duration: "10分钟", category: "数据分析" }
  ];

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
              <h1 className="text-xl font-bold text-gray-800">帮助中心</h1>
              <p className="text-sm text-orange-600">获取使用帮助和支持</p>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6 space-y-6">
        {/* 搜索栏 */}
        <Card className="bg-white/80 backdrop-blur-sm border-0 rounded-3xl shadow-lg">
          <CardContent className="p-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="搜索问题或关键词..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 rounded-2xl border-gray-200"
              />
            </div>
          </CardContent>
        </Card>

        {/* 快速联系 */}
        <Card className="bg-white/80 backdrop-blur-sm border-0 rounded-3xl shadow-lg">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-3 text-gray-800 text-lg">
              <div className="bg-gradient-to-r from-orange-400 to-yellow-500 p-2 rounded-xl">
                <Phone className="h-5 w-5 text-white" />
              </div>
              快速联系我们
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <Button 
                variant="outline" 
                className="flex items-center gap-3 p-4 h-16 rounded-2xl bg-white/70 border-gray-200 hover:bg-blue-50 justify-start"
              >
                <div className="bg-blue-100 p-2 rounded-xl">
                  <Phone className="h-5 w-5 text-blue-600" />
                </div>
                <div className="text-left">
                  <div className="font-medium text-gray-800">电话咨询</div>
                  <div className="text-sm text-gray-500">400-123-4567</div>
                </div>
              </Button>

              <Button 
                variant="outline" 
                className="flex items-center gap-3 p-4 h-16 rounded-2xl bg-white/70 border-gray-200 hover:bg-green-50 justify-start"
              >
                <div className="bg-green-100 p-2 rounded-xl">
                  <MessageCircle className="h-5 w-5 text-green-600" />
                </div>
                <div className="text-left">
                  <div className="font-medium text-gray-800">在线客服</div>
                  <div className="text-sm text-gray-500">9:00-21:00</div>
                </div>
              </Button>

              <Button 
                variant="outline" 
                className="flex items-center gap-3 p-4 h-16 rounded-2xl bg-white/70 border-gray-200 hover:bg-purple-50 justify-start"
              >
                <div className="bg-purple-100 p-2 rounded-xl">
                  <Mail className="h-5 w-5 text-purple-600" />
                </div>
                <div className="text-left">
                  <div className="font-medium text-gray-800">邮件支持</div>
                  <div className="text-sm text-gray-500">help@example.com</div>
                </div>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* 使用教程 */}
        <Card className="bg-white/80 backdrop-blur-sm border-0 rounded-3xl shadow-lg">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-3 text-gray-800 text-lg">
              <div className="bg-gradient-to-r from-blue-400 to-cyan-500 p-2 rounded-xl">
                <Video className="h-5 w-5 text-white" />
              </div>
              视频教程
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {tutorialVideos.map((video, index) => (
              <div key={index} className="flex items-center gap-4 p-4 bg-white/70 rounded-2xl hover:bg-white/90 transition-all duration-300 cursor-pointer">
                <div className="bg-red-100 p-3 rounded-xl">
                  <Video className="h-5 w-5 text-red-600" />
                </div>
                <div className="flex-1">
                  <div className="font-medium text-gray-800">{video.title}</div>
                  <div className="text-sm text-gray-600">{video.category} • {video.duration}</div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* 常见问题 */}
        <Card className="bg-white/80 backdrop-blur-sm border-0 rounded-3xl shadow-lg">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-3 text-gray-800 text-lg">
              <div className="bg-gradient-to-r from-green-400 to-emerald-500 p-2 rounded-xl">
                <HelpCircle className="h-5 w-5 text-white" />
              </div>
              常见问题
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="space-y-2">
              {faqData.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`} className="border-0">
                  <AccordionTrigger className="bg-white/70 rounded-2xl px-4 py-3 hover:bg-white/90 [&>svg]:h-4 [&>svg]:w-4">
                    <span className="text-left font-medium text-gray-800">{faq.question}</span>
                  </AccordionTrigger>
                  <AccordionContent className="px-4 py-3 text-gray-600">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default HelpCenter;
