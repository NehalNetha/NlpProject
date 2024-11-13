import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { FileText, Brain, Clipboard, Activity, HeartPulse, Syringe } from 'lucide-react';

const WorkflowComponent = () => {
  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-gray-50 rounded-lg">
      <div className="text-center mb-12">
        <div className="inline-flex px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-sm mb-4">
          How it Works
        </div>
        <h1 className="text-3xl font-bold mb-4">
          MedAnalytics is the platform for healthcare providers offering
          AI-powered analysis of medical reports and personalized recommendations
        </h1>
      </div>

      <div className="grid md:grid-cols-3 gap-8 mb-12">
        <Card className="p-6">
          <div className="mb-4">
            <div className="bg-blue-100 w-8 h-8 rounded-lg flex items-center justify-center mb-2">
              <FileText className="w-5 h-5 text-blue-700" />
            </div>
            <div className="text-sm text-gray-500 mb-1">01</div>
            <h3 className="font-semibold mb-2">Upload</h3>
          </div>
          <p className="text-gray-600 text-sm">
            Upload medical reports and test results through our secure platform.
          </p>
        </Card>

        <Card className="p-6">
          <div className="mb-4">
            <div className="bg-blue-100 w-8 h-8 rounded-lg flex items-center justify-center mb-2">
              <Brain className="w-5 h-5 text-blue-700" />
            </div>
            <div className="text-sm text-gray-500 mb-1">02</div>
            <h3 className="font-semibold mb-2">Analyze</h3>
          </div>
          <p className="text-gray-600 text-sm">
            Our AI processes reports to identify key health indicators and patterns.
          </p>
        </Card>

        <Card className="p-6">
          <div className="mb-4">
            <div className="bg-blue-100 w-8 h-8 rounded-lg flex items-center justify-center mb-2">
              <Clipboard className="w-5 h-5 text-blue-700" />
            </div>
            <div className="text-sm text-gray-500 mb-1">03</div>
            <h3 className="font-semibold mb-2">Recommendations</h3>
          </div>
          <p className="text-gray-600 text-sm">
            Receive detailed health insights and personalized recommendations.
          </p>
        </Card>
      </div>

      <Card className="w-full">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="w-5 h-5 text-blue-700" />
            Sample Analysis Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white p-4 rounded-lg border border-gray-100">
              <div className="flex items-center gap-2 mb-3">
                <HeartPulse className="w-5 h-5 text-red-500" />
                <h3 className="font-semibold">Health Metrics</h3>
              </div>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>Blood Pressure Analysis</li>
                <li>Cholesterol Levels</li>
                <li>Blood Sugar Patterns</li>
                <li>BMI Assessment</li>
              </ul>
            </div>

            <div className="bg-white p-4 rounded-lg border border-gray-100">
              <div className="flex items-center gap-2 mb-3">
                <Brain className="w-5 h-5 text-purple-500" />
                <h3 className="font-semibold">AI Insights</h3>
              </div>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>Pattern Recognition</li>
                <li>Risk Assessment</li>
                <li>Trend Analysis</li>
                <li>Health Predictions</li>
              </ul>
            </div>

            <div className="bg-white p-4 rounded-lg border border-gray-100">
              <div className="flex items-center gap-2 mb-3">
                <Syringe className="w-5 h-5 text-green-500" />
                <h3 className="font-semibold">Recommendations</h3>
              </div>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>Lifestyle Changes</li>
                <li>Diet Suggestions</li>
                <li>Exercise Plans</li>
                <li>Follow-up Schedule</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default WorkflowComponent;