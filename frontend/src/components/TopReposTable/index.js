import React from 'react';
import './styles.css';

const TopReposTable = ({ repos }) => {
  if (!repos || repos.length === 0) {
    return (
      <div className="chart-container">
        <h3>Top 5 Repositories by Stars</h3>
        <div className="no-data">No repositories found</div>
      </div>
    );
  }

  return (
    <div className="chart-container">
      <h3>Top 5 Repositories by Stars</h3>
      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>Repository</th>
              <th>Description</th>
              <th>Stars</th>
              <th>Forks</th>
              <th>Language</th>
            </tr>
          </thead>
          <tbody>
            {repos.map((repo, index) => (
              <tr key={index} className="table-row">
                <td className="repo-name">
                  <a 
                    href={repo.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="repo-link"
                  >
                    {repo.name}
                  </a>
                </td>
                <td className="repo-description">
                  {repo.description || 'No description'}
                </td>
                <td className="repo-stars">
                  <span className="star-count">{repo.stars.toLocaleString()}</span>
                </td>
                <td className="repo-forks">
                  {repo.forks.toLocaleString()}
                </td>
                <td className="repo-language">
                  <span className="language-badge">
                    {repo.language || 'Unknown'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TopReposTable;


