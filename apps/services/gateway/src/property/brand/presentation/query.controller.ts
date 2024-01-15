import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@store-monorepo/service/guard';
import {
  FindBrandByCodeRequestDTO,
  FindBrandByIdRequestDTO,
  RMQ,
  RmqMessage,
  UtilityImplement,
  pathPrefixBrand,
  pathPrefixQueryBrand,
} from '@store-monorepo/utility';

@ApiTags(pathPrefixBrand.swagger)
@Controller(pathPrefixBrand.controller)
export class BrandQueryController {
  constructor(
    private readonly util: UtilityImplement,
    readonly amqpService: AmqpConnection
  ) {}

  @Get(pathPrefixQueryBrand.findBrands)
  async FindBrands(): Promise<any> {
    const payload: RmqMessage = {
      messageId: this.util.generateId(),
      data: null,
    };
    return await this.amqpService.request<any>({
      exchange: RMQ.EXCHANGE,
      routingKey: RMQ.RK_PROPERTY_QRY_FIND_BRAND,
      payload,
      timeout: 10000,
    });
  }

  @Get(pathPrefixQueryBrand.findBrandById)
  async FindBrandById(@Query() query: FindBrandByIdRequestDTO): Promise<any> {
    const payload: RmqMessage = {
      messageId: this.util.generateId(),
      data: query,
    };
    return await this.amqpService.request<any>({
      exchange: RMQ.EXCHANGE,
      routingKey: RMQ.RK_PROPERTY_QRY_FIND_DETAIL_BRAND,
      payload,
      timeout: 10000,
    });
  }

  @Get(pathPrefixQueryBrand.findBrandByCode)
  async FindBrandByCode(
    @Query() query: FindBrandByCodeRequestDTO
  ): Promise<any> {
    const payload: RmqMessage = {
      messageId: this.util.generateId(),
      data: query,
    };
    return await this.amqpService.request<any>({
      exchange: RMQ.EXCHANGE,
      routingKey: RMQ.RK_PROPERTY_QRY_FIND_BRAND_BYCODE,
      payload,
      timeout: 10000,
    });
  }

  @Get(pathPrefixQueryBrand.getTotalBrand)
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  async GetTotalBrand(): Promise<any> {
    const payload: RmqMessage = {
      messageId: this.util.generateId(),
      data: null,
    };
    return await this.amqpService.request<any>({
      exchange: RMQ.EXCHANGE,
      routingKey: RMQ.RK_PROPERTY_QRY_GET_TOTAL_BRAND,
      payload,
      timeout: 10000,
    });
  }
}
