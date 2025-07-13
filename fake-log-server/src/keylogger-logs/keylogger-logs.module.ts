import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { KeyloggerLog } from './keylogger-log.entity';
import { KeyloggerLogsService } from './keylogger-logs.service';
import { KeyloggerLogsController } from './keylogger-logs.controller';

@Module({
  imports: [TypeOrmModule.forFeature([KeyloggerLog])],
  providers: [KeyloggerLogsService],
  controllers: [KeyloggerLogsController],
})
export class KeyloggerLogsModule {}
