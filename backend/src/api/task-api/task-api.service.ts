import { TaskDocument } from '@entities/tasks/task.document';
import { TaskRepository } from '@entities/tasks/task.repository';
import { UnexpectedError } from '@utils/error/unexpected-error';
import { ObjectId } from 'mongodb';
import { serviceErrorCreator } from '@utils/error/service-error-creator';

export class TaskApiService {
  static create = async (data: Pick<TaskDocument, 'title' | 'authorId'>): Promise<TaskDocument> => {
    const { insertedId } = await TaskRepository.createOne({
      authorId: data.authorId,
      title: data.title,
    });

    const createdTask = await TaskRepository.collection.findOne({
      _id: insertedId,
    });

    if (!createdTask) {
      throw new UnexpectedError();
    }

    return createdTask;
  };

  static updateOneById = async (
    authorId: ObjectId,
    _id: ObjectId,
    data: Pick<TaskDocument, 'title'>,
  ): Promise<TaskDocument> => {
    const existedTask = await TaskRepository.collection.findOne({ _id, authorId });

    if (!existedTask) {
      throw TaskApiService.error(TaskApiService.codes.TaskNotFound);
    }

    await TaskRepository.updateOneById({ _id, authorId }, { $set: { title: data.title } });

    const updatedTask = await TaskRepository.collection.findOne({ _id, authorId });

    if (!updatedTask) {
      throw new UnexpectedError();
    }

    return updatedTask;
  };

  static list = async (authorId: ObjectId) => {
    return TaskRepository.collection.find({ authorId: authorId }).toArray();
  };

  static getOneById = async (authorId: ObjectId, _id: ObjectId) => {
    const task = await TaskRepository.collection.findOne({ _id, authorId });

    if (!task) {
      throw TaskApiService.error(TaskApiService.codes.TaskNotFound);
    }

    return task;
  };

  static removeOneById = async (authorId: ObjectId, _id: ObjectId) => {
    const task = await TaskRepository.collection.findOne({ _id, authorId });

    if (!task) {
      throw TaskApiService.error(TaskApiService.codes.TaskNotFound);
    }

    await TaskRepository.collection.deleteOne({ _id, authorId });
  };

  static codes = {
    TaskNotFound: 'TaskNotFound',
  };

  static error = serviceErrorCreator(TaskApiService.codes);
}
