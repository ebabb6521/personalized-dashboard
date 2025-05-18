import React, { useState, useEffect } from 'react';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Clock, Calendar, TrendingUp, Activity, Sun, Cloud, CloudRain, Wind } from 'lucide-react';

const Dashboard = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [weatherData, setWeatherData] = useState({
    temp: 72,
    condition: 'Sunny',
    humidity: 45,
    wind: 8
  });
  
  const [tasks, setTasks] = useState([
    { id: 1, text: 'Complete project proposal', completed: false },
    { id: 2, text: 'Review quarterly metrics', completed: true },
    { id: 3, text: 'Schedule team meeting', completed: false },
    { id: 4, text: 'Update dashboard widgets', completed: false }
  ]);
  
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    
    return () => {
      clearInterval(timer);
    };
  }, []);

  const performanceData = [
    { name: 'Jan', value: 65 },
    { name: 'Feb', value: 59 },
    { name: 'Mar', value: 80 },
    { name: 'Apr', value: 81 },
    { name: 'May', value: 76 }
  ];
  
  const projectData = [
    { name: 'Project A', completed: 45, remaining: 55 },
    { name: 'Project B', completed: 78, remaining: 22 },
    { name: 'Project C', completed: 23, remaining: 77 },
    { name: 'Project D', completed: 90, remaining: 10 }
  ];
  
  const expenseData = [
    { name: 'Marketing', value: 400 },
    { name: 'Development', value: 300 },
    { name: 'Research', value: 200 },
    { name: 'Operations', value: 100 }
  ];
  
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  const formatDate = (date) => {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString(undefined, options);
  };
  
  const formatTime = (date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  };

  const toggleTaskCompletion = (id) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const addTask = () => {
    const newTaskText = prompt("Enter a new task:");
    if (newTaskText && newTaskText.trim() !== '') {
      const newTask = {
        id: tasks.length > 0 ? Math.max(...tasks.map(t => t.id)) + 1 : 1,
        text: newTaskText,
        completed: false
      };
      setTasks([...tasks, newTask]);
    }
  };

  const WeatherWidget = () => (
    <div className="bg-white rounded-lg shadow p-4 flex flex-col">
      <h3 className="text-lg font-semibold mb-2">Weather</h3>
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center">
          {weatherData.condition === 'Sunny' ? (
            <Sun size={32} className="text-yellow-400" />
          ) : weatherData.condition === 'Cloudy' ? (
            <Cloud size={32} className="text-gray-400" />
          ) : (
            <CloudRain size={32} className="text-blue-400" />
          )}
          <span className="text-3xl ml-2">{weatherData.temp}°F</span>
        </div>
        <div className="text-right">
          <div className="text-lg">{weatherData.condition}</div>
          <div className="text-sm text-gray-500">San Mateo, CA</div>
        </div>
      </div>
      <div className="flex justify-between text-sm text-gray-500">
        <div>Humidity: {weatherData.humidity}%</div>
        <div className="flex items-center">
          <Wind size={14} className="mr-1" />
          {weatherData.wind} mph
        </div>
      </div>
    </div>
  );

  const TaskWidget = () => (
    <div className="bg-white rounded-lg shadow p-4 flex flex-col">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-lg font-semibold">Tasks</h3>
        <button 
          onClick={addTask}
          className="bg-blue-500 text-white px-2 py-1 rounded text-sm"
        >
          Add Task
        </button>
      </div>
      <ul className="space-y-2">
        {tasks.map(task => (
          <li 
            key={task.id} 
            className={`flex items-center p-2 rounded cursor-pointer ${task.completed ? 'bg-green-50' : 'bg-gray-50'}`}
            onClick={() => toggleTaskCompletion(task.id)}
          >
            <input 
              type="checkbox" 
              checked={task.completed} 
              onChange={() => toggleTaskCompletion(task.id)}
              className="mr-2"
            />
            <span className={task.completed ? 'line-through text-gray-500' : ''}>{task.text}</span>
          </li>
        ))}
      </ul>
    </div>
  );

  const renderTabContent = () => {
    switch(activeTab) {
      case 'overview':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="bg-white rounded-lg shadow p-4">
              <h3 className="text-lg font-semibold mb-2">Performance</h3>
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={performanceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="value" stroke="#8884d8" activeDot={{ r: 8 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="bg-white rounded-lg shadow p-4">
              <h3 className="text-lg font-semibold mb-2">Projects</h3>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={projectData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="completed" stackId="a" fill="#8884d8" />
                  <Bar dataKey="remaining" stackId="a" fill="#82ca9d" />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="bg-white rounded-lg shadow p-4">
              <h3 className="text-lg font-semibold mb-2">Expenses</h3>
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={expenseData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({name, percent}) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {expenseData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        );
      case 'tasks':
        return <TaskWidget />;
      case 'analytics':
        return (
          <div className="bg-white rounded-lg shadow p-4">
            <h3 className="text-lg font-semibold mb-2">Detailed Analytics</h3>
            <p className="text-gray-500 mb-4">This is where you would see detailed analytics data.</p>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart
                data={[
                  { month: 'Jan', users: 4000, sessions: 2400, conversion: 600 },
                  { month: 'Feb', users: 3000, sessions: 1398, conversion: 500 },
                  { month: 'Mar', users: 2000, sessions: 9800, conversion: 700 },
                  { month: 'Apr', users: 2780, sessions: 3908, conversion: 800 },
                  { month: 'May', users: 1890, sessions: 4800, conversion: 900 }
                ]}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="users" stroke="#8884d8" />
                <Line type="monotone" dataKey="sessions" stroke="#82ca9d" />
                <Line type="monotone" dataKey="conversion" stroke="#ffc658" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        );
      default:
        return <div>Select a tab</div>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-6xl mx-auto">
        <header className="bg-white rounded-lg shadow p-4 mb-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Personal Dashboard</h1>
              <div className="flex items-center text-gray-500">
                <Calendar className="w-4 h-4 mr-1" />
                <span>{formatDate(currentTime)}</span>
                <Clock className="w-4 h-4 ml-4 mr-1" />
                <span>{formatTime(currentTime)}</span>
              </div>
            </div>
            <div className="bg-blue-500 text-white px-4 py-2 rounded-full flex items-center">
              <TrendingUp className="w-4 h-4 mr-1" />
              <span>Productivity Score: 82</span>
            </div>
          </div>
        </header>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
          <div className="md:col-span-3">
            <div className="bg-white rounded-lg shadow p-4">
              <div className="flex border-b">
                <button 
                  className={`px-4 py-2 ${activeTab === 'overview' ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-500'}`}
                  onClick={() => setActiveTab('overview')}
                >
                  Overview
                </button>
                <button 
                  className={`px-4 py-2 ${activeTab === 'tasks' ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-500'}`}
                  onClick={() => setActiveTab('tasks')}
                >
                  Tasks
                </button>
                <button 
                  className={`px-4 py-2 ${activeTab === 'analytics' ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-500'}`}
                  onClick={() => setActiveTab('analytics')}
                >
                  Analytics
                </button>
              </div>
              
              <div className="mt-4">
                {renderTabContent()}
              </div>
            </div>
          </div>
          
          <div className="flex flex-col space-y-4">
            <WeatherWidget />
            <div className="bg-white rounded-lg shadow p-4">
              <h3 className="text-lg font-semibold mb-2">Activity</h3>
              <div className="flex items-center justify-between mb-2">
                <span>Daily Goal</span>
                <span className="text-green-500">78%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div className="bg-green-500 h-2.5 rounded-full" style={{ width: '78%' }}></div>
              </div>
              <div className="mt-4 flex justify-between text-sm text-gray-500">
                <div className="flex flex-col items-center">
                  <Activity className="text-blue-500" />
                  <span>7,842</span>
                  <span>Steps</span>
                </div>
                <div className="flex flex-col items-center">
                  <Clock className="text-purple-500" />
                  <span>6h 24m</span>
                  <span>Focus</span>
                </div>
                <div className="flex flex-col items-center">
                  <TrendingUp className="text-green-500" />
                  <span>4</span>
                  <span>Tasks</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;