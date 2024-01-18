import { Inject, Module, OnModuleInit } from '@nestjs/common';
import { AuthnPrismaModule } from '@store-monorepo/service/prisma';
import { SeedAuthnService } from './seed/seed.authn.service';

@Module({
  imports: [AuthnPrismaModule],
  controllers: [],
  providers: [SeedAuthnService],
  exports: [],
})
export class CaslModule implements OnModuleInit {
  constructor(
    @Inject(SeedAuthnService) private seedAuthnService: SeedAuthnService
  ) {}
  async onModuleInit() {
    await this.seedAuthnService.seed();
  }
}
