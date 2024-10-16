import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GatewayModule } from './gateway/gateway.module';
import { UsuariosModule } from './microservices/usuarios/usuarios.module';
import { ReservacionesModule } from './microservices/reservaciones/reservaciones.module';
import { EntradaSalidaModule } from './microservices/entrada-salida/entrada-salida.module';
import { GatewayWs } from './gateway/gateway.ws';

@Module({
  imports: [GatewayModule, UsuariosModule, ReservacionesModule, EntradaSalidaModule],
  controllers: [AppController],
  providers: [AppService, GatewayWs],
})
export class AppModule {}
