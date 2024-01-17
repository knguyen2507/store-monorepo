import { Permission } from '@prisma/client/authn';
import { PermissionModel } from '../../../domain/model/permissions';
import { BaseFactory } from '../base';

export class PermissionFactory extends BaseFactory {
  createPermissionModel(permission: Permission | null) {
    if (!permission) return null;

    const entity = this.createModel(PermissionModel, {
      ...permission,
    });

    return entity;
  }

  createPermissionModels(permissions: Permission[] | null) {
    if (!permissions) return null;

    return permissions.map((a) => this.createPermissionModel(a));
  }
}
