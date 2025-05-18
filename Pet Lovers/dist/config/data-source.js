"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
const typeorm_1 = require("typeorm");
const pet_post_model_1 = require("../data/postgres/models/pet-post.model");
//import { User } from '../data/postgres/models/user.model';
exports.AppDataSource = new typeorm_1.DataSource({
    type: 'postgres',
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    synchronize: true, // ⚠️ solo para desarrollo
    entities: [pet_post_model_1.PetPost],
});
