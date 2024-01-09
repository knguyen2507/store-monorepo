import { BaseCommand } from '../../base';

export class CreateCategory extends BaseCommand {
  data: {
    readonly name: string;
    readonly thumbnailLink: Express.Multer.File;
    readonly categoryCode: string;
  };

  constructor(data: CreateCategory) {
    super(data);
  }
}
