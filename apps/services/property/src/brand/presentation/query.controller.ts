import { Nack, RabbitRPC } from '@golevelup/nestjs-rabbitmq';
import { Controller, Get } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import {
  RMQ,
  RmqMessage,
  environment,
  pathPrefixQueryBrand,
} from '@store-monorepo/utility';
import { FindBrandById } from '../application/query/brand/detail';
import { FindBrand } from '../application/query/brand/find';
import { FindBrandByCode } from '../application/query/brand/find-by-code';
import { GetTotalBrand } from '../application/query/brand/get-total';

@Controller('brand')
export class BrandQueryController {
  constructor(readonly queryBus: QueryBus) {}

  @RabbitRPC({
    exchange: RMQ.EXCHANGE,
    routingKey: RMQ.RK_PROPERTY_QRY_FIND_BRAND,
    queue: `${RMQ.EXCHANGE}-${RMQ.RK_PROPERTY_QRY_FIND_BRAND}-${environment.APPNAME}`,
  })
  async FindBrands(msg: RmqMessage) {
    try {
      const query = new FindBrand(msg);
      return await this.queryBus.execute(query);
    } catch (error) {
      console.error(error);
      return new Nack();
    }
  }

  @RabbitRPC({
    exchange: RMQ.EXCHANGE,
    routingKey: RMQ.RK_PROPERTY_QRY_FIND_DETAIL_BRAND,
    queue: `${RMQ.EXCHANGE}-${RMQ.RK_PROPERTY_QRY_FIND_DETAIL_BRAND}-${environment.APPNAME}`,
  })
  @Get(pathPrefixQueryBrand.findBrandById)
  async FindBrandById(msg: RmqMessage) {
    try {
      const query = new FindBrandById(msg);
      return await this.queryBus.execute(query);
    } catch (error) {
      console.error(error);
      return new Nack();
    }
  }

  @RabbitRPC({
    exchange: RMQ.EXCHANGE,
    routingKey: RMQ.RK_PROPERTY_QRY_FIND_BRAND_BYCODE,
    queue: `${RMQ.EXCHANGE}-${RMQ.RK_PROPERTY_QRY_FIND_BRAND_BYCODE}-${environment.APPNAME}`,
  })
  @Get(pathPrefixQueryBrand.findBrandByCode)
  async FindBrandByCode(msg: RmqMessage) {
    try {
      const query = new FindBrandByCode(msg);
      return await this.queryBus.execute(query);
    } catch (error) {
      console.error(error);
      return new Nack();
    }
  }

  @RabbitRPC({
    exchange: RMQ.EXCHANGE,
    routingKey: RMQ.RK_PROPERTY_QRY_GET_TOTAL_BRAND,
    queue: `${RMQ.EXCHANGE}-${RMQ.RK_PROPERTY_QRY_GET_TOTAL_BRAND}-${environment.APPNAME}`,
  })
  async GetTotalBrand(msg: RmqMessage) {
    try {
      const query = new GetTotalBrand(msg);
      return await this.queryBus.execute(query);
    } catch (error) {
      console.error(error);
      return new Nack();
    }
  }
}
