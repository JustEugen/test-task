import * as yup from 'yup';

export type RegisterAuthSchemaDto = {
  name: string;

  password: string;
};

export const registerAuthSchemaDto = yup.object().shape({
  name: yup.string().required(),
  password: yup.string().required(),
});
