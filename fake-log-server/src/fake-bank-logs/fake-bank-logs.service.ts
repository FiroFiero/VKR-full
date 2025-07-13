import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FakeBankLog } from './fake-bank-log.entity';

@Injectable()
export class FakeBankLogsService {
  constructor(
    @InjectRepository(FakeBankLog)
    private fakeBankLogsRepository: Repository<FakeBankLog>,
  ) {}

  async create(type: string, data: any) {
    const log = this.fakeBankLogsRepository.create({ type, data });
    return this.fakeBankLogsRepository.save(log);
  }

  async findAll() {
    return this.fakeBankLogsRepository.find({ order: { timestamp: 'DESC' } });
  }

  async clear() {
    await this.fakeBankLogsRepository.clear();
    await this.fakeBankLogsRepository.query(
      `ALTER SEQUENCE fake_bank_logs_id_seq RESTART WITH 1`,
    );
  }
}
