import mongoose from 'mongoose';

// MongoDB database configuration
const octofit_db = {
  uri: process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db',
};

// Connect to MongoDB using mongoose
export async function connectDatabase() {
  try {
    await mongoose.connect(octofit_db.uri);
    console.log('Connected to octofit_db database');
  } catch (error) {
    console.error('Failed to connect to database:', error);
    throw error;
  }
}

export default octofit_db;
