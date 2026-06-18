import { Schema, model, Types } from 'mongoose';

const activitySchema = new Schema({
  user: { type: Types.ObjectId, ref: 'User', required: true },
  type: { type: String, required: true },
  durationMinutes: { type: Number, required: true },
  caloriesBurned: { type: Number, required: true },
  occurredAt: { type: Date, default: Date.now },
});

export interface ActivityDocument {
  _id: string;
  user: string;
  type: string;
  durationMinutes: number;
  caloriesBurned: number;
  occurredAt: Date;
}

const Activity = model<ActivityDocument>('Activity', activitySchema);
export default Activity;
