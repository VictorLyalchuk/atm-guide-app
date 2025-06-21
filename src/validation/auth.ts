import * as Yup from 'yup';

export const loginValidationSchema = Yup.object({
  email: Yup.string().required('Введіть логін'),
  password: Yup.string().required('Введіть пароль'),
});

export type LoginFormSchema = Yup.InferType<typeof loginValidationSchema>;
