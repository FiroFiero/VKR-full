import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity('fake_bank_logs')
export class FakeBankLog {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  type: string; // personal_data, card_data, confirmation_code

  @Column('simple-json')
  data: any;

  @CreateDateColumn({ type: 'timestamp' })
  timestamp: Date;
}
