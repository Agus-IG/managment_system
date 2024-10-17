import {
    IsBoolean,
    IsDate,
    IsEmail,
    IsEnum,
    IsNotEmpty,
    IsOptional,
    IsString,
    MinLength,
  } from 'class-validator';
  import { Role } from './usuarios.entity';

export class UsuarioDto {
    id: number;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  password: string;

  @IsString()
  nombre: string;

  @IsEnum(Role, { message: `role must be ${Role.ADMIN} or ${Role.USER}` })
  @IsNotEmpty()
  role: Role;

  @IsOptional()
  @IsString()
  avatar?: string;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  @IsOptional()
  @IsDate()
  createdAt?: Date;

  @IsOptional()
  @IsDate()
  updatedAt?: Date;
}