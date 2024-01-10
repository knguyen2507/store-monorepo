import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@store-monorepo/service/guard';
import {
  UtilityImplement,
  pathPrefixProduct,
  pathPrefixQueryProduct,
} from '@store-monorepo/service/utility';
import { FindProductByCode } from '../application/query/product/detail';
import { FindProductByCodeRequestDTO } from '../application/query/product/detail/dto';
import { FindProduct } from '../application/query/product/find';
import { FindProductByAdmin } from '../application/query/product/find-by-admin';
import { FindProductByAdminRequestDTO } from '../application/query/product/find-by-admin/dto';
import { FindProductByBrand } from '../application/query/product/find-by-brand';
import { FindProductByBrandRequestDTO } from '../application/query/product/find-by-brand/dto';
import { FindProductByCategory } from '../application/query/product/find-by-category';
import { FindProductByCategoryRequestDTO } from '../application/query/product/find-by-category/dto';
import { FindProductSimilar } from '../application/query/product/find-similar';
import { FindProductSimilarRequestDTO } from '../application/query/product/find-similar/dto';
import { FindProductRequestDTO } from '../application/query/product/find/dto';
import { GetTotalProduct } from '../application/query/product/get-total';

@ApiTags(pathPrefixProduct.swagger)
@Controller(pathPrefixProduct.controller)
export class ProductQueryController {
  constructor(
    private readonly util: UtilityImplement,
    readonly queryBus: QueryBus
  ) {}

  @Get(pathPrefixQueryProduct.findProductListByAdmin)
  async FindProductListByAdmin(
    @Query() query: FindProductByAdminRequestDTO
  ): Promise<any> {
    const msg = {
      messageId: this.util.generateId(),
      data: query,
    };
    const Products = new FindProductByAdmin(msg);
    return await this.queryBus.execute(Products);
  }

  @Get(pathPrefixQueryProduct.findProducts)
  async FindProducts(@Query() query: FindProductRequestDTO): Promise<any> {
    const msg = {
      messageId: this.util.generateId(),
      data: query,
    };
    const Products = new FindProduct(msg);
    return await this.queryBus.execute(Products);
  }

  @Get(pathPrefixQueryProduct.findProductByCode)
  async FindProductByCode(
    @Query() query: FindProductByCodeRequestDTO
  ): Promise<any> {
    const msg = {
      messageId: this.util.generateId(),
      data: query,
    };
    const Products = new FindProductByCode(msg);
    return await this.queryBus.execute(Products);
  }

  @Get(pathPrefixQueryProduct.findProductByBrand)
  async FindProductByBrand(
    @Query() query: FindProductByBrandRequestDTO
  ): Promise<any> {
    const msg = {
      messageId: this.util.generateId(),
      data: query,
    };
    const Products = new FindProductByBrand(msg);
    return await this.queryBus.execute(Products);
  }

  @Get(pathPrefixQueryProduct.findProductByCategory)
  async FindProductByCategory(
    @Query() query: FindProductByCategoryRequestDTO
  ): Promise<any> {
    const msg = {
      messageId: this.util.generateId(),
      data: query,
    };
    const Products = new FindProductByCategory(msg);
    return await this.queryBus.execute(Products);
  }

  @Get(pathPrefixQueryProduct.findProductByIds)
  async FindProductByIds(
    @Query() query: FindProductByCategoryRequestDTO
  ): Promise<any> {
    const msg = {
      messageId: this.util.generateId(),
      data: query,
    };
    const Products = new FindProductByCategory(msg);
    return await this.queryBus.execute(Products);
  }

  @Get(pathPrefixQueryProduct.findProductSimilar)
  async FindProductSimilar(
    @Query() query: FindProductSimilarRequestDTO
  ): Promise<any> {
    const msg = {
      messageId: this.util.generateId(),
      data: query,
    };
    const Products = new FindProductSimilar(msg);
    return await this.queryBus.execute(Products);
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
