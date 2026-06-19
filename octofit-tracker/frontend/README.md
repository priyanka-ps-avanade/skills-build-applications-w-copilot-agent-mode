# Octofit Tracker Frontend

React 19 presentation tier for the multi-tier Octofit Tracker application built with Vite.

## Prerequisites

- Node.js 18+ and npm
- GitHub Codespaces environment with the backend running on port 8000

## Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment Variables

Create a `.env.local` file in the `octofit-tracker/frontend/` directory:

```bash
cp .env.local.example .env.local
```

Edit `.env.local` and set your GitHub Codespaces name:

```
VITE_CODESPACE_NAME=your-codespace-name
```

**Example:**
```
VITE_CODESPACE_NAME=priyanka-ps-avanade-9xj45x
```

You can find your Codespace name in:
- GitHub.com → Your Codespaces page
- Or in the browser URL when using Codespaces

### 3. Run Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## API Endpoints

The frontend connects to the backend API using the following pattern:

```
https://${VITE_CODESPACE_NAME}-8000.app.github.dev/api/[component]/
```

**Available endpoints:**
- `/api/activities` - Activity data
- `/api/leaderboard` - Leaderboard rankings
- `/api/teams` - Team information
- `/api/users` - User data
- `/api/workouts` - Workout information

## Features

- **Tab-based Navigation**: Switch between Activities, Workouts, Teams, Users, and Leaderboard
- **Data Normalization**: Handles both array and paginated responses (`{ results: [...] }`)
- **Error Handling**: User-friendly error messages and configuration validation
- **React Router**: Client-side routing for navigation
- **Vite**: Fast development and build tooling

## Component Structure

```
src/
├── App.jsx              # Main application container with tab navigation
├── main.jsx             # React Router setup
├── index.css            # Global styles
└── components/
    ├── Activities.jsx   # Activities listing
    ├── Leaderboard.jsx  # Leaderboard rankings
    ├── Teams.jsx        # Teams listing
    ├── Users.jsx        # Users listing
    └── Workouts.jsx     # Workouts listing
```

## Build

```bash
npm run build
```

Output is in `dist/` directory.

## Troubleshooting

### "VITE_CODESPACE_NAME is not defined"

**Solution:** Ensure `.env.local` exists and contains a valid `VITE_CODESPACE_NAME` value.

### API requests failing with "Failed to fetch"

**Possible causes:**
- Backend service not running on port 8000
- `VITE_CODESPACE_NAME` is incorrect
- Network connectivity issues between frontend and backend

**Solution:** Verify the backend is running and accessible at `https://{VITE_CODESPACE_NAME}-8000.app.github.dev`
