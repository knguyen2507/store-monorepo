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
import { CreateBrand } from '../application/command/brand/create';
import { CreateBrandResquestDTO } from '../application/command/brand/create/dto';

@ApiTags('brand')
@Controller('brand')
export class BrandCommandController {
  constructor(
    private readonly util: UtilityImplement,
    readonly commandBus: CommandBus
  ) {}

  @Post('/create')
  @UseInterceptors(FileInterceptor('image'))
  @ApiConsumes('multipart/form-data')
  async CreateBrand(
    @UploadedFile() image: Express.Multer.File,
    @Body() body: CreateBrandResquestDTO
  ): Promise<any> {
    const msg = {
      messageId: this.util.generateId(),
      data: {
        name: body.name,
        thumbnailLink: image,
        brandCode: body.brandCode,
      },
    };
    const Brands = new CreateBrand(msg);
    return await this.commandBus.execute(Brands);
  }
}
