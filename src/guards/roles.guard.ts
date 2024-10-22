import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { ROLES_KEY } from 'src/decorators/roles.decorator';
import { Usuario } from 'src/microservices/usuarios/usuarios.entity';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector, private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRoles) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization?.split(' ')[1];
    const payload = this.jwtService.decode(token) as Usuario;  // Decodificamos el JWT para obtener el usuario

    if (!payload) {
      throw new ForbiddenException('No se pudo autenticar el usuario');
    }

    const hasRole = requiredRoles.some(role => payload.role === role);

    if (!hasRole) {
      throw new ForbiddenException('No tienes acceso a este recurso');
    }

    return hasRole;
  }
}