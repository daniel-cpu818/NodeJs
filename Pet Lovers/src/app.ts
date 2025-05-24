import 'reflect-metadata';
import { Server } from "./presentation/server";
import { AppRoutes } from "./presentation/routes";
import { env } from "./config/envs";
import { AppDataSource } from "./config/data-source";

async function main() {
  try {
    await AppDataSource.initialize();
    console.log("✅ Postgres database connected");

    const server = new Server({
      port: Number(env.PORT),
      routes: AppRoutes.routes,
    });

    server.start();
    console.log("✅ Server started on port", env.PORT);
  } catch (error) {
    console.error("❌ Error al iniciar el servidor o la base de datos:", error);
    process.exit(1);
  }
}

main();
