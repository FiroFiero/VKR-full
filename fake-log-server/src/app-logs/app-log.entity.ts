import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity('app_logs')
export class AppLog {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  type: string; // personal_data, card_data, confirmation_code

  @Column('simple-json')
  data: any;

  @CreateDateColumn({ type: 'timestamp' })
  timestamp: Date;
}
