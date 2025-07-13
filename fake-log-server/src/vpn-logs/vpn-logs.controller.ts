import { Controller, Post, Body, Get, Delete } from '@nestjs/common';
import { VpnLogsService } from './vpn-logs.service';
import { VpnLog } from './vpn-log.entity';

@Controller('vpn-logs')
export class VpnLogsController {
  constructor(private readonly vpnLogsService: VpnLogsService) {}

  @Post()
  async create(@Body() body: Partial<VpnLog>) {
    return this.vpnLogsService.create(body);
  }

  @Get()
  async findAll() {
    return this.vpnLogsService.findAll();
  }

  @Delete()
  async clear() {
    return this.vpnLogsService.clear();
  }
}
