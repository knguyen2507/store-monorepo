import { Roles } from '@prisma/client/authn';
import { RoleModel } from '../../../domain/model/roles';
import { BaseFactory } from '../base';

export class RoleFactory extends BaseFactory {
  createRoleModel(role: Roles | null) {
    if (!role) return null;

    const entity = this.createModel(RoleModel, {
      ...role,
    });

    return entity;
  }

  createRoleModels(roles: Roles[] | null) {
    if (!roles) return null;

    return roles.map((a) => this.createRoleModel(a));
  }
}
