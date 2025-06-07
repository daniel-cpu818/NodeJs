import { config } from "dotenv";
config(); 

import { DataSource } from "typeorm";
import { User } from "../data/postgres/models/user.model";
import { PetPost } from "../data/postgres/models/pet-post.model";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || "5432"),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: true,
  ssl: { rejectUnauthorized: false },
  entities: [User, PetPost],
});
