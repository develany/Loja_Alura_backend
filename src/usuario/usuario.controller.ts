import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CriaUsuarioDTO } from './dto/CriaUsuario.dto';
import { UsuarioEntity } from './usuario.entity';
import { v4 as uuid } from 'uuid';
import { listaUsuarioDTO } from './dto/ListaUsuario.dto';
import { AtualizaUsuarioDTO } from './dto/AtualizaUsuario.dto';
import { UsuarioService } from './usuario.service';

@Controller('/usuarios')
export class UsuarioController {
  constructor(private usuarioService: UsuarioService) {}

  @Post()
  async criaUsuario(@Body() dadosDoUsuarios: CriaUsuarioDTO) {
    const usuarioEntity = new UsuarioEntity();
    usuarioEntity.email = dadosDoUsuarios.email;
    usuarioEntity.senha = dadosDoUsuarios.senha;
    usuarioEntity.nome = dadosDoUsuarios.nome;
    usuarioEntity.id = uuid();

    this.usuarioService.criaUsuarios(usuarioEntity);
    return {
      usuario: new listaUsuarioDTO(usuarioEntity.id, usuarioEntity.nome),
      menssage: 'Usuario criado com sucesso',
    };
  }

  @Get()
  async listaUsuarios() {
    const usuariosSalvos = await this.usuarioService.listaUsuarios();
    return usuariosSalvos;
  }

  @Put('/:id')
  async atualizarUsuarios(
    @Param('id') id: string,
    @Body() novosDados: AtualizaUsuarioDTO,
  ) {
    const usarioAtulizado = await this.usuarioService.atualizaUsuario(
      id,
      novosDados,
    );
    return {
      usario: usarioAtulizado,
      message: 'Usuario atualizado com sucesso',
    };
  }

  @Delete('/:id')
  async removeUsuario(@Param('id') id: string) {
    const usuarioRemovido = await this.usuarioService.deletaUsuario(id);

    return {
      usuario: usuarioRemovido,
      message: 'Usuário removido com sucesso',
    };
  }
}
