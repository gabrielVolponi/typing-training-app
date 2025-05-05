'use client'

import { useState, useEffect } from 'react'
import { getAverageStats } from '@/lib/sessionStorage'

export default function ResultsDisplay() {
  const [stats, setStats] = useState<ReturnType<typeof getAverageStats>>(null);

  useEffect(() => {
    setStats(getAverageStats());
  }, []);

  if (!stats) return null;

  return (
    <div className="bg-gray-900 p-6 rounded-lg mt-8">
      <h3 className="text-xl font-semibold mb-4">Session Statistics</h3>
      <div className="grid grid-cols-3 gap-4 text-center">
        <div className="bg-black p-4 rounded-lg">
          <p className="text-sm text-gray-400">Average WPM</p>
          <p className="text-2xl font-bold">{stats.averageWpm}</p>
        </div>
        <div className="bg-black p-4 rounded-lg">
          <p className="text-sm text-gray-400">Average Accuracy</p>
          <p className="text-2xl font-bold">{stats.averageAccuracy}%</p>
        </div>
        <div className="bg-black p-4 rounded-lg">
          <p className="text-sm text-gray-400">Total Tests</p>
          <p className="text-2xl font-bold">{stats.totalTests}</p>
        </div>
      </div>
    </div>
  );
}