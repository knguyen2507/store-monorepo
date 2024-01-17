import { Inject, Module, OnModuleInit } from '@nestjs/common';
import { AuthnPrismaModule } from '@store-monorepo/service/prisma';
import { SeedUserService } from './seed/seed.user.service';

@Module({
  imports: [AuthnPrismaModule],
  controllers: [],
  providers: [SeedUserService],
  exports: [],
})
export class CaslModule implements OnModuleInit {
  constructor(
    @Inject(SeedUserService) private seedUserService: SeedUserService
  ) {}
  async onModuleInit() {
    await this.seedUserService.seed();
  }
}
