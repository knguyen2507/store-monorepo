import { BaseQuery } from '../../base';

export class GetTotalProduct extends BaseQuery {
  data: {
    shopIds: string[];
  };

  constructor(data: GetTotalProduct) {
    super(data);
  }
}
