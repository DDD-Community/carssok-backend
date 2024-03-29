import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { encryptionUtills } from 'src/utils/encryption';
import { Repository } from 'typeorm';
import { Device } from './entities/device.entity';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  @InjectRepository(User)
  private readonly userRepository: Repository<User>;
  @InjectRepository(Device)
  private readonly deviceRepository: Repository<Device>;

  async findDeviceId(token: string): Promise<Device> {
    return this.deviceRepository
      .createQueryBuilder('device')
      .leftJoinAndSelect('device.user', 'user')
      .where('device.device_token = :device_token', { device_token: token })
      .getOne();
  }

  async findUserbyToken(token: string): Promise<User> {
    const userId = parseInt(await encryptionUtills.decrypt(token));
    return this.findUserId(userId);
  }

  async findUserId(id: number): Promise<User> {
    return this.userRepository.findOne({
      where: { user_id: id },
    });
  }

  async isUser(id: number): Promise<boolean> {
    return (
      this.userRepository.findOne({
        where: { user_id: id },
      }) != null
    );
  }

  async isDevice(id: string): Promise<boolean> {
    const device = await this.deviceRepository.findOne({
      where: { device_token: id },
    });
    return device != null;
  }

  async saveDevice(id: string): Promise<User> {
    try {
      if (await this.isDevice(id)) throw new Error();
      const user: User = await this.userRepository.save(new User());
      this.deviceRepository.insert({ device_token: id, user: user });
      return user;
    } catch (error) {
      throw new HttpException('이미 등록된 Device 입니다.', 413);
    }
  }
}
