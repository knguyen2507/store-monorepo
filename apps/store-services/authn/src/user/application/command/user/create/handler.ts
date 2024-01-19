import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UtilityImplement } from '@store-monorepo/utility';
import moment from 'moment';
import { CreateUser } from '.';
import { UserFactory } from '../../../../infrastructure/factory/user';
import { ProfileRepositoryImplement } from '../../../../infrastructure/repository/profile';
import { UserRepositoryImplement } from '../../../../infrastructure/repository/user';

@CommandHandler(CreateUser)
export class CreateUserHandler implements ICommandHandler<CreateUser, void> {
  constructor(private readonly util: UtilityImplement) {}
  @Inject()
  private readonly factory: UserFactory;
  @Inject()
  private readonly user: UserRepositoryImplement;
  @Inject()
  private readonly profile: ProfileRepositoryImplement;

  async execute(command: CreateUser): Promise<void> {
    const created = moment().toDate();
    const { password, roleId, ...data } = command.data;

    const [id, hashPwd] = [
      this.util.generateId(),
      this.util.passwordHash(password),
    ];

    const model = await this.factory.createUserModel({
      ...data,
      password: hashPwd,
      created,
      id,
    });

    const profiles = await this.profile.getByRoleId(roleId);

    await this.user.save(model);
    await this.profile.updateUserId(id, profiles);
  }
}
