import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@store-monorepo/service/guard';
import { UtilityImplement } from '@store-monorepo/service/utility';
import { FindCategoryById } from '../application/query/category/detail';
import { FindCategoryByIdRequestDTO } from '../application/query/category/detail/dto';
import { FindCategory } from '../application/query/category/find';
import { FindCategoryByCode } from '../application/query/category/find-by-code';
import { FindCategoryByCodeRequestDTO } from '../application/query/category/find-by-code/dto';
import { GetTotalCategory } from '../application/query/category/get-total';

@ApiTags('category')
@Controller('category')
export class CategoryQueryController {
  constructor(
    private readonly util: UtilityImplement,
    readonly queryBus: QueryBus
  ) {}

  @Get('/find')
  async FindCategories(): Promise<any> {
    const msg = {
      messageId: this.util.generateId(),
      data: null,
    };
    const Categories = new FindCategory(msg);
    return await this.queryBus.execute(Categories);
  }

  @Get('/detail')
  async FindCategoryById(
    @Query() query: FindCategoryByIdRequestDTO
  ): Promise<any> {
    const msg = {
      messageId: this.util.generateId(),
      data: query,
    };
    const Categories = new FindCategoryById(msg);
    return await this.queryBus.execute(Categories);
  }

  @Get('/find-by-code')
  async FindCategoryByCode(
    @Query() query: FindCategoryByCodeRequestDTO
  ): Promise<any> {
    const msg = {
      messageId: this.util.generateId(),
      data: query,
    };
    const Categories = new FindCategoryByCode(msg);
    return await this.queryBus.execute(Categories);
  }

  @Get('/get-total-category')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  async GetTotalCategory(): Promise<any> {
    const msg = {
      messageId: this.util.generateId(),
      data: null,
    };
    const query = new GetTotalCategory(msg);
    return await this.queryBus.execute(query);
  }
}
