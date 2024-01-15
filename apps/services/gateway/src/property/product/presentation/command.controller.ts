import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import {
  Body,
  Controller,
  Post,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { ApiConsumes, ApiTags } from '@nestjs/swagger';
import {
  CreateProductResquestDTO,
  DeleteProductResquestDTO,
  FileUpload,
  RMQ,
  RmqMessage,
  UtilityImplement,
  pathPrefixCommandProduct,
  pathPrefixProduct,
} from '@store-monorepo/utility';

@ApiTags(pathPrefixProduct.swagger)
@Controller(pathPrefixProduct.controller)
export class ProductCommandController {
  constructor(
    private readonly util: UtilityImplement,
    private readonly amqpService: AmqpConnection
  ) {}

  @Post(pathPrefixCommandProduct.deleteProduct)
  @UseInterceptors(AnyFilesInterceptor())
  @ApiConsumes('multipart/form-data')
  async CreateProduct(
    @UploadedFiles() images: Array<FileUpload>,
    @Body() body: CreateProductResquestDTO
  ): Promise<any> {
    const payload: RmqMessage = {
      messageId: this.util.generateId(),
      data: {
        productCode: body.productCode,
        name: body.name,
        qty: Number(body.qty),
        categoryId: body.categoryId,
        brandId: body.brandId,
        price: Number(body.price),
        description: body.description,
        files: images,
        main: body.mainImage,
      },
    };
    return await this.amqpService.request<any>({
      exchange: RMQ.EXCHANGE,
      routingKey: RMQ.RK_PROPERTY_CMD_PRODUCT_CREATE,
      payload,
      timeout: 10000,
    });
  }

  @Post(pathPrefixCommandProduct.deleteProduct)
  async DeleteProduct(@Body() body: DeleteProductResquestDTO): Promise<any> {
    const payload: RmqMessage = {
      messageId: this.util.generateId(),
      data: {
        ids: body.ids,
      },
    };
    return await this.amqpService.request<any>({
      exchange: RMQ.EXCHANGE,
      routingKey: RMQ.RK_PROPERTY_CMD_PRODUCT_DELETE,
      payload,
      timeout: 10000,
    });
  }
}
