import { Controller, Get, Inject } from '@nestjs/common';
import { AccidentService } from './accident/accident.service';
import { FuelService } from './fuel/fuel.service';
import { RunService } from './run/run.service';
import { MaintenanceService } from './maintenance/maintenance.service';

@Controller('record')
export class RecordController {
  @Inject()
  private readonly accidentService: AccidentService;
  @Inject()
  private readonly fuelService: FuelService;
  @Inject()
  private readonly runService: RunService;
  @Inject()
  private readonly maintenanceService: MaintenanceService;

  @Get('home')
  async getRecentRecord() {
    const accident = await this.accidentService.findAccident();
    const run = await this.runService.findRun();
    const fuel = await this.fuelService.findFuel();
    const maintenance = await this.maintenanceService.findMaintenance();

    return { accident, run, fuel, maintenance };
  }
}

// 온보딩
