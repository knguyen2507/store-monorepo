import { Global, Module } from '@nestjs/common';
import { RmqModule } from '@store-monorepo/service/rabbitmq';
import { UtilityModule } from '@store-monorepo/utility';

@Global()
@Module({
  imports: [UtilityModule, RmqModule],
  controllers: [],
  providers: [],
  exports: [],
})
export class GuardModule {}
