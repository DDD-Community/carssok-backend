import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Device } from './entities/device.entity';
import { User } from './entities/user.entity';
import { UserCar } from './entities/user_car.entity';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
        @InjectRepository(Device)
        private deviceRepository: Repository<Device>,
        @InjectRepository(UserCar)
        private userCarRepository: Repository<UserCar>         
    ) {}

    async findDeviceId(token: string): Promise<Device> { 
        return this.deviceRepository.createQueryBuilder("device").leftJoinAndSelect("device.user" , "user").where("device.device_token = :device_token",{device_token: token}).getOne()
    }

}
