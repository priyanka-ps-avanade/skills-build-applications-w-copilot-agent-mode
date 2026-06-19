import { useEffect, useState } from 'react'

function safeJson(response) {
  return response.json().catch(() => [])
}

function normalizeData(data) {
  if (Array.isArray(data)) return data
  if (data && Array.isArray(data.results)) return data.results
  return []
}

export default function Workouts({ apiBaseUrl }) {
  const [workouts, setWorkouts] = useState([])
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // API endpoint: https://${VITE_CODESPACE_NAME}-8000.app.github.dev/api/workouts
    const url = `${apiBaseUrl}/workouts`
    fetch(url)
      .then((response) => {
        if (!response.ok) throw new Error(`Failed to fetch workouts (${response.status})`)
        return safeJson(response)
      })
      .then((data) => setWorkouts(normalizeData(data)))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }, [apiBaseUrl])

  return (
    <section>
      <h2>Workouts</h2>
      {loading && <div className="alert alert-info">Loading workouts...</div>}
      {error && <div className="alert alert-danger">{error}</div>}
      {!loading && !error && (
        <div className="table-responsive">
          <table className="table table-striped table-hover">
            <thead>
              <tr>
                <th>Title</th>
                <th>Difficulty</th>
                <th>Duration</th>
                <th>Created By</th>
                <th>Created</th>
              </tr>
            </thead>
            <tbody>
              {workouts.map((workout) => (
                <tr key={workout._id || workout.id}>
                  <td>{workout.title}</td>
                  <td>{workout.difficulty}</td>
                  <td>{workout.durationMinutes} min</td>
                  <td>{workout.createdBy?.name || workout.createdBy || 'Unknown'}</td>
                  <td>{new Date(workout.createdAt).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  )
}
