import { TypicalDocument } from '@utils/db/typical.document';

export const ACCOUNT_COLLECTION = 'accounts';

export interface AccountDocument extends TypicalDocument {
  name: string;

  password: string;
}
