import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Between, Repository } from 'typeorm';
import { Accident } from '../entities/accident.entity';

@Injectable()
export class AccidentService {
  @InjectRepository(Accident)
  private readonly accidentRepository: Repository<Accident>;

  async saveAccident(user: User, request) {
    const result = await this.accidentRepository.insert({
      user: user,
    });
  }

  async findAllAccident(user: User, filter: any) {
    const accident = await this.accidentRepository.find({
      where: {
        user: user,
        ...(filter.date && {
          eventedAt: Between(
            filter.date,
            filter.date.setMonth(filter.date.getMonth()),
          ),
        }),
      },
    });
    return accident;
  }

  async findAccidnetByid(user: User, id: number) {
    const accident = await this.accidentRepository.findOneBy({
      user: user,
      id: id,
    });
    return accident;
  }

  async updateAccidentById(user: User, id: number, request) {}

  async deleteAccidentById(user: User, id: number) {
    const result = await this.accidentRepository.softDelete({
      id: id,
      user: user,
    });
    return result.generatedMaps;
  }
}
