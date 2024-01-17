import { FindUserById } from '../../../application/query/user/detail';
import { FindUserByIdResult } from '../../../application/query/user/detail/result';
import { FindUser } from '../../../application/query/user/find';
import { FindUserResult } from '../../../application/query/user/find/result';
import { GetTotalUserResult } from '../../../application/query/user/get-total/result';

export interface UserQuery {
  find: (query: FindUser) => Promise<FindUserResult>;
  findById: (query: FindUserById) => Promise<FindUserByIdResult>;
  getTotal: () => Promise<GetTotalUserResult>;
}
