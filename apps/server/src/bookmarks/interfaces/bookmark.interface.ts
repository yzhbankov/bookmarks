import { Document } from 'mongoose';

export interface Bookmark extends Document {
  url: string;
  name: string;
  description: string;
  tag: string;
  owner: string;
  created_at: string;
  updated_at: string;
}
