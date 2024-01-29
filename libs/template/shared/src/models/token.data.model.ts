export class TokenDataModel {
  user!: {
    id: string;
    username: string;
    name: string;
    phone: string;
    isSuperAdmin: boolean;
  };
  accessToken!: string;
}
