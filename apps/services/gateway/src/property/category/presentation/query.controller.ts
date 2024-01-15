import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@store-monorepo/service/guard';
import {
  FindCategoryByCodeRequestDTO,
  FindCategoryByIdRequestDTO,
  RMQ,
  RmqMessage,
  UtilityImplement,
  pathPrefixCategory,
  pathPrefixQueryCategory,
} from '@store-monorepo/utility';

@ApiTags(pathPrefixCategory.swagger)
@Controller(pathPrefixCategory.controller)
export class CategoryQueryController {
  constructor(
    private readonly util: UtilityImplement,
    readonly amqpService: AmqpConnection
  ) {}

  @Get(pathPrefixQueryCategory.findCategories)
  async FindCategories(): Promise<any> {
    const payload: RmqMessage = {
      messageId: this.util.generateId(),
      data: null,
    };
    return await this.amqpService.request<any>({
      exchange: RMQ.EXCHANGE,
      routingKey: RMQ.RK_PROPERTY_QRY_FIND_CATEGORY,
      payload,
      timeout: 10000,
    });
  }

  @Get(pathPrefixQueryCategory.findCategoryById)
  async FindCategoryById(
    @Query() query: FindCategoryByIdRequestDTO
  ): Promise<any> {
    const payload: RmqMessage = {
      messageId: this.util.generateId(),
      data: query,
    };
    return await this.amqpService.request<any>({
      exchange: RMQ.EXCHANGE,
      routingKey: RMQ.RK_PROPERTY_QRY_FIND_DETAIL_CATEGORY,
      payload,
      timeout: 10000,
    });
  }

  @Get(pathPrefixQueryCategory.findCategoryByCode)
  async FindCategoryByCode(
    @Query() query: FindCategoryByCodeRequestDTO
  ): Promise<any> {
    const payload: RmqMessage = {
      messageId: this.util.generateId(),
      data: query,
    };
    return await this.amqpService.request<any>({
      exchange: RMQ.EXCHANGE,
      routingKey: RMQ.RK_PROPERTY_QRY_FIND_CATEGORY_BYCODE,
      payload,
      timeout: 10000,
    });
  }

  @Get(pathPrefixQueryCategory.getTotalCategory)
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  async GetTotalCategory(): Promise<any> {
    const payload: RmqMessage = {
      messageId: this.util.generateId(),
      data: null,
    };
    return await this.amqpService.request<any>({
      exchange: RMQ.EXCHANGE,
      routingKey: RMQ.RK_PROPERTY_QRY_GET_TOTAL_CATEGORY,
      payload,
      timeout: 10000,
    });
  }
}
