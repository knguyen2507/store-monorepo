import { Module } from '@nestjs/common';
import { CategoryCommandController } from './presentation/command.controller';
import { CategoryQueryController } from './presentation/query.controller';

@Module({
  imports: [],
  controllers: [CategoryQueryController, CategoryCommandController],
  providers: [],
})
export class CategoryModule {}
