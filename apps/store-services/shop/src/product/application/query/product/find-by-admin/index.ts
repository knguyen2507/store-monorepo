import { BaseQuery } from '../../base';

export class FindProductByAdmin extends BaseQuery {
  data: {
    shopIds: string[];
    offset: number;
    limit: number;
  };

  constructor(data: FindProductByAdmin) {
    super(data);
  }
}
