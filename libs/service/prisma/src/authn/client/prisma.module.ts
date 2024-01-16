import { Module } from '@nestjs/common';
import { AuthnPrismaService } from './prisma.service';

@Module({
  providers: [AuthnPrismaService],
  exports: [AuthnPrismaService],
})
export class AuthnPrismaModule {}
