import { Document } from 'mongoose';

export interface Space extends Document {
  name: string;
  owner: string;
  description: string;
  createdAt: Date;
}
