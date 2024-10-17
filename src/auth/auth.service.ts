import { forwardRef, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsuariosService } from 'src/microservices/usuarios/usuarios.service';
import * as bcrypt from 'bcrypt';
import { Role } from 'src/microservices/usuarios/usuarios.entity';
import { UsuarioDto } from 'src/microservices/usuarios/usuarios.dto';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    @Inject(forwardRef(() => UsuariosService))
    private userService: UsuariosService,
  ) {}

  async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 12);
  }

  async validateUserPassword(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword);
  }

  /**
   * @param payload
   * @returns access token
   */
  async verifyJwt(jwt: string): Promise<any> {
    return await this.jwtService.verifyAsync(jwt);
  }

  /**
   * @param Usuario
   * @returns token generado
   */

  async generateJwt(user: UsuarioDto): Promise<string> {

    const payload = {
      sub: user.id,
      email: user.email,
      name: user.nombre,
    };
    //* Retornamos el token
    return this.jwtService.signAsync(payload);
  }

  // Verificamos que el rol del usuario sea el correcto
  async verificarRol(role: Role, token: string) {
    try {
      const decodeUser = await this.verifyJwt(token); // Verificamos el token
      const usuario = await this.userService.getOne(decodeUser.sub); // Obtenemos el usuario

      // Verificamos que el rol del usuario sea el correcto
      if (role === Role.USER) {
        throw new UnauthorizedException(`Acceso denegado`); // Retornamos error
      }

      return role.includes(usuario.role); // Retornamos el rol
    } catch (error) {
      throw new UnauthorizedException(`Token no valido`); // Retornamos error
    }
  }
}
