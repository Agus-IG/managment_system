import { Module } from '@nestjs/common';
import { UsuariosController } from './usuarios.controller';
import { UsuariosService } from './usuarios.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from './usuarios.entity';
import { db, envs } from 'src/config';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from 'src/auth/auth.service';
import { MulterModule } from '@nestjs/platform-express';
import { saveImageStorage } from 'src/helpers/image-storage';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from 'src/auth/middlewares/jwt/jwt.strategy';

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
  providers: [UsuariosService, AuthService, JwtStrategy],
  exports: [UsuariosService, TypeOrmModule],
})
export class UsuariosModule {}
