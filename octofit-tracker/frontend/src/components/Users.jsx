import { useEffect, useState } from 'react'

function safeJson(response) {
  return response.json().catch(() => [])
}

function normalizeData(data) {
  if (Array.isArray(data)) return data
  if (data && Array.isArray(data.results)) return data.results
  return []
}

export default function Users({ apiBaseUrl }) {
  const [users, setUsers] = useState([])
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const codespaceName = import.meta.env.VITE_CODESPACE_NAME
    if (!codespaceName) {
      setError('API configuration error: VITE_CODESPACE_NAME not set')
      setLoading(false)
      return
    }
    // API endpoint: https://${VITE_CODESPACE_NAME}-8000.app.github.dev/api/users
    const url = `https://${codespaceName}-8000.app.github.dev/api/users`
    fetch(url)
      .then((response) => {
        if (!response.ok) throw new Error(`Failed to fetch users (${response.status})`)
        return safeJson(response)
      })
      .then((data) => setUsers(normalizeData(data)))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }, [])

  return (
    <section>
      <h2>Users</h2>
      {loading && <div className="alert alert-info">Loading users...</div>}
      {error && <div className="alert alert-danger">{error}</div>}
      {!loading && !error && (
        <div className="table-responsive">
          <table className="table table-striped table-hover">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Active</th>
                <th>Joined</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id || user.id}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                  <td>{user.active ? 'Yes' : 'No'}</td>
                  <td>{new Date(user.joinedAt).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  )
}
