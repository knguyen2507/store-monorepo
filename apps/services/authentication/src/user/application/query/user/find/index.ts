import { BaseQuery } from '../../base';

export class FindUser extends BaseQuery {
  data: {
    offset: number;
    limit: number;
  };

  constructor(data: FindUser) {
    super(data);
  }
}
