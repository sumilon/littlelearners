import { useState } from 'react';
import { motion } from 'framer-motion';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Calendar, TrendingUp, Award, Clock, Download, Printer, Filter, Star, Activity } from 'lucide-react';
import useStore from '../../store/useStore';
import { fadeIn } from '../../utils/animationUtils';

const ParentDashboard = ({ onBack }) => {
  const {
    totalStars,
    unlockedBadges,
    activityLog,
    mathCorrect,
    hindiCorrect,
    spellingCorrect,
    evsCorrect,
    storiesRead,
    artDrawn,
  } = useStore();

  const [filterPeriod, setFilterPeriod] = useState('all'); // 'all', 'week', 'month'
  const [selectedModule, setSelectedModule] = useState('all'); // 'all' or specific module

  // Badge data
  const allBadges = [
    { id: 'first-star', name: 'First Star', emoji: '⭐', description: 'Earned your first star!' },
    { id: 'star-collector', name: 'Star Collector', emoji: '🌟', description: 'Collected 10 stars' },
    { id: 'math-whiz', name: 'Math Whiz', emoji: '🧮', description: 'Solved 5 math problems' },
    { id: 'hindi-hero', name: 'Hindi Hero', emoji: '🇮🇳', description: 'Mastered 5 Hindi words' },
    { id: 'bookworm', name: 'Bookworm', emoji: '📚', description: 'Read 3 stories' },
    { id: 'story-reader', name: 'Story Reader', emoji: '📖', description: 'Read your first story' },
    { id: 'art-star', name: 'Art Star', emoji: '🎨', description: 'Created your first artwork' },
    { id: 'explorer', name: 'Explorer', emoji: '🌍', description: 'Learned 3 EVS topics' },
    { id: 'spelling-bee', name: 'Spelling Bee', emoji: '🐝', description: 'Spelled 3 words correctly' },
    { id: 'all-rounder', name: 'All-Rounder', emoji: '🏆', description: 'Earned 20 stars' },
  ];

  // Filter activities by period
  const getFilteredActivities = () => {
    const now = Date.now();
    const oneDay = 24 * 60 * 60 * 1000;
    const oneWeek = 7 * oneDay;
    const oneMonth = 30 * oneDay;

    let filtered = activityLog;

    if (filterPeriod === 'week') {
      filtered = activityLog.filter((a) => now - a.timestamp < oneWeek);
    } else if (filterPeriod === 'month') {
      filtered = activityLog.filter((a) => now - a.timestamp < oneMonth);
    }

    if (selectedModule !== 'all') {
      filtered = filtered.filter((a) => a.module === selectedModule);
    }

    return filtered;
  };

  // Module progress data
  const moduleData = [
    { name: 'Math', value: mathCorrect, color: '#3b82f6' },
    { name: 'Hindi', value: hindiCorrect, color: '#f59e0b' },
    { name: 'Spelling', value: spellingCorrect, color: '#10b981' },
    { name: 'EVS', value: evsCorrect, color: '#8b5cf6' },
    { name: 'Stories', value: storiesRead, color: '#ec4899' },
    { name: 'Art', value: artDrawn, color: '#f97316' },
  ];

  // Stars over time (last 7 days)
  const getStarsOverTime = () => {
    const days = 7;
    const result = [];
    const now = Date.now();
    const oneDay = 24 * 60 * 60 * 1000;

    for (let i = days - 1; i >= 0; i--) {
      const dayStart = now - i * oneDay;
      const dayEnd = dayStart + oneDay;
      const dayActivities = activityLog.filter(
        (a) => a.timestamp >= dayStart && a.timestamp < dayEnd && a.type === 'stars'
      );
      const starsEarned = dayActivities.reduce((sum, a) => sum + (a.starsEarned || 0), 0);

      const date = new Date(dayStart);
      result.push({
        day: date.toLocaleDateString('en-US', { weekday: 'short' }),
        stars: starsEarned,
      });
    }

    return result;
  };

  // Time spent per module (from activity log)
  const getTimeSpentPerModule = () => {
    const modules = {};
    activityLog.forEach((activity) => {
      if (activity.module) {
        modules[activity.module] = (modules[activity.module] || 0) + 1;
      }
    });

    return Object.entries(modules).map(([name, count]) => ({
      name,
      activities: count,
    }));
  };

  // Export data as JSON
  const handleExport = () => {
    const data = {
      totalStars,
      unlockedBadges,
      moduleProgress: moduleData,
      activityLog: getFilteredActivities(),
      exportDate: new Date().toISOString(),
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `little-learners-report-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Print report
  const handlePrint = () => {
    window.print();
  };

  const filteredActivities = getFilteredActivities();
  const starsOverTime = getStarsOverTime();
  const timeSpentData = getTimeSpentPerModule();

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-green-50">
      {/* Header */}
      <header className="bg-white border-b-2 border-purple-200 shadow-sm p-4">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center gap-4">
            <button
              onClick={onBack}
              className="flex items-center gap-2 bg-purple-100 hover:bg-purple-200 px-4 py-2 rounded-full transition-colors"
            >
              <span className="text-2xl">←</span>
              <span className="font-semibold text-purple-700">Back</span>
            </button>
            <h1 className="text-3xl font-bold text-purple-600 flex items-center gap-2">
              <Activity className="w-8 h-8" />
              Parent Dashboard
            </h1>
          </div>
          <div className="flex gap-2">
            <button
              onClick={handleExport}
              className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 md:px-4 rounded-lg transition-colors text-sm md:text-base"
            >
              <Download className="w-4 h-4 md:w-5 md:h-5" />
              <span className="hidden sm:inline">Export</span>
            </button>
            <button
              onClick={handlePrint}
              className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-3 py-2 md:px-4 rounded-lg transition-colors text-sm md:text-base"
            >
              <Printer className="w-4 h-4 md:w-5 md:h-5" />
              <span className="hidden sm:inline">Print</span>
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto p-6 space-y-6">
        {/* Stats Overview */}
        <motion.div {...fadeIn} className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl p-6 text-white shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-yellow-100 text-sm font-medium">Total Stars</p>
                <p className="text-4xl font-bold mt-1">{totalStars}</p>
              </div>
              <Star className="w-12 h-12 text-yellow-100" />
            </div>
          </div>

          <div className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl p-6 text-white shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100 text-sm font-medium">Badges Earned</p>
                <p className="text-4xl font-bold mt-1">{unlockedBadges.length}</p>
              </div>
              <Award className="w-12 h-12 text-purple-100" />
            </div>
          </div>

          <div className="bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl p-6 text-white shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-sm font-medium">Activities</p>
                <p className="text-4xl font-bold mt-1">{activityLog.length}</p>
              </div>
              <Calendar className="w-12 h-12 text-blue-100" />
            </div>
          </div>

          <div className="bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl p-6 text-white shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100 text-sm font-medium">Modules Used</p>
                <p className="text-4xl font-bold mt-1">{moduleData.filter((m) => m.value > 0).length}</p>
              </div>
              <TrendingUp className="w-12 h-12 text-green-100" />
            </div>
          </div>
        </motion.div>

        {/* Charts Row 1 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          {/* Stars Over Time */}
          <motion.div {...fadeIn} transition={{ delay: 0.1 }} className="bg-white rounded-2xl p-6 shadow-lg">
            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <TrendingUp className="w-6 h-6 text-blue-500" />
              Stars Earned (Last 7 Days)
            </h2>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={starsOverTime}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="stars" stroke="#3b82f6" strokeWidth={3} />
              </LineChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Module Progress */}
          <motion.div {...fadeIn} transition={{ delay: 0.2 }} className="bg-white rounded-2xl p-6 shadow-lg">
            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <Award className="w-6 h-6 text-purple-500" />
              Progress by Module
            </h2>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={moduleData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={(entry) => `${entry.name}: ${entry.value}`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {moduleData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </motion.div>
        </div>

        {/* Charts Row 2 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Time Spent Per Module */}
          <motion.div {...fadeIn} transition={{ delay: 0.3 }} className="bg-white rounded-2xl p-6 shadow-lg">
            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <Clock className="w-6 h-6 text-green-500" />
              Activity Count by Module
            </h2>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={timeSpentData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="activities" fill="#10b981" />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Badges Display */}
          <motion.div {...fadeIn} transition={{ delay: 0.4 }} className="bg-white rounded-2xl p-6 shadow-lg">
            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <Award className="w-6 h-6 text-yellow-500" />
              Badges Earned ({unlockedBadges.length}/{allBadges.length})
            </h2>
            <div className="grid grid-cols-2 gap-3 max-h-64 overflow-y-auto">
              {allBadges.map((badge) => {
                const isUnlocked = unlockedBadges.includes(badge.id);
                return (
                  <div
                    key={badge.id}
                    className={`flex items-center gap-2 p-3 rounded-lg ${
                      isUnlocked
                        ? 'bg-gradient-to-r from-yellow-100 to-orange-100 border-2 border-yellow-400'
                        : 'bg-gray-100 opacity-50'
                    }`}
                  >
                    <span className="text-3xl">{badge.emoji}</span>
                    <div>
                      <p className="font-semibold text-sm">{badge.name}</p>
                      <p className="text-xs text-gray-600">{badge.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </div>

        {/* Activity Timeline */}
        <motion.div {...fadeIn} transition={{ delay: 0.5 }} className="bg-white rounded-2xl p-6 shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
              <Calendar className="w-6 h-6 text-blue-500" />
              Activity Timeline
            </h2>
            <div className="flex gap-2">
              <select
                value={filterPeriod}
                onChange={(e) => setFilterPeriod(e.target.value)}
                className="px-3 py-2 border-2 border-gray-300 rounded-lg"
              >
                <option value="all">All Time</option>
                <option value="week">Last Week</option>
                <option value="month">Last Month</option>
              </select>
            </div>
          </div>

          <div className="space-y-3 max-h-96 overflow-y-auto">
            {filteredActivities.length === 0 ? (
              <p className="text-gray-500 text-center py-8">No activities yet. Start learning to see progress!</p>
            ) : (
              filteredActivities
                .slice()
                .reverse()
                .map((activity, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-4 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border-2 border-blue-100"
                  >
                    <div className="text-3xl">{activity.emoji || '📚'}</div>
                    <div className="flex-1">
                      <p className="font-semibold text-gray-800">{activity.description}</p>
                      <div className="flex items-center gap-3 mt-1 text-sm text-gray-600">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {new Date(activity.timestamp).toLocaleDateString()}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {new Date(activity.timestamp).toLocaleTimeString()}
                        </span>
                        {activity.module && (
                          <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-semibold">
                            {activity.module}
                          </span>
                        )}
                      </div>
                    </div>
                    {activity.starsEarned && (
                      <div className="flex items-center gap-1 bg-yellow-100 px-3 py-1 rounded-full">
                        <Star className="w-4 h-4 text-yellow-600 fill-yellow-600" />
                        <span className="font-bold text-yellow-700">+{activity.starsEarned}</span>
                      </div>
                    )}
                  </div>
                ))
            )}
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default ParentDashboard;
