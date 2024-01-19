import { BaseQuery } from '../../base';

export class FindRoleById extends BaseQuery {
  data: {
    readonly id: string;
  };

  constructor(data: FindRoleById) {
    super(data);
  }
}
