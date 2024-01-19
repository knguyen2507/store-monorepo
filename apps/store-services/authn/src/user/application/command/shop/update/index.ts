import { BaseCommand } from '../../base';

export class UpdateShop extends BaseCommand {
  data: {
    id: string;
    name: string;
    address: string;
  };

  constructor(data: UpdateShop) {
    super(data);
  }
}
