import { ApiProperty } from '@nestjs/swagger';
import { PaginatorDTO } from '@store-monorepo/service/utility';
import { IsNotEmpty, IsString } from 'class-validator';

export class FindProductByCategoryRequestDTO extends PaginatorDTO {
  @ApiProperty({ type: String, example: '653780f1e12684704e5a02e4' })
  @IsString()
  @IsNotEmpty()
  readonly categoryCode: string;
}
