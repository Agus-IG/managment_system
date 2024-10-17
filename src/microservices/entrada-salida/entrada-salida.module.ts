import { Module } from '@nestjs/common';
import { EntradaSalidaController } from './entrada-salida.controller';
import { EntradaSalidaService } from './entrada-salida.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { db } from 'src/config';
import { EntradaSalida } from './entrada-salida.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot(db),
    TypeOrmModule.forFeature([EntradaSalida])
  ],
  controllers: [EntradaSalidaController],
  providers: [EntradaSalidaService]
})
export class EntradaSalidaModule {}
