import { Nack, RabbitRPC } from '@golevelup/nestjs-rabbitmq';
import { Controller, UseGuards } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@store-monorepo/service/guard';
import { RMQ, RmqMessage, environment } from '@store-monorepo/utility';
import { FindCategoryById } from '../application/query/category/detail';
import { FindCategory } from '../application/query/category/find';
import { FindCategoryByCode } from '../application/query/category/find-by-code';
import { GetTotalCategory } from '../application/query/category/get-total';

@Controller('category')
export class CategoryQueryController {
  constructor(readonly queryBus: QueryBus) {}

  @RabbitRPC({
    exchange: RMQ.EXCHANGE,
    routingKey: RMQ.RK_PROPERTY_QRY_FIND_CATEGORY,
    queue: `${RMQ.EXCHANGE}-${RMQ.RK_PROPERTY_QRY_FIND_CATEGORY}-${environment.APPNAME}`,
  })
  async FindCategories(msg: RmqMessage) {
    try {
      const query = new FindCategory(msg);
      return await this.queryBus.execute(query);
    } catch (error) {
      console.error(error);
      return new Nack();
    }
  }

  @RabbitRPC({
    exchange: RMQ.EXCHANGE,
    routingKey: RMQ.RK_PROPERTY_QRY_FIND_DETAIL_CATEGORY,
    queue: `${RMQ.EXCHANGE}-${RMQ.RK_PROPERTY_QRY_FIND_DETAIL_CATEGORY}-${environment.APPNAME}`,
  })
  async FindCategoryById(msg: RmqMessage) {
    try {
      const query = new FindCategoryById(msg);
      return await this.queryBus.execute(query);
    } catch (error) {
      console.error(error);
      return new Nack();
    }
  }

  @RabbitRPC({
    exchange: RMQ.EXCHANGE,
    routingKey: RMQ.RK_PROPERTY_QRY_FIND_CATEGORY_BYCODE,
    queue: `${RMQ.EXCHANGE}-${RMQ.RK_PROPERTY_QRY_FIND_CATEGORY_BYCODE}-${environment.APPNAME}`,
  })
  async FindCategoryByCode(msg: RmqMessage) {
    try {
      const query = new FindCategoryByCode(msg);
      return await this.queryBus.execute(query);
    } catch (error) {
      console.error(error);
      return new Nack();
    }
  }

  @RabbitRPC({
    exchange: RMQ.EXCHANGE,
    routingKey: RMQ.RK_PROPERTY_QRY_GET_TOTAL_CATEGORY,
    queue: `${RMQ.EXCHANGE}-${RMQ.RK_PROPERTY_QRY_GET_TOTAL_CATEGORY}-${environment.APPNAME}`,
  })
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  async GetTotalCategory(msg: RmqMessage) {
    try {
      const query = new GetTotalCategory(msg);
      return await this.queryBus.execute(query);
    } catch (error) {
      console.error(error);
      return new Nack();
    }
  }
}
