import { useEffect, useState } from 'react'

function safeJson(response) {
  return response.json().catch(() => [])
}

function normalizeData(data) {
  if (Array.isArray(data)) return data
  if (data && Array.isArray(data.results)) return data.results
  return []
}

export default function Leaderboard({ apiBaseUrl }) {
  const [leaderboard, setLeaderboard] = useState([])
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const codespaceName = import.meta.env.VITE_CODESPACE_NAME
    if (!codespaceName) {
      setError('API configuration error: VITE_CODESPACE_NAME not set')
      setLoading(false)
      return
    }
    // API endpoint: https://${VITE_CODESPACE_NAME}-8000.app.github.dev/api/leaderboard
    const url = `https://${codespaceName}-8000.app.github.dev/api/leaderboard`
    fetch(url)
      .then((response) => {
        if (!response.ok) throw new Error(`Failed to fetch leaderboard (${response.status})`)
        return safeJson(response)
      })
      .then((data) => setLeaderboard(normalizeData(data)))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }, [])

  return (
    <section>
      <h2>Leaderboard</h2>
      {loading && <div className="alert alert-info">Loading leaderboard...</div>}
      {error && <div className="alert alert-danger">{error}</div>}
      {!loading && !error && (
        <div className="table-responsive">
          <table className="table table-striped table-hover">
            <thead>
              <tr>
                <th>Rank</th>
                <th>User</th>
                <th>Team</th>
                <th>Points</th>
                <th>Updated</th>
              </tr>
            </thead>
            <tbody>
              {leaderboard.map((item) => (
                <tr key={item._id || item.id}>
                  <td>{item.rank}</td>
                  <td>{item.user?.name || item.user || 'Unknown'}</td>
                  <td>{item.team?.name || '—'}</td>
                  <td>{item.points}</td>
                  <td>{new Date(item.updatedAt).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  )
}
