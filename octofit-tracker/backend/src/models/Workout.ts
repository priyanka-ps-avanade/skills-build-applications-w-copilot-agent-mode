import { Schema, model, Types } from 'mongoose';

const workoutSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String },
  durationMinutes: { type: Number, required: true },
  difficulty: { type: String, enum: ['beginner', 'intermediate', 'advanced'], default: 'beginner' },
  createdBy: { type: Types.ObjectId, ref: 'User', required: true },
  createdAt: { type: Date, default: Date.now },
});

export interface WorkoutDocument {
  _id: string;
  title: string;
  description?: string;
  durationMinutes: number;
  difficulty: string;
  createdBy: string;
  createdAt: Date;
}

const Workout = model<WorkoutDocument>('Workout', workoutSchema);
export default Workout;
