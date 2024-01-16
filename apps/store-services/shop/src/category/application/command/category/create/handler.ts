import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { Inject, InternalServerErrorException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Shop } from '@prisma/client/shop';
import { CloudinaryService } from '@store-monorepo/service/cloudinary';
import { RMQ, RmqMessage, UtilityImplement } from '@store-monorepo/utility';
import jimp from 'jimp';
import moment from 'moment';
import { CreateCategory } from '.';
import { CategoryFactory } from '../../../../infrastructure/factory/category';
import { CategoryRepositoryImplement } from '../../../../infrastructure/repository';

@CommandHandler(CreateCategory)
export class CreateCategoryHandler
  implements ICommandHandler<CreateCategory, void>
{
  constructor(
    private readonly util: UtilityImplement,
    private readonly cloudinaryService: CloudinaryService,
    private readonly amqpService: AmqpConnection
  ) {}
  @Inject()
  private readonly factory: CategoryFactory;
  @Inject()
  private readonly category: CategoryRepositoryImplement;

  async execute(command: CreateCategory): Promise<void> {
    const id = this.util.generateId();
    const { name, thumbnailLink, categoryCode, user, shop } = command.data;
    const created = {
      id: user.id,
      username: user.username,
      at: moment().toDate(),
    };
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

    const file = await jimp.read(thumbnailLink.buffer);
    file.resize(200, 200);
    file.getBuffer(jimp.MIME_PNG, (err, buffer) => {
      thumbnailLink.buffer = buffer;
    });

    const uploaded = await this.cloudinaryService.uploadFile(thumbnailLink);

    const model = await this.factory.createCategoryModel({
      name,
      thumbnailLink: uploaded.url,
      categoryCode,
      id,
      created,
      updated: [],
      shop: shopInfor,
    });

    await this.category.save(model);
  }
}
