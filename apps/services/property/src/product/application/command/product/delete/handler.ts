import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CloudinaryService } from '@store-monorepo/service/cloudinary';
import { DeleteProduct } from '.';
import { ProductRepositoryImplement } from '../../../../infrastructure/repository';

@CommandHandler(DeleteProduct)
export class DeleteProductHandler
  implements ICommandHandler<DeleteProduct, void>
{
  constructor(private readonly cloudinaryService: CloudinaryService) {}
  @Inject()
  private readonly product: ProductRepositoryImplement;

  async execute(command: DeleteProduct): Promise<void> {
    const ids = command.data.ids;
    const products = await this.product.getByIds(ids);
    const promise = [this.product.remove(ids)];
    for (const product of products) {
      for (const image of product.images) {
        const arr = image.url.split('/');
        const public_id = arr[arr.length - 1].split('.')[0];
        promise.push(this.cloudinaryService.deleteFile(public_id));
      }
    }
    await Promise.all(promise);
  }
}
