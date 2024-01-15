import {
  Body,
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common/decorators';
import { CommandBus } from '@nestjs/cqrs';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiConsumes, ApiTags } from '@nestjs/swagger';
import {
  CreateCategoryResquestDTO,
  FileUpload,
  UtilityImplement,
  pathPrefixCategory,
  pathPrefixCommandCategory,
} from '@store-monorepo/utility';
import { CreateCategory } from '../application/command/category/create';

@ApiTags(pathPrefixCategory.swagger)
@Controller(pathPrefixCategory.controller)
export class CategoryCommandController {
  constructor(
    private readonly util: UtilityImplement,
    readonly commandBus: CommandBus
  ) {}

  @Post(pathPrefixCommandCategory.createCategory)
  @UseInterceptors(FileInterceptor('image'))
  @ApiConsumes('multipart/form-data')
  async CreateCategory(
    @UploadedFile() image: FileUpload,
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
    const command = new CreateCategory(msg);
    return await this.commandBus.execute(command);
  }
}
