import { Logger } from '@nestjs/common';
import { OnGatewayConnection, OnGatewayDisconnect, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import * as fs from 'fs';

@WebSocketGateway({
  cors: {
  origin: '*',
}})

export class GatewayWs implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server:Server;
  private logger: Logger = new Logger('GatewayWs');

  // Manejo de las conexiones
  handleConnection(client: Socket) {
    const message = `Cliente conectado: ${client.id}`; // ID del cliente
    this.logger.log(message);
    this.logToFile(message);

    this.server.emit('usuarioConectado', {message: `Usuario ${client.id} conectado`}); // Envia un mensaje a todos los clientes conectados
  }

  // Manejo de las desconexiones
  handleDisconnect(client: Socket) {
    const message = `Cliente desconectado: ${client.id}`; // ID del cliente
    this.logger.log(message);
    this.logToFile(message);

    this.server.emit('usuarioDesconectado', {message: `Usuario ${client.id} desconectado`}); // Envia un mensaje a todos los clientes conectados
  }

  private logToFile(message: string) {
    const logMessage = `${new Date().toISOString()} - ${message}\n`;
    fs.appendFile('usuario-conexion.log', logMessage, (err) => {
      if (err) {
        this.logger.error('Error al escribir en el archivo de log:', err);
      }
    });
  }
}
