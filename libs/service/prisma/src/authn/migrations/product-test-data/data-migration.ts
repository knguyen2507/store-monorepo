import { faker } from '@faker-js/faker';
import { PrismaClient } from '@prisma/client/store';
import { ObjectId } from 'bson';
import * as moment from 'moment';

const prisma = new PrismaClient();

async function main() {
  await prisma.$transaction(async (tx) => {
    const products = await tx.products.findMany();

    if (products.length === 0) {
      const [brands, categories] = await Promise.all([
        tx.brands.findMany(),
        tx.categories.findMany(),
        tx.users.findMany(),
      ]);

      const InitialProduct = [];
      for (let i = 1; i <= 100; i++) {
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

        InitialProduct.push({
          name: `${category.name} ${brand.name} ${i}`,
          productCode: `test-product-${i}`,
          qty: faker.number.int({ min: 0, max: 5 }),
          categoryId: category.id,
          brandId: brand.id,
          price: faker.number.int({ min: 10, max: 500 }),
          thumbnailLink,
          description,
          images,
          created: moment().toDate(),
        });
      }
      await tx.products.createMany({
        data: InitialProduct,
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
