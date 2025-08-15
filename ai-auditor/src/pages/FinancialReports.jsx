import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';
import { Calendar, Download, Filter } from 'lucide-react';

const FinancialReports = () => {
  const [dateRange, setDateRange] = useState('last30days');
  const [chartType, setChartType] = useState('income');

  // Mock data for charts
  const incomeData = [
    { month: 'Jan', revenue: 45000, expenses: 32000, profit: 13000 },
    { month: 'Feb', revenue: 52000, expenses: 35000, profit: 17000 },
    { month: 'Mar', revenue: 48000, expenses: 33000, profit: 15000 },
    { month: 'Apr', revenue: 61000, expenses: 38000, profit: 23000 },
    { month: 'May', revenue: 55000, expenses: 36000, profit: 19000 },
    { month: 'Jun', revenue: 67000, expenses: 42000, profit: 25000 },
  ];

  const expenseBreakdown = [
    { name: 'Salaries', value: 45000, color: '#3b82f6' },
    { name: 'Marketing', value: 12000, color: '#10b981' },
    { name: 'Operations', value: 18000, color: '#f59e0b' },
    { name: 'Technology', value: 8000, color: '#ef4444' },
    { name: 'Other', value: 5000, color: '#8b5cf6' },
  ];

  const cashFlowForecast = [
    { week: 'Week 1', inflow: 15000, outflow: 12000, net: 3000 },
    { week: 'Week 2', inflow: 18000, outflow: 14000, net: 4000 },
    { week: 'Week 3', inflow: 22000, outflow: 16000, net: 6000 },
    { week: 'Week 4', inflow: 20000, outflow: 15000, net: 5000 },
    { week: 'Week 5', inflow: 25000, outflow: 17000, net: 8000 },
    { week: 'Week 6', inflow: 23000, outflow: 16000, net: 7000 },
  ];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-medium">{label}</p>
          {payload.map((entry, index) => (
            <p key={index} style={{ color: entry.color }}>
              {entry.name}: ${entry.value.toLocaleString()}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Financial Reports</h1>
          <p className="mt-1 text-sm text-gray-500">
            Interactive charts and analysis of your financial data
          </p>
        </div>
        <div className="mt-4 sm:mt-0 flex space-x-3">
          <button className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </button>
          <button className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
            <Download className="h-4 w-4 mr-2" />
            Export
          </button>
        </div>
      </div>

      {/* Controls */}
      <div className="bg-white shadow rounded-lg border border-gray-200 p-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
          <div className="flex items-center space-x-4">
            <label className="text-sm font-medium text-gray-700">Date Range:</label>
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md"
            >
              <option value="last7days">Last 7 days</option>
              <option value="last30days">Last 30 days</option>
              <option value="last90days">Last 90 days</option>
              <option value="lastyear">Last year</option>
            </select>
          </div>
          
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setChartType('income')}
              className={`px-3 py-1 rounded-md text-sm font-medium ${
                chartType === 'income'
                  ? 'bg-primary-100 text-primary-700'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Income Trends
            </button>
            <button
              onClick={() => setChartType('expenses')}
              className={`px-3 py-1 rounded-md text-sm font-medium ${
                chartType === 'expenses'
                  ? 'bg-primary-100 text-primary-700'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Expense Breakdown
            </button>
            <button
              onClick={() => setChartType('cashflow')}
              className={`px-3 py-1 rounded-md text-sm font-medium ${
                chartType === 'cashflow'
                  ? 'bg-primary-100 text-primary-700'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Cash Flow Forecast
            </button>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Income Trends */}
        {chartType === 'income' && (
          <div className="lg:col-span-2 bg-white shadow rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Income & Expense Trends</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={incomeData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="month" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="revenue" 
                  stroke="#3b82f6" 
                  strokeWidth={2}
                  name="Revenue"
                />
                <Line 
                  type="monotone" 
                  dataKey="expenses" 
                  stroke="#ef4444" 
                  strokeWidth={2}
                  name="Expenses"
                />
                <Line 
                  type="monotone" 
                  dataKey="profit" 
                  stroke="#10b981" 
                  strokeWidth={2}
                  name="Profit"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}

        {/* Expense Breakdown */}
        {chartType === 'expenses' && (
          <>
            <div className="bg-white shadow rounded-lg border border-gray-200 p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Expense Breakdown</h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={expenseBreakdown}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {expenseBreakdown.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, 'Amount']} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            
            <div className="bg-white shadow rounded-lg border border-gray-200 p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Expense Details</h3>
              <div className="space-y-3">
                {expenseBreakdown.map((item) => (
                  <div key={item.name} className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div 
                        className="w-3 h-3 rounded-full mr-3"
                        style={{ backgroundColor: item.color }}
                      />
                      <span className="text-sm text-gray-700">{item.name}</span>
                    </div>
                    <span className="text-sm font-medium text-gray-900">
                      ${item.value.toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {/* Cash Flow Forecast */}
        {chartType === 'cashflow' && (
          <div className="lg:col-span-2 bg-white shadow rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">6-Week Cash Flow Forecast</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={cashFlowForecast}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="week" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Bar dataKey="inflow" fill="#10b981" name="Cash Inflow" />
                <Bar dataKey="outflow" fill="#ef4444" name="Cash Outflow" />
                <Bar dataKey="net" fill="#3b82f6" name="Net Cash Flow" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white shadow rounded-lg border border-gray-200 p-4">
          <h4 className="text-sm font-medium text-gray-500">Total Revenue</h4>
          <p className="mt-1 text-2xl font-semibold text-gray-900">$317,000</p>
          <p className="text-sm text-green-600">+15.3% from last period</p>
        </div>
        <div className="bg-white shadow rounded-lg border border-gray-200 p-4">
          <h4 className="text-sm font-medium text-gray-500">Total Expenses</h4>
          <p className="mt-1 text-2xl font-semibold text-gray-900">$216,000</p>
          <p className="text-sm text-red-600">+8.7% from last period</p>
        </div>
        <div className="bg-white shadow rounded-lg border border-gray-200 p-4">
          <h4 className="text-sm font-medium text-gray-500">Net Profit</h4>
          <p className="mt-1 text-2xl font-semibold text-gray-900">$101,000</p>
          <p className="text-sm text-green-600">+32.1% from last period</p>
        </div>
        <div className="bg-white shadow rounded-lg border border-gray-200 p-4">
          <h4 className="text-sm font-medium text-gray-500">Profit Margin</h4>
          <p className="mt-1 text-2xl font-semibold text-gray-900">31.9%</p>
          <p className="text-sm text-green-600">+4.2% from last period</p>
        </div>
      </div>
    </div>
  );
};

export default FinancialReports;