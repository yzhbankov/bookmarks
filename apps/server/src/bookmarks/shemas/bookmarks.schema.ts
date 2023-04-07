import * as mongoose from 'mongoose';

export const BookmarksSchema = new mongoose.Schema({
  url: String,
  name: String,
  description: String,
  tag: String,
  owner: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});
