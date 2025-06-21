import * as Yup from 'yup';

export const loginValidationSchema = Yup.object({
  login: Yup.string().required('Введіть логін'),
  password: Yup.string().required('Введіть пароль'),
});

export type LoginFormSchema = Yup.InferType<typeof loginValidationSchema>;
