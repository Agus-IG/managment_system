import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Parcela } from '../entities/parcela.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Parcela])],
  providers: [],
  exports: [TypeOrmModule],
})
export class ParcelaModule {}
