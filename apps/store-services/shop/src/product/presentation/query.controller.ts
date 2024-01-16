import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@store-monorepo/service/guard';
import {
  FindProductByAdminRequestDTO,
  FindProductByBrandRequestDTO,
  FindProductByCategoryRequestDTO,
  FindProductByCodeRequestDTO,
  FindProductByIdsRequestDTO,
  FindProductRequestDTO,
  FindProductSimilarRequestDTO,
  UtilityImplement,
  pathPrefixProduct,
  pathPrefixQueryProduct,
} from '@store-monorepo/utility';
import { FindProductByCode } from '../application/query/product/detail';
import { FindProduct } from '../application/query/product/find';
import { FindProductByAdmin } from '../application/query/product/find-by-admin';
import { FindProductByBrand } from '../application/query/product/find-by-brand';
import { FindProductByCategory } from '../application/query/product/find-by-category';
import { FindProductByIds } from '../application/query/product/find-by-ids';
import { FindProductSimilar } from '../application/query/product/find-similar';
import { GetTotalProduct } from '../application/query/product/get-total';

@ApiTags(pathPrefixProduct.swagger)
@Controller(pathPrefixProduct.controller)
export class ProductQueryController {
  constructor(
    private readonly util: UtilityImplement,
    readonly queryBus: QueryBus
  ) {}

  @Get(pathPrefixQueryProduct.findProductListByAdmin)
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  async FindProductListByAdmin(
    @Query() query: FindProductByAdminRequestDTO
  ): Promise<any> {
    const msg = {
      messageId: this.util.generateId(),
      data: query,
    };
    const product = new FindProductByAdmin(msg);
    return await this.queryBus.execute(product);
  }

  @Get(pathPrefixQueryProduct.findProducts)
  async FindProducts(@Query() query: FindProductRequestDTO): Promise<any> {
    const msg = {
      messageId: this.util.generateId(),
      data: query,
    };
    const product = new FindProduct(msg);
    return await this.queryBus.execute(product);
  }

  @Get(pathPrefixQueryProduct.findProductByCode)
  async FindProductByCode(
    @Query() query: FindProductByCodeRequestDTO
  ): Promise<any> {
    const msg = {
      messageId: this.util.generateId(),
      data: query,
    };
    const product = new FindProductByCode(msg);
    return await this.queryBus.execute(product);
  }

  @Get(pathPrefixQueryProduct.findProductByBrand)
  async FindProductByBrand(
    @Query() query: FindProductByBrandRequestDTO
  ): Promise<any> {
    const msg = {
      messageId: this.util.generateId(),
      data: query,
    };
    const product = new FindProductByBrand(msg);
    return await this.queryBus.execute(product);
  }

  @Get(pathPrefixQueryProduct.findProductByCategory)
  async FindProductByCategory(
    @Query() query: FindProductByCategoryRequestDTO
  ): Promise<any> {
    const msg = {
      messageId: this.util.generateId(),
      data: query,
    };
    const product = new FindProductByCategory(msg);
    return await this.queryBus.execute(product);
  }

  @Get(pathPrefixQueryProduct.findProductByIds)
  async FindProductByIds(
    @Query() query: FindProductByIdsRequestDTO
  ): Promise<any> {
    const msg = {
      messageId: this.util.generateId(),
      data: query,
    };
    const product = new FindProductByIds(msg);
    return await this.queryBus.execute(product);
  }

  @Get(pathPrefixQueryProduct.findProductSimilar)
  async FindProductSimilar(
    @Query() query: FindProductSimilarRequestDTO
  ): Promise<any> {
    const msg = {
      messageId: this.util.generateId(),
      data: query,
    };
    const product = new FindProductSimilar(msg);
    return await this.queryBus.execute(product);
  }

  @Get(pathPrefixQueryProduct.getTotalProduct)
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  async GetTotalProduct(): Promise<any> {
    const msg = {
      messageId: this.util.generateId(),
      data: null,
    };
    const query = new GetTotalProduct(msg);
    return await this.queryBus.execute(query);
  }
}
