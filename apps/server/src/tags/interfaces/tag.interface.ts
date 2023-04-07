import { Document } from 'mongoose';

export interface Tag extends Document {
  name: string;
  owner: string;
  description: string;
  createdAt: Date;
}
