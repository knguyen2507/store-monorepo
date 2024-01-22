import { ActionEnum } from '@store-monorepo/service/prisma';

export const permissionResource = {
  root: 'permission',
  attributes: [{ kind: 'list', action: ActionEnum.READ }],
};

export const roleResource = {
  root: 'role',
  attributes: [
    { kind: 'list', action: ActionEnum.READ },
    { kind: 'create', action: ActionEnum.CREATE },
  ],
};

export const shopResource = {
  root: 'shop',
  attributes: [
    { kind: 'list', action: ActionEnum.READ },
    { kind: 'object', action: ActionEnum.READ },
    { kind: 'create', action: ActionEnum.CREATE },
    { kind: 'update', action: ActionEnum.UPDATE },
  ],
};

export const userResource = {
  root: 'user',
  attributes: [
    { kind: 'list', action: ActionEnum.READ },
    { kind: 'object', action: ActionEnum.READ },
    { kind: 'create', action: ActionEnum.CREATE },
    { kind: 'update', action: ActionEnum.UPDATE },
  ],
};
