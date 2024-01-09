import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Global, Inject, Injectable, Module } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { RedisModule } from '@store-monorepo/service/redis';
import * as bcrypt from 'bcrypt';
import { ObjectId } from 'bson';
import { Cache } from 'cache-manager';
import { environment } from '../const/environment';
import { UserInterface } from '../interface/user.interface';

@Injectable()
export class UtilityImplement {
  constructor(
    private readonly jwtService: JwtService,
    @Inject(CACHE_MANAGER) private readonly redis: Cache
  ) {}

  generateId() {
    return new ObjectId().toString();
  }

  passwordHash(password: string) {
    return bcrypt.hashSync(password, 10);
  }

  passwordVerify(plainPass: string, hashedPass: string): boolean {
    return bcrypt.compareSync(plainPass, hashedPass);
  }

  generateAccessToken(user: UserInterface): string {
    return this.jwtService.sign(
      { user },
      {
        secret: environment.JWT_ACCESS_SECRET,
        expiresIn: `${environment.JWT_ACCESS_EXPIRE}d`,
      }
    );
  }

  generateRefreshToken(user: UserInterface): string {
    return this.jwtService.sign(
      { user },
      {
        secret: environment.JWT_REFRESH_SECRET,
        expiresIn: `${environment.JWT_REFRESH_EXPIRE}d`,
      }
    );
  }

  verifyAccessToken(token: string): any {
    return this.jwtService.verify(token, {
      secret: environment.JWT_ACCESS_SECRET,
    });
  }

  verifyRefreshToken(token: string): any {
    return this.jwtService.verify(token, {
      secret: environment.JWT_REFRESH_SECRET,
    });
  }

  async setRefreshToken(accessToken: string, refreshToken: string) {
    await this.redis.set(accessToken, refreshToken, {
      ttl: environment.JWT_REFRESH_EXPIRE * 24 * 3600,
    } as any);
  }

  async deleteRefreshToken(id: string) {
    await this.redis.del(id);
  }

  async getRedisKey(key: string): Promise<string | undefined> {
    return await this.redis.get(key);
  }

  async setBlackListToken(key: string, value: string) {
    await this.redis.set(key, value, {
      ttl: environment.JWT_ACCESS_EXPIRE * 24 * 3600,
    } as any);
  }
}

@Global()
@Module({
  imports: [JwtModule.register({}), RedisModule],
  providers: [UtilityImplement],
  exports: [UtilityImplement],
})
export class UtilityModule {}
