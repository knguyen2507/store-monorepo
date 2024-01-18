import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@store-monorepo/service/guard';
import {
  CreateRoleRequestDTO,
  UtilityImplement,
  pathPrefixCommandRole,
  pathPrefixRole,
} from '@store-monorepo/utility';
import { CreateRole } from '../application/command/role/create';

@ApiTags(pathPrefixRole.swagger)
@Controller(pathPrefixRole.controller)
export class RoleCommandController {
  constructor(
    private readonly util: UtilityImplement,
    readonly commandBus: CommandBus
  ) {}

  @Post(pathPrefixCommandRole.createRole)
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  async CreateRole(@Body() body: CreateRoleRequestDTO): Promise<void> {
    const msg = {
      messageId: this.util.generateId(),
      data: body,
    };
    const command = new CreateRole(msg);
    await this.commandBus.execute(command);
  }
}
