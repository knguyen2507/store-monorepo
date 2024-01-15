import { FileUpload } from '@store-monorepo/utility';
import { BaseCommand } from '../../base';

export class CreateProduct extends BaseCommand {
  data: {
    readonly productCode: string;
    readonly name: string;
    readonly qty: number;
    readonly categoryId: string;
    readonly brandId: string;
    readonly price: number;
    readonly description: string;
    readonly main: string;
    readonly files: Array<FileUpload>;
  };

  constructor(data: CreateProduct) {
    super(data);
  }
}
