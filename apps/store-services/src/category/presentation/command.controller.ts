import {
  Body,
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiConsumes, ApiTags } from '@nestjs/swagger';
import { UtilityImplement } from '@store-monorepo/service/utility';
import { CreateCategory } from '../application/command/category/create';
import { CreateCategoryResquestDTO } from '../application/command/category/create/dto';

@ApiTags('category')
@Controller('category')
export class CategoryCommandController {
  constructor(
    private readonly util: UtilityImplement,
    readonly commandBus: CommandBus
  ) {}

  @Post('/create')
  @UseInterceptors(FileInterceptor('image'))
  @ApiConsumes('multipart/form-data')
  async CreateCategory(
    @UploadedFile() image: Express.Multer.File,
    @Body() body: CreateCategoryResquestDTO
  ): Promise<any> {
    const msg = {
      messageId: this.util.generateId(),
      data: {
        name: body.name,
        thumbnailLink: image,
        categoryCode: body.categoryCode,
      },
    };
    const Categories = new CreateCategory(msg);
    return await this.commandBus.execute(Categories);
  }
}
