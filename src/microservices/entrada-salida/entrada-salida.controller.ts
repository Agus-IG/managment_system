import { Body, Controller, Get, HttpStatus, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { EntradaSalidaService } from './entrada-salida.service';
import { CrearIngresoDto } from './crear-entrada.dto';
import { JwtAuthGuard } from 'src/auth/middlewares/jwt/jwt-auth.guard';

@Controller('entrada-salida')
export class EntradaSalidaController {
    constructor(private readonly entradaSalidaService: EntradaSalidaService) {}

    //Obtener todos los ingresos a las parcelas con sus salidas
    @UseGuards(JwtAuthGuard)
    @Get()
    async obtenerIngresos() {
        return await this.entradaSalidaService.obtenerIngresos();
    }

    //Registrar un ingreso
    @UseGuards(JwtAuthGuard)
    @Post()
    async registrarIngreso(@Req() req, @Body() crearIngresoDto: CrearIngresoDto) {
        const usuario = req.user; // Obtenemos el usuario
        const ingreso = await this.entradaSalidaService.create(crearIngresoDto); // Creamos el ingreso
        return {
            statusCode: HttpStatus.CREATED,
            message: 'Ingreso registrado con exito',
            data: ingreso,
            usuario: usuario,
        };
    }

    //Actualizar una salida
    @UseGuards(JwtAuthGuard)
    @Put(':id')
    async registrarSalida(@Req() req, @Param('id') id: number) {
        const usuario = req.user;
        const salida = await this.entradaSalidaService.update(
            id,
            usuario
        );
        return {
            statusCode: HttpStatus.OK,
            message: 'Salida actualizada con exito',
            data: salida
        };
    }
}
