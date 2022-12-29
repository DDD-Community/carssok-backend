import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';

@Injectable()
export class SimpleAuthMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    const headers = req.headers;
    if (
      !headers.hasOwnProperty('device_id') &&
      !headers.hasOwnProperty('user_token')
    ) {
      throw new HttpException(
        '필수 Header가 존재하지 않습니다.',
        HttpStatus.UNAUTHORIZED,
      );
    }

    next();
  }
}
