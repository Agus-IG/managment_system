import { Module, OnModuleInit } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GatewayModule } from './gateway/gateway.module';
import { UsuariosModule } from './microservices/usuarios/usuarios.module';
import { ReservacionesModule } from './microservices/reservaciones/reservaciones.module';
import { EntradaSalidaModule } from './microservices/entrada-salida/entrada-salida.module';
import { GatewayWs } from './gateway/gateway.ws';
import { TypeOrmModule } from '@nestjs/typeorm';
import { db } from './config';
import { SeedService } from './seed/seed.service';
import { ParcelaModule } from './seed/modules/parcelas.module';
import { DepartamentoModule } from './seed/modules/departamento.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(db),
    GatewayModule,
    UsuariosModule,
    ReservacionesModule,
    EntradaSalidaModule,
    DepartamentoModule,
    ParcelaModule
  ],
  controllers: [AppController],
  providers: [AppService, GatewayWs, SeedService],
})
export class AppModule implements OnModuleInit {
  constructor(private readonly seedService: SeedService) {}

  async onModuleInit() {
    await this.seedService.seed(); // Carga los datos iniciales
  }
}
