import { ObjectId } from 'mongodb';
import { TypicalDocument } from '@utils/db/typical.document';

export const TASK_COLLECTION = 'tasks';

export interface TaskDocument extends TypicalDocument {
  authorId: ObjectId;

  title: string;
}
