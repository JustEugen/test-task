import bcrypt from 'bcrypt';

type Compare = {
  plain: string;
  hash: string;
};

export class AuthPasswordService {
  static create = async (plain: string): Promise<string> => {
    const hash = await bcrypt.hash(plain, 10);

    return hash;
  };

  static compare = async ({ plain, hash }: Compare): Promise<boolean> => {
    const isPasswordEqual = await bcrypt.compare(plain, hash);

    return isPasswordEqual;
  };
}
