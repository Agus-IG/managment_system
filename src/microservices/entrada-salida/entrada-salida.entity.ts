import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, JoinColumn } from 'typeorm';
import { Usuario } from '../usuarios/usuarios.entity';
import { Parcela } from 'src/seed/entities/parcela.entity';

@Entity('entries')
export class EntradaSalida {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Usuario, (usuario) => usuario.ingresos)
  usuario: Usuario;

  @ManyToOne(() => Parcela, (parcela) => parcela.ingresos)
  parcela: Parcela;

  @Column('timestamp')
  horaEntrada: Date;

  @Column('timestamp', { nullable: true })
  horaSalida: Date;

  @CreateDateColumn()
  createdAt: Date;
}
