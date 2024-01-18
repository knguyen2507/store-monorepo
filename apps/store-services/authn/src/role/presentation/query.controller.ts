import { Controller, UseGuards } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@store-monorepo/service/guard';
import { UtilityImplement, pathPrefixRole } from '@store-monorepo/utility';

@ApiTags(pathPrefixRole.swagger)
@Controller(pathPrefixRole.controller)
@UseGuards(AuthGuard)
@ApiBearerAuth()
export class RoleQueryController {
  constructor(
    private readonly util: UtilityImplement,
    readonly queryBus: QueryBus
  ) {}
}
