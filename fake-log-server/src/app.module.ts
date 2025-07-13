import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LogsModule } from './logs/logs.module';
import { VpnLogsModule } from './vpn-logs/vpn-logs.module';
import { KeyloggerLogsModule } from './keylogger-logs/keylogger-logs.module';
import { FakeBankLogsModule } from './fake-bank-logs/fake-bank-logs.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'root',
      database: 'fake_app_db',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    LogsModule,
    VpnLogsModule,
    KeyloggerLogsModule,
    FakeBankLogsModule,
  ],
})
export class AppModule {}
