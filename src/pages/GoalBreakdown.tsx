
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Target, Edit, Send, CheckCircle, Clock } from "lucide-react";

const GoalBreakdown = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [steps, setSteps] = useState<any[]>([]);

  // 从路由状态获取目标信息
  const { goalName, prompt } = location.state || {};

  useEffect(() => {
    if (!goalName || !prompt) {
      navigate('/add-goal');
      return;
    }

    // 模拟AI分析过程
    setTimeout(() => {
      // 模拟AI生成的学习步骤
      const generatedSteps = [
        {
          id: 1,
          title: "观察和熟悉环境",
          description: "带孩子多次到餐厅，让他观察其他顾客如何点餐，熟悉餐厅环境和流程",
          estimatedTime: "1-2周",
          difficulty: "简单"
        },
        {
          id: 2,
          title: "练习菜单阅读",
          description: "在家中使用餐厅菜单或图片菜单，练习识别菜品名称和价格",
          estimatedTime: "1周",
          difficulty: "简单"
        },
        {
          id: 3,
          title: "角色扮演练习",
          description: "在家中模拟点餐场景，家长扮演服务员，孩子练习点餐对话",
          estimatedTime: "2-3周",
          difficulty: "中等"
        },
        {
          id: 4,
          title: "简单点餐尝试",
          description: "在熟悉的餐厅，让孩子尝试点一道简单的菜品，家长在旁协助",
          estimatedTime: "1-2周",
          difficulty: "中等"
        },
        {
          id: 5,
          title: "独立完成点餐",
          description: "孩子独立完成整个点餐过程，包括选择菜品、与服务员沟通、确认订单",
          estimatedTime: "2-4周",
          difficulty: "困难"
        }
      ];
      
      setSteps(generatedSteps);
      setIsLoading(false);
    }, 2000);
  }, [goalName, prompt, navigate]);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case '简单': return 'from-green-400 to-emerald-500';
      case '中等': return 'from-yellow-400 to-amber-500';
      case '困难': return 'from-red-400 to-rose-500';
      default: return 'from-gray-400 to-slate-500';
    }
  };

  const handlePublish = () => {
    // 模拟发布学习任务
    alert('学习任务已发布！将开始为孩子提供个性化指导。');
    navigate('/');
  };

  if (!goalName || !prompt) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-amber-50">
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-md border-b border-orange-100 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => navigate('/add-goal')}
              className="rounded-2xl"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-xl font-bold text-gray-800">目标拆解分析</h1>
              <p className="text-sm text-orange-600">AI智能分析学习步骤</p>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6 space-y-6">
        {/* Goal Info */}
        <Card className="bg-white/80 backdrop-blur-sm border-0 rounded-3xl shadow-lg">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-3 text-gray-800 text-lg">
              <div className="bg-gradient-to-r from-orange-400 to-yellow-500 p-2 rounded-xl">
                <Target className="h-5 w-5 text-white" />
              </div>
              {goalName}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-gray-50 rounded-2xl p-4">
              <h3 className="font-medium text-gray-800 mb-2">目标描述</h3>
              <p className="text-gray-600 text-sm whitespace-pre-wrap">{prompt}</p>
            </div>
          </CardContent>
        </Card>

        {/* AI Analysis */}
        {isLoading ? (
          <Card className="bg-white/80 backdrop-blur-sm border-0 rounded-3xl shadow-lg">
            <CardContent className="p-8">
              <div className="text-center space-y-4">
                <div className="bg-gradient-to-r from-orange-400 to-yellow-500 p-4 rounded-2xl w-fit mx-auto">
                  <Target className="h-8 w-8 text-white animate-spin" />
                </div>
                <h3 className="text-lg font-bold text-gray-800">AI正在分析中...</h3>
                <p className="text-gray-600">正在根据您的描述生成个性化学习步骤</p>
              </div>
            </CardContent>
          </Card>
        ) : (
          <>
            {/* Steps Breakdown */}
            <Card className="bg-white/80 backdrop-blur-sm border-0 rounded-3xl shadow-lg">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-3 text-gray-800 text-lg">
                  <div className="bg-gradient-to-r from-blue-400 to-cyan-500 p-2 rounded-xl">
                    <CheckCircle className="h-5 w-5 text-white" />
                  </div>
                  AI拆解的学习步骤
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {steps.map((step, index) => (
                  <div key={step.id} className="bg-white/70 rounded-2xl p-5 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="bg-gradient-to-r from-orange-400 to-yellow-500 rounded-xl w-8 h-8 flex items-center justify-center text-sm font-bold text-white">
                          {index + 1}
                        </div>
                        <h3 className="font-bold text-gray-800">{step.title}</h3>
                      </div>
                      <Badge className={`text-white border-0 rounded-full px-3 py-1 bg-gradient-to-r ${getDifficultyColor(step.difficulty)}`}>
                        {step.difficulty}
                      </Badge>
                    </div>

                    <p className="text-gray-600 pl-11">{step.description}</p>

                    <div className="flex items-center gap-4 pl-11">
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <Clock className="h-4 w-4" />
                        <span>预计时长：{step.estimatedTime}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Button 
                variant="outline"
                className="h-12 rounded-2xl font-medium bg-white/70 border-gray-200 hover:bg-orange-50"
              >
                <Edit className="h-4 w-4 mr-2" />
                修改步骤
              </Button>
              <Button 
                className="h-12 bg-gradient-to-r from-orange-400 to-yellow-500 hover:from-orange-500 hover:to-yellow-600 text-white border-0 rounded-2xl font-medium shadow-lg"
                onClick={handlePublish}
              >
                <Send className="h-4 w-4 mr-2" />
                发布学习任务
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default GoalBreakdown;
