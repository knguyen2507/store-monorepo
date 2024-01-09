import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@store-monorepo/service/guard';
import { UtilityImplement } from '@store-monorepo/service/utility';
import { FindBrandById } from '../application/query/brand/detail';
import { FindBrandByIdRequestDTO } from '../application/query/brand/detail/dto';
import { FindBrand } from '../application/query/brand/find';
import { FindBrandByCode } from '../application/query/brand/find-by-code';
import { FindBrandByCodeRequestDTO } from '../application/query/brand/find-by-code/dto';
import { GetTotalBrand } from '../application/query/brand/get-total';

@ApiTags('brand')
@Controller('brand')
export class BrandQueryController {
  constructor(
    private readonly util: UtilityImplement,
    readonly queryBus: QueryBus
  ) {}

  @Get('/find')
  async FindBrands(): Promise<any> {
    const msg = {
      messageId: this.util.generateId(),
      data: null,
    };
    const Brands = new FindBrand(msg);
    return await this.queryBus.execute(Brands);
  }

  @Get('/detail')
  async FindBrandById(@Query() query: FindBrandByIdRequestDTO): Promise<any> {
    const msg = {
      messageId: this.util.generateId(),
      data: query,
    };
    const Brands = new FindBrandById(msg);
    return await this.queryBus.execute(Brands);
  }

  @Get('/find-by-code')
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

  @Get('/get-total-brand')
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
