# anirudh-interview-analytics-dashboard

A full-stack web application that displays GitHub repository statistics and insights. Built with React.js frontend and Node.js backend, featuring data visualization, responsive design, and real-time GitHub API integration.

## Features

- **API Integration**: Fetches data from GitHub REST API
- **Data Processing**: Transforms and aggregates repository data
- **Responsive UI**: Clean, modern interface that works on all devices
- **Data Visualization**: Interactive charts using Chart.js
- **Error Handling**: Graceful handling of API failures and edge cases
- **Real-time Search**: Search for any GitHub username or organization
- **Loading States**: Smooth loading animations and user feedback

## Metrics Displayed

- **Top 5 repositories by stars** with detailed information
- **Programming language distribution** in a doughnut chart
- **Total repositories count**
- **Average stars per repository**
- **Repository details** including forks, language, and links

## Technology Stack

### Frontend
- **React.js 18**: Modern React with hooks for state management
- **Chart.js**: Interactive data visualization library
- **CSS3**: Modern CSS with CSS variables and responsive design
- **Axios**: HTTP client for API communication

### Backend
- **Node.js**: Server-side JavaScript runtime
- **Express.js**: Fast, unopinionated web framework
- **CORS**: Cross-origin resource sharing support
- **Axios**: HTTP client for GitHub API calls

## Technology choices (why)

- **React 18**: Modern, component-driven UI library with hooks and concurrent rendering features that simplify state and effects while keeping bundles lean.
- **Chart.js**: Lightweight, well-documented charting with good defaults and React-friendly wrappers, ideal for quick, interactive visualizations.
- **Axios (frontend + backend)**: Consistent HTTP client with interceptors and better error handling than `fetch`, used in both layers for symmetry.
- **Node.js**: Single language across stack reduces context switching and speeds up development; non-blocking I/O suits API aggregation.
- **Express.js**: Minimal setup and rich middleware ecosystem for quickly exposing a thin API layer over GitHub endpoints.
- **CORS**: Enables the React app (3000) to safely call the API server (5050) during local development.
- **concurrently + cross-env**: One command to run frontend and backend in parallel with predictable env configuration across platforms.

## Project Structure

```
anirudh-interview-analytics-dashboard/
├── backend/
│   ├── server.js          # Express server with GitHub API integration
│   └── package.json       # Backend dependencies
├── frontend/
│   ├── public/
│   │   └── index.html     # Main HTML file
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── App.js         # Main application component
│   │   ├── index.js       # React entry point
│   │   └── styles/        # CSS files
│   └── package.json       # Frontend dependencies
├── screenshots/            # Application screenshots
└── README.md              # This file
```

## Quick Start (One Command)

From the project root:
```bash
# Install both backend and frontend deps
npm run setup

# Start backend (5050) and frontend (3000) together
npm start
```

- Frontend: http://localhost:3000
- Backend: http://localhost:5050 (default, override with PORT)

---

## API Endpoints

- `GET /api/health` - Health check endpoint
- `GET /api/user/:username/repos` - Fetch repository data for a GitHub user

## User Flow

1. **Application loads** with default user "apple" data
2. **Dashboard displays** repository statistics and charts
3. **User can search** for different GitHub usernames
4. **Loading states** show while fetching new data
5. **Error handling** displays user-friendly messages for invalid usernames
6. **Responsive design** adapts to different screen sizes

## Design Choices

- **Modern UI/UX**: Clean, card-based design with subtle shadows and animations
- **Responsive Grid**: CSS Grid and Flexbox for responsive layouts
- **Color Scheme**: GitHub-inspired color palette with proper contrast
- **Typography**: System fonts for optimal readability across platforms
- **Animations**: Subtle hover effects and loading animations

## Future Improvements

- **Authentication**: GitHub OAuth integration for higher API rate limits
- **Caching**: Redis caching for frequently requested data
- **Advanced Charts**: More chart types (bar charts, line graphs)
- **Repository Details**: Individual repository analysis pages
- **Export Features**: PDF/CSV export of analytics data
- **Real-time Updates**: WebSocket integration for live data
- **Mobile App**: React Native mobile application

## Testing

The application has been tested with various GitHub usernames including:
- `apple` (default)
- `microsoft`
- `google`
- `facebook`
- `netflix`

## Assumptions Made

- GitHub API rate limits (60 requests/hour for unauthenticated requests)
- Users have stable internet connection
- Modern browser support (ES6+ features)
- GitHub usernames are valid and exist
- Repository data is publicly accessible

## Known Limitations

- GitHub API rate limiting for unauthenticated requests
- No support for private repositories
- Limited to public user/organization data
- Chart.js dependency for data visualization

## License

MIT License - feel free to use this project for learning and development purposes.

## Author

Built as a take-home assignment for a Full Stack Web Developer position, showcasing modern web development skills and best practices.
