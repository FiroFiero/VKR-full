import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { KeyloggerLog } from './keylogger-log.entity';

@Injectable()
export class KeyloggerLogsService {
  constructor(
    @InjectRepository(KeyloggerLog)
    private keyloggerLogsRepository: Repository<KeyloggerLog>,
  ) {}

  async create(logDto: Partial<KeyloggerLog>) {
    const log = this.keyloggerLogsRepository.create(logDto);
    return this.keyloggerLogsRepository.save(log);
  }

  async findAll() {
    return this.keyloggerLogsRepository.find({ order: { timestamp: 'DESC' } });
  }

  async clear() {
    await this.keyloggerLogsRepository.clear();
    await this.keyloggerLogsRepository.query(
      `ALTER SEQUENCE keylogger_logs_id_seq RESTART WITH 1`,
    );
  }
}
