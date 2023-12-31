import { Request } from 'express';
import { ObjectId } from 'mongodb';

export interface AuthorizedUserReq extends Request {
  authorizedUserId: ObjectId;
}
