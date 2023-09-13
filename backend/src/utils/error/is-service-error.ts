import { ServiceError } from '@utils/error/service.error';

export const isServiceError = <T extends string>(error: unknown): error is ServiceError<T> => {
  if (error instanceof Error && Object.keys(error).includes('isServiceError')) {
    return true;
  }

  return false;
};
