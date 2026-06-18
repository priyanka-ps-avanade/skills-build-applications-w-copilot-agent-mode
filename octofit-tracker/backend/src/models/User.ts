import { Schema, model } from 'mongoose';

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  role: { type: String, enum: ['athlete', 'coach', 'admin'], default: 'athlete' },
  active: { type: Boolean, default: true },
  joinedAt: { type: Date, default: Date.now },
});

export interface UserDocument {
  _id: string;
  name: string;
  email: string;
  role: string;
  active: boolean;
  joinedAt: Date;
}

const User = model<UserDocument>('User', userSchema);
export default User;
