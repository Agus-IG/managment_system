import { Module } from '@nestjs/common';
import { EntradaSalidaController } from './entrada-salida.controller';
import { EntradaSalidaService } from './entrada-salida.service';

@Module({
  controllers: [EntradaSalidaController],
  providers: [EntradaSalidaService]
})
export class EntradaSalidaModule {}
