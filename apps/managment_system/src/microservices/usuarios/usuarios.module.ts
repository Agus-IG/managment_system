import { Module } from '@nestjs/common';
import { UsuariosController } from './usuarios.controller';
import { UsuariosService } from './usuarios.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from './usuarios.entity';
import { JwtModule } from '@nestjs/jwt';
import { MulterModule } from '@nestjs/platform-express';
import { PassportModule } from '@nestjs/passport';
import { APP_GUARD } from '@nestjs/core';
import { saveImageStorage } from '../../helpers/image-storage';
import { RolesGuard } from '../../guards/roles.guard';
import { AuthService } from '../../auth/auth.service';
import { JwtStrategy } from '../../auth/middlewares/jwt/jwt.strategy';
import { db, envs } from '../../config';

@Module({
  imports: [
    TypeOrmModule.forRoot(db),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    TypeOrmModule.forFeature([Usuario]),
    JwtModule.register({
      secret: envs.jwt,
      signOptions: {
        expiresIn: '24h',
      },
    }),
    MulterModule.register({
    dest: './uploads',
    fileFilter: saveImageStorage('avatars').fileFilter,
    storage: saveImageStorage('avatars').storage,
  }),
  ],
  controllers: [UsuariosController],
  providers: [UsuariosService, AuthService, JwtStrategy, {
    provide: APP_GUARD,
    useClass: RolesGuard
  }],
  exports: [UsuariosService, TypeOrmModule],
})
export class UsuariosModule {}
