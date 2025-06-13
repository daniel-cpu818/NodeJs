import "dotenv/config";
import env from "env-var";

export const envs = {
    PORT: env.get("PORT").required().asPortNumber(),
    PGHOST: env.get("PGHOST").required().asString(),
    PGPORT: env.get("PGPORT").required().asPortNumber(),
    PGUSER: env.get("PGUSER").required().asString(),
    PGPASSWORD: env.get("PGPASSWORD").required().asString(),
    PGDATABASE: env.get("PGDATABASE").required().asString(),
    PGSSL: env.get("PGSSL").default("false").asBool(),
    JWT_SECRET: env.get("JWT_SECRET").required().asString(),
    JWT_EXPIRATION: env.get("JWT_EXPIRATION").default("1h").asString(),
    MAIL_USER: env.get("MAIL_USER").required().asString(),
    MAIL_PASS: env.get("MAIL_PASS").required().asString(),
};
