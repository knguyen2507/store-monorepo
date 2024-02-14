import { Body, Controller, Post, Req, UploadedFiles, UseGuards, UseInterceptors } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { AuthnGuard } from '@store-monorepo/service/guard';
import {
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
    @Body() body: any,
    @Req() request: RequestWithUser,
  ): Promise<any> {
    const data = {} as any;
    for (const i in body) {
      if (i !== 'data') {
        if (body[i] !== 'undefined') {
          if (i === 'shop') {
            const parseAdd = JSON.parse(body[i]);
            data[i] = Array.isArray(parseAdd) ? parseAdd : [parseAdd];
          } else {
            data[i] = JSON.parse(body[i]);
          }
        }
      }
    }

    const msg = {
      messageId: this.util.generateId(),
      data: {
        productCode: data.productCode,
        name: data.name,
        categoryId: data.categoryId,
        brandId: data.brandId,
        price: Number(data.price),
        description: data.description,
        files: images,
        main: data.mainImage,
        user: request.user,
        shop: data.shop,
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
