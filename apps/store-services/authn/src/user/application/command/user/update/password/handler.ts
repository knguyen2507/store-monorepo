import { BadRequestException, Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UtilityImplement } from '@store-monorepo/utility';
import { UpdatePassword } from '.';
import { UserRepositoryImplement } from '../../../../../infrastructure/repository/user';

@CommandHandler(UpdatePassword)
export class UpdatePasswordHandler
  implements ICommandHandler<UpdatePassword, any>
{
  constructor(private readonly util: UtilityImplement) {}
  @Inject()
  private readonly user: UserRepositoryImplement;

  async execute(command: UpdatePassword): Promise<any> {
    const { id, new_pwd, current_pwd } = command.data;

    const user = await this.user.getById(id);

    if (this.util.passwordVerify(current_pwd, user.password)) {
      user.update({
        password: this.util.passwordHash(new_pwd),
      });
      await this.user.update(user);
      return `password has been changed`;
    }
    throw new BadRequestException(`Wrong password`);
  }
}
