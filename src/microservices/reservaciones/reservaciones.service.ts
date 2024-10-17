import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Reservacion } from './reservaciones.entity';
import { Repository } from 'typeorm';
import { CrearReservacionDto } from './crear-reserva.dto';
import { ActualizarReservacionDto } from './actualizar-reserva.dto';
import { Usuario } from '../usuarios/usuarios.entity';
import { Departamento } from 'src/seed/entities/departamento.entity';

@Injectable()
export class ReservacionesService {
  constructor(
    @InjectRepository(Reservacion)
    private readonly reservationsRepository: Repository<Reservacion>,
    @InjectRepository(Usuario)
    private readonly usuariosRepository: Repository<Usuario>,
    @InjectRepository(Departamento)
    private readonly departamentosRepository: Repository<Departamento>,
  ) {}

  // Crear una nueva reservacion
  async create(crearReservacionDto: CrearReservacionDto): Promise<Reservacion> {
    const { usuarioId, departamentoId } = crearReservacionDto;

    const usuario = await this.reservationsRepository.findOne({
      where: { id: usuarioId },
    });
    if (!usuario) throw new NotFoundException('Usuario no encontrado');

    const departamento = await this.reservationsRepository.findOne({
      where: { id: departamentoId },
    });
    if (!departamento)
      throw new NotFoundException('Departamento no encontrado');

    // Crear una nueva reservacion
    const nuevaReservacion = this.reservationsRepository.create({
      usuario,
      departamento,
    });
    return await this.reservationsRepository.save(nuevaReservacion); // Insertar la nueva reservacion en la base de datos
  }

  // Obtener todas las reservaciones
  async findAll(): Promise<Reservacion[]> {
    return await this.reservationsRepository.find();
  }

  // Actualizar una reservacion
  async update(
    id: number,
    actualizarReservacionDto: ActualizarReservacionDto,
  ): Promise<Reservacion> {
    // Buscar la reservacion por su id
    const reserva = await this.reservationsRepository.findOne({
      where: { id },
    });
    if (!reserva)
      throw new NotFoundException(`Reserva con id ${id} no encontrada`);

    // Si se envía un usuarioId, buscar el usuario
    if (actualizarReservacionDto.usuarioId) {
      const usuario = await this.usuariosRepository.findOne({
        where: { id: actualizarReservacionDto.usuarioId },
      });
      if (!usuario)
        throw new NotFoundException(
          `Usuario con id ${actualizarReservacionDto.usuarioId} no encontrado`,
        );
      reserva.usuario = usuario;
    }

    // Si se envía un departamentoId, buscar el departamento
    if (actualizarReservacionDto.departamentoId) {
      const departamento = await this.departamentosRepository.findOne({
        where: { id: actualizarReservacionDto.departamentoId },
      });
      if (!departamento)
        throw new NotFoundException(
          `Departamento con id ${actualizarReservacionDto.departamentoId} no encontrado`,
        );
      reserva.departamento = departamento;
    }

    // Actualizar la reserva en la base de datos
    return this.reservationsRepository.save(reserva);
  }
}
