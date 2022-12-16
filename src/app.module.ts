import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { HelloController } from './hello/hello.controller';

@Module({
  // imports: [
  //   TypeOrmModule.forRoot({
  //     type: 'mysql',
  //     host: process.env.MYSQL_DATABASE,
  //     port: 3306,
  //     username: process.env.MYSQL_USERNAME,
  //     password: process.env.MYSQL_PASSWORD,
  //     database: process.env.MYSQL_DATABASE,
  //     entities: [],
  //     synchronize: true,
  //   })
  // ],
  controllers: [HelloController],
  providers: [],
})
export class AppModule {
  // constructor(private readonly dataSource:DataSource){}
}
