import { PrismaClient } from '@prisma/client/store';
import * as bcrypt from 'bcrypt';
import { ObjectId } from 'bson';
import * as moment from 'moment';

const prisma = new PrismaClient();

const InitialBrand = [
  {
    id: new ObjectId().toString(),
    name: 'samsung',
    brandCode: 'samsung',
    thumbnailLink:
      'https://cdn.iconscout.com/icon/free/png-256/free-samsung-226432.png?f=webp',
    created: moment().toDate(),
    updated: [],
  },
  {
    id: new ObjectId().toString(),
    name: 'toshiba',
    brandCode: 'toshiba',
    thumbnailLink:
      'https://cdn.iconscout.com/icon/free/png-256/free-toshiba-226434.png',
    created: moment().toDate(),
    updated: [],
  },
  {
    id: new ObjectId().toString(),
    name: 'lg',
    brandCode: 'lg',
    thumbnailLink:
      'https://cdn4.iconfinder.com/data/icons/flat-brand-logo-2/512/lg-512.png',
    created: moment().toDate(),
    updated: [],
  },
  {
    id: new ObjectId().toString(),
    name: 'mutoshi',
    brandCode: 'mutoshi',
    thumbnailLink: 'https://mutosi.com/images/logo-2022.png',
    created: moment().toDate(),
    updated: [],
  },
  {
    id: new ObjectId().toString(),
    name: 'sunhouse',
    brandCode: 'sunhouse',
    thumbnailLink:
      'https://upload.wikimedia.org/wikipedia/vi/e/ed/Logo_cong_ty_sunhouse.png',
    created: moment().toDate(),
    updated: [],
  },
  {
    id: new ObjectId().toString(),
    name: 'khác',
    brandCode: 'khac',
    thumbnailLink: 'https://static.thenounproject.com/png/2821166-200.png',
    created: moment().toDate(),
    updated: [],
  },
];

const InitialCategory = [
  {
    id: new ObjectId().toString(),
    name: 'tv',
    categoryCode: 'tv',
    thumbnailLink:
      'https://i.pinimg.com/originals/9e/d8/61/9ed86194c90b60ad5ce0e14fdb1b97d5.png',
    created: moment().toDate(),
    updated: [],
  },
  {
    id: new ObjectId().toString(),
    name: 'tủ lạnh',
    categoryCode: 'tu-lanh',
    thumbnailLink:
      'https://static.vecteezy.com/system/resources/previews/018/777/993/original/refrigerator-logo-icon-vector.jpg',
    created: moment().toDate(),
    updated: [],
  },
  {
    id: new ObjectId().toString(),
    name: 'máy giặt',
    categoryCode: 'may-giat',
    thumbnailLink:
      'https://static.vecteezy.com/system/resources/previews/009/458/554/original/washing-machine-icon-logo-design-template-vector.jpg',
    created: moment().toDate(),
    updated: [],
  },
  {
    id: new ObjectId().toString(),
    name: 'nệm',
    categoryCode: 'nem',
    thumbnailLink:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSTd_05i_Vhj92vyv1ie2HGhoP1mj2QwKauug&usqp=CAU',
    created: moment().toDate(),
    updated: [],
  },
  {
    id: new ObjectId().toString(),
    name: 'đồ gỗ',
    categoryCode: 'do-go',
    thumbnailLink:
      'https://i.pinimg.com/736x/7c/3e/ff/7c3eff5ee208ca917337fa2a1d8f7a71.jpg',
    created: moment().toDate(),
    updated: [],
  },
  {
    id: new ObjectId().toString(),
    name: 'khác',
    categoryCode: 'khac',
    thumbnailLink: 'https://static.thenounproject.com/png/2821166-200.png',
    created: moment().toDate(),
    updated: [],
  },
];

const InitialUser = [
  {
    id: new ObjectId().toString(),
    name: 'Admin 1',
    phone: '0123456789',
    username: 'admin001',
    password: bcrypt.hashSync('123456', 10),
    created: moment().toDate(),
  },
  {
    id: new ObjectId().toString(),
    name: 'Admin 2',
    phone: '0987654321',
    username: 'admin002',
    password: bcrypt.hashSync('abc12345', 10),
    created: moment().toDate(),
  },
];

async function main() {
  await prisma.$transaction(async (tx) => {
    const [brands, categories, users] = await Promise.all([
      tx.brands.findMany(),
      tx.categories.findMany(),
      tx.users.findMany(),
    ]);
    if (users.length === 0) {
      await tx.users.createMany({
        data: InitialUser,
      });
    }
    if (brands.length === 0) {
      await tx.brands.createMany({
        data: InitialBrand,
      });
    }
    if (categories.length === 0) {
      await tx.categories.createMany({
        data: InitialCategory,
      });
    }
  });
}

main()
  .catch(async (e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => await prisma.$disconnect());
