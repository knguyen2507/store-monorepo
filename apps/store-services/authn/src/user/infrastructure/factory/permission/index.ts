import { Permissions } from '@prisma/client/authn';
import { PermissionModel } from '../../../domain/model/permissions';
import { BaseFactory } from '../base';

export class PermissionFactory extends BaseFactory {
  createPermissionModel(permission: Permissions | null) {
    if (!permission) return null;

    const entity = this.createModel(PermissionModel, {
      ...permission,
    });

    return entity;
  }

  createPermissionModels(permissions: Permissions[] | null) {
    if (!permissions) return null;

    return permissions.map((a) => this.createPermissionModel(a));
  }
}
