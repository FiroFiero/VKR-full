import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AppLog } from './app-log.entity';

@Injectable()
export class AppLogsService {
  constructor(
    @InjectRepository(AppLog)
    private appLogsRepository: Repository<AppLog>,
  ) {}

  async create(type: string, data: any) {
    const log = this.appLogsRepository.create({ type, data });
    return this.appLogsRepository.save(log);
  }

  async findAll() {
    return this.appLogsRepository.find({ order: { timestamp: 'DESC' } });
  }

  async clear() {
    await this.appLogsRepository.clear();
    await this.appLogsRepository.query(
      `ALTER SEQUENCE app_logs_id_seq RESTART WITH 1`,
    );
  }
}
