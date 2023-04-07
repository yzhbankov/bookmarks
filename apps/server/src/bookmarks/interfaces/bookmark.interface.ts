import { Document } from 'mongoose';

export interface Bookmark extends Document {
  url: String;
  name: String;
  description: String;
  tag: String;
  owner: String;
  created_at: String;
  updated_at: String;
}
