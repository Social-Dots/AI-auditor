import React from 'react';
import { Link } from 'react-router-dom';
import { 
  DollarSign, 
  Calendar, 
  AlertTriangle, 
  TrendingUp, 
  TrendingDown,
  Clock,
  CheckCircle,
  XCircle
} from 'lucide-react';

const Dashboard = () => {
  // Mock data - will be replaced with real API data
  const financialHealth = {
    status: 'healthy', // healthy, attention, urgent
    score: 85,
    lastUpdated: '2 hours ago'
  };

  const metrics = [
    {
      title: 'Cash Flow Status',
      value: '$24,567',
      change: '+12.5%',
      trend: 'up',
      icon: DollarSign,
      color: 'green',
      link: '/financial-reports'
    },
    {
      title: 'Upcoming Compliance Deadlines',
      value: '3',
      change: 'Due in 5 days',
      trend: 'neutral',
      icon: Calendar,
      color: 'yellow',
      link: '/compliance-center'
    },
    {
      title: 'Flagged Transactions',
      value: '7',
      change: '2 new today',
      trend: 'down',
      icon: AlertTriangle,
      color: 'red',
      link: '/fraud-detection'
    }
  ];

  const recentActivities = [
    { id: 1, type: 'compliance', message: 'GST filing deadline approaching', time: '1 hour ago', severity: 'warning' },
    { id: 2, type: 'fraud', message: 'Unusual transaction detected', time: '3 hours ago', severity: 'high' },
    { id: 3, type: 'optimization', message: 'Cost savings opportunity identified', time: '5 hours ago', severity: 'info' }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'healthy':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'attention':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'urgent':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'healthy':
        return <CheckCircle className="h-5 w-5" />;
      case 'attention':
        return <Clock className="h-5 w-5" />;
      case 'urgent':
        return <XCircle className="h-5 w-5" />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="mt-1 text-sm text-gray-500">
          Overview of your business's financial health and compliance status
        </p>
      </div>

      {/* Financial Health Status Card */}
      <div className="bg-white overflow-hidden shadow rounded-lg border border-gray-200">
        <div className="px-4 py-5 sm:p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Financial Health Status
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Overall assessment of your business financials
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-500">Last updated: {financialHealth.lastUpdated}</span>
            </div>
          </div>
          
          <div className="mt-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className={`flex items-center px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(financialHealth.status)}`}>
                  {getStatusIcon(financialHealth.status)}
                  <span className="ml-1 capitalize">{financialHealth.status}</span>
                </div>
                <span className="ml-3 text-2xl font-bold text-gray-900">{financialHealth.score}/100</span>
              </div>
              <div className="text-sm text-gray-500">
                Based on real-time analysis
              </div>
            </div>
            
            <div className="mt-4">
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full transition-all duration-300 ${
                    financialHealth.status === 'healthy' ? 'bg-green-500' :
                    financialHealth.status === 'attention' ? 'bg-yellow-500' : 'bg-red-500'
                  }`}
                  style={{ width: `${financialHealth.score}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Key Metrics Cards */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {metrics.map((metric) => {
          const Icon = metric.icon;
          const isPositive = metric.trend === 'up';
          
          return (
            <Link
              key={metric.title}
              to={metric.link}
              className="bg-white overflow-hidden shadow rounded-lg border border-gray-200 hover:shadow-md transition-shadow duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <div className="px-4 py-5 sm:p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className={`p-3 rounded-lg ${
                      metric.color === 'green' ? 'bg-green-100' :
                      metric.color === 'yellow' ? 'bg-yellow-100' : 'bg-red-100'
                    }`}>
                      <Icon className={`h-6 w-6 ${
                        metric.color === 'green' ? 'text-green-600' :
                        metric.color === 'yellow' ? 'text-yellow-600' : 'text-red-600'
                      }`} />
                    </div>
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        {metric.title}
                      </dt>
                      <dd className="flex items-baseline">
                        <div className="text-2xl font-semibold text-gray-900">
                          {metric.value}
                        </div>
                        {metric.change && (
                          <div className={`ml-2 flex items-baseline text-sm font-semibold ${
                            isPositive ? 'text-green-600' : 
                            metric.trend === 'down' ? 'text-red-600' : 'text-gray-500'
                          }`}>
                            {metric.trend === 'up' && <TrendingUp className="h-4 w-4 mr-1" />}
                            {metric.trend === 'down' && <TrendingDown className="h-4 w-4 mr-1" />}
                            {metric.change}
                          </div>
                        )}
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Recent Activity */}
      <div className="bg-white shadow rounded-lg border border-gray-200">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            Recent Activity
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            Latest updates and alerts for your business
          </p>
        </div>
        <div className="border-t border-gray-200">
          <ul className="divide-y divide-gray-200">
            {recentActivities.map((activity) => (
              <li key={activity.id} className="px-4 py-4 sm:px-6">
                <div className="flex items-center space-x-3">
                  <div className={`flex-shrink-0 w-2 h-2 rounded-full ${
                    activity.severity === 'high' ? 'bg-red-400' :
                    activity.severity === 'warning' ? 'bg-yellow-400' : 'bg-blue-400'
                  }`} />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {activity.message}
                    </p>
                    <p className="text-sm text-gray-500">
                      {activity.time}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;