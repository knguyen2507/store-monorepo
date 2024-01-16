import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client/shop';

@Injectable()
export class ShopPrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this['$connect']();
  }
}
