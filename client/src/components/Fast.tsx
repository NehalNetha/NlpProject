import React from 'react';

const Fast = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      {/* Header */}
      <div className="mb-2">
        <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
          Intelligent Medical Report Analysis
        </span>
      </div>

      {/* Main Headline */}
      <div className="mb-12">
        <h1 className="text-5xl font-bold mb-8">
          Smart. Accurate. Reliable.
        </h1>
        <p className="text-xl text-gray-600">
          Our platform includes <span className="font-semibold">FREE trial analysis</span> and{' '}
          <span className="font-semibold">FREE consultation support!</span>
        </p>
      </div>

      {/* CTA Buttons */}
      <div className="flex flex-wrap gap-4 mb-16">
        <button className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
          Get started
        </button>
        <button className="bg-white border border-gray-300 px-6 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors">
          View features
        </button>
      </div>

      {/* Key Features */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        <div className="p-6 bg-gray-50 rounded-lg">
          <h3 className="text-lg font-semibold mb-2">Comprehensive Analysis</h3>
          <p className="text-gray-600">Detailed insights from your medical reports using advanced AI</p>
        </div>
        <div className="p-6 bg-gray-50 rounded-lg">
          <h3 className="text-lg font-semibold mb-2">Personalized Recommendations</h3>
          <p className="text-gray-600">Custom health guidance based on your medical history</p>
        </div>
        <div className="p-6 bg-gray-50 rounded-lg">
          <h3 className="text-lg font-semibold mb-2">Expert Support</h3>
          <p className="text-gray-600">24/7 access to healthcare professionals for consultations</p>
        </div>
      </div>

    
    </div>
  );
};

export default Fast;