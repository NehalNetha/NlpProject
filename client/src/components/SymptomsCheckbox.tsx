import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Loader2, X } from 'lucide-react';
import MarkdownRenderer from './MarkdownRenderer';

interface SymptomsCheckboxProps {
  symptoms: string[];
  onSymptomsChange?: (selectedSymptoms: string[]) => void;
  togglesymptomsCheckBox: () => void;
  setsymptomSummary: (summary: string) => void;
  reportSummary: string;
}

const SymptomsCheckbox = ({ symptoms, onSymptomsChange, togglesymptomsCheckBox, setsymptomSummary,reportSummary }: SymptomsCheckboxProps) => {
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [response, setResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [recommendations, setRecommendations] = useState<string | null>(null)
  const [isLoadingRecom, setIsLoadingRecom] = useState(false);

  const handleSymptomToggle = (symptom: string) => {
    if (symptom === 'No Symptoms') {
      // If "No Symptoms" is selected, clear all other selections
      setSelectedSymptoms(prev =>
        prev.includes('No Symptoms') ? [] : ['No Symptoms']
      );
      onSymptomsChange?.(['No Symptoms']);
    } else {
      // If any other symptom is selected, remove "No Symptoms" from selection
      setSelectedSymptoms(prev => {
        const withoutNoSymptoms = prev.filter(s => s !== 'No Symptoms');
        const newSelection = withoutNoSymptoms.includes(symptom)
          ? withoutNoSymptoms.filter(s => s !== symptom)
          : [...withoutNoSymptoms, symptom];

        onSymptomsChange?.(newSelection);
        return newSelection;
      });
    }
  };

  const AskSymptomsLLM = async () => {
    setIsLoading(true);
    setResponse('');

    try {
      const response = await fetch('http://localhost:8080/analyze-symptoms', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ selectedSymptoms }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      setResponse(data.analysis);
      setsymptomSummary(data.analysis);
      console.log("symptoms response", data);
    } catch (error) {
      console.error('Error analyzing symptoms:', error);
      setResponse('An error occurred while analyzing symptoms. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const HealthRecommendationsLLM = async () => {
    setIsLoadingRecom(true);
    setRecommendations('');

    try{
      const response = await fetch('http://localhost:8080/recommendation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ reportSummary: reportSummary, symptoms:symptoms }),
      });
      const data = await response.json();
      setRecommendations(data.analysis)

    }catch(error){
      console.error('Error getting recommendations:', error);
      setRecommendations('An error occurred while analyzing recommendations. Please try again.');
    }finally{
      setIsLoadingRecom(false);
    }
  }

  const handleClose = () => {
    // Reset all state before closing
    setSelectedSymptoms([]);
    setResponse('');
    setRecommendations(null);
    setIsLoading(false);
    setIsLoadingRecom(false);
    // Call the original toggle function
    togglesymptomsCheckBox();
  };

  return (
    <Card className={`w-full transition-all duration-300 ${response ? 'w-full' : 'max-w-md'}`}>
      <CardHeader className='flex flex-row justify-between items-center'>
        <CardTitle className="text-xl font-semibold">Symptom Checker</CardTitle>
        <button 
          onClick={handleClose}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
        > 
          <X className="h-5 w-5" /> 
        </button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {[...symptoms, 'No Symptoms'].map((symptom) => (
            <div key={symptom} className="flex items-center space-x-2">
              <Checkbox
                id={symptom}
                checked={selectedSymptoms.includes(symptom)}
                onCheckedChange={() => handleSymptomToggle(symptom)}
              />
              <Label
                htmlFor={symptom}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {symptom.charAt(0).toUpperCase() + symptom.slice(1)}
              </Label>
            </div>
          ))}
        </div>

        {selectedSymptoms.length > 0 && selectedSymptoms[0] !== 'No Symptoms' && (
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <p className="text-sm font-medium text-gray-700">Selected Symptoms:</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {selectedSymptoms.map((symptom) => (
                <span
                  key={symptom}
                  className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium"
                >
                  {symptom}
                </span>
              ))}
            </div>
          </div>
        )}

        <button
          className="text-white bg-blue-500 px-6 py-2 rounded-md mt-4 flex items-center justify-center w-full disabled:bg-blue-300"
          onClick={AskSymptomsLLM}
          disabled={isLoading || selectedSymptoms.length === 0}
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Analyzing...
            </>
          ) : (
            'Go Ahead'
          )}
        </button>

        {response && (
          <div className="mt-6 p-4 bg-white border border-gray-200 rounded-lg">
            <p className="text-sm text-gray-700 whitespace-pre-wrap">
              <MarkdownRenderer markdown={response} />
            </p>
          </div>
        )}
        <div className='text-left flex-grow'>
        </div>

        {
          reportSummary.length > 0 && (
            <button
            className="text-white bg-blue-500 px-6 py-2 rounded-md mt-4 flex items-center justify-center w-full disabled:bg-blue-300"
            onClick={HealthRecommendationsLLM}
          >
              {isLoadingRecom ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Analyzing...
                </>
              ) : (
                'Get Health Recommendations'
              )}
          </button>
          )
        }
        {recommendations && (
          <div className="mt-6 p-4 bg-white border border-gray-200 rounded-lg">
            <p className="text-sm text-gray-700 whitespace-pre-wrap">
              <MarkdownRenderer markdown={recommendations} />
            </p>
          </div>
        )}

      </CardContent>
    </Card>
  );
};

export default SymptomsCheckbox;
