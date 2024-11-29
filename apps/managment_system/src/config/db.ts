import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { envs } from './envs';

// Configuración de la base de datos
export const db: TypeOrmModuleOptions = {
  type: 'postgres', // Tipo de base de datos
  host: envs.host, // Host de la base de datos
  username: envs.user, // Nombre de usuario
  password: envs.pass, // Contraseña
  database: envs.database, // Nombre de la base de datos
  entities: [], // Cargar las entidades
  synchronize: true, // Crea las tablas si no existen
  autoLoadEntities: true, // Carga las entidades automaticamente
};
