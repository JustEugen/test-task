import { ServiceError } from '@utils/error/service.error';

export const serviceErrorCreator = <TCodes extends Record<string, string>>(codes: TCodes) => {
  return (code: TCodes[keyof TCodes]) => {
    return new ServiceError({ code: codes[code] });
  };
};
