import 'reflect-metadata'; // CORREGIDO: era "feflect-metadata"
import { env } from './config/envs';
import { Server } from './presentation/server';
import { PostgresDatabase } from './data/postgres/postgres-database';
import { AppRoutes } from './presentation/routes';

export async function main() {
  try {
    const postgresDatabase = new PostgresDatabase({
      host: env.PGHOST,
      port: Number(env.PGPORT),
      username: env.PGUSER,
      password: env.PGPASSWORD,
      database: env.PGDATABASE,
      ssl: env.PGSSL,
    });

    await postgresDatabase.connect();

   const server = new Server({
      port: env.PORT,
      routes: AppRoutes.routes,
    });

    await server.start(Number(env.PORT));
  } catch (error) {
    console.error('❌ Error al iniciar la aplicación:', error);
    process.exit(1);
  }
}

main();
