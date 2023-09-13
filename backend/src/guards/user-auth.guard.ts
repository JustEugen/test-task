import { NextFunction, Request, Response } from 'express';
import { ObjectId } from 'mongodb';
import { errorResponse } from '@utils/response/error-response';
import { AuthTokenService } from '@api/auth-api/auth-token.service';
import { AccountRepository } from '@entities/accounts/account.repository';
import { AccessTokenPayload } from '@api/auth-api/types/access-token-payload.type';
import { AuthorizedUserReq } from '@utils/express/authorized-user-req.type';

export const userAuthGuard = () => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const authHeader = req.headers.authorization;

      if (!authHeader?.length) {
        res.sendStatus(401);
        return;
      }

      const token = authHeader.slice('Bearer '.length);

      const decoded = await AuthTokenService.verify<AccessTokenPayload>(token);

      const account = await AccountRepository.collection.findOne({ _id: new ObjectId(decoded.id) });

      if (!account) {
        res.sendStatus(401);
        return;
      }

      (req as AuthorizedUserReq).authorizedUserId = account._id;

      next();
    } catch (err) {
      return res.status(401).send(errorResponse(err));
    }
  };
};
