import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@store-monorepo/service/guard';
import {
  FindBrandByCodeRequestDTO,
  FindBrandByIdRequestDTO,
  UtilityImplement,
  pathPrefixBrand,
  pathPrefixQueryBrand,
} from '@store-monorepo/utility';
import { FindBrandById } from '../application/query/brand/detail';
import { FindBrand } from '../application/query/brand/find';
import { FindBrandByCode } from '../application/query/brand/find-by-code';
import { GetTotalBrand } from '../application/query/brand/get-total';

@ApiTags(pathPrefixBrand.swagger)
@Controller(pathPrefixBrand.controller)
export class BrandQueryController {
  constructor(
    private readonly util: UtilityImplement,
    readonly queryBus: QueryBus
  ) {}

  @Get(pathPrefixQueryBrand.findBrands)
  async FindBrands(): Promise<any> {
    const msg = {
      messageId: this.util.generateId(),
      data: null,
    };
    const Brands = new FindBrand(msg);
    return await this.queryBus.execute(Brands);
  }

  @Get(pathPrefixQueryBrand.findBrandById)
  async FindBrandById(@Query() query: FindBrandByIdRequestDTO): Promise<any> {
    const msg = {
      messageId: this.util.generateId(),
      data: query,
    };
    const Brands = new FindBrandById(msg);
    return await this.queryBus.execute(Brands);
  }

  @Get(pathPrefixQueryBrand.findBrandByCode)
  async FindBrandByCode(
    @Query() query: FindBrandByCodeRequestDTO
  ): Promise<any> {
    const msg = {
      messageId: this.util.generateId(),
      data: query,
    };
    const Brands = new FindBrandByCode(msg);
    return await this.queryBus.execute(Brands);
  }

  @Get(pathPrefixQueryBrand.getTotalBrand)
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  async GetTotalBrand(): Promise<any> {
    const msg = {
      messageId: this.util.generateId(),
      data: null,
    };
    const query = new GetTotalBrand(msg);
    return await this.queryBus.execute(query);
  }
}
