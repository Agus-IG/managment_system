import { Body, Controller, Delete, Get, HttpStatus, Param, Patch, Post, Query, Res, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { UsuarioDto } from './usuarios.dto';
import { Response } from 'express';
import { FilesInterceptor } from '@nestjs/platform-express';
import { PaginationQueryDto } from 'src/common/paginator/pagination.dto';

@Controller('usuarios')
export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService) {}

  //Registro de usuario
  @Post('registro')
  async register(@Body() usuarioDto: UsuarioDto, @Res() response: Response) {
    const usuario = await this.usuariosService.create(usuarioDto);
    response.status(HttpStatus.CREATED).json({
      ok: true,
      usuario,
      msg: 'Usuario creado con exito',
    })
  }

  //Inicio de sesion
  @Post('login')
  async login(@Body() usuarioDto: {email: string, password: string}, @Res() response: Response) {
    const token = await this.usuariosService.login(usuarioDto.email, usuarioDto.password);
    response.status(HttpStatus.OK).json({
      ok: true,
      token,
      msg: 'Usuario logueado con exito',
    })
  }

  @Patch(':id')
  @UseInterceptors(FilesInterceptor('files'))

  async updateUser(
    @Param('id') id: number,
    @Body() user: Partial<UsuarioDto>,
    @UploadedFiles() files: Express.Multer.File[],
    @Res() res: Response,
  ) {
    const result = await this.usuariosService.updateUser(id, user, files);
    [
      {
        fieldname: 'file',
        originalname: 'test.png',
        encoding: '7bit',
        mimetype: 'image/png',
      },
    ];

    res.status(HttpStatus.OK).json({ ok: true, result });
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: number, @Res() res: Response) {
    const result = await this.usuariosService.delete(id);
    res.status(HttpStatus.OK).json({ ok: true, result });
  }

  @Get(':id')
  async getOne(@Param('id') id: number) {
    return await this.usuariosService.getOne(id);
  }

  @Get()
  async getAll(@Query() paginationQuery: PaginationQueryDto) {
    return await this.usuariosService.getAll(paginationQuery);
  }
}
