import { DataSource } from 'typeorm';
import 'dotenv/config'; // Esto carga las variables desde .env
import { PetPost } from '../data/postgres/models/pet-post.model';
import { User } from '../data/postgres/models/user.model';
//import { User } from '../data/postgres/models/user.model';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: true, // ⚠️ solo para desarrollo
  entities: [User, PetPost],
});
