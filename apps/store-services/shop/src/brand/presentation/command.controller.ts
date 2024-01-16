import {
  Body,
  Controller,
  Post,
  Req,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiConsumes, ApiTags } from '@nestjs/swagger';
import {
  CreateBrandResquestDTO,
  FileUpload,
  RequestWithUser,
  UtilityImplement,
  pathPrefixBrand,
  pathPrefixCommandBrand,
} from '@store-monorepo/utility';
import { CreateBrand } from '../application/command/brand/create';

@ApiTags(pathPrefixBrand.swagger)
@Controller(pathPrefixBrand.controller)
export class BrandCommandController {
  constructor(
    private readonly util: UtilityImplement,
    readonly commandBus: CommandBus
  ) {}

  @Post(pathPrefixCommandBrand.createBrand)
  @UseInterceptors(FileInterceptor('image'))
  @ApiConsumes('multipart/form-data')
  async CreateBrand(
    @UploadedFile() image: FileUpload,
    @Body() body: CreateBrandResquestDTO,
    @Req() request: RequestWithUser
  ): Promise<any> {
    const msg = {
      messageId: this.util.generateId(),
      data: {
        name: body.name,
        thumbnailLink: image,
        brandCode: body.brandCode,
        shop: body.shop,
        user: request.user,
      },
    };
    const command = new CreateBrand(msg);
    return await this.commandBus.execute(command);
  }
}
