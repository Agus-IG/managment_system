import 'dotenv/config';
import * as joi from 'joi';

// Interfaz para validar las variables de entorno
interface EnvVars {
  PORT: number;
  JWT_SECRET: string;
  DB_HOST: string;
  DB_USER: string;
  DB_PASSWORD: string;
  DATABASE: string;
}

// Validar las variables de entorno
const envsSchema = joi
  .object<EnvVars>({
    PORT: joi.number().default(3010),
    JWT_SECRET: joi.string().required(),
    DB_HOST: joi.string().required(),
    DB_USER: joi.string().required(),
    // DB_PASSWORD: joi.string().required(),
    DATABASE: joi.string().required(),
  })
  .unknown(true);

const { error, value } = envsSchema.validate(process.env);

if (error) throw new Error(`Config validation error: ${error.message}`);

// Variables de entorno
const envVars: EnvVars = value;

// Exportar las variables
export const envs = {
  port: envVars.PORT,
  jwt: envVars.JWT_SECRET,
  host: envVars.DB_HOST,
  user: envVars.DB_USER,
  pass: envVars.DB_PASSWORD,
  database: envVars.DATABASE,
};
