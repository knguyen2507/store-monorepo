import {
  Body,
  Controller,
  Post,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { ApiConsumes, ApiTags } from '@nestjs/swagger';
import { UtilityImplement } from '@store-monorepo/service/utility';
import { CreateProduct } from '../application/command/product/create';
import { CreateProductResquestDTO } from '../application/command/product/create/dto';
import { DeleteProduct } from '../application/command/product/delete';
import { DeleteProductResquestDTO } from '../application/command/product/delete/dto';

@ApiTags('product')
@Controller('product')
export class ProductCommandController {
  constructor(
    private readonly util: UtilityImplement,
    readonly commandBus: CommandBus
  ) {}

  @Post('/create')
  @UseInterceptors(AnyFilesInterceptor())
  @ApiConsumes('multipart/form-data')
  async CreateProduct(
    @UploadedFiles() images: Array<Express.Multer.File>,
    @Body() body: CreateProductResquestDTO
  ): Promise<any> {
    const msg = {
      messageId: this.util.generateId(),
      data: {
        productCode: body.productCode,
        name: body.name,
        qty: Number(body.qty),
        categoryId: body.categoryId,
        brandId: body.brandId,
        price: Number(body.price),
        description: body.description,
        files: images,
        main: body.mainImage,
      },
    };
    const Brands = new CreateProduct(msg);
    return await this.commandBus.execute(Brands);
  }

  @Post('/delete')
  async DeleteProduct(@Body() body: DeleteProductResquestDTO): Promise<any> {
    const msg = {
      messageId: this.util.generateId(),
      data: {
        ids: body.ids,
      },
    };
    const Brands = new DeleteProduct(msg);
    return await this.commandBus.execute(Brands);
  }
}
