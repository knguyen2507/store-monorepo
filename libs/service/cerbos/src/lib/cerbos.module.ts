import { GRPC as Cerbos } from '@cerbos/grpc';
import { Injectable, Module } from '@nestjs/common';
import { environment } from '@store-monorepo/utility';

@Injectable()
export class CerbosClient {
  connect() {
    return new Cerbos(`${environment.CERBOS_HOST}:${environment.CERBOS_PORT}`, {
      tls: false,
      adminCredentials: {
        username: `${environment.CERBOS_USERNAME}`,
        password: `${environment.CERBOS_PASSWORD}`,
      },
    });
  }
}

@Module({
  controllers: [],
  providers: [CerbosClient],
  exports: [CerbosClient],
})
export class CerbosModule {}
