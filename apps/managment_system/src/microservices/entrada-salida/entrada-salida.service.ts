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
    const nuevoIngreso = this.ingresoRepository.create({
      ...CrearIngresoDto,
      horaEntrada: new Date(),
    });
    return this.ingresoRepository.save(nuevoIngreso);
  }

  // Obtener todos los ingresos
  async obtenerIngresos(): Promise<EntradaSalida[]> {
    return await this.ingresoRepository.find({
      relations: ['parcela', 'usuario'],
    });
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

    ingreso.horaSalida = new Date(); // Actualizar la hora de salida
    return await this.ingresoRepository.save(ingreso); // Guardar la entrada actualizada en la base de datos
  }

  // Eliminar un ingreso a la parcela
  async delete(id: number): Promise<void> {
    const result = await this.ingresoRepository.delete(id); // Eliminar la entrada por su ID

    // Verificar si la entrada existe
    if (result.affected === 0) {
      throw new NotFoundException(`Ingreso con id ${id} no encontrada`);
    }
  }
}
