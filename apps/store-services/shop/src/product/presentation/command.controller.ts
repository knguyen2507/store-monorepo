import { Body, Controller, Post, Req, UploadedFiles, UseGuards, UseInterceptors } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { AuthnGuard } from '@store-monorepo/service/guard';
import {
  CreateProductResquestDTO,
  DeleteProductResquestDTO,
  FileUpload,
  RequestWithUser,
  UtilityImplement,
  pathPrefixCommandProduct,
  pathPrefixProduct,
} from '@store-monorepo/utility';
import { CreateProduct } from '../application/command/product/create';
import { DeleteProduct } from '../application/command/product/delete';

@ApiTags(pathPrefixProduct.swagger)
@Controller(pathPrefixProduct.controller)
@UseGuards(AuthnGuard)
@ApiBearerAuth()
export class ProductCommandController {
  constructor(private readonly util: UtilityImplement, readonly commandBus: CommandBus) {}

  @Post(pathPrefixCommandProduct.createProduct)
  @UseInterceptors(AnyFilesInterceptor())
  @ApiConsumes('multipart/form-data')
  async CreateProduct(
    @UploadedFiles() images: Array<FileUpload>,
    @Body() body: CreateProductResquestDTO,
    @Req() request: RequestWithUser,
  ): Promise<any> {
    const msg = {
      messageId: this.util.generateId(),
      data: {
        productCode: body.productCode,
        name: body.name,
        categoryId: body.categoryId,
        brandId: body.brandId,
        price: Number(body.price),
        description: body.description,
        files: images,
        main: body.mainImage,
        user: request.user,
        shop: body.shop,
      },
    };
    const command = new CreateProduct(msg);
    return await this.commandBus.execute(command);
  }

  @Post(pathPrefixCommandProduct.deleteProduct)
  async DeleteProduct(@Body() body: DeleteProductResquestDTO): Promise<any> {
    const msg = {
      messageId: this.util.generateId(),
      data: {
        ids: body.ids,
      },
    };
    const command = new DeleteProduct(msg);
    return await this.commandBus.execute(command);
  }
}
