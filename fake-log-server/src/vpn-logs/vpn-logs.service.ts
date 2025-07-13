import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { VpnLog } from './vpn-log.entity';

@Injectable()
export class VpnLogsService {
  constructor(
    @InjectRepository(VpnLog)
    private vpnLogsRepository: Repository<VpnLog>,
  ) {}

  async create(logDto: Partial<VpnLog>) {
    const log = this.vpnLogsRepository.create(logDto);
    return this.vpnLogsRepository.save(log);
  }

  async findAll() {
    return this.vpnLogsRepository.find({ order: { createdAt: 'DESC' } });
  }

  async clear() {
    await this.vpnLogsRepository.clear();
    await this.vpnLogsRepository.query(
      `ALTER SEQUENCE vpn_logs_id_seq RESTART WITH 1`,
    );
  }
}
