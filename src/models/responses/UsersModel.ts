export interface UsersModel {
  name: string,
  surname: string,
  gsm: string,
  email: string,
  password: string,
  confirmPassword: string;
  roles: ['{USER}'],
  }