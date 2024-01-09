import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { UtilityImplement, environment } from '@store-monorepo/service/utility';
import { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly util: UtilityImplement) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    if (environment.GUARD) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException();
    }
    try {
      const payload = this.util.verifyAccessToken(token);
      if (!payload) throw new UnauthorizedException();
      request['user'] = payload.user;
      request['token'] = token;
    } catch {
      throw new UnauthorizedException();
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
