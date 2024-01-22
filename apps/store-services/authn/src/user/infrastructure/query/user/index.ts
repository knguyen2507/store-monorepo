import { Inject, UnauthorizedException } from '@nestjs/common';
import { AuthnPrismaService } from '@store-monorepo/service/prisma';
import { UserInterface, UtilityImplement } from '@store-monorepo/utility';
import { plainToClass, plainToInstance } from 'class-transformer';
import { FindUserById } from '../../../application/query/user/detail';
import { FindUserByIdResult } from '../../../application/query/user/detail/result';
import { FindUser } from '../../../application/query/user/find';
import {
  FindUserResult,
  FindUserResultItem,
} from '../../../application/query/user/find/result';
import { GetTotalUserResult } from '../../../application/query/user/get-total/result';
import { GetUserInfo } from '../../../application/query/user/get-user-info';
import {
  GetUserInfoResult,
  PermissionDataResult,
  RoleDataResult,
  ShopDataResult,
} from '../../../application/query/user/get-user-info/result';
import { VerifyAccessTokenResult } from '../../../application/query/user/verify-token/result';
import { UserQuery } from '../../../domain/query/user';

export class UserQueryImplement implements UserQuery {
  @Inject()
  private readonly prisma: AuthnPrismaService;
  @Inject()
  private readonly util: UtilityImplement;

  async find(query: FindUser): Promise<FindUserResult> {
    const { offset, limit } = query.data;
    const [users, total] = await Promise.all([
      this.prisma.users.findMany({
        skip: Number(offset),
        take: Number(limit),
        orderBy: [
          {
            created: 'desc',
          },
          {
            id: 'asc',
          },
        ],
      }),
      this.prisma.users.count(),
    ]);

    return {
      items: users.map((i) => {
        return plainToClass(FindUserResultItem, i, {
          excludeExtraneousValues: true,
        });
      }),
      total,
    };
  }

  async findById(query: FindUserById): Promise<FindUserByIdResult> {
    const user = await this.prisma.users.findUnique({
      where: { id: query.data.id },
    });

    return plainToClass(FindUserByIdResult, user, {
      excludeExtraneousValues: true,
    });
  }

  async getTotal(): Promise<GetTotalUserResult> {
    const total = await this.prisma.users.count();

    return plainToClass(
      GetTotalUserResult,
      { total },
      { excludeExtraneousValues: true }
    );
  }

  async getInfo(query: GetUserInfo): Promise<GetUserInfoResult> {
    const user = await this.prisma.users.findUnique({
      where: { id: query.data.id },
      include: {
        role: { include: { permission: { include: { shop: true } } } },
      },
    });

    const role = plainToClass(
      RoleDataResult,
      {
        id: user.role.id,
        name: user.role.name,
        isSuperAdmin: user.role.isSuperAdmin,
      },
      { excludeExtraneousValues: true }
    );

    let permission: PermissionDataResult[];

    if (user.role.isSuperAdmin) {
      const data = await this.prisma.permissions.findMany({
        include: { shop: true },
      });
      permission = data.map((item) => {
        const shop = plainToClass(
          ShopDataResult,
          {
            id: item.shop.id,
            name: item.shop.name,
            address: item.shop.address,
          },
          { excludeExtraneousValues: true }
        );
        return plainToClass(
          PermissionDataResult,
          {
            id: item.id,
            name: item.name,
            status: item.status,
            action: item.action,
            shop,
          },
          { excludeExtraneousValues: true }
        );
      });
    } else {
      permission = user.role.permission.map((item) => {
        const shop = plainToClass(
          ShopDataResult,
          {
            id: item.shop.id,
            name: item.shop.name,
            address: item.shop.address,
          },
          { excludeExtraneousValues: true }
        );
        return plainToClass(
          PermissionDataResult,
          {
            id: item.id,
            name: item.name,
            status: item.status,
            action: item.action,
            shop,
          },
          { excludeExtraneousValues: true }
        );
      });
    }

    return plainToClass(
      GetUserInfoResult,
      {
        id: user.id,
        name: user.name,
        phone: user.phone,
        username: user.username,
        created: user.created,
        role,
        permission,
      },
      { excludeExtraneousValues: true }
    );
  }

  getDataByToken: (query: {
    token: string;
    user: UserInterface;
  }) => Promise<VerifyAccessTokenResult> = async (query) => {
    const { token, user } = query;
    // check token in black list
    const BlackListed = await this.util.getRedisKey(`blacklist:${token}`);
    if (BlackListed) throw new UnauthorizedException('Token Expired');

    const payload = this.util.verifyAccessToken(token); // verify access token
    let accessToken = '';
    let refreshToken = '';

    if (payload) {
      accessToken = token; // access token is valid
    } else {
      // check refresh token in db
      refreshToken = await this.util.getRedisKey(token);
      if (!refreshToken) throw new UnauthorizedException('Token Expired');

      // verify refresh token
      const data = this.util.verifyRefreshToken(refreshToken);
      if (!data) {
        // access token, refresh token invalid
        await this.util.deleteRefreshToken(token);
        throw new UnauthorizedException('Token Expired');
      }

      // sign new access token
      accessToken = this.util.generateAccessToken(data);
    }

    return plainToInstance(
      VerifyAccessTokenResult,
      {
        user,
        accessToken,
      },
      {
        excludeExtraneousValues: true,
      }
    );
  };
}
