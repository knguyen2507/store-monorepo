import { IQueryResult } from '@nestjs/cqrs';
import { ActionEnum, StatusEnum } from '@prisma/client/authn';
import { Expose } from 'class-transformer';

export class FindPermissionResultItem {
  @Expose()
  readonly id: string;
  @Expose()
  readonly name: string;
  @Expose()
  readonly status: StatusEnum;
  @Expose()
  readonly action: ActionEnum;
  @Expose()
  readonly shopId: string;
  @Expose()
  readonly shopName: string;
}

export class FindPermissionResult implements IQueryResult {
  @Expose()
  readonly items: Readonly<FindPermissionResultItem>[];
  @Expose()
  readonly total: number;
}
