export class UserModel {
  id: string | null | undefined;
  name: string | null | undefined;
  phone: string | null | undefined;
}

export class LoginModel {
  username: string | undefined;
  password: string | undefined;
}

export class UserLoginModel {
  user: UserModel | null | undefined;
  accessToken: string | null | undefined;
}
