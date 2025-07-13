import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FakeBankLog } from './fake-bank-log.entity';
import { FakeBankLogsService } from './fake-bank-logs.service';
import { FakeBankLogsController } from './fake-bank-logs.controller';

@Module({
  imports: [TypeOrmModule.forFeature([FakeBankLog])],
  providers: [FakeBankLogsService],
  controllers: [FakeBankLogsController],
})
export class FakeBankLogsModule {}
