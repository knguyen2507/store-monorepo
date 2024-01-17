import { BaseCommand } from '../../base';

export class CreateShop extends BaseCommand {
  data: {
    readonly name: string;
    readonly address: string;
  };

  constructor(data: CreateShop) {
    super(data);
  }
}
