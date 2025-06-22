export interface FormDataRegister {
  username: string;
  email: string;
  password: string;
  confirm_password: string;
}

export interface FormDataLogin {
  email: string;
  password: string;
}
