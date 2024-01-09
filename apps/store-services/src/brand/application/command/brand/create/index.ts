import { BaseCommand } from '../../base';

export class CreateBrand extends BaseCommand {
  data: {
    readonly name: string;
    readonly thumbnailLink: Express.Multer.File;
    readonly brandCode: string;
  };

  constructor(data: CreateBrand) {
    super(data);
  }
}
