import { BaseQuery } from '../../base';

export class FindPermissionById extends BaseQuery {
  data: {
    readonly id: string;
  };

  constructor(data: FindPermissionById) {
    super(data);
  }
}
