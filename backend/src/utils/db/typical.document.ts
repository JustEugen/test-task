import { ObjectId } from 'mongodb';

export interface TypicalDocument {
  _id: ObjectId;
  created_at: number;
  updated_at: number;
}
