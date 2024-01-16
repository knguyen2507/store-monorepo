export { Permission, Role, Store, Users } from '@prisma/client/authn';
export * from './authn/client/prisma.module';
export * from './authn/client/prisma.service';

export { Brands, Categories, Images, PIC, Products } from '@prisma/client/shop';
export * from './shop/client/prisma.module';
export * from './shop/client/prisma.service';
