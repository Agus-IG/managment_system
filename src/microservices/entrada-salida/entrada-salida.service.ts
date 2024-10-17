import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntradaSalida } from './entrada-salida.entity';
import { Repository } from 'typeorm';
import { CrearIngresoDto } from './crear-entrada.dto';
import { ActualizarIngresoDto } from './actualizar-ingreso.dto';

@Injectable()
export class EntradaSalidaService {
  constructor(
    @InjectRepository(EntradaSalida)
    private readonly ingresoRepository: Repository<EntradaSalida>,
  ) {}

  // Crear una nueva entrada
  async create(CrearIngresoDto: CrearIngresoDto): Promise<EntradaSalida> {
    const nuevoIngreso = this.ingresoRepository.create(CrearIngresoDto);
    return await this.ingresoRepository.save(nuevoIngreso);
  }

  // Actualizar una entrada
  async update(
    id: number,
    actualizarIngresoDto: ActualizarIngresoDto,
  ): Promise<EntradaSalida> {
    const ingreso = await this.ingresoRepository.findOne({ where: { id } }); // Buscar la entrada por su ID

    // Verificar si la entrada existe
    if (!ingreso) {
      throw new NotFoundException(`Ingreso con id ${id} no encontrada`);
    }

    Object.assign(ingreso, actualizarIngresoDto); // Actualizar la entrada con los datos del DTO
    return await this.ingresoRepository.save(ingreso); // Guardar la entrada actualizada en la base de datos
  }
}
