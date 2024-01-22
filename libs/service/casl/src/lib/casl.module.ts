import { Inject, Module, OnModuleInit } from '@nestjs/common';
import { CerbosModule } from '@store-monorepo/service/cerbos';
import {
  AuthnPrismaModule,
  ShopPrismaModule,
} from '@store-monorepo/service/prisma';
import { SeedAuthnService } from './seed/seed.authn.service';
import { SeedPolicyService } from './seed/seed.policy.service';
import { SeedProductService } from './seed/seed.product.service';
import { SeedShopService } from './seed/seed.shop.services';

@Module({
  imports: [AuthnPrismaModule, ShopPrismaModule, CerbosModule],
  controllers: [],
  providers: [
    SeedAuthnService,
    SeedShopService,
    SeedProductService,
    SeedPolicyService,
  ],
  exports: [],
})
export class CaslModule implements OnModuleInit {
  constructor(
    @Inject(SeedAuthnService) private seedAuthnService: SeedAuthnService,
    @Inject(SeedShopService) private seedShopService: SeedShopService,
    @Inject(SeedProductService) private seedProductService: SeedProductService,
    @Inject(SeedPolicyService) private seedPolicyService: SeedPolicyService
  ) {}
  async onModuleInit() {
    await this.seedAuthnService.seed();
    await this.seedShopService.seed();
    await this.seedPolicyService.seed();
    await this.seedProductService.seed();
  }
}
