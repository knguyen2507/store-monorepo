import { IQueryResult } from '@nestjs/cqrs';
import { ActionEnum, StatusEnum } from '@prisma/client/authn';
import { Expose } from 'class-transformer';

export class RoleDataResult {
  @Expose()
  readonly id: string;
  @Expose()
  readonly name: string;
  @Expose()
  readonly isSuperAdmin: boolean;
}

export class ShopDataResult {
  @Expose()
  readonly id: string;
  @Expose()
  readonly name: string;
  @Expose()
  readonly address: string;
}

export class PermissionDataResult {
  @Expose()
  readonly id: string;
  @Expose()
  readonly name: string;
  @Expose()
  readonly status: StatusEnum;
  @Expose()
  readonly action: ActionEnum;
  @Expose()
  readonly shop: ShopDataResult;
}

export class GetUserInfoResult implements IQueryResult {
  @Expose()
  readonly id: string;
  @Expose()
  readonly name: string;
  @Expose()
  readonly phone: string;
  @Expose()
  readonly username: string;
  @Expose()
  readonly created: Date;
  @Expose()
  readonly role: RoleDataResult;
  @Expose()
  readonly permission: PermissionDataResult[];
}
