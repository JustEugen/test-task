import { db } from '@core/database/connect';
import { ACCOUNT_COLLECTION, AccountDocument } from '@entities/accounts/account.document';
import { ObjectId } from 'mongodb';

export class AccountRepository {
  static collection = db.collection<AccountDocument>(ACCOUNT_COLLECTION);

  static createOne = (data: Pick<AccountDocument, 'name' | 'password'>) => {
    return AccountRepository.collection.insertOne({
      _id: new ObjectId(),
      name: data.name,
      password: data.password,
      created_at: Date.now(),
      updated_at: Date.now(),
    });
  };
}
