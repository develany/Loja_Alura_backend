import { Module } from '@nestjs/common';
import { UsuarioModule } from './usuario/usuario.module';
import { ProdutoModule } from './produto/produto.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DbConfigService } from './config/db.config.services';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    UsuarioModule,
    ProdutoModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      useClass: DbConfigService,
      inject: [DbConfigService],
    }),
  ],
})
export class AppModule {}
