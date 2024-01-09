import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCategoryResquestDTO {
  @ApiProperty({ type: String, example: 'Test Category 1' })
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @ApiProperty({ type: 'string', format: 'binary' })
  readonly image: Express.Multer.File;

  @ApiProperty({ type: String, example: 'test-category-1' })
  @IsString()
  @IsNotEmpty()
  readonly categoryCode: string;
}
