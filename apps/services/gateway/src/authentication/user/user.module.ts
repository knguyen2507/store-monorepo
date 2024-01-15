import { Module } from '@nestjs/common';
import { UserCommandController } from './presentation/command.controller';
import { UserQueryController } from './presentation/query.controller';

@Module({
  imports: [],
  controllers: [UserQueryController, UserCommandController],
  providers: [],
})
export class UserModule {}
