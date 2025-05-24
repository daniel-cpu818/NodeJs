"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
// import morgan from 'morgan';
// import cors from 'cors';
const dotenv_1 = __importDefault(require("dotenv"));
// Cargar variables de entorno
dotenv_1.default.config();
// Importar rutas
// import userRoutes from './presentation/users/routes';
// import petPostRoutes from './presentation/pet-posts/routes';
const app = (0, express_1.default)();
// Middlewares
// app.use(cors());
// app.use(morgan('dev'));
// app.use(express.json());
// Rutas
// app.use('/api/users', userRoutes);
// app.use('/api/pet-posts', petPostRoutes);
// Ruta raíz
app.get('/', (_req, res) => {
    res.send('API de mascotas perdida funcionando 🐾');
});
exports.default = app;
