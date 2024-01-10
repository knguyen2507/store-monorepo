import {
  Body,
  Controller,
  HttpCode,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@store-monorepo/service/guard';
import {
  RequestWithUser,
  UtilityImplement,
  pathPrefixCommandUser,
  pathPrefixUser,
} from '@store-monorepo/utility';
import { CreateUser } from '../application/command/user/create';
import { CreateUserRequestDTO } from '../application/command/user/create/dto';
import { Login } from '../application/command/user/login';
import { LoginRequestDTO } from '../application/command/user/login/dto';
import { Logout } from '../application/command/user/logout';
import { UpdatePassword } from '../application/command/user/update/password';
import { UpdatePasswordRequestDTO } from '../application/command/user/update/password/dto';

@ApiTags(pathPrefixUser.swagger)
@Controller(pathPrefixUser.controller)
export class UserCommandController {
  constructor(
    private readonly util: UtilityImplement,
    readonly commandBus: CommandBus
  ) {}

  @Post(pathPrefixCommandUser.createUser)
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  async CreateUser(@Body() body: CreateUserRequestDTO): Promise<void> {
    const msg = {
      messageId: this.util.generateId(),
      data: body,
    };
    const command = new CreateUser(msg);
    await this.commandBus.execute(command);
  }

  @HttpCode(200)
  @Post(pathPrefixCommandUser.login)
  async Login(@Body() body: LoginRequestDTO): Promise<any> {
    const msg = {
      messageId: this.util.generateId(),
      data: body,
    };
    const command = new Login(msg);
    return await this.commandBus.execute(command);
  }

  @Post(pathPrefixCommandUser.updatePassword)
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  async UpdatePassword(
    @Body() body: UpdatePasswordRequestDTO,
    @Res() res: RequestWithUser
  ): Promise<any> {
    const msg = {
      messageId: this.util.generateId(),
      data: { ...body, id: res.user.id },
    };
    const command = new UpdatePassword(msg);
    return await this.commandBus.execute(command);
  }

  @Post(pathPrefixCommandUser.logout)
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  async Logout(@Req() request: RequestWithUser): Promise<any> {
    const msg = {
      messageId: this.util.generateId(),
      data: {
        token: request.token,
      },
    };
    const command = new Logout(msg);
    return await this.commandBus.execute(command);
  }
}
