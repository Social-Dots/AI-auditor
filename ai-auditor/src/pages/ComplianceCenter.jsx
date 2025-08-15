import React, { useState } from 'react';
import { format, addDays, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isToday } from 'date-fns';
import { Calendar, Clock, CheckCircle, AlertTriangle, FileText, Bell } from 'lucide-react';

const ComplianceCenter = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView] = useState('calendar'); // 'calendar' or 'list'

  // Mock compliance data
  const complianceEvents = [
    {
      id: 1,
      title: 'GST/HST Filing',
      date: new Date(2024, 0, 15),
      type: 'tax',
      status: 'pending',
      description: 'Quarterly GST/HST return due',
      priority: 'high'
    },
    {
      id: 2,
      title: 'Annual Report Filing',
      date: new Date(2024, 0, 31),
      type: 'corporate',
      status: 'pending',
      description: 'Annual report to Corporations Canada',
      priority: 'medium'
    },
    {
      id: 3,
      title: 'Payroll Remittance',
      date: new Date(2024, 0, 20),
      type: 'payroll',
      status: 'completed',
      description: 'Monthly payroll remittance',
      priority: 'medium'
    },
    {
      id: 4,
      title: 'Business License Renewal',
      date: new Date(2024, 0, 25),
      type: 'license',
      status: 'pending',
      description: 'Municipal business license renewal',
      priority: 'low'
    },
    {
      id: 5,
      title: 'T4 Slips Distribution',
      date: new Date(2024, 1, 28),
      type: 'payroll',
      status: 'upcoming',
      description: 'Annual T4 slips to employees',
      priority: 'high'
    }
  ];

  const getDaysInMonth = () => {
    const start = startOfMonth(currentDate);
    const end = endOfMonth(currentDate);
    return eachDayOfInterval({ start, end });
  };

  const getEventsForDate = (date) => {
    return complianceEvents.filter(event => 
      format(event.date, 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd')
    );
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'overdue':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityIcon = (priority) => {
    switch (priority) {
      case 'high':
        return <AlertTriangle className="h-4 w-4 text-red-500" />;
      case 'medium':
        return <Clock className="h-4 w-4 text-yellow-500" />;
      case 'low':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      default:
        return null;
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'tax':
        return <FileText className="h-5 w-5" />;
      case 'corporate':
        return <Calendar className="h-5 w-5" />;
      case 'payroll':
        return <Bell className="h-5 w-5" />;
      case 'license':
        return <Shield className="h-5 w-5" />;
      default:
        return <Calendar className="h-5 w-5" />;
    }
  };

  const CalendarView = () => {
    const days = getDaysInMonth();
    const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    return (
      <div className="bg-white shadow rounded-lg border border-gray-200">
        <div className="px-4 py-5 sm:p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-900">
              {format(currentDate, 'MMMM yyyy')}
            </h3>
            <div className="flex space-x-2">
              <button
                onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1))}
                className="p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
              >
                ←
              </button>
              <button
                onClick={() => setCurrentDate(new Date())}
                className="px-3 py-1 text-sm rounded-md text-gray-700 hover:bg-gray-100"
              >
                Today
              </button>
              <button
                onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1))}
                className="p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
              >
                →
              </button>
            </div>
          </div>

          <div className="grid grid-cols-7 gap-px bg-gray-200">
            {weekDays.map(day => (
              <div key={day} className="bg-gray-50 py-2 text-center text-sm font-medium text-gray-700">
                {day}
              </div>
            ))}
            {Array.from({ length: 35 }).map((_, index) => {
              const dayIndex = index - (new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay());
              const day = new Date(currentDate.getFullYear(), currentDate.getMonth(), dayIndex + 1);
              const events = getEventsForDate(day);
              
              if (!isSameMonth(day, currentDate)) {
                return (
                  <div key={index} className="bg-gray-50 p-2 min-h-[80px]">
                    <div className="text-sm text-gray-400">
                      {format(day, 'd')}
                    </div>
                  </div>
                );
              }

              return (
                <div
                  key={index}
                  className={`bg-white p-2 min-h-[80px] ${
                    isToday(day) ? 'ring-2 ring-primary-500' : ''
                  }`}
                >
                  <div className="text-sm font-medium text-gray-900">
                    {format(day, 'd')}
                  </div>
                  <div className="mt-1 space-y-1">
                    {events.slice(0, 2).map(event => (
                      <div
                        key={event.id}
                        className={`text-xs px-1 py-0.5 rounded truncate ${getStatusColor(event.status)}`}
                        title={event.title}
                      >
                        {event.title}
                      </div>
                    ))}
                    {events.length > 2 && (
                      <div className="text-xs text-gray-500">
                        +{events.length - 2} more
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  };

  const ListView = () => {
    const upcomingEvents = complianceEvents.filter(event => event.status !== 'completed')
      .sort((a, b) => a.date - b.date);

    return (
      <div className="bg-white shadow rounded-lg border border-gray-200">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Upcoming Deadlines</h3>
          <div className="space-y-4">
            {upcomingEvents.map(event => (
              <div key={event.id} className="border-l-4 border-gray-200 pl-4 py-2">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0">
                      {getTypeIcon(event.type)}
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-900">
                        {event.title}
                      </h4>
                      <p className="text-sm text-gray-500">
                        {event.description}
                      </p>
                      <div className="mt-1 flex items-center space-x-2 text-xs text-gray-500">
                        <Calendar className="h-3 w-3" />
                        <span>{format(event.date, 'MMM dd, yyyy')}</span>
                        {getPriorityIcon(event.priority)}
                        <span className="capitalize">{event.priority} priority</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex-shrink-0">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(event.status)}`}>
                      {event.status}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Compliance Center</h1>
          <p className="mt-1 text-sm text-gray-500">
            Track and manage your business compliance requirements
          </p>
        </div>
        <div className="mt-4 sm:mt-0 flex space-x-2">
          <button
            onClick={() => setView('calendar')}
            className={`px-3 py-2 rounded-md text-sm font-medium ${
              view === 'calendar'
                ? 'bg-primary-100 text-primary-700'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Calendar View
          </button>
          <button
            onClick={() => setView('list')}
            className={`px-3 py-2 rounded-md text-sm font-medium ${
              view === 'list'
                ? 'bg-primary-100 text-primary-700'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            List View
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white shadow rounded-lg border border-gray-200 p-4">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Calendar className="h-8 w-8 text-blue-500" />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-500">Total Events</p>
              <p className="text-2xl font-semibold text-gray-900">{complianceEvents.length}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white shadow rounded-lg border border-gray-200 p-4">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <AlertTriangle className="h-8 w-8 text-yellow-500" />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-500">Pending</p>
              <p className="text-2xl font-semibold text-gray-900">
                {complianceEvents.filter(e => e.status === 'pending').length}
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-white shadow rounded-lg border border-gray-200 p-4">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <CheckCircle className="h-8 w-8 text-green-500" />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-500">Completed</p>
              <p className="text-2xl font-semibold text-gray-900">
                {complianceEvents.filter(e => e.status === 'completed').length}
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-white shadow rounded-lg border border-gray-200 p-4">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Bell className="h-8 w-8 text-red-500" />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-500">High Priority</p>
              <p className="text-2xl font-semibold text-gray-900">
                {complianceEvents.filter(e => e.priority === 'high').length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      {view === 'calendar' ? <CalendarView /> : <ListView />}
    </div>
  );
};

export default ComplianceCenter;