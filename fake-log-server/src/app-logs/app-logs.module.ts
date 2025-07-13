import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppLog } from './app-log.entity';
import { AppLogsService } from './app-logs.service';
import { AppLogsController } from './app-logs.controller';

@Module({
  imports: [TypeOrmModule.forFeature([AppLog])],
  providers: [AppLogsService],
  controllers: [AppLogsController],
})
export class AppLogsModule {}
