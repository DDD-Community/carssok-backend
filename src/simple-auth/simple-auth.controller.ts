import { Controller, Get, HttpStatus, Inject, Post, Req, Res } from '@nestjs/common';
import { Device } from 'src/user/entities/device.entity';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';
import { encryptionUtills } from 'src/utils/encryption';

@Controller('auth')
export class SimpleAuthController {
    @Inject(UserService)
    private readonly userService: UserService

    @Get()
    async getAuthorization(@Req() request){
        const id = request.headers['device_id']
        const device: Device = await this.userService.findDeviceId(id)
        const user = await device.user
        
        const encrypt = await encryptionUtills.encrypt(user.user_id.toString())
        return { useToken: encrypt}
    }

    @Get('d')
    async descrypt(@Req() req) {
        return encryptionUtills.decrypt(req.headers['user_token'])
    }

}
