import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity('keylogger_logs')
export class KeyloggerLog {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  event: string;

  @Column({ nullable: true })
  deviceId: string;

  @CreateDateColumn()
  timestamp: Date;
}
