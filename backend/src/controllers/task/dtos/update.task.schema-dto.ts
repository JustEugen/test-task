import * as yup from 'yup';
import { TaskDocument } from '@entities/tasks/task.document';

export type UpdateTaskSchemaDto = Pick<TaskDocument, 'title'>;

export const updateTaskSchemaDto = yup.object().shape({
  title: yup.string().required(),
});
