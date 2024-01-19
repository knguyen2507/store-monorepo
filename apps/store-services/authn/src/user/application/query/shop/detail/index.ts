import { BaseQuery } from '../../base';

export class FindShopById extends BaseQuery {
  data: {
    readonly id: string;
  };

  constructor(data: FindShopById) {
    super(data);
  }
}
