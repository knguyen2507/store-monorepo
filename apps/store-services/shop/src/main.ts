import {
  ClassSerializerInterceptor,
  Logger,
  ValidationPipe,
} from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { environment, pathPrefixSwagger } from '@store-monorepo/utility';
import compression from 'compression';
import helmet from 'helmet';
import { AppModule } from './app.module';

const GLOBAL_PREFIX = 'msx-shop';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix(GLOBAL_PREFIX);

  app.enableCors();
  app.use(helmet());
  app.use(compression());
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    })
  );
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  const config = new DocumentBuilder()
    .setTitle(`Store ${GLOBAL_PREFIX} API`)
    .setDescription(
      `Store ${GLOBAL_PREFIX} API | Environment ${environment.NODE_ENV}`
    )
    .setVersion('0.1')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(
    `${GLOBAL_PREFIX}/${pathPrefixSwagger.setup}`,
    app,
    document
  );

  await app.listen(environment.PORT);
  Logger.log(`App ${environment.APPNAME} listen on port ${environment.PORT}`);
}
bootstrap();
