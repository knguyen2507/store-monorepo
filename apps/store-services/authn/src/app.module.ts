import { Module } from '@nestjs/common';
import { CaslModule } from '@store-monorepo/service/casl';
import { CloudinaryModule } from '@store-monorepo/service/cloudinary';
import { GuardModule } from '@store-monorepo/service/guard';
import { AuthnPrismaModule } from '@store-monorepo/service/prisma';
import { RmqModule } from '@store-monorepo/service/rabbitmq';
import { RedisModule } from '@store-monorepo/service/redis';
import { UtilityModule } from '@store-monorepo/utility';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    AuthnPrismaModule,
    UtilityModule,
    GuardModule,
    RedisModule,
    CloudinaryModule,
    UserModule,
    RmqModule,
    CaslModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
