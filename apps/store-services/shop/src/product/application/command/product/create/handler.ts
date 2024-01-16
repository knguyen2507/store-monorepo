import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { Inject, InternalServerErrorException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Shop } from '@prisma/client/shop';
import { CloudinaryService } from '@store-monorepo/service/cloudinary';
import { RMQ, RmqMessage, UtilityImplement } from '@store-monorepo/utility';
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
    private readonly cloudinaryService: CloudinaryService,
    private readonly amqpService: AmqpConnection
  ) {}
  @Inject()
  private readonly factory: ProductFactory;
  @Inject()
  private readonly product: ProductRepositoryImplement;

  async execute(command: CreateProduct): Promise<void> {
    const id = this.util.generateId();
    const { main, files, user, shop, ...data } = command.data;
    const created = {
      id: user.id,
      username: user.username,
      at: moment().toDate(),
    };
    const upload = [];
    let thumbnailLink: any;
    let shopInfor: Shop[] = [];

    try {
      const payload: RmqMessage = {
        messageId: this.util.generateId(),
        data: {
          ids: shop,
        },
      };
      shopInfor = await this.amqpService.request<any>({
        exchange: RMQ.EXCHANGE,
        routingKey: RMQ.RK_AUHTN_QRY_GET_SHOP_INFORMATION,
        payload,
        timeout: 10000,
      });
    } catch (error) {
      throw new InternalServerErrorException();
    }

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
      shop: shopInfor,
    });

    await this.product.save(model);
  }
}
