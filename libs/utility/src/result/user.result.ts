import { Expose } from 'class-transformer';

export class UserResult {
  @Expose()
  readonly id!: string;
  @Expose()
  readonly name!: string;
  @Expose()
  readonly phone!: string;
  @Expose()
  readonly username!: string;
  @Expose()
  readonly password!: string;
  @Expose()
  readonly roleId!: string;
  @Expose()
  readonly isSuperAdmin!: boolean;
}
