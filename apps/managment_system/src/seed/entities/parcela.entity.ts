import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { EntradaSalida } from '../../microservices/entrada-salida/entrada-salida.entity';

@Entity('parcelas')
export class Parcela {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  nombre: string;

  @Column({ type: 'varchar', length: 255 })
  ubicacion: string;

  @Column({ type: 'text', nullable: true })
  descripcion: string;

  @OneToMany(() => EntradaSalida, (ingreso) => ingreso.parcela)
  ingresos: EntradaSalida[];  // Relación con los ingresos a la parcela

  @Column({ type: 'bool', default: true })
  disponible: boolean;
}
