import { BaseQuery } from '../../base';

export class FindShop extends BaseQuery {
  data: {
    ids: string[];
  };

  constructor(data: FindShop) {
    super(data);
  }
}
