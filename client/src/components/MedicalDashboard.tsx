import React from 'react';
import { FileText, Activity, Scale, ClipboardCheck, Users, LineChart } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description }) => (
  <div className="flex flex-col items-start p-4">
    <div className="mb-4 p-2 bg-blue-100 rounded-lg">
      {icon}
    </div>
    <h3 className="text-lg font-semibold mb-2">{title}</h3>
    <p className="text-gray-300 mb-4">{description}</p>
    <button className="text-blue-400 hover:text-blue-800 flex items-center gap-2">
      Learn more <span className="text-xl">&rarr;</span>
    </button>
  </div>
);

const MedicalDashboard: React.FC = () => {
  return (
    <Card className="bg-gradient-to-b from-blue-900 to-blue-950 text-white p-8 rounded-xl max-w-6xl mx-auto mb-11">
      <CardHeader>
        <CardTitle className="text-3xl font-bold mb-2">
          Your Personal Health Assistant
        </CardTitle>
        <p className="text-blue-200 text-xl">
          A comprehensive platform for analyzing medical reports and providing personalized health insights.
        </p>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          <FeatureCard
            icon={<FileText className="w-6 h-6 text-blue-600" />}
            title="Instant Report Analysis"
            description="Upload medical reports and get detailed analysis within seconds. Supports both PDF and image formats."
          />
          
          <FeatureCard
            icon={<Activity className="w-6 h-6 text-blue-600" />}
            title="Health Monitoring"
            description="Track your health metrics over time with comprehensive history and progress tracking."
          />
          
          <FeatureCard
            icon={<Scale className="w-6 h-6 text-blue-600" />}
            title="Personalized Diet Plans"
            description="Receive customized nutrition recommendations based on your health reports and goals."
          />
          
          <FeatureCard
            icon={<ClipboardCheck className="w-6 h-6 text-blue-600" />}
            title="Recovery Planning"
            description="Get detailed recovery plans tailored to your condition and medical history."
          />
          
          <FeatureCard
            icon={<Users className="w-6 h-6 text-blue-600" />}
            title="Care Coordination"
            description="Share reports and insights with your healthcare providers for better coordination."
          />
          
          <FeatureCard
            icon={<LineChart className="w-6 h-6 text-blue-600" />}
            title="Health Analytics"
            description="Visualize your health trends and get predictive insights for better health management."
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default MedicalDashboard;