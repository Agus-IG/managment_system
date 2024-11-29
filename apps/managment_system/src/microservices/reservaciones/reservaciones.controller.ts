import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ReservacionesService } from './reservaciones.service';
import { CrearReservacionDto } from './crear-reserva.dto';

@Controller('reservaciones')
export class ReservacionesController {
  constructor(private readonly reservacionesService: ReservacionesService) {}

  //Crear una nueva reservación
  @Post()
  async crearReservacion(@Body() crearReservacionDto: CrearReservacionDto) {
    const reservacion =
      await this.reservacionesService.create(crearReservacionDto);
    return {
      statusCode: HttpStatus.CREATED,
      message: 'Reservacion creada con exito',
      data: reservacion,
    };
  }

  //Obtener todas las reservaciones
  @Get()
  async obtenerReservaciones() {
    const reservaciones = await this.reservacionesService.findAll();
    return {
      statusCode: HttpStatus.OK,
      data: reservaciones,
    };
  }

  //Actualizar una reserva
  @Patch(':id')
  async actualizarReservacion(
    @Param('id') id: number,
    @Body() actualizarReservacionDto: CrearReservacionDto,
    //@Body('id') id: number,
  ) {
    const reservacionActualizada = await this.reservacionesService.update(
      id,
      actualizarReservacionDto,
    );
    return {
      statusCode: HttpStatus.OK,
      message: 'Reservacion actualizada con exito',
      data: reservacionActualizada,
    };
  }
}
