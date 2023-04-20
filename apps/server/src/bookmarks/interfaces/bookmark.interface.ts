import { Document } from 'mongoose';

export interface Bookmark extends Document {
  url: string;
  space: string;
  description: string;
  title: string;
  tag: string;
  owner: string;
  createdAt: Date;
  updatedAt: Date;
}
