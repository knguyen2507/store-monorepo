import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsString } from 'class-validator';

export class CreateRoleRequestDTO {
  @ApiProperty({ type: String, example: 'test 1' })
  @IsString()
  @IsNotEmpty()
  readonly name!: string;

  @ApiProperty({ type: [String] })
  @IsArray()
  @IsNotEmpty({ each: true })
  readonly permissions!: string[];
}
