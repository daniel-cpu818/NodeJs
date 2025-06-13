import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
} from 'typeorm';
import { Transaction } from './transaction.model';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ length: 100 })
  name!: string;

  @Column({ length: 100, unique: true })
  email!: string;

  @Column({ type: 'text' })
  password!: string;

  @Column({ length: 20, unique: true })
  account_number!: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  balance!: number;

  @CreateDateColumn()
  created_at!: Date;

  @OneToMany(() => Transaction, transaction => transaction.sender)
  sentTransactions!: Transaction[];

  @OneToMany(() => Transaction, transaction => transaction.receiver)
  receivedTransactions!: Transaction[];
}
