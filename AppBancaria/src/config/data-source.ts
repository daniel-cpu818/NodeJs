import { config } from "dotenv";
config();
import { User } from "../data/models/user.model";
import { Transaction } from "../data/models/transaction.model";
import { DataSource } from 'typeorm';
import { envs } from './envs';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: envs.PGHOST,
  port: envs.PGPORT,
  username: envs.PGUSER,
  password: envs.PGPASSWORD,
  database: envs.PGDATABASE,
  synchronize: true,
  ssl: envs.PGSSL,
  entities: [User, Transaction],
});
