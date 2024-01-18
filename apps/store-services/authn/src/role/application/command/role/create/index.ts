import { BaseCommand } from '../../base';

export class CreateRole extends BaseCommand {
  data: {
    readonly name: string;
    readonly permissions: string[];
  };

  constructor(data: CreateRole) {
    super(data);
  }
}
