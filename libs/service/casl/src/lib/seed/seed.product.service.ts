import { faker } from '@faker-js/faker';
import { Inject, Injectable } from '@nestjs/common';
import { ShopPrismaService } from '@store-monorepo/service/prisma';
import {
  InitialShop1,
  InitialShop2,
  InitialUser1,
} from '@store-monorepo/utility';
import { ObjectId } from 'bson';
import moment from 'moment';

@Injectable()
export class SeedProductService {
  constructor(@Inject(ShopPrismaService) private prisma: ShopPrismaService) {}

  seed = async () => {
    const products = await this.prisma.products.findMany();

    if (products.length === 0) {
      const [brands, categories] = await Promise.all([
        this.prisma.brands.findMany(),
        this.prisma.categories.findMany(),
      ]);

      const InitialProduct = [];
      for (let i = 1; i <= 400; i++) {
        const thumbnailLink = {
          id: new ObjectId().toString(),
          name: faker.animal.fish(),
          url: faker.image.urlPicsumPhotos({ width: 1200, height: 900 }),
          isMain: true,
        };
        const images = [];

        images.push(thumbnailLink);
        for (let j = 1; j < faker.number.int({ min: 2, max: 5 }); j++) {
          images.push({
            id: new ObjectId().toString(),
            name: faker.animal.fish(),
            url: faker.image.urlPicsumPhotos({ width: 1200, height: 900 }),
            isMain: false,
          });
        }

        let description = '';
        for (let i = 0; i < faker.number.int({ min: 2, max: 4 }); i++) {
          i === 0
            ? (description += `${faker.animal.bird()}:${faker.lorem.paragraphs({
                min: 1,
                max: 3,
              })}`)
            : (description += `*done*${faker.animal.bird()}:${faker.lorem.paragraphs(
                { min: 1, max: 3 }
              )}`);
        }

        const brand = faker.helpers.arrayElement(brands);
        const category = faker.helpers.arrayElement(categories);
        const shops = [
          {
            id: InitialShop1.id,
            name: InitialShop1.name,
            address: InitialShop1.address,
          },
          {
            id: InitialShop2.id,
            name: InitialShop2.name,
            address: InitialShop2.address,
          },
        ];

        InitialProduct.push(
          this.prisma.products.create({
            data: {
              name: `${category.name} ${brand.name} ${i}`,
              productCode: `test-product-${i}`,
              qty: faker.number.int({ min: 0, max: 5 }),
              categoryId: category.id,
              brandId: brand.id,
              price: faker.number.int({ min: 10, max: 500 }),
              thumbnailLink,
              description,
              images,
              created: {
                id: InitialUser1.id,
                username: InitialUser1.username,
                at: moment().toDate(),
              },
              shop: faker.helpers.arrayElement(shops),
            },
          })
        );
      }
      this.prisma.$transaction(InitialProduct);
    }
  };
}
