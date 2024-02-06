import moment from 'moment';

export const InitialRole1 = {
  id: '6502d51ac4841b15cd7756a1',
  name: 'Super Admin 1',
  isSuperAdmin: true,
};
export const InitialRole2 = {
  id: '6502d51ac4841b15cd7756b1',
  name: 'Admin Test 1',
  isSuperAdmin: false,
};
export const InitialRole3 = {
  id: '6502d51ac4841b15cd7756c1',
  name: 'Admin Test 2',
  isSuperAdmin: false,
};

export const InitialShop1 = {
  id: '6502d51ac4841b15cd7756a2',
  name: 'Cửa hàng 1',
  address: 'QL.19B, Thuận Đức, Nhơn Mỹ, An Nhơn, Bình Định',
};
export const InitialShop2 = {
  id: '6502d51ac4841b15cd7756b2',
  name: 'Cửa hàng 2',
  address: 'Tân Đức, Nhơn Mỹ, An Nhơn, Bình Định',
};
export const InitialShop3 = {
  id: '6502d51ac4841b15cd7756c2',
  name: 'Cửa hàng 3',
  address: 'Address 1234',
};
export const InitialShop4 = {
  id: '6502d51ac4841b15cd7756d2',
  name: 'Cửa hàng 4',
  address: 'Address 123456',
};

export const InitialUser1 = {
  id: '6502d51ac4841b15cd7756a3',
  name: 'Super Admin 1',
  phone: '0987654321',
  username: 'sa001',
  password: '$2a$10$UM5he8DexZKyBXhr6RHw3.GyVH5avuqRlRnbScmT5aLAG4iQkeLle', // 123456
  created: moment().toDate(),
  roleId: InitialRole1.id,
};
export const InitialUser2 = {
  id: '6502d51ac4841b15cd7756b3',
  name: 'Test User 1',
  phone: '0164738274',
  username: 'test001',
  password: '$2a$10$UM5he8DexZKyBXhr6RHw3.GyVH5avuqRlRnbScmT5aLAG4iQkeLle', // 123456
  created: moment().toDate(),
  roleId: InitialRole2.id,
};
export const InitialUser3 = {
  id: '6502d51ac4841b15cd7756c3',
  name: 'Test User 2',
  phone: '0164738275',
  username: 'test002',
  password: '$2a$10$RCZZidSRkdoV9xY2BnS5qOvzSOo4KrLfcGsSXZv.8xuCTvkXA5wHq', // abc12345
  created: moment().toDate(),
  roleId: InitialRole3.id,
};

export const InitialBrand = [
  {
    id: `507f191e810c19729de860e1`,
    name: 'samsung',
    brandCode: 'samsung',
    thumbnailLink: 'https://cdn.iconscout.com/icon/free/png-256/free-samsung-226432.png?f=webp',
    created: {
      id: InitialUser1.id,
      username: InitialUser1.username,
      at: moment().toDate(),
    },
    updated: [],
  },
  {
    id: `507f191e810c19729de860e2`,
    name: 'toshiba',
    brandCode: 'toshiba',
    thumbnailLink: 'https://cdn.iconscout.com/icon/free/png-256/free-toshiba-226434.png',
    created: {
      id: InitialUser1.id,
      username: InitialUser1.username,
      at: moment().toDate(),
    },
    updated: [],
  },
  {
    id: `507f191e810c19729de860e3`,
    name: 'lg',
    brandCode: 'lg',
    thumbnailLink: 'https://cdn4.iconfinder.com/data/icons/flat-brand-logo-2/512/lg-512.png',
    created: {
      id: InitialUser1.id,
      username: InitialUser1.username,
      at: moment().toDate(),
    },
    updated: [],
  },
  {
    id: `507f191e810c19729de860e4`,
    name: 'mutoshi',
    brandCode: 'mutoshi',
    thumbnailLink: 'https://mutosi.com/images/logo-2022.png',
    created: {
      id: InitialUser1.id,
      username: InitialUser1.username,
      at: moment().toDate(),
    },
    updated: [],
  },
  {
    id: `507f191e810c19729de860e5`,
    name: 'sunhouse',
    brandCode: 'sunhouse',
    thumbnailLink: 'https://upload.wikimedia.org/wikipedia/vi/e/ed/Logo_cong_ty_sunhouse.png',
    created: {
      id: InitialUser1.id,
      username: InitialUser1.username,
      at: moment().toDate(),
    },
    updated: [],
  },
  {
    id: `507f191e810c19729de860e6`,
    name: 'khác',
    brandCode: 'khac',
    thumbnailLink: 'https://static.thenounproject.com/png/2821166-200.png',
    created: {
      id: InitialUser1.id,
      username: InitialUser1.username,
      at: moment().toDate(),
    },
    updated: [],
  },
];

export const InitialCategory = [
  {
    id: `507f191e810c19729de860f1`,
    name: 'tv',
    categoryCode: 'tv',
    thumbnailLink: 'https://i.pinimg.com/originals/9e/d8/61/9ed86194c90b60ad5ce0e14fdb1b97d5.png',
    created: {
      id: InitialUser1.id,
      username: InitialUser1.username,
      at: moment().toDate(),
    },
    updated: [],
  },
  {
    id: `507f191e810c19729de860f2`,
    name: 'tủ lạnh',
    categoryCode: 'tu-lanh',
    thumbnailLink:
      'https://static.vecteezy.com/system/resources/previews/018/777/993/original/refrigerator-logo-icon-vector.jpg',
    created: {
      id: InitialUser1.id,
      username: InitialUser1.username,
      at: moment().toDate(),
    },
    updated: [],
  },
  {
    id: `507f191e810c19729de860f3`,
    name: 'máy giặt',
    categoryCode: 'may-giat',
    thumbnailLink:
      'https://static.vecteezy.com/system/resources/previews/009/458/554/original/washing-machine-icon-logo-design-template-vector.jpg',
    created: {
      id: InitialUser1.id,
      username: InitialUser1.username,
      at: moment().toDate(),
    },
    updated: [],
  },
  {
    id: `507f191e810c19729de860f4`,
    name: 'nệm',
    categoryCode: 'nem',
    thumbnailLink:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSTd_05i_Vhj92vyv1ie2HGhoP1mj2QwKauug&usqp=CAU',
    created: {
      id: InitialUser1.id,
      username: InitialUser1.username,
      at: moment().toDate(),
    },
    updated: [],
  },
  {
    id: `507f191e810c19729de860f5`,
    name: 'đồ gỗ',
    categoryCode: 'do-go',
    thumbnailLink: 'https://i.pinimg.com/736x/7c/3e/ff/7c3eff5ee208ca917337fa2a1d8f7a71.jpg',
    created: {
      id: InitialUser1.id,
      username: InitialUser1.username,
      at: moment().toDate(),
    },
    updated: [],
  },
  {
    id: `507f191e810c19729de860f6`,
    name: 'khác',
    categoryCode: 'khac',
    thumbnailLink: 'https://static.thenounproject.com/png/2821166-200.png',
    created: {
      id: InitialUser1.id,
      username: InitialUser1.username,
      at: moment().toDate(),
    },
    updated: [],
  },
];
