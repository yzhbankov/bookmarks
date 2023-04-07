import { Document } from 'mongoose';

export interface Bookmark extends Document {
  url: string;
  name: string;
  description: string;
  tag: string;
  owner: string;
  createdAt: Date;
  updatedAt: Date;
}
