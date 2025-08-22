import React from 'react';
import './styles.css';

const StatsGrid = ({ totalRepos, averageStars, username }) => {
  return (
    <div className="stats-grid">
      <div className="stat-card">
        <div className="stat-icon">Repo</div>
        <h3>Total Repositories</h3>
        <div className="stat-value">{totalRepos.toLocaleString()}</div>
      </div>
      
      <div className="stat-card">
        <div className="stat-icon">Stars</div>
        <h3>Average Stars</h3>
        <div className="stat-value">{averageStars.toFixed(2)}</div>
      </div>
      
      <div className="stat-card">
        <div className="stat-icon">User</div>
        <h3>GitHub User</h3>
        <div className="stat-value">{username}</div>
      </div>
    </div>
  );
};

export default StatsGrid;


