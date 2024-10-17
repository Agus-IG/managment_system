import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Reservacion } from 'src/microservices/reservaciones/reservaciones.entity';

@Entity('departamentos')
export class Departamento {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  nombre: string;

  @Column({ type: 'text', nullable: true })
  descripcion: string;

  @Column({ type: 'varchar', length: 255 })
  ubicacion: string;

  @OneToMany(() => Reservacion, (reserva) => reserva.departamento)
  reservas: Reservacion[];  // Relación con las reservas que se pueden hacer en el departamento
}
