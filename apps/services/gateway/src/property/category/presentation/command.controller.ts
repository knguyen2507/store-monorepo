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
  CreateCategoryResquestDTO,
  FileUpload,
  RMQ,
  RmqMessage,
  UtilityImplement,
  pathPrefixCategory,
  pathPrefixCommandCategory,
} from '@store-monorepo/utility';

@ApiTags(pathPrefixCategory.swagger)
@Controller(pathPrefixCategory.controller)
export class CategoryCommandController {
  constructor(
    private readonly util: UtilityImplement,
    private readonly amqpService: AmqpConnection
  ) {}

  @Post(pathPrefixCommandCategory.createCategory)
  @UseInterceptors(FileInterceptor('image'))
  @ApiConsumes('multipart/form-data')
  async CreateCategory(
    @UploadedFile() image: FileUpload,
    @Body() body: CreateCategoryResquestDTO
  ): Promise<any> {
    const payload: RmqMessage = {
      messageId: this.util.generateId(),
      data: {
        name: body.name,
        thumbnailLink: image,
        categoryCode: body.categoryCode,
      },
    };
    return await this.amqpService.request<any>({
      exchange: RMQ.EXCHANGE,
      routingKey: RMQ.RK_PROPERTY_CMD_CATEGORY_CREATE,
      payload,
      timeout: 10000,
    });
  }
}
