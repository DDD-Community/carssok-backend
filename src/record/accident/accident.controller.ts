import { Body, Controller, Delete, Get, Inject, Param, Post, Put, UseGuards, Headers, HttpCode, Query, UseInterceptors, UploadedFiles } from '@nestjs/common';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { SimpleAuthGuard } from 'src/simple-auth/simple-auth.guard';
import { UserService } from 'src/user/user.service';
import { AccidentRecordRequest } from '../dto/accident-record-request';
import { RecordFilter } from '../dto/filter/record-filter';
import { AccidentService } from './accident.service';

@Controller('record')
@UseInterceptors(AnyFilesInterceptor())
@UseGuards(SimpleAuthGuard)
export class AccidentController {
    
    @Inject()
    private readonly userService: UserService
    @Inject()
    private readonly accidentService: AccidentService

    @Post('/accidents')
    @HttpCode(201)
    async saveAccidentRecord(@Headers('user-token') token: string, @Body() request: AccidentRecordRequest, @UploadedFiles() files: Express.Multer.File[]) {
      const user = await this.userService.findUserbyToken(token);
      return await this.accidentService.saveAccident(user, request, files);
    }

    @Get('/accidents')
    async findAccidentRecords(@Headers('user-token') token: string, @Query() filter: RecordFilter) {
      const user = await this.userService.findUserbyToken(token);
      return await this.accidentService.findAllAccident(user, filter);
    }
    

    @Get('/accidents/:id')
    async findAccidentRecord(@Headers('user-token') token: string, @Param('id') id: number) {
      const user = await this.userService.findUserbyToken(token);
      return await this.accidentService.findAccidnetByid(user, id);
    }

    @Put("/accidents/:id")
    async updateAccidentRecord(@Headers('user-token') token: string, @Param('id') id: number, @Body() request: AccidentRecordRequest) {
      const user = await this.userService.findUserbyToken(token);
      
    }

    @Delete("/accidents/:id")
    async deleteAccidentRecord(@Headers('user-token') token: string, @Param('id') id: number) {
      const user = await this.userService.findUserbyToken(token);
      return await this.accidentService.deleteAccidentById(user, id);
    }
}
