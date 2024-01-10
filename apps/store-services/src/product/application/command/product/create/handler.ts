import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CloudinaryService } from '@store-monorepo/service/cloudinary';
import { UtilityImplement } from '@store-monorepo/utility';
import moment from 'moment';
import { CreateProduct } from '.';
import { ProductFactory } from '../../../../infrastructure/factory/product';
import { ProductRepositoryImplement } from '../../../../infrastructure/repository';

@CommandHandler(CreateProduct)
export class CreateProductHandler
  implements ICommandHandler<CreateProduct, void>
{
  constructor(
    private readonly util: UtilityImplement,
    private readonly cloudinaryService: CloudinaryService
  ) {}
  @Inject()
  private readonly factory: ProductFactory;
  @Inject()
  private readonly product: ProductRepositoryImplement;

  async execute(command: CreateProduct): Promise<void> {
    const created = moment().toDate();
    const id = this.util.generateId();
    const { main, files, ...data } = command.data;
    const upload = [];
    let thumbnailLink: any;

    for (const image of files) {
      const uploaded = await this.cloudinaryService.uploadFile(image);

      if (image.originalname === main) {
        thumbnailLink = {
          id: this.util.generateId(),
          name: image.originalname,
          url: uploaded.url,
          isMain: true,
        };

        upload.push({
          id: this.util.generateId(),
          name: image.originalname,
          url: uploaded.url,
          isMain: true,
        });
      } else {
        upload.push({
          id: this.util.generateId(),
          name: image.originalname,
          url: uploaded.url,
          isMain: false,
        });
      }
    }

    const model = await this.factory.createProductModel({
      ...data,
      thumbnailLink,
      images: upload,
      id,
      created,
      updated: [],
    });

    await this.product.save(model);
  }
}
