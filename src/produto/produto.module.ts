import { Module } from '@nestjs/common';
import { ProdutosController } from './produto.controller';
import { ProdutoRepository } from './produto.repository';

@Module({
  controllers: [ProdutosController],
  providers: [ProdutoRepository],
})
export class ProdutoModule {}
