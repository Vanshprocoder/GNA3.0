import React, { useState } from "react";
import { ArrowLeft, BarChart2, MessageSquare, Lightbulb, Target, Check, X } from "lucide-react";
import { useNavigate } from "react-router-dom";


const InterviewAnalysis = ({ analysisData, onBack }) => {
  const [activeTab, setActiveTab] = useState("overview");
  const navigate = useNavigate();
  
  // Loading state
  if (!analysisData) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-700 text-lg">Loading your interview analysis...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white p-6">
      {/* Header */}
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <button 
            onClick={() => navigate("/")}
            className="flex items-center text-gray-700 gap-2 bg-white hover:bg-gray-100 px-4 py-2 rounded-lg transition-colors shadow"
          >
            <ArrowLeft size={20} />
            <span>Back to Dashboard</span>
          </button>
          <h1 className="text-3xl font-bold text-gray-800">Interview Analysis</h1>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-gray-200 mb-8">
          <button
            onClick={() => setActiveTab("overview")}
            className={`px-6 py-3 text-lg font-medium transition-colors ${
              activeTab === "overview" 
                ? "text-blue-500 border-b-2 border-blue-500" 
                : "text-gray-500 hover:text-gray-800"
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab("questions")}
            className={`px-6 py-3 text-lg font-medium transition-colors ${
              activeTab === "questions" 
                ? "text-blue-500 border-b-2 border-blue-500" 
                : "text-gray-500 hover:text-gray-800"
            }`}
          >
            Questions & Responses
          </button>
          <button
            onClick={() => setActiveTab("insights")}
            className={`px-6 py-3 text-lg font-medium transition-colors ${
              activeTab === "insights" 
                ? "text-blue-500 border-b-2 border-blue-500" 
                : "text-gray-500 hover:text-gray-800"
            }`}
          >
            Insights & Recommendations
          </button>
        </div>

        {/* Content Area */}
        <div className="bg-white rounded-xl p-8 shadow-lg">
          {activeTab === "overview" && (
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                <BarChart2 className="mr-2 text-blue-500" size={28} />
                Performance Overview
              </h2>
              
              {/* Score Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                <ScoreCard title="Overall Score" score={analysisData.overallScore} color="blue" />
                <ScoreCard title="Confidence" score={analysisData.confidence} color="purple" />
                <ScoreCard title="Technical" score={analysisData.technicalScore} color="green" />
                <ScoreCard title="Communication" score={analysisData.communicationScore} color="yellow" />
              </div>
              
              {/* Key Insights */}
              <div className="bg-blue-50 rounded-lg p-6 mb-8">
                <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                  <Lightbulb className="mr-2 text-yellow-500" size={24} />
                  Key Insights
                </h3>
                <ul className="space-y-3">
                  {analysisData.keyInsights.map((insight, index) => (
                    <li key={index} className="flex items-start">
                      <span className="mr-2 mt-1 text-green-500"><Check size={18} /></span>
                      <span className="text-gray-700">{insight}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              {/* Improvement Areas */}
              <div className="bg-blue-50 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                  <Target className="mr-2 text-red-500" size={24} />
                  Areas for Improvement
                </h3>
                <ul className="space-y-3">
                  {analysisData.improvementAreas.map((area, index) => (
                    <li key={index} className="flex items-start">
                      <span className="mr-2 mt-1 text-blue-500"><ArrowLeft size={18} /></span>
                      <span className="text-gray-700">{area}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {activeTab === "questions" && (
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                <MessageSquare className="mr-2 text-blue-500" size={28} />
                Questions & Responses
              </h2>
              
              <div className="space-y-8">
                {analysisData.questionResponses.map((item, index) => (
                  <div key={index} className="bg-blue-50 rounded-lg p-6">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-xl font-medium text-gray-800">{item.question}</h3>
                      <div className="flex items-center bg-white px-3 py-1 rounded-full shadow">
                        <span className="text-gray-600 mr-2">Score:</span>
                        <span className={`font-bold ${getScoreColor(item.responseScore)}`}>
                          {item.responseScore}
                        </span>
                      </div>
                    </div>
                    <div className="mb-4 pb-4 border-b border-gray-200">
                      <p className="text-gray-700">
                        {/* This would show the actual response transcript */}
                        Your response was clear and articulate. You covered key points including your experience with React, state management approaches, and performance optimization strategies...
                      </p>
                    </div>
                    <div>
                      <h4 className="text-lg font-medium text-gray-800 mb-2">Feedback:</h4>
                      <p className="text-gray-700">{item.feedback}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "insights" && (
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                <Lightbulb className="mr-2 text-yellow-500" size={28} />
                Insights & Recommendations
              </h2>
              
              {/* Strengths */}
              <div className="bg-blue-50 rounded-lg p-6 mb-8">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Your Strengths</h3>
                <ul className="space-y-3">
                  <StrengthItem 
                    title="Technical Knowledge" 
                    description="You demonstrated strong technical depth, especially when discussing system architecture."
                  />
                  <StrengthItem 
                    title="Problem Solving" 
                    description="Your approach to breaking down complex problems was methodical and effective."
                  />
                  <StrengthItem 
                    title="Communication" 
                    description="You articulated complex concepts clearly with good examples."
                  />
                </ul>
              </div>
              
              {/* Recommended Focus Areas */}
              <div className="bg-blue-50 rounded-lg p-6 mb-8">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Recommended Focus Areas</h3>
                <ul className="space-y-3">
                  <ImprovementItem 
                    title="Concise Responses" 
                    description="Try to be more concise in your answers while still providing sufficient context."
                    tip="Use the STAR method (Situation, Task, Action, Result) for structured responses."
                  />
                  <ImprovementItem 
                    title="Confidence" 
                    description="Your technical knowledge is strong, but your delivery could project more confidence."
                    tip="Practice power posing before interviews and use decisive language."
                  />
                  <ImprovementItem 
                    title="Follow-up Questions" 
                    description="Be prepared to go deeper when asked follow-up questions."
                    tip="After preparing an answer, think about what follow-ups might come and prepare for those too."
                  />
                </ul>
              </div>
              
              {/* Next Steps */}
              <div className="bg-blue-100 rounded-lg p-6 border border-blue-200">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Recommended Next Steps</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="mr-3 mt-1 text-blue-500 bg-blue-100 p-1 rounded">1</span>
                    <div>
                      <p className="text-gray-800 font-medium">Schedule a follow-up mock interview</p>
                      <p className="text-gray-600">Focus on the improvement areas highlighted in this analysis</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-3 mt-1 text-blue-500 bg-blue-100 p-1 rounded">2</span>
                    <div>
                      <p className="text-gray-800 font-medium">Review technical concepts</p>
                      <p className="text-gray-600">Focus on system design and algorithmic complexity topics</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-3 mt-1 text-blue-500 bg-blue-100 p-1 rounded">3</span>
                    <div>
                      <p className="text-gray-800 font-medium">Practice structured storytelling</p>
                      <p className="text-gray-600">Work on delivering concise, impactful responses about your experience</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Helper Components
const ScoreCard = ({ title, score, color }) => {
  const colors = {
    blue: "from-blue-400 to-blue-600",
    green: "from-green-400 to-green-600",
    purple: "from-purple-400 to-purple-600",
    yellow: "from-yellow-400 to-yellow-600"
  };
  
  const gradientClass = colors[color] || colors.blue;
  
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md border border-gray-100">
      <div className="p-4">
        <h3 className="text-gray-600 font-medium mb-1">{title}</h3>
        <div className="flex items-end">
          <span className="text-4xl font-bold text-gray-800">{score}</span>
          <span className="text-gray-500 ml-1 mb-1">/100</span>
        </div>
      </div>
      <div className={`h-2 bg-gradient-to-r ${gradientClass}`} style={{ width: `${score}%` }}></div>
    </div>
  );
};

const StrengthItem = ({ title, description }) => (
  <li className="flex items-start">
    <div className="mr-3 mt-1 p-1 bg-green-100 rounded">
      <Check size={16} className="text-green-500" />
    </div>
    <div>
      <h4 className="text-gray-800 font-medium">{title}</h4>
      <p className="text-gray-600">{description}</p>
    </div>
  </li>
);

const ImprovementItem = ({ title, description, tip }) => (
  <li className="flex items-start">
    <div className="mr-3 mt-1 p-1 bg-blue-100 rounded">
      <ArrowLeft size={16} className="text-blue-500" />
    </div>
    <div>
      <h4 className="text-gray-800 font-medium">{title}</h4>
      <p className="text-gray-600">{description}</p>
      <p className="text-blue-600 mt-1 text-sm"><span className="font-semibold">Tip:</span> {tip}</p>
    </div>
  </li>
);

const getScoreColor = (score) => {
  if (score >= 90) return "text-green-500";
  if (score >= 80) return "text-blue-500";
  if (score >= 70) return "text-yellow-500";
  return "text-red-500";
};

export default InterviewAnalysis;
