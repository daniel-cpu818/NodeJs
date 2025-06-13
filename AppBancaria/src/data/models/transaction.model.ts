import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';
import { User } from './user.model';

@Entity()
export class Transaction {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @ManyToOne(() => User, user => user.sentTransactions, { eager: true })
  sender!: User;

  @ManyToOne(() => User, user => user.receivedTransactions, { eager: true })
  receiver!: User;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  amount!: number;

  @CreateDateColumn()
  transaction_date!: Date;
}
