import { Global, Module } from '@nestjs/common';
import { UtilityModule } from '@store-monorepo/service/utility';

@Global()
@Module({
  imports: [UtilityModule],
  controllers: [],
  providers: [],
  exports: [],
})
export class GuardModule {}