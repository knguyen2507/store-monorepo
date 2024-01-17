import { Role } from '@prisma/client/authn';
import { RoleModel } from '../../../domain/model/roles';
import { BaseFactory } from '../base';

export class RoleFactory extends BaseFactory {
  createRoleModel(role: Role | null) {
    if (!role) return null;

    const entity = this.createModel(RoleModel, {
      ...role,
    });

    return entity;
  }

  createRoleModels(roles: Role[] | null) {
    if (!roles) return null;

    return roles.map((a) => this.createRoleModel(a));
  }
}
