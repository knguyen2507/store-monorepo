import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import {
  Body,
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiConsumes, ApiTags } from '@nestjs/swagger';
import {
  CreateBrandResquestDTO,
  FileUpload,
  RMQ,
  RmqMessage,
  UtilityImplement,
  pathPrefixBrand,
  pathPrefixCommandBrand,
} from '@store-monorepo/utility';

@ApiTags(pathPrefixBrand.swagger)
@Controller(pathPrefixBrand.controller)
export class BrandCommandController {
  constructor(
    private readonly util: UtilityImplement,
    private readonly amqpService: AmqpConnection
  ) {}

  @Post(pathPrefixCommandBrand.createBrand)
  @UseInterceptors(FileInterceptor('image'))
  @ApiConsumes('multipart/form-data')
  async CreateBrand(
    @UploadedFile() image: FileUpload,
    @Body() body: CreateBrandResquestDTO
  ): Promise<any> {
    const payload: RmqMessage = {
      messageId: this.util.generateId(),
      data: {
        name: body.name,
        thumbnailLink: image,
        brandCode: body.brandCode,
      },
    };
    return await this.amqpService.request<any>({
      exchange: RMQ.EXCHANGE,
      routingKey: RMQ.RK_PROPERTY_CMD_BRAND_CREATE,
      payload,
      timeout: 10000,
    });
  }
}
