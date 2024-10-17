import { IsDate, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class CrearIngresoDto {
  id: number;

  @IsNotEmpty()
  @IsNumber()
  usuarioId: number;

  @IsNotEmpty()
  @IsNumber()
  parcelaId: number;

  @IsDate()
  @IsNotEmpty()
  horaEntrada: Date;

  @IsDate()
  @IsOptional()
  horaSalida?: Date;
}