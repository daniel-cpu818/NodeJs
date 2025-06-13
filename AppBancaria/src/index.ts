import 'reflect-metadata';
import express from 'express';
import { AppDataSource } from './config/data-source';
import { envs } from './config/envs';
import router from './presentation/routes';
const app = express();
const PORT = envs.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(router); 

AppDataSource.initialize()
  .then(() => {
    console.log('✅ Conexión a la base de datos establecida');
    app.listen(PORT, () => {
      console.log(`🚀 Servidor escuchando en http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error('❌ Error al conectar la base de datos:', error);
    process.exit(1);
  });
