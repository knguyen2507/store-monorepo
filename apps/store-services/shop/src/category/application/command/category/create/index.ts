import { FileUpload, UserInterface } from '@store-monorepo/utility';
import { BaseCommand } from '../../base';

export class CreateCategory extends BaseCommand {
  data: {
    readonly name: string;
    readonly thumbnailLink: FileUpload;
    readonly categoryCode: string;
    readonly user: UserInterface;
    readonly shop: string[];
  };

  constructor(data: CreateCategory) {
    super(data);
  }
}
