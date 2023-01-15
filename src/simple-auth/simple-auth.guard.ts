import {
  CanActivate,
  ExecutionContext,
  HttpException,
  Inject,
  Injectable,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { UserService } from 'src/user/user.service';
import { encryptionUtills } from 'src/utils/encryption';

@Injectable()
export class SimpleAuthGuard implements CanActivate {
  @Inject(UserService)
  private readonly userService: UserService;

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    try {
      return this.validateUser(request);
    } catch (error) {}
  }

  async validateUser(request: any): Promise<boolean> {
    const userId = parseInt(
      await encryptionUtills.decrypt(request.headers['user-token']),
    );
    if (Number.isNaN(userId))
      throw new HttpException('존재하지 않는 유저입니다.', 411);
    return await this.userService.isUser(userId);
  }
}
