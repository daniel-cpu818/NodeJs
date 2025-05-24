import "dotenv/config";
import { get  } from "env-var";
 export const env = {
    PORT: get("PORT").required().asPortNumber(),
    PGHOST: get("PGHOST").required().asString(),
    PGPORT: get("PGPORT").required().asPortNumber(),
    PGUSER: get("PGUSER").required().asString(),
    PGPASSWORD: get("PGPASSWORD").required().asString(),
    PGDATABASE: get("PGDATABASE").required().asString(),
    PGSSL: get("PGSSL").default("false").asBool(),
    JWT_SECRET: get("JWT_SECRET").required().asString(),
    JWT_EXPIRATION: get("JWT_EXPIRATION").default("1h").asString(),

 }
