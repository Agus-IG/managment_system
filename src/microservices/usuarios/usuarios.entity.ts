
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Reservacion } from '../reservaciones/reservaciones.entity';
import { EntradaSalida } from '../entrada-salida/entrada-salida.entity';

export enum Role {
  ADMIN = 'admin',
  USER = 'user',
}

@Entity('usuarios')
export class Usuario {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'varchar', length: 100, nullable: false })
  nombre: string;

  @Column({ type: 'varchar', length: 100, nullable: false, unique: true })
  email: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  password: string;

  @Column({ type: 'bool', default: true })
  isActive?: boolean;

  @Column({ type: 'varchar', nullable: false, length: 225 })
  avatar?: string;

  @Column({ type: 'enum', enum: Role, default: Role.USER })
  role: Role;

  @CreateDateColumn()
  createdAt?: Date;

  @UpdateDateColumn()
  updatedAt?: Date;

  @OneToMany(() => EntradaSalida, (ingreso) => ingreso.usuario)
  ingresos: EntradaSalida[];
}