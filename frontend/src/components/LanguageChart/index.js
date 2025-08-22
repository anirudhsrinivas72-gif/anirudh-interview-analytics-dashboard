import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  Title
} from 'chart.js';
import './styles.css';

ChartJS.register(ArcElement, Tooltip, Legend, Title);

const LanguageChart = ({ languageDistribution }) => {
  if (!languageDistribution || Object.keys(languageDistribution).length === 0) {
    return (
      <div className="chart-container">
        <h3>Programming Language Distribution</h3>
        <div className="no-data">No language data available</div>
      </div>
    );
  }

  const sortedLanguages = Object.entries(languageDistribution)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 8);

  const otherCount = Object.values(languageDistribution)
    .slice(8)
    .reduce((sum, count) => sum + count, 0);

  if (otherCount > 0) {
    sortedLanguages.push(['Others', otherCount]);
  }

  const colors = [
    '#0366d6', '#28a745', '#f59e0b', '#dc2626',
    '#8b5cf6', '#06b6d4', '#f97316', '#ec4899',
    '#6b7280'
  ];

  const chartData = {
    labels: sortedLanguages.map(([lang]) => lang),
    datasets: [
      {
        data: sortedLanguages.map(([, count]) => count),
        backgroundColor: colors.slice(0, sortedLanguages.length),
        borderColor: '#ffffff',
        borderWidth: 2,
        hoverOffset: 4,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          padding: 20,
          usePointStyle: true,
          font: {
            size: 12,
          },
        },
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            const label = context.label || '';
            const value = context.parsed;
            const total = context.dataset.data.reduce((a, b) => a + b, 0);
            const percentage = ((value / total) * 100).toFixed(1);
            return `${label}: ${value} (${percentage}%)`;
          },
        },
      },
    },
  };

  return (
    <div className="chart-container">
      <h3>Programming Language Distribution</h3>
      <div className="chart-wrapper">
        <Doughnut data={chartData} options={chartOptions} />
      </div>
      <div className="chart-stats">
        <div className="total-languages">
          Total Languages: {Object.keys(languageDistribution).length}
        </div>
      </div>
    </div>
  );
};

export default LanguageChart;


