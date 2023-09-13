import jwt from 'jsonwebtoken';
import { BACKEND_JWT_SECRET } from '@env';

export class AuthTokenService {
  static create = <TPayload extends object>(payload: TPayload) => {
    return jwt.sign(payload, BACKEND_JWT_SECRET as string);
  };

  static verify = async <TPayload extends object>(token: string): Promise<TPayload> => {
    const decoded = (await jwt.verify(token, BACKEND_JWT_SECRET as string)) as TPayload;

    return decoded;
  };
}
