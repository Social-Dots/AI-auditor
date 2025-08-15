import React, { useState } from 'react';
import { Gift, ExternalLink, Calendar, DollarSign, Target, Clock, CheckCircle, XCircle } from 'lucide-react';

const GrantOpportunities = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');

  // Mock grant opportunities data
  const grantOpportunities = [
    {
      id: 1,
      title: 'Canada Small Business Financing Program',
      description: 'Access loans up to $1,000,000 to help your business purchase or improve land, buildings, or equipment.',
      amount: 'Up to $1,000,000',
      deadline: '2024-03-15',
      category: 'federal',
      status: 'open',
      eligibility: [
        'Canadian small business',
        'Annual gross revenues of $10 million or less',
        'Operating in Canada'
      ],
      requirements: [
        'Business plan',
        'Financial statements',
        'Personal credit report',
        'Tax returns'
      ],
      successRate: 75,
      estimatedTime: '2-4 weeks',
      website: 'https://www.canada.ca'
    },
    {
      id: 2,
      title: 'Ontario Business Support Grant',
      description: 'One-time grant of $10,000 to $20,000 for small businesses affected by public health measures.',
      amount: '$10,000 - $20,000',
      deadline: '2024-02-28',
      category: 'provincial',
      status: 'open',
      eligibility: [
        'Ontario-based business',
        '20 employees or fewer',
        'Demonstrated revenue impact'
      ],
      requirements: [
        'Business registration',
        'Revenue documentation',
        'Impact assessment',
        'Banking information'
      ],
      successRate: 85,
      estimatedTime: '3-6 weeks',
      website: 'https://www.ontario.ca'
    },
    {
      id: 3,
      title: 'Digital Main Street Grant',
      description: 'Up to $2,500 to help small businesses adopt digital technologies and improve online presence.',
      amount: 'Up to $2,500',
      deadline: '2024-04-30',
      category: 'municipal',
      status: 'open',
      eligibility: [
        'Main street business',
        'Retail or service location',
        'Less than 10 employees'
      ],
      requirements: [
        'Digital transformation plan',
        'Vendor quotes',
        'Business registration',
        'Location proof'
      ],
      successRate: 90,
      estimatedTime: '4-8 weeks',
      website: 'https://www.digitalmainstreet.ca'
    },
    {
      id: 4,
      title: 'Women Entrepreneurship Fund',
      description: 'Grants of up to $100,000 for women-owned businesses to grow and scale their operations.',
      amount: 'Up to $100,000',
      deadline: '2024-03-31',
      category: 'federal',
      status: 'open',
      eligibility: [
        'Women-owned business (51%+ ownership)',
        'Canadian business',
        'Growth potential demonstrated'
      ],
      requirements: [
        'Business plan',
        'Growth strategy',
        'Financial projections',
        'Management team details'
      ],
      successRate: 65,
      estimatedTime: '8-12 weeks',
      website: 'https://www.womenentrepreneurship.ca'
    },
    {
      id: 5,
      title: 'Innovation Superclusters Initiative',
      description: 'Funding for innovative projects in technology, clean resources, and advanced manufacturing.',
      amount: '$50,000 - $500,000',
      deadline: '2024-05-15',
      category: 'federal',
      status: 'upcoming',
      eligibility: [
        'Innovation-focused business',
        'Technology development',
        'Collaboration potential'
      ],
      requirements: [
        'Innovation proposal',
        'Technical specifications',
        'Market analysis',
        'Partnership agreements'
      ],
      successRate: 45,
      estimatedTime: '12-16 weeks',
      website: 'https://www.ic.gc.ca'
    }
  ];

  const categories = [
    { value: 'all', label: 'All Categories' },
    { value: 'federal', label: 'Federal Programs' },
    { value: 'provincial', label: 'Provincial Programs' },
    { value: 'municipal', label: 'Municipal Programs' }
  ];

  const statuses = [
    { value: 'all', label: 'All Status' },
    { value: 'open', label: 'Open' },
    { value: 'upcoming', label: 'Upcoming' },
    { value: 'closed', label: 'Closed' }
  ];

  const filteredGrants = grantOpportunities.filter(grant => {
    const matchesCategory = selectedCategory === 'all' || grant.category === selectedCategory;
    const matchesStatus = selectedStatus === 'all' || grant.status === selectedStatus;
    return matchesCategory && matchesStatus;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'open':
        return 'bg-green-100 text-green-800';
      case 'upcoming':
        return 'bg-blue-100 text-blue-800';
      case 'closed':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getSuccessRateColor = (rate) => {
    if (rate >= 80) return 'text-green-600';
    if (rate >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const formatDeadline = (dateString) => {
    const date = new Date(dateString);
    const today = new Date();
    const daysLeft = Math.ceil((date - today) / (1000 * 60 * 60 * 24));
    
    if (daysLeft < 0) return 'Expired';
    if (daysLeft === 0) return 'Today';
    if (daysLeft === 1) return 'Tomorrow';
    return `${daysLeft} days left`;
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Grant Opportunities</h1>
        <p className="mt-1 text-sm text-gray-500">
          Discover funding opportunities for your Canadian small business
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white shadow rounded-lg border border-gray-200 p-4">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Gift className="h-8 w-8 text-purple-500" />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-500">Total Opportunities</p>
              <p className="text-2xl font-semibold text-gray-900">{grantOpportunities.length}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white shadow rounded-lg border border-gray-200 p-4">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <CheckCircle className="h-8 w-8 text-green-500" />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-500">Currently Open</p>
              <p className="text-2xl font-semibold text-gray-900">
                {grantOpportunities.filter(g => g.status === 'open').length}
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-white shadow rounded-lg border border-gray-200 p-4">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Clock className="h-8 w-8 text-blue-500" />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-500">Upcoming</p>
              <p className="text-2xl font-semibold text-gray-900">
                {grantOpportunities.filter(g => g.status === 'upcoming').length}
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-white shadow rounded-lg border border-gray-200 p-4">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <DollarSign className="h-8 w-8 text-green-500" />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-500">Total Available</p>
              <p className="text-2xl font-semibold text-gray-900">
                ${grantOpportunities.reduce((sum, g) => {
                  const amount = parseInt(g.amount.match(/\d+/)[0]);
                  return sum + (isNaN(amount) ? 0 : amount);
                }, 0).toLocaleString()}+
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

            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="block w-full sm:w-auto pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md"
            >
              {statuses.map(status => (
                <option key={status.value} value={status.value}>
                  {status.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Grant Cards */}
      <div className="space-y-4">
        {filteredGrants.map((grant) => (
          <div key={grant.id} className="bg-white shadow rounded-lg border border-gray-200 overflow-hidden">
            <div className="px-4 py-5 sm:p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3">
                    <h3 className="text-lg font-medium text-gray-900">
                      {grant.title}
                    </h3>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(grant.status)}`}>
                      {grant.status}
                    </span>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                      {grant.category}
                    </span>
                  </div>
                  
                  <p className="mt-2 text-sm text-gray-600">
                    {grant.description}
                  </p>

                  <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div>
                      <p className="text-sm font-medium text-gray-500">Grant Amount</p>
                      <p className="text-lg font-semibold text-green-600">
                        {grant.amount}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">Deadline</p>
                      <p className="text-sm font-medium text-gray-900">
                        {formatDeadline(grant.deadline)}
                      </p>
                      <p className="text-xs text-gray-500">
                        {new Date(grant.deadline).toLocaleDateString()}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">Success Rate</p>
                      <p className={`text-sm font-medium ${getSuccessRateColor(grant.successRate)}`}>
                        {grant.successRate}%
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">Processing Time</p>
                      <p className="text-sm font-medium text-gray-900">
                        {grant.estimatedTime}
                      </p>
                    </div>
                  </div>

                  <div className="mt-4">
                    <h4 className="text-sm font-medium text-gray-900">Eligibility:</h4>
                    <ul className="mt-1 space-y-1">
                      {grant.eligibility.map((item, index) => (
                        <li key={index} className="text-sm text-gray-600 flex items-start">
                          <span className="text-green-600 mr-2">•</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-4">
                    <h4 className="text-sm font-medium text-gray-900">Requirements:</h4>
                    <ul className="mt-1 space-y-1">
                      {grant.requirements.map((item, index) => (
                        <li key={index} className="text-sm text-gray-600 flex items-start">
                          <span className="text-blue-600 mr-2">•</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex space-x-3">
                <button
                  onClick={() => window.open(grant.website, '_blank')}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                >
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Apply Now
                </button>
                <button className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
                  Save for Later
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredGrants.length === 0 && (
        <div className="text-center py-12">
          <Gift className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">No grants found</h3>
          <p className="mt-1 text-sm text-gray-500">
            Try adjusting your filters or check back later for new opportunities
          </p>
        </div>
      )}
    </div>
  );
};

export default GrantOpportunities;