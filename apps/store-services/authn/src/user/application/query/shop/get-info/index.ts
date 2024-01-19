import { BaseQuery } from '../../base';

export class GetShopInfo extends BaseQuery {
  data: {
    readonly ids: string[];
  };

  constructor(data: GetShopInfo) {
    super(data);
  }
}
