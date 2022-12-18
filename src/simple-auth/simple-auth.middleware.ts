import { HttpException, HttpStatus, Inject, Injectable, NestMiddleware } from '@nestjs/common';
// import { UserService } from 'src/user/user.service';


@Injectable()
export class SimpleAuthMiddleware implements NestMiddleware {
  
  // @Inject(UserService)
  // private readonly userService: UserService

  use(req: any, res: any, next: () => void) {
    const headers = req.headers
    if (!headers.hasOwnProperty('device_id') && !headers.hasOwnProperty('user_token')) {
      throw new HttpException('device_id가 존재하지 않습니다.', HttpStatus.FORBIDDEN)
    }
  
    next()
  }
}
