import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import SearchBar from './components/SearchBar';
import StatsGrid from './components/StatsGrid';
import TopReposTable from './components/TopReposTable';
import LanguageChart from './components/LanguageChart';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorMessage from './components/ErrorMessage';

function App() {
  const [username, setUsername] = useState('apple');
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchUserData = async (searchUsername) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await axios.get(`/api/user/${searchUsername}/repos`);
      setData(response.data.data);
      setUsername(searchUsername);
    } catch (err) {
      if (err.response?.status === 404) {
        setError('User not found. Please check the GitHub username and try again.');
      } else {
        setError('Failed to fetch data. Please try again later.');
      }
      setData(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserData(username);
  }, []);

  const handleSearch = (searchUsername) => {
    if (searchUsername.trim()) {
      fetchUserData(searchUsername.trim());
    }
  };

  return (
    <div className="App">
      <div className="container">
        <header className="header">
          <h1>GitHub Analytics Dashboard</h1>
          <p>Analyze GitHub repository statistics and insights</p>
        </header>

        <SearchBar 
          onSearch={handleSearch} 
          currentUsername={username}
          disabled={loading}
        />

        {loading && <LoadingSpinner />}

        {error && <ErrorMessage message={error} />}

        {data && !loading && !error && (
          <div className="dashboard">
            <StatsGrid 
              totalRepos={data.totalRepos}
              averageStars={data.averageStars}
              username={username}
            />

            <div className="charts-section">
              <TopReposTable repos={data.topRepos} />
              <LanguageChart languageDistribution={data.languageDistribution} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
