import { useEffect, useState } from 'react'

function safeJson(response) {
  return response.json().catch(() => [])
}

function normalizeData(data) {
  if (Array.isArray(data)) return data
  if (data && Array.isArray(data.results)) return data.results
  return []
}

export default function Teams({ apiBaseUrl }) {
  const [teams, setTeams] = useState([])
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const url = `${apiBaseUrl}/teams`
    fetch(url)
      .then((response) => {
        if (!response.ok) throw new Error(`Failed to fetch teams (${response.status})`)
        return safeJson(response)
      })
      .then((data) => setTeams(normalizeData(data)))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }, [apiBaseUrl])

  return (
    <section>
      <h2>Teams</h2>
      {loading && <div className="alert alert-info">Loading teams...</div>}
      {error && <div className="alert alert-danger">{error}</div>}
      {!loading && !error && (
        <div className="table-responsive">
          <table className="table table-striped table-hover">
            <thead>
              <tr>
                <th>Name</th>
                <th>Description</th>
                <th>Members</th>
                <th>Created</th>
              </tr>
            </thead>
            <tbody>
              {teams.map((team) => (
                <tr key={team._id || team.id}>
                  <td>{team.name}</td>
                  <td>{team.description || '—'}</td>
                  <td>{team.members?.length ?? 0}</td>
                  <td>{new Date(team.createdAt).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  )
}
