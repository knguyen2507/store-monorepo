import { IQueryResult } from '@nestjs/cqrs';
import { ActionEnum, StatusEnum } from '@prisma/client/authn';
import { Expose } from 'class-transformer';

export class FindPermissionByIdResult implements IQueryResult {
  @Expose()
  readonly id: string;
  @Expose()
  readonly name: string;
  @Expose()
  readonly status: StatusEnum;
  @Expose()
  readonly action: ActionEnum;
}
