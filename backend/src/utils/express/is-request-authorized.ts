import { AuthorizedUserReq } from '@utils/express/authorized-user-req.type';

export const isRequestAuthorized = (req: any): req is AuthorizedUserReq => {
  if ((req as unknown as AuthorizedUserReq).authorizedUserId) {
    return true;
  }

  return false;
};
