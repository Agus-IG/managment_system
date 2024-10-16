import { Module } from '@nestjs/common';
import { GatewayController } from './gateway.controller';
import { GatewayService } from './gateway.service';
import { GatewayWs } from './gateway.ws';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { envs } from 'src/config';

@Module({
  imports: [
    ClientsModule.register([
      {name: 'USUARIOS', transport: Transport.TCP, options: {host: envs.host, port: 3001}},
      {name: 'RESERVACIONES', transport: Transport.TCP, options: {host: envs.host, port: 3002}},
      {name: 'ENTRADA_SALIDA', transport: Transport.TCP, options: {host: envs.host, port: 3003}},
    ])
  ],
  providers: [GatewayService, GatewayWs],
  controllers: [GatewayController]
})
export class GatewayModule {}
