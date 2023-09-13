import express from 'express';
import { dtoValidation } from '@utils/request/dto-validation';
import { CreateTaskSchemaDto, createTaskSchemaDto } from './dtos/create.task.schema-dto';
import { isRequestAuthorized } from '@utils/express/is-request-authorized';
import { errorResponse } from '@utils/response/error-response';
import { TaskApiService } from '@api/task-api/task-api.service';
import { getManyStandardResponse } from '@utils/response/get-many-standard-response';
import { ObjectId } from 'mongodb';
import { getSingleStandardResponse } from '@utils/response/get-single-standard-repose';
import { isServiceError } from '@utils/error/is-service-error';
import { updateTaskSchemaDto } from './dtos/update.task.schema-dto';

const router = express.Router();

router.post('/api/v1/tasks', dtoValidation(createTaskSchemaDto), async (req, res) => {
  if (!isRequestAuthorized(req)) {
    return res.status(401).send();
  }

  const dto = req.body as CreateTaskSchemaDto;

  try {
    const task = await TaskApiService.create({
      ...dto,
      authorId: req.authorizedUserId,
    });

    res.status(201).send(getSingleStandardResponse(task));
  } catch (e) {
    res.status(500).send(errorResponse(e));
  }
});

router.put('/api/v1/tasks/:taskId', dtoValidation(updateTaskSchemaDto), async (req, res) => {
  if (!isRequestAuthorized(req)) {
    return res.status(401).send();
  }

  const taskId = req.params.taskId;

  const dto = req.body as CreateTaskSchemaDto;

  try {
    const task = await TaskApiService.updateOneById(req.authorizedUserId, new ObjectId(taskId), dto);

    res.status(201).send(getSingleStandardResponse(task));
  } catch (e) {
    res.status(500).send(errorResponse(e));
  }
});

router.get('/api/v1/tasks', async (req, res) => {
  if (!isRequestAuthorized(req)) {
    return res.status(401).send();
  }

  try {
    const tasks = await TaskApiService.list(req.authorizedUserId);

    res.status(200).send(getManyStandardResponse(tasks));
  } catch (e) {
    res.status(500).send(errorResponse(e));
  }
});

router.get('/api/v1/tasks/:taskId', async (req, res) => {
  if (!isRequestAuthorized(req)) {
    return res.status(401).send();
  }

  const taskId = req.params.taskId;

  try {
    const task = await TaskApiService.getOneById(req.authorizedUserId, new ObjectId(taskId));

    res.status(200).send(getSingleStandardResponse(task));
  } catch (e) {
    if (isServiceError(e)) {
      if (e.code === TaskApiService.codes.TaskNotFound) {
        res.status(404).send(errorResponse(e));
      }
    }

    res.status(500).send(errorResponse(e));
  }
});

router.delete('/api/v1/tasks/:taskId', async (req, res) => {
  if (!isRequestAuthorized(req)) {
    return res.status(401).send();
  }

  const taskId = req.params.taskId;

  try {
    await TaskApiService.removeOneById(req.authorizedUserId, new ObjectId(taskId));

    res.status(200).send();
  } catch (e) {
    if (isServiceError(e)) {
      if (e.code === TaskApiService.codes.TaskNotFound) {
        res.status(404).send(errorResponse(e));
      }
    }

    res.status(500).send(errorResponse(e));
  }
});

export const taskController = router;
