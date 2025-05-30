
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, Target, CheckCircle, AlertCircle, Clock, Star, TrendingUp } from "lucide-react";

const GoalDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // 模拟数据
  const goalData = {
    1: {
      title: "独立完成排队付款",
      description: "学习在商店或超市中独立完成排队和付款的社交技能",
      progress: 75,
      overallScore: 8.2,
      steps: [
        { 
          id: 1, 
          title: "识别收银台位置", 
          status: "completed", 
          completion: 100,
          aiSuggestion: "表现优秀！小明已经能够准确识别收银台位置，建议继续保持。"
        },
        { 
          id: 2, 
          title: "学会排队等待", 
          status: "completed", 
          completion: 100,
          aiSuggestion: "很好地掌握了排队礼仪，能够耐心等待轮到自己。"
        },
        { 
          id: 3, 
          title: "准备付款物品", 
          status: "in-progress", 
          completion: 80,
          aiSuggestion: "基本掌握准备付款物品的步骤，建议加强练习取出钱包和准备付款方式的动作。"
        },
        { 
          id: 4, 
          title: "与收银员互动", 
          status: "in-progress", 
          completion: 60,
          aiSuggestion: "需要加强与收银员的眼神交流和简单问候，可以先从微笑和点头开始练习。"
        },
        { 
          id: 5, 
          title: "完成付款流程", 
          status: "pending", 
          completion: 30,
          aiSuggestion: "这是最具挑战性的步骤，建议先在家中模拟练习，然后逐步在真实环境中尝试。"
        }
      ]
    },
    // 可以添加更多目标数据
  };

  const goal = goalData[id as keyof typeof goalData];

  if (!goal) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-amber-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">目标未找到</h2>
          <Button onClick={() => navigate('/')}>返回首页</Button>
        </div>
      </div>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'from-green-400 to-emerald-500';
      case 'in-progress': return 'from-blue-400 to-cyan-500';
      case 'pending': return 'from-gray-400 to-slate-500';
      default: return 'from-gray-400 to-slate-500';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed': return '已完成';
      case 'in-progress': return '进行中';
      case 'pending': return '待开始';
      default: return '未知';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-amber-50">
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-md border-b border-orange-100 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => navigate('/')}
              className="rounded-2xl"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-xl font-bold text-gray-800">学习目标详情</h1>
              <p className="text-sm text-orange-600">查看目标进度和AI建议</p>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6 space-y-6">
        {/* Goal Overview */}
        <Card className="bg-white/80 backdrop-blur-sm border-0 rounded-3xl shadow-lg">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-3 text-gray-800 text-lg">
              <div className="bg-gradient-to-r from-orange-400 to-yellow-500 p-2 rounded-xl">
                <Target className="h-5 w-5 text-white" />
              </div>
              {goal.title}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <p className="text-gray-600">{goal.description}</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gradient-to-br from-orange-100 to-yellow-100 rounded-2xl p-4">
                <div className="flex items-center gap-3 mb-2">
                  <TrendingUp className="h-5 w-5 text-orange-600" />
                  <span className="font-medium text-gray-800">整体进度</span>
                </div>
                <div className="flex items-center gap-3">
                  <Progress value={goal.progress} className="flex-1 h-3" />
                  <span className="text-lg font-bold text-orange-600">{goal.progress}%</span>
                </div>
              </div>

              <div className="bg-gradient-to-br from-rose-100 to-pink-100 rounded-2xl p-4">
                <div className="flex items-center gap-3 mb-2">
                  <Star className="h-5 w-5 text-rose-600" />
                  <span className="font-medium text-gray-800">综合评分</span>
                </div>
                <div className="text-2xl font-bold text-rose-600">{goal.overallScore}分</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Steps Detail */}
        <Card className="bg-white/80 backdrop-blur-sm border-0 rounded-3xl shadow-lg">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-3 text-gray-800 text-lg">
              <div className="bg-gradient-to-r from-blue-400 to-cyan-500 p-2 rounded-xl">
                <CheckCircle className="h-5 w-5 text-white" />
              </div>
              学习步骤详情
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {goal.steps.map((step, index) => (
              <div key={step.id} className="bg-white/70 rounded-2xl p-5 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="bg-gray-100 rounded-xl w-8 h-8 flex items-center justify-center text-sm font-bold text-gray-600">
                      {index + 1}
                    </div>
                    <h3 className="font-bold text-gray-800">{step.title}</h3>
                  </div>
                  <Badge className={`text-white border-0 rounded-full px-3 py-1 bg-gradient-to-r ${getStatusColor(step.status)}`}>
                    {getStatusText(step.status)}
                  </Badge>
                </div>

                <div className="space-y-3">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-700">完成度</span>
                      <span className="text-sm font-bold text-gray-800">{step.completion}%</span>
                    </div>
                    <Progress value={step.completion} className="h-2" />
                  </div>

                  <div className="bg-gradient-to-r from-orange-50 to-yellow-50 border border-orange-200 rounded-xl p-4">
                    <div className="flex items-start gap-3">
                      <div className="bg-orange-100 p-2 rounded-xl mt-1">
                        <AlertCircle className="h-4 w-4 text-orange-600" />
                      </div>
                      <div>
                        <h4 className="font-medium text-orange-800 mb-1">AI建议</h4>
                        <p className="text-sm text-orange-700">{step.aiSuggestion}</p>
                      </div>
                    </div>
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
            onClick={() => navigate('/')}
          >
            返回目标列表
          </Button>
          <Button 
            className="h-12 bg-gradient-to-r from-orange-400 to-yellow-500 hover:from-orange-500 hover:to-yellow-600 text-white border-0 rounded-2xl font-medium shadow-lg"
          >
            <Target className="h-4 w-4 mr-2" />
            调整学习计划
          </Button>
        </div>
      </div>
    </div>
  );
};

export default GoalDetail;
