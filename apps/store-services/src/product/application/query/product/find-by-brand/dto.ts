import { ApiProperty } from '@nestjs/swagger';
import { PaginatorDTO } from '@store-monorepo/utility';
import { IsNotEmpty, IsString } from 'class-validator';

export class FindProductByBrandRequestDTO extends PaginatorDTO {
  @ApiProperty({ type: String, example: '653780f1e12684704e5a02da' })
  @IsString()
  @IsNotEmpty()
  readonly brandCode: string;
}
