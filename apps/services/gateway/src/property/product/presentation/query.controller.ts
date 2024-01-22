import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthnGuard } from '@store-monorepo/service/guard';
import {
  FindProductByAdminRequestDTO,
  FindProductByBrandRequestDTO,
  FindProductByCategoryRequestDTO,
  FindProductByCodeRequestDTO,
  FindProductByIdsRequestDTO,
  FindProductRequestDTO,
  FindProductSimilarRequestDTO,
  RMQ,
  RmqMessage,
  UtilityImplement,
  pathPrefixProduct,
  pathPrefixQueryProduct,
} from '@store-monorepo/utility';

@ApiTags(pathPrefixProduct.swagger)
@Controller(pathPrefixProduct.controller)
export class ProductQueryController {
  constructor(
    private readonly util: UtilityImplement,
    readonly amqpService: AmqpConnection
  ) {}

  @Get(pathPrefixQueryProduct.findProductListByAdmin)
  async FindProductListByAdmin(
    @Query() query: FindProductByAdminRequestDTO
  ): Promise<any> {
    const payload: RmqMessage = {
      messageId: this.util.generateId(),
      data: query,
    };
    return await this.amqpService.request<any>({
      exchange: RMQ.EXCHANGE,
      routingKey: RMQ.RK_PROPERTY_QRY_FIND_PRODUCT_BYADMIN,
      payload,
      timeout: 10000,
    });
  }

  @Get(pathPrefixQueryProduct.findProducts)
  async FindProducts(@Query() query: FindProductRequestDTO): Promise<any> {
    const payload: RmqMessage = {
      messageId: this.util.generateId(),
      data: query,
    };
    return await this.amqpService.request<any>({
      exchange: RMQ.EXCHANGE,
      routingKey: RMQ.RK_PROPERTY_QRY_FIND_PRODUCT,
      payload,
      timeout: 10000,
    });
  }

  @Get(pathPrefixQueryProduct.findProductByCode)
  async FindProductByCode(
    @Query() query: FindProductByCodeRequestDTO
  ): Promise<any> {
    const payload: RmqMessage = {
      messageId: this.util.generateId(),
      data: query,
    };
    return await this.amqpService.request<any>({
      exchange: RMQ.EXCHANGE,
      routingKey: RMQ.RK_PROPERTY_QRY_FIND_PRODUCT_BYCODE,
      payload,
      timeout: 10000,
    });
  }

  @Get(pathPrefixQueryProduct.findProductByBrand)
  async FindProductByBrand(
    @Query() query: FindProductByBrandRequestDTO
  ): Promise<any> {
    const payload: RmqMessage = {
      messageId: this.util.generateId(),
      data: query,
    };
    return await this.amqpService.request<any>({
      exchange: RMQ.EXCHANGE,
      routingKey: RMQ.RK_PROPERTY_QRY_FIND_PRODUCT_BYBRAND,
      payload,
      timeout: 10000,
    });
  }

  @Get(pathPrefixQueryProduct.findProductByCategory)
  async FindProductByCategory(
    @Query() query: FindProductByCategoryRequestDTO
  ): Promise<any> {
    const payload: RmqMessage = {
      messageId: this.util.generateId(),
      data: query,
    };
    return await this.amqpService.request<any>({
      exchange: RMQ.EXCHANGE,
      routingKey: RMQ.RK_PROPERTY_QRY_FIND_PRODUCT_BYCATEGORY,
      payload,
      timeout: 10000,
    });
  }

  @Get(pathPrefixQueryProduct.findProductByIds)
  async FindProductByIds(
    @Query() query: FindProductByIdsRequestDTO
  ): Promise<any> {
    const payload: RmqMessage = {
      messageId: this.util.generateId(),
      data: query,
    };
    return await this.amqpService.request<any>({
      exchange: RMQ.EXCHANGE,
      routingKey: RMQ.RK_PROPERTY_QRY_FIND_PRODUCT_BYIDS,
      payload,
      timeout: 10000,
    });
  }

  @Get(pathPrefixQueryProduct.findProductSimilar)
  async FindProductSimilar(
    @Query() query: FindProductSimilarRequestDTO
  ): Promise<any> {
    const payload: RmqMessage = {
      messageId: this.util.generateId(),
      data: query,
    };
    return await this.amqpService.request<any>({
      exchange: RMQ.EXCHANGE,
      routingKey: RMQ.RK_PROPERTY_QRY_FIND_PRODUCT_SIMILAR,
      payload,
      timeout: 10000,
    });
  }

  @Get(pathPrefixQueryProduct.getTotalProduct)
  @UseGuards(AuthnGuard)
  @ApiBearerAuth()
  async GetTotalProduct(): Promise<any> {
    const payload: RmqMessage = {
      messageId: this.util.generateId(),
      data: null,
    };
    return await this.amqpService.request<any>({
      exchange: RMQ.EXCHANGE,
      routingKey: RMQ.RK_PROPERTY_QRY_GET_TOTAL_PRODUCT,
      payload,
      timeout: 10000,
    });
  }
}
