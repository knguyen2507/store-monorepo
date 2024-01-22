import { Global, Module } from '@nestjs/common';
import { CerbosModule } from '@store-monorepo/service/cerbos';
import { UtilityModule } from '@store-monorepo/utility';

@Global()
@Module({
  imports: [UtilityModule, CerbosModule],
  controllers: [],
  providers: [],
  exports: [],
})
export class GuardModule {}
