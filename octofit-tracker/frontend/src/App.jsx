import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import './App.css'
import Activities from './components/Activities'
import Leaderboard from './components/Leaderboard'
import Teams from './components/Teams'
import Users from './components/Users'
import Workouts from './components/Workouts'

// Helper function to get API base URL from Vite environment variables
function getApiBaseUrl() {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME
  if (!codespaceName) {
    console.warn(
      'VITE_CODESPACE_NAME is not defined. Please create a .env.local file with VITE_CODESPACE_NAME=your-codespace-name'
    )
    return null
  }
  return `https://${codespaceName}-8000.app.github.dev/api`
}

const apiBaseUrl = getApiBaseUrl()

function App() {
  const [activeTab, setActiveTab] = useState('activities')
  const location = useLocation()

  if (!apiBaseUrl) {
    return (
      <div className="container mt-5">
        <div className="alert alert-danger" role="alert">
          <h4 className="alert-heading">Configuration Error</h4>
          <p>
            <strong>VITE_CODESPACE_NAME</strong> environment variable is not set.
          </p>
          <hr />
          <p className="mb-0">
            Please create a <code>.env.local</code> file in the <code>octofit-tracker/frontend/</code> directory:
          </p>
          <pre className="mt-2 bg-light p-3">{`VITE_CODESPACE_NAME=your-codespace-name`}</pre>
          <p className="mt-2 mb-0">
            Replace <code>your-codespace-name</code> with your actual GitHub Codespaces name (e.g.,
            <code>priyanka-ps-avanade-9xj45x</code>).
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="container-fluid">
      <header className="navbar navbar-expand-lg navbar-dark bg-primary mb-4">
        <div className="container-fluid">
          <span className="navbar-brand mb-0 h1">Octofit Tracker</span>
          <span className="navbar-text text-white">
            API Base: <code>{apiBaseUrl}</code>
          </span>
        </div>
      </header>

      <div className="container">
        <ul className="nav nav-tabs mb-4" role="tablist">
          <li className="nav-item" role="presentation">
            <button
              className={`nav-link ${activeTab === 'activities' ? 'active' : ''}`}
              onClick={() => setActiveTab('activities')}
              role="tab"
            >
              Activities
            </button>
          </li>
          <li className="nav-item" role="presentation">
            <button
              className={`nav-link ${activeTab === 'workouts' ? 'active' : ''}`}
              onClick={() => setActiveTab('workouts')}
              role="tab"
            >
              Workouts
            </button>
          </li>
          <li className="nav-item" role="presentation">
            <button
              className={`nav-link ${activeTab === 'teams' ? 'active' : ''}`}
              onClick={() => setActiveTab('teams')}
              role="tab"
            >
              Teams
            </button>
          </li>
          <li className="nav-item" role="presentation">
            <button
              className={`nav-link ${activeTab === 'users' ? 'active' : ''}`}
              onClick={() => setActiveTab('users')}
              role="tab"
            >
              Users
            </button>
          </li>
          <li className="nav-item" role="presentation">
            <button
              className={`nav-link ${activeTab === 'leaderboard' ? 'active' : ''}`}
              onClick={() => setActiveTab('leaderboard')}
              role="tab"
            >
              Leaderboard
            </button>
          </li>
        </ul>

        <div className="tab-content">
          {activeTab === 'activities' && (
            <div className="tab-pane fade show active">
              <Activities apiBaseUrl={apiBaseUrl} />
            </div>
          )}
          {activeTab === 'workouts' && (
            <div className="tab-pane fade show active">
              <Workouts apiBaseUrl={apiBaseUrl} />
            </div>
          )}
          {activeTab === 'teams' && (
            <div className="tab-pane fade show active">
              <Teams apiBaseUrl={apiBaseUrl} />
            </div>
          )}
          {activeTab === 'users' && (
            <div className="tab-pane fade show active">
              <Users apiBaseUrl={apiBaseUrl} />
            </div>
          )}
          {activeTab === 'leaderboard' && (
            <div className="tab-pane fade show active">
              <Leaderboard apiBaseUrl={apiBaseUrl} />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default App
