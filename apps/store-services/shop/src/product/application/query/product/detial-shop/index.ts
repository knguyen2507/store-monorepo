import { BaseQuery } from '../../base';

export class FindShopByProduct extends BaseQuery {
  data: {
    readonly id: string;
    readonly shopId: string;
  };

  constructor(data: FindShopByProduct) {
    super(data);
  }
}
