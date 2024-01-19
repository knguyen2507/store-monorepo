import { IQueryResult } from '@nestjs/cqrs';
import { Expose } from 'class-transformer';
import { FindPermissionByIdResult } from '../../permission/detail/result';

export class FindRoleResultItem {
  @Expose()
  readonly id: string;
  @Expose()
  readonly name: string;
  @Expose()
  readonly permission: FindPermissionByIdResult[];
}

export class FindRoleResult implements IQueryResult {
  @Expose()
  readonly items: Readonly<FindRoleResultItem>[];
  @Expose()
  readonly total: number;
}
