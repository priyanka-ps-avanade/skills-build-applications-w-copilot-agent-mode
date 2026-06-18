"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const api_1 = __importDefault(require("./routes/api"));
const app = (0, express_1.default)();
const PORT = Number(process.env.PORT || 8000);
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/octofit';
const CODESPACE_NAME = process.env.CODESPACE_NAME;
const API_BASE_URL = CODESPACE_NAME
    ? `https://${CODESPACE_NAME}-8000.githubpreview.dev`
    : `http://localhost:${PORT}`;
app.use(express_1.default.json());
app.use('/api', api_1.default);
app.get('/', (_req, res) => {
    res.json({
        status: 'OctoFit Tracker API is running',
        apiBaseUrl: API_BASE_URL,
    });
});
app.use((_req, res) => {
    res.status(404).json({ error: 'Not found' });
});
mongoose_1.default
    .connect(MONGO_URI)
    .then(() => {
    console.log(`Connected to MongoDB at ${MONGO_URI}`);
    console.log(`API base URL: ${API_BASE_URL}`);
    app.listen(PORT, () => {
        console.log(`Server listening on port ${PORT}`);
    });
})
    .catch((err) => {
    console.error('MongoDB connection error:', err);
});
