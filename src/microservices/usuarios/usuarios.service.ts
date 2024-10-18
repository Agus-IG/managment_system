import {
  BadRequestException,
  HttpException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { QueryFailedError, Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { Usuario } from './usuarios.entity';
import { AuthService } from 'src/auth/auth.service';
import { UsuarioDto } from './usuarios.dto';
import { PaginationQueryDto } from 'src/common/paginator/pagination.dto';

@Injectable()
export class UsuariosService {
  constructor(
    @InjectRepository(Usuario)
    private readonly usuariosRepository: Repository<Usuario>,
    private readonly authService: AuthService,
    private readonly jwtService: JwtService,
  ) {}

  // Obtener un usuario
  async getOne(id: number): Promise<UsuarioDto> {
    try {
      const usuario = await this.usuariosRepository.findOne({ where: { id } });
      if (!usuario) throw new NotFoundException('User not found');

      return usuario;
    } catch (err) {
      console.log(err);
      if (err instanceof QueryFailedError)
        throw new HttpException(`${err.name} ${err.driverError}`, 404);
      throw new HttpException(err.message, err.status);
    }
  }

  // Crear un nuevo usuario
  async create(usuario: UsuarioDto) {
    try {
      if (!usuario.password) throw new UnauthorizedException('No password');

      const hash = await this.authService.hashPassword(usuario.password);
      usuario.password = hash;

      const result = await this.usuariosRepository.save(usuario);
      return result;
    } catch (err: any) {
      console.log(err);
      if (err instanceof QueryFailedError)
        throw new HttpException(`${err.name} ${err.driverError}`, 404);
      throw new HttpException(err.message, err.status);
    }
  }

  // Iniciar sesión
  async login(email: string, pass: string) {
    try {
      const user = await this.usuariosRepository.findOne({ where: { email } });
      console.log(user);

      if (!user) throw new NotFoundException('Usuario no encontrado');

      const isPassword = await this.authService.validateUserPassword(
        pass,
        user.password,
      );

      if (!isPassword) throw new UnauthorizedException('Contraseña incorrecta');

      const token = await this.authService.generateJwt(user);

      return token;
    } catch (err) {
      console.error(err);
      if (err instanceof QueryFailedError)
        throw new HttpException(`${err.name} ${err.driverError}`, 404);
      throw new HttpException(err.message, err.status);
    }
  }

  async getAll(paginationQuery: PaginationQueryDto): Promise<{
    data: UsuarioDto[];
    total: number;
    page: number;
    limit: number;
  }> {
    const { page = 1, limit = 10 } = paginationQuery;

    try {
      const [usuarios, total] = await this.usuariosRepository.findAndCount({
        skip: (page - 1) * limit,
        take: limit,
      });
      if (!usuarios) throw new NotFoundException('User not found');
      return { data: usuarios, total, page, limit };
    } catch (err) {
      console.log(err);
      if (err instanceof QueryFailedError)
        throw new HttpException(`${err.name} ${err.driverError}`, 404);
      throw new HttpException(err.message, err.status);
    }
  }

  async delete(id: number): Promise<UsuarioDto> {
    try {
      const user = await this.usuariosRepository.findOne({ where: { id } }) //busca a el usuario por id
      const usuario = await this.usuariosRepository.remove(user)
      return usuario
    } catch (err) {
      console.error(err)
      if (err instanceof QueryFailedError)
        throw new HttpException(`${err.name} ${err.driverError}`, 404);
      throw new HttpException(err.message, err.status)
    }
  }

  async updateUser(
    id: number,
    user: Partial<UsuarioDto>,
    files: Express.Multer.File[],
  ) {
    try {
      if (files.length > 0) {
        user.avatar = files[0].filename;
      }
      const oldUser = await this.getOne(id);
      const mergeUser = await this.usuariosRepository.merge(oldUser, user as Partial<Usuario>);
      const result = await this.usuariosRepository.save(mergeUser);
      return result;
    } catch (err) {
      console.error(err);
      if (err instanceof QueryFailedError)
        throw new HttpException(`${err.name} ${err.driverError}`, 404);
      throw new HttpException(err.message, err.status);
    }
  }
}
