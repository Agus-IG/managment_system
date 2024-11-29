import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Departamento } from '../entities/departamento.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Departamento])],
  providers: [],
  exports: [TypeOrmModule],  // Asegúrate de exportar TypeOrmModule
})
export class DepartamentoModule {}
