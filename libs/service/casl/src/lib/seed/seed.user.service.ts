import { Inject, Injectable } from '@nestjs/common';
import { AuthnPrismaService } from '@store-monorepo/service/prisma';

@Injectable()
export class SeedUserService {
  constructor(@Inject(AuthnPrismaService) private prisma: AuthnPrismaService) {}

  seed = async () => {
    const id = '6502d51ac4841b15cd7756a2';

    await this.prisma.$transaction(async (tx) => {
      const users = await tx.users.findMany();

      if (users.length === 0) {
        await tx.users.create({
          data: {
            id,
            name: 'Super Admin 1',
            phone: '0987654321',
            username: 'superadmin001',
            password:
              '$2a$10$UM5he8DexZKyBXhr6RHw3.GyVH5avuqRlRnbScmT5aLAG4iQkeLle', // 123456
            isSuperAdmin: true,
          },
        });
      }
    });
  };
}
