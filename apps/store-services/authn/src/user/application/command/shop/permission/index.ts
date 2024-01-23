import { UserInterface } from '@store-monorepo/utility';
import { BaseCommand } from '../../base';

export class ShopPermission extends BaseCommand {
  data: {
    user: UserInterface;
    id: string | null;
  };

  constructor(data: ShopPermission) {
    super(data);
  }
}
