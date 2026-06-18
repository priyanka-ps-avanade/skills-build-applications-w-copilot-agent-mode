"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
const makeListHandler = (resource) => (_req, res) => {
    res.json({ resource, action: 'list', items: [] });
};
const makeCreateHandler = (resource) => (_req, res) => {
    res.status(201).json({ resource, action: 'create', item: _req.body || {} });
};
const makeDetailHandler = (resource) => (req, res) => {
    res.json({ resource, action: 'detail', id: req.params.id });
};
router.get('/users', makeListHandler('users'));
router.post('/users', makeCreateHandler('users'));
router.get('/teams', makeListHandler('teams'));
router.post('/teams', makeCreateHandler('teams'));
router.get('/activities', makeListHandler('activities'));
router.post('/activities', makeCreateHandler('activities'));
router.get('/leaderboard', (_req, res) => {
    res.json({ resource: 'leaderboard', action: 'list', leaderboard: [] });
});
router.get('/workouts', makeListHandler('workouts'));
router.post('/workouts', makeCreateHandler('workouts'));
router.get('/users/:id', makeDetailHandler('users'));
router.get('/teams/:id', makeDetailHandler('teams'));
router.get('/activities/:id', makeDetailHandler('activities'));
router.get('/workouts/:id', makeDetailHandler('workouts'));
exports.default = router;
