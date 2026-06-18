import { connectDatabase } from '../db';
import { Activity, Leaderboard, Team, User, Workout } from '../models';

// Seed the octofit_db database with test data
const seed = async () => {
  try {
    await connectDatabase();

    console.log('Clearing existing collections...');
    await Promise.all([
      Activity.deleteMany({}),
      Leaderboard.deleteMany({}),
      Team.deleteMany({}),
      User.deleteMany({}),
      Workout.deleteMany({}),
    ]);

    console.log('Creating users...');
    const users = await User.create([
      { name: 'Asha Patel', email: 'asha.patel@example.com', role: 'athlete' },
      { name: 'Jordan Kim', email: 'jordan.kim@example.com', role: 'athlete' },
      { name: 'Sofia Nguyen', email: 'sofia.nguyen@example.com', role: 'coach' },
    ]);

    console.log('Creating teams...');
    const teams = await Team.create([
      { name: 'North Star Runners', description: 'A competitive endurance team', members: [users[0]._id, users[1]._id] },
      { name: 'Core Crushers', description: 'Strength and conditioning group', members: [users[2]._id] },
    ]);

    console.log('Creating workouts...');
    const workouts = await Workout.create([
      {
        title: 'Morning HIIT Circuit',
        description: 'A fast-paced full body circuit with intervals.',
        durationMinutes: 30,
        difficulty: 'intermediate',
        createdBy: users[2]._id,
      },
      {
        title: 'Recovery Yoga Flow',
        description: 'Gentle stretching and breathing for recovery days.',
        durationMinutes: 45,
        difficulty: 'beginner',
        createdBy: users[2]._id,
      },
    ]);

    console.log('Creating activities...');
    await Activity.create([
      {
        user: users[0]._id,
        type: 'Running',
        durationMinutes: 50,
        caloriesBurned: 420,
        occurredAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      },
      {
        user: users[1]._id,
        type: 'Cycling',
        durationMinutes: 60,
        caloriesBurned: 520,
        occurredAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
      },
    ]);

    console.log('Creating leaderboard entries...');
    await Leaderboard.create([
      { user: users[1]._id, team: teams[0]._id, points: 850, rank: 1 },
      { user: users[0]._id, team: teams[0]._id, points: 760, rank: 2 },
      { user: users[2]._id, points: 640, rank: 3 },
    ]);

    console.log('Seed data successfully created in octofit_db');
  } catch (error) {
    console.error('Seed script failed:', error);
  } finally {
    process.exit(0);
  }
};

seed();
