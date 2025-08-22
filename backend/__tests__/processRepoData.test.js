const { processRepoData } = require('../server');

describe('processRepoData', () => {
  test('returns zeros and empty structures for empty input', () => {
    const result = processRepoData([]);
    expect(result).toEqual({
      totalRepos: 0,
      topRepos: [],
      languageDistribution: {},
      averageStars: 0,
    });
  });

  test('calculates totals, averages, languages, and top repos', () => {
    const repos = [
      { name: 'a', stargazers_count: 10, forks_count: 1, language: 'JS', html_url: 'url-a', created_at: '2020', updated_at: '2021' },
      { name: 'b', stargazers_count: 5, forks_count: 0, language: 'TS', html_url: 'url-b', created_at: '2020', updated_at: '2021' },
      { name: 'c', stargazers_count: 0, forks_count: 2, language: null, html_url: 'url-c', created_at: '2020', updated_at: '2021' },
    ];

    const result = processRepoData(repos);

    expect(result.totalRepos).toBe(3);
    expect(result.averageStars).toBeCloseTo((10 + 5 + 0) / 3);
    expect(result.languageDistribution).toEqual({ JS: 1, TS: 1, Unknown: 1 });
    expect(result.topRepos[0].name).toBe('a');
    expect(result.topRepos).toHaveLength(3);
  });
});


