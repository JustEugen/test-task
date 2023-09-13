import * as yup from 'yup';

export type LoginAuthSchemaDto = {
  name: string;

  password: string;
};

export const loginAuthSchemaDto = yup.object().shape({
  name: yup.string().required(),
  password: yup.string().required(),
});
