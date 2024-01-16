import { Module } from '@nestjs/common';
import { ShopPrismaService } from './prisma.service';

@Module({
  providers: [ShopPrismaService],
  exports: [ShopPrismaService],
})
export class ShopPrismaModule {}
