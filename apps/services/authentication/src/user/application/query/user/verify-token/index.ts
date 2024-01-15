import { UserInterface } from '@store-monorepo/utility';
import { BaseQuery } from '../../base';

export class VerifyAccessToken extends BaseQuery {
  data: {
    accessToken: string;
    user: UserInterface;
  };

  constructor(data: VerifyAccessToken) {
    super(data);
  }
}
