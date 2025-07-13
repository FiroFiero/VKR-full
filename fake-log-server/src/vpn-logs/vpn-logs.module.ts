import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VpnLog } from './vpn-log.entity';
import { VpnLogsService } from './vpn-logs.service';
import { VpnLogsController } from './vpn-logs.controller';

@Module({
  imports: [TypeOrmModule.forFeature([VpnLog])],
  providers: [VpnLogsService],
  controllers: [VpnLogsController],
})
export class VpnLogsModule {}
