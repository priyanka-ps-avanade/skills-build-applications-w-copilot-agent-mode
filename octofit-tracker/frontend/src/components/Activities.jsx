import { useEffect, useState } from 'react'

function safeJson(response) {
  return response.json().catch(() => [])
}

function normalizeData(data) {
  if (Array.isArray(data)) return data
  if (data && Array.isArray(data.results)) return data.results
  return []
}

export default function Activities({ apiBaseUrl }) {
  const [activities, setActivities] = useState([])
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // API endpoint: https://${VITE_CODESPACE_NAME}-8000.app.github.dev/api/activities
    const url = `${apiBaseUrl}/activities`
    fetch(url)
      .then((response) => {
        if (!response.ok) throw new Error(`Failed to fetch activities (${response.status})`)
        return safeJson(response)
      })
      .then((data) => setActivities(normalizeData(data)))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }, [apiBaseUrl])

  return (
    <section>
      <h2>Activities</h2>
      {loading && <div className="alert alert-info">Loading activities...</div>}
      {error && <div className="alert alert-danger">{error}</div>}
      {!loading && !error && (
        <div className="table-responsive">
          <table className="table table-striped table-hover">
            <thead>
              <tr>
                <th>User</th>
                <th>Type</th>
                <th>Duration</th>
                <th>Calories</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {activities.map((activity) => (
                <tr key={activity._id || activity.id}>
                  <td>{activity.user?.name || activity.user || 'Unknown'}</td>
                  <td>{activity.type}</td>
                  <td>{activity.durationMinutes} min</td>
                  <td>{activity.caloriesBurned}</td>
                  <td>{new Date(activity.occurredAt).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  )
}
