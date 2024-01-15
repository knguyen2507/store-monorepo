import { Module } from '@nestjs/common';
import { BrandCommandController } from './presentation/command.controller';
import { BrandQueryController } from './presentation/query.controller';

@Module({
  imports: [],
  controllers: [BrandQueryController, BrandCommandController],
  providers: [],
})
export class BrandModule {}
