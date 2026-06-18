import { Router } from 'express';
import { Activity, Leaderboard, Team, User, Workout } from '../models';

const router = Router();

const asyncHandler = (handler: (req: any, res: any) => Promise<void>) => (
  req: any,
  res: any,
  next: any
) => {
  handler(req, res).catch(next);
};

router.get(
  '/users',
  asyncHandler(async (_req, res) => {
    const users = await User.find();
    res.json(users);
  })
);

router.post(
  '/users',
  asyncHandler(async (req, res) => {
    const user = await User.create(req.body);
    res.status(201).json(user);
  })
);

router.get(
  '/users/:id',
  asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
  })
);

router.get(
  '/teams',
  asyncHandler(async (_req, res) => {
    const teams = await Team.find().populate('members');
    res.json(teams);
  })
);

router.post(
  '/teams',
  asyncHandler(async (req, res) => {
    const team = await Team.create(req.body);
    res.status(201).json(team);
  })
);

router.get(
  '/teams/:id',
  asyncHandler(async (req, res) => {
    const team = await Team.findById(req.params.id).populate('members');
    if (!team) return res.status(404).json({ error: 'Team not found' });
    res.json(team);
  })
);

router.get(
  '/activities',
  asyncHandler(async (_req, res) => {
    const activities = await Activity.find().populate('user');
    res.json(activities);
  })
);

router.post(
  '/activities',
  asyncHandler(async (req, res) => {
    const activity = await Activity.create(req.body);
    res.status(201).json(activity);
  })
);

router.get(
  '/activities/:id',
  asyncHandler(async (req, res) => {
    const activity = await Activity.findById(req.params.id).populate('user');
    if (!activity) return res.status(404).json({ error: 'Activity not found' });
    res.json(activity);
  })
);

router.get(
  '/leaderboard',
  asyncHandler(async (_req, res) => {
    const leaderboard = await Leaderboard.find()
      .populate('user')
      .populate('team')
      .sort({ rank: 1 });
    res.json(leaderboard);
  })
);

router.get(
  '/workouts',
  asyncHandler(async (_req, res) => {
    const workouts = await Workout.find().populate('createdBy');
    res.json(workouts);
  })
);

router.post(
  '/workouts',
  asyncHandler(async (req, res) => {
    const workout = await Workout.create(req.body);
    res.status(201).json(workout);
  })
);

router.get(
  '/workouts/:id',
  asyncHandler(async (req, res) => {
    const workout = await Workout.findById(req.params.id).populate('createdBy');
    if (!workout) return res.status(404).json({ error: 'Workout not found' });
    res.json(workout);
  })
);

export default router;
