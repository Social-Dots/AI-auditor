import React, { useState } from 'react';
import { TrendingDown, Lightbulb, DollarSign, Target, Check, X, ExternalLink, CheckCircle } from 'lucide-react';

const CostOptimization = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showImplemented, setShowImplemented] = useState(false);

  // Mock AI suggestions data
  const optimizationSuggestions = [
    {
      id: 1,
      title: 'Switch to Annual Software Subscriptions',
      description: 'Your current monthly software subscriptions can be converted to annual plans with 15-20% savings.',
      category: 'software',
      currentCost: 2400,
      potentialSavings: 480,
      confidence: 95,
      implementation: 'easy',
      status: 'pending',
      details: [
        'Adobe Creative Suite: Save $240/year by switching to annual plan',
        'Microsoft 365: Save $180/year with annual commitment',
        'QuickBooks: Save $60/year with annual subscription'
      ],
      timeline: '1-2 days'
    },
    {
      id: 2,
      title: 'Optimize Energy Usage During Peak Hours',
      description: 'Shift non-critical operations to off-peak hours to reduce electricity costs.',
      category: 'utilities',
      currentCost: 800,
      potentialSavings: 120,
      confidence: 88,
      implementation: 'medium',
      status: 'pending',
      details: [
        'Run dishwasher and laundry after 7 PM',
        'Adjust HVAC schedules to avoid peak hours',
        'Use smart thermostats for automatic optimization'
      ],
      timeline: '1 week'
    },
    {
      id: 3,
      title: 'Negotiate Better Rates with Suppliers',
      description: 'Based on your purchasing history, you have leverage to negotiate 5-10% discounts.',
      category: 'supplies',
      currentCost: 5000,
      potentialSavings: 375,
      confidence: 92,
      implementation: 'medium',
      status: 'in-progress',
      details: [
        'Office supplies: 8% discount potential with bulk orders',
        'Cleaning services: 10% discount with annual contract',
        'Coffee/snacks: 5% discount with quarterly commitments'
      ],
      timeline: '2-3 weeks'
    },
    {
      id: 4,
      title: 'Reduce Credit Card Processing Fees',
      description: 'Switch to a payment processor with lower transaction fees.',
      category: 'banking',
      currentCost: 1200,
      potentialSavings: 180,
      confidence: 85,
      implementation: 'hard',
      status: 'pending',
      details: [
        'Current rate: 2.9% + $0.30 per transaction',
        'New provider rate: 2.4% + $0.25 per transaction',
        'Annual savings based on $40,000 card volume'
      ],
      timeline: '1 month'
    },
    {
      id: 5,
      title: 'Implement Remote Work Policies',
      description: 'Reduce office space and utility costs by allowing 2 days remote work per week.',
      category: 'office',
      currentCost: 3600,
      potentialSavings: 720,
      confidence: 78,
      implementation: 'medium',
      status: 'implemented',
      details: [
        'Reduce office space by 20%',
        'Lower utility bills by 25%',
        'Reduce parking costs for employees'
      ],
      timeline: '2 weeks'
    }
  ];

  const categories = [
    { value: 'all', label: 'All Categories' },
    { value: 'software', label: 'Software' },
    { value: 'utilities', label: 'Utilities' },
    { value: 'supplies', label: 'Supplies' },
    { value: 'banking', label: 'Banking' },
    { value: 'office', label: 'Office' }
  ];

  const filteredSuggestions = optimizationSuggestions.filter(suggestion => {
    const matchesCategory = selectedCategory === 'all' || suggestion.category === selectedCategory;
    const matchesStatus = showImplemented || suggestion.status !== 'implemented';
    return matchesCategory && matchesStatus;
  });

  const totalPotentialSavings = filteredSuggestions
    .filter(s => s.status !== 'implemented')
    .reduce((sum, suggestion) => sum + suggestion.potentialSavings, 0);

  const getImplementationColor = (level) => {
    switch (level) {
      case 'easy':
        return 'bg-green-100 text-green-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'hard':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'bg-blue-100 text-blue-800';
      case 'in-progress':
        return 'bg-yellow-100 text-yellow-800';
      case 'implemented':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getConfidenceColor = (confidence) => {
    if (confidence >= 90) return 'text-green-600';
    if (confidence >= 80) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Cost Optimization</h1>
          <p className="mt-1 text-sm text-gray-500">
            AI-powered suggestions to reduce your business expenses
          </p>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white shadow rounded-lg border border-gray-200 p-4">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <TrendingDown className="h-8 w-8 text-green-500" />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-500">Potential Annual Savings</p>
              <p className="text-2xl font-semibold text-gray-900">
                ${totalPotentialSavings.toLocaleString()}
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-white shadow rounded-lg border border-gray-200 p-4">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Lightbulb className="h-8 w-8 text-blue-500" />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-500">Active Suggestions</p>
              <p className="text-2xl font-semibold text-gray-900">
                {filteredSuggestions.filter(s => s.status !== 'implemented').length}
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-white shadow rounded-lg border border-gray-200 p-4">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <CheckCircle className="h-8 w-8 text-purple-500" />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-500">Implemented</p>
              <p className="text-2xl font-semibold text-gray-900">
                {optimizationSuggestions.filter(s => s.status === 'implemented').length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white shadow rounded-lg border border-gray-200 p-4">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
          <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 space-y-4 sm:space-y-0">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="block w-full sm:w-auto pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md"
            >
              {categories.map(category => (
                <option key={category.value} value={category.value}>
                  {category.label}
                </option>
              ))}
            </select>

            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={showImplemented}
                onChange={(e) => setShowImplemented(e.target.checked)}
                className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
              />
              <span className="text-sm text-gray-700">Show implemented</span>
            </label>
          </div>
        </div>
      </div>

      {/* Suggestions List */}
      <div className="space-y-4">
        {filteredSuggestions.map((suggestion) => (
          <div key={suggestion.id} className="bg-white shadow rounded-lg border border-gray-200 overflow-hidden">
            <div className="px-4 py-5 sm:p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3">
                    <h3 className="text-lg font-medium text-gray-900">
                      {suggestion.title}
                    </h3>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(suggestion.status)}`}>
                      {suggestion.status.replace('-', ' ')}
                    </span>
                  </div>
                  
                  <p className="mt-2 text-sm text-gray-600">
                    {suggestion.description}
                  </p>

                  <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <p className="text-sm font-medium text-gray-500">Current Cost</p>
                      <p className="text-lg font-semibold text-gray-900">
                        ${suggestion.currentCost.toLocaleString()}/year
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">Potential Savings</p>
                      <p className="text-lg font-semibold text-green-600">
                        ${suggestion.potentialSavings.toLocaleString()}/year
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">Confidence</p>
                      <p className={`text-lg font-semibold ${getConfidenceColor(suggestion.confidence)}`}>
                        {suggestion.confidence}%
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 flex items-center space-x-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getImplementationColor(suggestion.implementation)}`}>
                      {suggestion.implementation} implementation
                    </span>
                    <div className="flex items-center text-sm text-gray-500">
                      <Target className="h-4 w-4 mr-1" />
                      Timeline: {suggestion.timeline}
                    </div>
                  </div>

                  <div className="mt-4">
                    <h4 className="text-sm font-medium text-gray-900">Implementation Details:</h4>
                    <ul className="mt-2 space-y-1">
                      {suggestion.details.map((detail, index) => (
                        <li key={index} className="text-sm text-gray-600 flex items-start">
                          <span className="text-primary-600 mr-2">•</span>
                          {detail}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {suggestion.status === 'pending' && (
                <div className="mt-6 flex space-x-3">
                  <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
                    <Check className="h-4 w-4 mr-2" />
                    Start Implementation
                  </button>
                  <button className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Learn More
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {filteredSuggestions.length === 0 && (
        <div className="text-center py-12">
          <Lightbulb className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">No suggestions found</h3>
          <p className="mt-1 text-sm text-gray-500">
            Try adjusting your filters or check back later for new suggestions
          </p>
        </div>
      )}
    </div>
  );
};

export default CostOptimization;