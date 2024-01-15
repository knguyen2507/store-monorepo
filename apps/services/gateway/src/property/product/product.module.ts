import { Module } from '@nestjs/common';
import { ProductCommandController } from './presentation/command.controller';
import { ProductQueryController } from './presentation/query.controller';

@Module({
  imports: [],
  controllers: [ProductQueryController, ProductCommandController],
  providers: [],
})
export class ProductModule {}
