import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class ShopCreateProductRequestProperties {
  @ApiProperty({ example: '653780f1e12684704e5a02e9', type: String })
  @IsString()
  @IsOptional()
  id!: string;

  @ApiProperty({ example: 1, type: Number })
  @IsNumber()
  @IsOptional()
  qty!: number;
}
