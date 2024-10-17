import { PartialType } from '@nestjs/mapped-types';
import { CrearReservacionDto } from './crear-reserva.dto';

export class ActualizarReservacionDto extends PartialType(CrearReservacionDto) {}
