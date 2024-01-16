import { ApiProperty } from '@nestjs/swagger';
import { FileUpload } from '@store-monorepo/utility';
import { IsArray, IsNotEmpty, IsString } from 'class-validator';

export class CreateBrandResquestDTO {
  @ApiProperty({ type: String, example: 'Test Brand 1' })
  @IsString()
  @IsNotEmpty()
  readonly name!: string;

  @ApiProperty({ type: 'string', format: 'binary' })
  readonly image!: FileUpload;

  @ApiProperty({ type: String, example: 'test-brand-1' })
  @IsString()
  @IsNotEmpty()
  readonly brandCode!: string;

  @ApiProperty({ type: [String] })
  @IsArray()
  @IsNotEmpty()
  readonly shop!: string[];
}
