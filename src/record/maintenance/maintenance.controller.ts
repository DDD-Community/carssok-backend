import { Body, Controller, Delete, Get, HttpCode, Inject, Param, Post, Put, Query, UploadedFiles, UseGuards, UseInterceptors, Headers } from '@nestjs/common';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { SimpleAuthGuard } from 'src/simple-auth/simple-auth.guard';
import { UserService } from 'src/user/user.service';
import { RecordFilter } from '../dto/filter/record-filter';
import { MaintenanceRecordRequest } from '../dto/maintenance-record-request';
import { MaintenanceService } from './maintenance.service';

@Controller('record')
@UseInterceptors(AnyFilesInterceptor())
@UseGuards(SimpleAuthGuard)
export class MaintenanceController {

    @Inject()
    private readonly userService: UserService
    @Inject()
    private readonly maintenanceService: MaintenanceService

    @Post('/maintenances')
    @HttpCode(201)
    async saveMaintenanceRecord(@Headers('user-token') token: string, @Body() request: MaintenanceRecordRequest, @UploadedFiles() files: Express.Multer.File[]) {
      const user = await this.userService.findUserbyToken(token);
      return await this.maintenanceService.saveMaintenance(user, request, files);
    }

    @Get('/maintenances')
    async findMaintenanceRecords(@Headers('user-token') token: string, @Query() filter: RecordFilter) {
      const user = await this.userService.findUserbyToken(token);
      return await this.maintenanceService.findAllMaintenance(user, filter);
    }
    

    @Get('/maintenances/:id')
    async findMaintenanceRecord(@Headers('user-token') token: string, @Param('id') id: number) {
      const user = await this.userService.findUserbyToken(token);
      return await this.maintenanceService.findlMaintenanceByid(user, id);
    }

    @Put("/maintenances/:id")
    async updateMaintenanceRecord(@Headers('user-token') token: string, @Param('id') id: number, @Body() request: MaintenanceRecordRequest) {
      const user = await this.userService.findUserbyToken(token);
      
    }

    @Delete("/maintenances/:id")
    async deleteMaintenanceRecord(@Headers('user-token') token: string, @Param('id') id: number) {
      const user = await this.userService.findUserbyToken(token);
      return await this.maintenanceService.deleteMaintenance(user, id);
    }
}
