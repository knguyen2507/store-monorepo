import { Nack, RabbitRPC } from '@golevelup/nestjs-rabbitmq';
import { Controller } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { RMQ, RmqMessage, environment } from '@store-monorepo/utility';
import { FindProductByCode } from '../application/query/product/detail';
import { FindProduct } from '../application/query/product/find';
import { FindProductByAdmin } from '../application/query/product/find-by-admin';
import { FindProductByBrand } from '../application/query/product/find-by-brand';
import { FindProductByCategory } from '../application/query/product/find-by-category';
import { FindProductSimilar } from '../application/query/product/find-similar';
import { GetTotalProduct } from '../application/query/product/get-total';

@Controller('product')
export class ProductQueryController {
  constructor(readonly queryBus: QueryBus) {}

  @RabbitRPC({
    exchange: RMQ.EXCHANGE,
    routingKey: RMQ.RK_PROPERTY_QRY_FIND_PRODUCT_BYADMIN,
    queue: `${RMQ.EXCHANGE}-${RMQ.RK_PROPERTY_QRY_FIND_PRODUCT_BYADMIN}-${environment.APPNAME}`,
  })
  async FindProductListByAdmin(msg: RmqMessage) {
    try {
      const query = new FindProductByAdmin(msg);
      return await this.queryBus.execute(query);
    } catch (error) {
      console.error(error);
      return new Nack();
    }
  }

  @RabbitRPC({
    exchange: RMQ.EXCHANGE,
    routingKey: RMQ.RK_PROPERTY_QRY_FIND_PRODUCT,
    queue: `${RMQ.EXCHANGE}-${RMQ.RK_PROPERTY_QRY_FIND_PRODUCT}-${environment.APPNAME}`,
  })
  async FindProducts(msg: RmqMessage) {
    try {
      const query = new FindProduct(msg);
      return await this.queryBus.execute(query);
    } catch (error) {
      console.error(error);
      return new Nack();
    }
  }

  @RabbitRPC({
    exchange: RMQ.EXCHANGE,
    routingKey: RMQ.RK_PROPERTY_QRY_FIND_PRODUCT_BYCODE,
    queue: `${RMQ.EXCHANGE}-${RMQ.RK_PROPERTY_QRY_FIND_PRODUCT_BYCODE}-${environment.APPNAME}`,
  })
  async FindProductByCode(msg: RmqMessage) {
    try {
      const query = new FindProductByCode(msg);
      return await this.queryBus.execute(query);
    } catch (error) {
      console.error(error);
      return new Nack();
    }
  }

  @RabbitRPC({
    exchange: RMQ.EXCHANGE,
    routingKey: RMQ.RK_PROPERTY_QRY_FIND_PRODUCT_BYBRAND,
    queue: `${RMQ.EXCHANGE}-${RMQ.RK_PROPERTY_QRY_FIND_PRODUCT_BYBRAND}-${environment.APPNAME}`,
  })
  async FindProductByBrand(msg: RmqMessage) {
    try {
      const query = new FindProductByBrand(msg);
      return await this.queryBus.execute(query);
    } catch (error) {
      console.error(error);
      return new Nack();
    }
  }

  @RabbitRPC({
    exchange: RMQ.EXCHANGE,
    routingKey: RMQ.RK_PROPERTY_QRY_FIND_PRODUCT_BYCATEGORY,
    queue: `${RMQ.EXCHANGE}-${RMQ.RK_PROPERTY_QRY_FIND_PRODUCT_BYCATEGORY}-${environment.APPNAME}`,
  })
  async FindProductByCategory(msg: RmqMessage) {
    try {
      const query = new FindProductByCategory(msg);
      return await this.queryBus.execute(query);
    } catch (error) {
      console.error(error);
      return new Nack();
    }
  }

  @RabbitRPC({
    exchange: RMQ.EXCHANGE,
    routingKey: RMQ.RK_PROPERTY_QRY_FIND_PRODUCT_BYIDS,
    queue: `${RMQ.EXCHANGE}-${RMQ.RK_PROPERTY_QRY_FIND_PRODUCT_BYIDS}-${environment.APPNAME}`,
  })
  async FindProductByIds(msg: RmqMessage) {
    try {
      const query = new FindProductByCategory(msg);
      return await this.queryBus.execute(query);
    } catch (error) {
      console.error(error);
      return new Nack();
    }
  }

  @RabbitRPC({
    exchange: RMQ.EXCHANGE,
    routingKey: RMQ.RK_PROPERTY_QRY_FIND_PRODUCT_SIMILAR,
    queue: `${RMQ.EXCHANGE}-${RMQ.RK_PROPERTY_QRY_FIND_PRODUCT_SIMILAR}-${environment.APPNAME}`,
  })
  async FindProductSimilar(msg: RmqMessage) {
    try {
      const query = new FindProductSimilar(msg);
      return await this.queryBus.execute(query);
    } catch (error) {
      console.error(error);
      return new Nack();
    }
  }

  @RabbitRPC({
    exchange: RMQ.EXCHANGE,
    routingKey: RMQ.RK_PROPERTY_QRY_GET_TOTAL_PRODUCT,
    queue: `${RMQ.EXCHANGE}-${RMQ.RK_PROPERTY_QRY_GET_TOTAL_PRODUCT}-${environment.APPNAME}`,
  })
  async GetTotalProduct(msg: RmqMessage) {
    try {
      const query = new GetTotalProduct(msg);
      return await this.queryBus.execute(query);
    } catch (error) {
      console.error(error);
      return new Nack();
    }
  }
}
