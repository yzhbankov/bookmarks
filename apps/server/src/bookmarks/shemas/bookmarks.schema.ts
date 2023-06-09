import * as mongoose from 'mongoose';

export const BookmarksSchema = new mongoose.Schema({
  url: String,
  space: String,
  description: String,
  title: String,
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
