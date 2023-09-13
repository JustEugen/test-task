import { AccountDocument } from '@entities/accounts/account.document';
import { AccountRepository } from '@entities/accounts/account.repository';
import { AuthPasswordService } from '@api/auth-api/auth-password.service';
import { AuthTokenService } from '@api/auth-api/auth-token.service';
import { AccessTokenPayload } from '@api/auth-api/types/access-token-payload.type';
import { serviceErrorCreator } from '@utils/error/service-error-creator';

export class AuthService {
  static login = async (data: Pick<AccountDocument, 'name' | 'password'>) => {
    const account = await AccountRepository.collection.findOne({ name: data.name });

    if (!account) {
      throw AuthService.error(AuthService.codes.CredentialsAreIncorrect);
    }

    const isPasswordEqual = await AuthPasswordService.compare({ plain: data.password, hash: account.password });

    if (!isPasswordEqual) {
      throw AuthService.error(AuthService.codes.CredentialsAreIncorrect);
    }

    const token = AuthTokenService.create<AccessTokenPayload>({ id: account._id.toString() });

    return token;
  };

  static register = async (data: Pick<AccountDocument, 'name' | 'password'>): Promise<void> => {
    const existedAccount = await AccountRepository.collection.findOne({ name: data.name });

    if (existedAccount) {
      throw AuthService.error(AuthService.codes.AccountAlreadyExist);
    }

    const generatedPassword = await AuthPasswordService.create(data.password);

    await AccountRepository.createOne({
      name: data.name,
      password: generatedPassword,
    });
  };

  static codes = {
    AccountAlreadyExist: 'AccountAlreadyExist',
    CredentialsAreIncorrect: 'CredentialsAreIncorrect',
  };

  static error = serviceErrorCreator(AuthService.codes);
}
