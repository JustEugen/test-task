import { db } from '@core/database/connect';
import { Filter, ObjectId, UpdateFilter, UpdateOptions } from 'mongodb';
import { TASK_COLLECTION, TaskDocument } from '@entities/tasks/task.document';

export class TaskRepository {
  static collection = db.collection<TaskDocument>(TASK_COLLECTION);

  static createOne = (data: Pick<TaskDocument, 'authorId' | 'title'>) => {
    return TaskRepository.collection.insertOne({
      _id: new ObjectId(),
      authorId: new ObjectId(data.authorId),
      title: data.title,
      created_at: Date.now(),
      updated_at: Date.now(),
    });
  };

  static updateOneById = (filter: Filter<TaskDocument>, update: UpdateFilter<TaskDocument>, options?: UpdateOptions) => {
    if (!update.$set) {
      update.$set = {};
    }

    update.$set = { ...update.$set, updatedAt: Date.now() };

    if (options) {
      return TaskRepository.collection.updateOne(filter, update, options);
    }

    return TaskRepository.collection.updateOne(filter, update);
  };
}
