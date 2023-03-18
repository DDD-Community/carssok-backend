import {
  Body,
  Controller,
  Get,
  HttpException,
  Inject,
  Post,
  Req,
} from '@nestjs/common';
import { Device } from 'src/user/entities/device.entity';
import { UserService } from 'src/user/user.service';
import { encryptionUtills } from 'src/utils/encryption';

@Controller('auth')
export class SimpleAuthController {
  @Inject(UserService)
  private readonly userService: UserService;

  @Get()
  async getAuthorization(@Req() request) {
    const id = request.headers['device-id'];
    const device: Device = await this.userService.findDeviceId(id);

    try {
      if (device.user) {
        const user = await device.user;
        const encrypt = await encryptionUtills.encrypt(user.user_id.toString());
        return { useToken: encrypt };
      }
    } catch (err) {
      throw new HttpException('일치하는 유저가 존재하지 않습니다.', 410);
    }
  }

  @Post()
  async registerDevice(@Body() body) {
    const id = body['device_id'];
    const user = await this.userService.saveDevice(id);
    const encrypt = await encryptionUtills.encrypt(user.user_id.toString());
    return { useToken: encrypt };
  }
}
