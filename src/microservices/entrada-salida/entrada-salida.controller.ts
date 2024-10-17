import { Body, Controller, HttpStatus, Patch, Post } from '@nestjs/common';
import { EntradaSalidaService } from './entrada-salida.service';
import { CrearIngresoDto } from './crear-entrada.dto';

@Controller('entrada-salida')
export class EntradaSalidaController {
    constructor(private readonly entradaSalidaService: EntradaSalidaService) {}

    //Registrar un ingreso
    @Post()
    async registrarIngreso(@Body() crearEntradaDto: CrearIngresoDto) {
        const ingreso = await this.entradaSalidaService.create(crearEntradaDto);
        return {
            statusCode: HttpStatus.CREATED,
            message: 'Ingreso registrado con exito',
            data: ingreso,
        };
    }

    //Actualizar una salida
    @Patch()
    async registrarSalida(@Body() crearSalidaDto: CrearIngresoDto) {
        const salida = await this.entradaSalidaService.update(
            crearSalidaDto.id,
            crearSalidaDto,
        );
        return {
            statusCode: HttpStatus.OK,
            message: 'Salida actualizada con exito',
            data: salida,
        };
    }
}
