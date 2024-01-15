import { FileUpload } from '@store-monorepo/utility';
import { BaseCommand } from '../../base';

export class CreateBrand extends BaseCommand {
  data: {
    readonly name: string;
    readonly thumbnailLink: FileUpload;
    readonly brandCode: string;
  };

  constructor(data: CreateBrand) {
    super(data);
  }
}
