import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Usuario } from '../usuarios/usuarios.entity';
import { Departamento } from 'src/seed/entities/departamento.entity';

@Entity('reservaciones')
export class Reservacion {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne((type) => Usuario)
  @JoinColumn({ name: 'usuarioId' })
  usuario: Usuario;

  @ManyToOne((type) => Departamento, (departamento) => departamento.reservas)
  @JoinColumn({ name: 'departamentoId' })
  departamento: Departamento;

  @Column('timestamp')
  reservacionFecha: Date;

  @Column('timestamp', { nullable: true })
  fechaSalida: Date;

  @Column({ default: true })
  isActive: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
