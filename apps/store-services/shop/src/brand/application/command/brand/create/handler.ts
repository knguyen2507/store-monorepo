import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { Inject, InternalServerErrorException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Shop } from '@prisma/client/shop';
import { CloudinaryService } from '@store-monorepo/service/cloudinary';
import { RMQ, RmqMessage, UtilityImplement } from '@store-monorepo/utility';
import jimp from 'jimp';
import moment from 'moment';
import { CreateBrand } from '.';
import { BrandFactory } from '../../../../infrastructure/factory/brand';
import { BrandRepositoryImplement } from '../../../../infrastructure/repository';

@CommandHandler(CreateBrand)
export class CreateBrandHandler implements ICommandHandler<CreateBrand, void> {
  constructor(
    private readonly util: UtilityImplement,
    private readonly cloudinaryService: CloudinaryService,
    private readonly amqpService: AmqpConnection
  ) {}
  @Inject()
  private readonly factory: BrandFactory;
  @Inject()
  private readonly Brand: BrandRepositoryImplement;

  async execute(command: CreateBrand): Promise<void> {
    const id = this.util.generateId();
    const { name, thumbnailLink, brandCode, user, shop } = command.data;
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

    const model = await this.factory.createBrandModel({
      name,
      thumbnailLink: uploaded.url,
      brandCode,
      id,
      created,
      updated: [],
      shop: shopInfor,
    });

    await this.Brand.save(model);
  }
}
