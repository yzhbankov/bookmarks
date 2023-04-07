import * as mongoose from 'mongoose';

export const TagSchema = new mongoose.Schema({
  name: String,
  description: String,
  owner: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
