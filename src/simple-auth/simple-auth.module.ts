import { Module } from '@nestjs/common';
import { UserModule } from 'src/user/user.module';
import { SimpleAuthController } from './simple-auth.controller';

@Module({imports:[UserModule], controllers: [SimpleAuthController]})
export class SimpleAuthModule {}
