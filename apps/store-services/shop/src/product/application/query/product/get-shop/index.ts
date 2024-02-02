import { BaseQuery } from '../../base';

export class GetShopByProduct extends BaseQuery {
  data: {
    readonly id: string;
  };

  constructor(data: GetShopByProduct) {
    super(data);
  }
}
