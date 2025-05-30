
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Target, Plus } from "lucide-react";

const AddGoal = () => {
  const navigate = useNavigate();
  const [goalName, setGoalName] = useState('');
  const [prompt, setPrompt] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (goalName.trim() && prompt.trim()) {
      // 传递数据到目标拆解页面
      navigate('/goal-breakdown', { 
        state: { 
          goalName: goalName.trim(), 
          prompt: prompt.trim() 
        } 
      });
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
              <h1 className="text-xl font-bold text-gray-800">添加新目标</h1>
              <p className="text-sm text-orange-600">创建个性化学习目标</p>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <Card className="bg-white/80 backdrop-blur-sm border-0 rounded-3xl shadow-lg max-w-2xl mx-auto">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-3 text-gray-800 text-lg">
              <div className="bg-gradient-to-r from-orange-400 to-yellow-500 p-2 rounded-xl">
                <Plus className="h-5 w-5 text-white" />
              </div>
              新建学习目标
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-3">
                <label htmlFor="goalName" className="text-sm font-medium text-gray-700 block">
                  目标名称 *
                </label>
                <Input
                  id="goalName"
                  type="text"
                  placeholder="例如：学会在餐厅点餐"
                  value={goalName}
                  onChange={(e) => setGoalName(e.target.value)}
                  className="rounded-2xl border-gray-200 bg-white/70 h-12 text-base"
                  required
                />
              </div>

              <div className="space-y-3">
                <label htmlFor="prompt" className="text-sm font-medium text-gray-700 block">
                  详细描述 *
                </label>
                <Textarea
                  id="prompt"
                  placeholder="请详细描述这个学习目标，包括：&#10;- 具体要学习的技能&#10;- 当前孩子的能力水平&#10;- 希望达到的效果&#10;- 任何特殊需求或注意事项"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  className="rounded-2xl border-gray-200 bg-white/70 min-h-[150px] text-base resize-none"
                  required
                />
                <p className="text-xs text-gray-500">
                  详细的描述有助于AI为您生成更准确的学习步骤
                </p>
              </div>

              <div className="bg-gradient-to-r from-orange-50 to-yellow-50 border border-orange-200 rounded-2xl p-4">
                <h3 className="font-medium text-orange-800 mb-2">💡 小贴士</h3>
                <ul className="text-sm text-orange-700 space-y-1">
                  <li>• 描述越详细，AI生成的学习计划越精准</li>
                  <li>• 可以包含孩子的兴趣爱好，有助于制定个性化方案</li>
                  <li>• 如有特殊需求，请在描述中详细说明</li>
                </ul>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                <Button 
                  type="button"
                  variant="outline"
                  className="h-12 rounded-2xl font-medium bg-white/70 border-gray-200 hover:bg-orange-50"
                  onClick={() => navigate('/')}
                >
                  取消
                </Button>
                <Button 
                  type="submit"
                  className="h-12 bg-gradient-to-r from-orange-400 to-yellow-500 hover:from-orange-500 hover:to-yellow-600 text-white border-0 rounded-2xl font-medium shadow-lg"
                  disabled={!goalName.trim() || !prompt.trim()}
                >
                  <Target className="h-4 w-4 mr-2" />
                  生成学习计划
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AddGoal;
