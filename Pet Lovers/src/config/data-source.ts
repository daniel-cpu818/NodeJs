import { DataSource } from "typeorm";
import { User } from "../data/postgres/models/user.model";
import { PetPost } from "../data/postgres/models/pet-post.model";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: 'ep-winter-salad-a5tarhob-pooler.us-east-2.aws.neon.tech',
  port: 5432,
  username: 'petposdata_owner',
  password: 'npg_YsnMq2c9LAlD',
  database: 'petposdata',
  synchronize: true,
  ssl: { rejectUnauthorized: false },
  entities: [User, PetPost],
});
