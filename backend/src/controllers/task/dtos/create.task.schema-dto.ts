import * as yup from 'yup';
import { TaskDocument } from '@entities/tasks/task.document';

export type CreateTaskSchemaDto = Pick<TaskDocument, 'title'>;

export const createTaskSchemaDto = yup.object().shape({
  title: yup.string().required(),
});
