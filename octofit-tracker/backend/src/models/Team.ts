import { Schema, model, Types } from 'mongoose';

const teamSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String },
  members: [{ type: Types.ObjectId, ref: 'User' }],
  createdAt: { type: Date, default: Date.now },
});

export interface TeamDocument {
  _id: string;
  name: string;
  description?: string;
  members: string[];
  createdAt: Date;
}

const Team = model<TeamDocument>('Team', teamSchema);
export default Team;
