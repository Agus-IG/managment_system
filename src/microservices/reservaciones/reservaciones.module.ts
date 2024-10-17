import { Module } from '@nestjs/common';
import { ReservacionesController } from './reservaciones.controller';
import { ReservacionesService } from './reservaciones.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { db } from 'src/config';
import { Reservacion } from './reservaciones.entity';
import { UsuariosModule } from '../usuarios/usuarios.module';
import { DepartamentoModule } from 'src/seed/modules/departamento.module';

@Module({
  imports:[
    TypeOrmModule.forRoot(db),
    TypeOrmModule.forFeature([Reservacion]),
    UsuariosModule,
    DepartamentoModule
  ],
  controllers: [ReservacionesController],
  providers: [ReservacionesService]
})
export class ReservacionesModule {}
