import { InternalServerErrorException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UtilityImplement } from '@store-monorepo/utility';
import { Logout } from '.';

@CommandHandler(Logout)
export class LogoutHandler implements ICommandHandler<Logout, any> {
  constructor(private readonly util: UtilityImplement) {}

  async execute(command: Logout): Promise<any> {
    const token = command.data.token;
    try {
      await Promise.all([
        this.util.deleteRefreshToken(token),
        this.util.setBlackListToken(`blacklist:${token}`, token),
      ]);
    } catch (error) {
      throw new InternalServerErrorException(`Error:::`, error);
    }
  }
}
