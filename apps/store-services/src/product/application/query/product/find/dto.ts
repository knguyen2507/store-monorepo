import { ApiProperty } from '@nestjs/swagger';
import { PaginatorDTO } from '@store-monorepo/service/utility';
import { IsOptional, IsString } from 'class-validator';

export class FindProductRequestDTO extends PaginatorDTO {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  readonly searchName?: string;
}
