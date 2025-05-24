// import { DataSource } from "typeorm";
// import { User } from "./models/user.model";
// import { PetPost } from "./models/pet-post.model";

// interface Options {
//     host: string;
//     port: number;
//     username: string;
//     password: string;
//     database: string;
//     ssl: boolean; // <== lo espera aquí
// }


// export class PostgresDatabase {
//   public dataSource: DataSource;

//   constructor(options: Options) {
//     this.dataSource = new DataSource({
//       type: "postgres",
//       host: options.host,
//       port: options.port,
//       username: options.username,
//       password: options.password,
//       database: options.database,
//       synchronize: true,
//       entities: [User, PetPost],
//       ssl: {
//         rejectUnauthorized: false, 
//       },
//     });
//   }

//   async initialize() {
//     try {
//       await this.dataSource.initialize();
//       console.log("✅ Postgres database connected!");
//     } catch (error) {
//       console.error("❌ Error connecting to Postgres database:", error);
//       throw error;
//     }
//   }
// }
