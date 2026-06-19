import express from 'express';
import cors from 'cors';

const app = express();
const port = 8000;

// Middleware
app.use(cors());
app.use(express.json());

// Environment configuration
const codespaceName = process.env.CODESPACE_NAME;
const baseUrl = codespaceName 
  ? `https://${codespaceName}-8000.app.github.dev`
  : `http://localhost:${port}`;

// Sample data
const users = [
  { id: 1, name: 'Alice Johnson', email: 'alice@example.com' },
  { id: 2, name: 'Bob Smith', email: 'bob@example.com' }
];

const activities = [
  { id: 1, userId: 1, type: 'running', distance: 5.2, duration: 30, date: '2024-01-15' },
  { id: 2, userId: 1, type: 'cycling', distance: 15.3, duration: 45, date: '2024-01-16' },
  { id: 3, userId: 2, type: 'swimming', distance: 2.0, duration: 40, date: '2024-01-16' }
];

// Routes
app.get('/api/users', (req, res) => {
  res.json(users);
});

app.get('/api/users/:id', (req, res) => {
  const user = users.find(u => u.id === parseInt(req.params.id));
  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ error: 'User not found' });
  }
});

app.get('/api/activities', (req, res) => {
  res.json(activities);
});

app.get('/api/activities/:id', (req, res) => {
  const activity = activities.find(a => a.id === parseInt(req.params.id));
  if (activity) {
    res.json(activity);
  } else {
    res.status(404).json({ error: 'Activity not found' });
  }
});

app.get('/api/users/:userId/activities', (req, res) => {
  const userActivities = activities.filter(a => a.userId === parseInt(req.params.userId));
  res.json(userActivities);
});

app.post('/api/activities', (req, res) => {
  const newActivity = {
    id: Math.max(...activities.map(a => a.id), 0) + 1,
    ...req.body
  };
  activities.push(newActivity);
  res.status(201).json(newActivity);
});

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', baseUrl });
});

// Start server
app.listen(port, () => {
  console.log(`🚀 Server running at ${baseUrl}`);
  console.log(`📍 Local: http://localhost:${port}`);
  console.log(`🌐 Codespace: https://${codespaceName}-8000.app.github.dev`);
  console.log(`\nAvailable endpoints:`);
  console.log(`  GET  /api/users`);
  console.log(`  GET  /api/users/:id`);
  console.log(`  GET  /api/activities`);
  console.log(`  GET  /api/activities/:id`);
  console.log(`  GET  /api/users/:userId/activities`);
  console.log(`  POST /api/activities`);
  console.log(`  GET  /health`);
});

export default app;
