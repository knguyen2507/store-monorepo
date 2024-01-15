import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@store-monorepo/service/guard';
import {
  FindCategoryByCodeRequestDTO,
  FindCategoryByIdRequestDTO,
  UtilityImplement,
  pathPrefixCategory,
  pathPrefixQueryCategory,
} from '@store-monorepo/utility';
import { FindCategoryById } from '../application/query/category/detail';
import { FindCategory } from '../application/query/category/find';
import { FindCategoryByCode } from '../application/query/category/find-by-code';
import { GetTotalCategory } from '../application/query/category/get-total';

@ApiTags(pathPrefixCategory.swagger)
@Controller(pathPrefixCategory.controller)
export class CategoryQueryController {
  constructor(
    private readonly util: UtilityImplement,
    readonly queryBus: QueryBus
  ) {}

  @Get(pathPrefixQueryCategory.findCategories)
  async FindCategories(): Promise<any> {
    const msg = {
      messageId: this.util.generateId(),
      data: null,
    };
    const query = new FindCategory(msg);
    return await this.queryBus.execute(query);
  }

  @Get(pathPrefixQueryCategory.findCategoryById)
  async FindCategoryById(
    @Query() query: FindCategoryByIdRequestDTO
  ): Promise<any> {
    const msg = {
      messageId: this.util.generateId(),
      data: query,
    };
    const category = new FindCategoryById(msg);
    return await this.queryBus.execute(category);
  }

  @Get(pathPrefixQueryCategory.findCategoryByCode)
  async FindCategoryByCode(
    @Query() query: FindCategoryByCodeRequestDTO
  ): Promise<any> {
    const msg = {
      messageId: this.util.generateId(),
      data: query,
    };
    const category = new FindCategoryByCode(msg);
    return await this.queryBus.execute(category);
  }

  @Get(pathPrefixQueryCategory.getTotalCategory)
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
