import { NavLink, Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import Activities from './components/Activities.jsx'
import Leaderboard from './components/Leaderboard.jsx'
import Teams from './components/Teams.jsx'
import Users from './components/Users.jsx'
import Workouts from './components/Workouts.jsx'

const CODESPACE_NAME = import.meta.env.VITE_CODESPACE_NAME
const API_BASE_URL = CODESPACE_NAME
  ? `https://${CODESPACE_NAME}-8000.app.github.dev/api`
  : 'http://localhost:8000/api'
const hasCodespace = Boolean(CODESPACE_NAME)

function App() {
  return (
    <div className="container py-4">
      <header className="mb-4">
        <h1 className="mb-2">OctoFit Tracker</h1>
        <p className="text-muted mb-1">
          {hasCodespace
            ? `Codespaces API base URL: https://${CODESPACE_NAME}-8000.app.github.dev/api`
            : 'VITE_CODESPACE_NAME is not set. Falling back to localhost API URL.'}
        </p>
        <p className="text-small">
          Set <code>VITE_CODESPACE_NAME</code> in <code>.env.local</code> when
          running in Codespaces for the hosted backend URL.
        </p>
      </header>

      <nav className="nav nav-pills gap-2 flex-wrap mb-4">
        <NavLink to="/users" className={({ isActive }) => `nav-link ${isActive ? 'active' : 'link-secondary'}`}>
          Users
        </NavLink>
        <NavLink to="/activities" className={({ isActive }) => `nav-link ${isActive ? 'active' : 'link-secondary'}`}>
          Activities
        </NavLink>
        <NavLink to="/leaderboard" className={({ isActive }) => `nav-link ${isActive ? 'active' : 'link-secondary'}`}>
          Leaderboard
        </NavLink>
        <NavLink to="/teams" className={({ isActive }) => `nav-link ${isActive ? 'active' : 'link-secondary'}`}>
          Teams
        </NavLink>
        <NavLink to="/workouts" className={({ isActive }) => `nav-link ${isActive ? 'active' : 'link-secondary'}`}>
          Workouts
        </NavLink>
      </nav>

      <Routes>
        <Route path="/" element={<Navigate to="/users" replace />} />
        <Route path="/users" element={<Users apiBaseUrl={API_BASE_URL} />} />
        <Route path="/activities" element={<Activities apiBaseUrl={API_BASE_URL} />} />
        <Route path="/leaderboard" element={<Leaderboard apiBaseUrl={API_BASE_URL} />} />
        <Route path="/teams" element={<Teams apiBaseUrl={API_BASE_URL} />} />
        <Route path="/workouts" element={<Workouts apiBaseUrl={API_BASE_URL} />} />
        <Route
          path="*"
          element={<div className="alert alert-warning">Page not found.</div>}
        />
      </Routes>
    </div>
  )
}

export default App
