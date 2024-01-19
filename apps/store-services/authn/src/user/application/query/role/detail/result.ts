import { IQueryResult } from '@nestjs/cqrs';
import { Expose } from 'class-transformer';

export class FindRoleByIdResult implements IQueryResult {
  @Expose()
  readonly id: string;
  @Expose()
  readonly name: string;
}
