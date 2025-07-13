import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity('vpn_logs')
export class VpnLog {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  timestamp: string;

  @Column()
  device_id: string;

  @Column()
  src_ip: string;

  @Column()
  dst_ip: string;

  @Column()
  protocol: string;

  @Column()
  payload: string;

  @CreateDateColumn()
  createdAt: Date;
}
