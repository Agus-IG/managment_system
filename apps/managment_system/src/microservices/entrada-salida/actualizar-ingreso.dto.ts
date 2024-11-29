import { PartialType } from '@nestjs/mapped-types';
import { CrearIngresoDto } from './crear-entrada.dto';

export class ActualizarIngresoDto extends PartialType(CrearIngresoDto) {
}