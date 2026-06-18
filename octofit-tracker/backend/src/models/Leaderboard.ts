import { Schema, model, Types } from 'mongoose';

const leaderboardSchema = new Schema({
  user: { type: Types.ObjectId, ref: 'User', required: true },
  team: { type: Types.ObjectId, ref: 'Team' },
  points: { type: Number, required: true },
  rank: { type: Number, required: true },
  updatedAt: { type: Date, default: Date.now },
});

export interface LeaderboardDocument {
  _id: string;
  user: string;
  team?: string;
  points: number;
  rank: number;
  updatedAt: Date;
}

const Leaderboard = model<LeaderboardDocument>('Leaderboard', leaderboardSchema);
export default Leaderboard;
