# StoreMonorepo

## Tạo 1 app hoặc lib mới

Tạo 1 app mới (Angular)

```
pnpm nx g @nx/angular:application <appName> --port=<portNumber> --directory=apps/template/<appName>
```

Tạo 1 app mới (NestJS)

```
pnpm nx g @nx/nest:apps <appName> --directory=apps/<appName>
```

Tạo 1 lib mới

```
nx g @nx/angular:library <libName> --directory=libs/<libName>
```

## Sử dụng Prisma

Generate Prisma Client

```
pnpm nx run prisma:generate-all
```

## Chạy chương trình

Chạy 1 app

```
pnpm nx serve <appName>
```

Chạy nhiều app (tối đa 3 app mỗi dòng lệnh)

```
pnpm nx run-many -t serve -p <appName1> <appName2> ...
```

Chạy tất cả app

```
pnpm nx run-many -t serve --all
```
