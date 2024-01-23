import { ShopModel } from '../../model/shops';

export interface ShopRepository {
  save: (data: ShopModel) => Promise<ShopModel>;
  getAll: () => Promise<ShopModel[]>;
  getById: (id: string) => Promise<ShopModel>;
  getByRoleId: (id: string) => Promise<ShopModel[]>;
  remove: (id: string | string[]) => Promise<void>;
  update: (data: ShopModel) => Promise<ShopModel>;
}
