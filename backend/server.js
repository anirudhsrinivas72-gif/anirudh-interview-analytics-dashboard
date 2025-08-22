const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5050;

// Middleware
app.use(cors());
app.use(express.json());

// GitHub API base URL
const GITHUB_API_BASE = 'https://api.github.com';

// Helper function to fetch user repositories
async function fetchUserRepos(username) {
  try {
    const response = await axios.get(`${GITHUB_API_BASE}/users/${username}/repos`, {
      headers: {
        'Accept': 'application/vnd.github.v3+json',
        'User-Agent': 'GitHub-Analytics-Dashboard'
      }
    });
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 404) {
      throw new Error('User not found');
    }
    throw error;
  }
}

// Helper function to process repository data
function processRepoData(repos) {
  if (!repos || repos.length === 0) {
    return {
      totalRepos: 0,
      topRepos: [],
      languageDistribution: {},
      averageStars: 0
    };
  }

  // Calculate total repositories
  const totalRepos = repos.length;

  // Sort by stars and get top 5
  const topRepos = repos
    .sort((a, b) => (b.stargazers_count || 0) - (a.stargazers_count || 0))
    .slice(0, 5)
    .map(repo => ({
      name: repo.name,
      description: repo.description,
      stars: repo.stargazers_count || 0,
      forks: repo.forks_count || 0,
      language: repo.language,
      url: repo.html_url,
      created_at: repo.created_at,
      updated_at: repo.updated_at
    }));

  // Calculate language distribution
  const languageDistribution = repos.reduce((acc, repo) => {
    const lang = repo.language || 'Unknown';
    acc[lang] = (acc[lang] || 0) + 1;
    return acc;
  }, {});

  // Calculate average stars
  const totalStars = repos.reduce((sum, repo) => sum + (repo.stargazers_count || 0), 0);
  const averageStars = totalRepos > 0 ? (totalStars / totalRepos).toFixed(2) : 0;

  return {
    totalRepos,
    topRepos,
    languageDistribution,
    averageStars: parseFloat(averageStars)
  };
}

// Routes
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'GitHub Analytics API is running' });
});

app.get('/api/user/:username/repos', async (req, res) => {
  try {
    const { username } = req.params;
    
    // Fetch repositories
    const repos = await fetchUserRepos(username);
    
    // Process the data
    const processedData = processRepoData(repos);
    
    res.json({
      success: true,
      username,
      data: processedData
    });
    
  } catch (error) {
    console.error('Error fetching user repos:', error);
    
    if (error.message === 'User not found') {
      return res.status(404).json({
        success: false,
        error: 'User not found',
        message: 'The specified GitHub username does not exist'
      });
    }
    // Simple handling for GitHub API rate limiting
    if (error.response && error.response.status === 403) {
      const headers = error.response.headers || {};
      const remaining = headers['x-ratelimit-remaining'];
      const resetUnix = headers['x-ratelimit-reset'];
      if (remaining === '0' || remaining === 0) {
        const resetEpochSeconds = parseInt(resetUnix, 10);
        const nowSeconds = Math.floor(Date.now() / 1000);
        const retryAfterSeconds = isNaN(resetEpochSeconds)
          ? 60
          : Math.max(0, resetEpochSeconds - nowSeconds);
        res.set('Retry-After', String(retryAfterSeconds));
        return res.status(429).json({
          success: false,
          error: 'Rate limit exceeded',
          message: 'GitHub API rate limit exceeded. Please retry after the indicated time.',
          retryAfterSeconds
        });
      }
    }
    
    res.status(500).json({
      success: false,
      error: 'Internal server error',
      message: 'Failed to fetch repository data'
    });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    error: 'Something went wrong!',
    message: err.message
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    error: 'Route not found',
    message: 'The requested endpoint does not exist'
  });
});

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`GitHub Analytics API ready at http://localhost:${PORT}`);
  });
}

module.exports = { app, processRepoData };
