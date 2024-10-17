import { IsString, IsDate, IsNotEmpty } from 'class-validator';

export class CrearReservacionDto {

  @IsNotEmpty()
  usuarioId: number;

  @IsNotEmpty()
  departamentoId: number;

  @IsDate()
  reservacionFecha: Date;

  @IsDate()
  fechaSalida: Date;
}
