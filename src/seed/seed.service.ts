import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Departamento } from './entities/departamento.entity';
import { Parcela } from './entities/parcela.entity';

@Injectable()
export class SeedService {
  constructor(
    @InjectRepository(Departamento)
    private departamentosRepository: Repository<Departamento>,
    @InjectRepository(Parcela)
    private parcelasRepository: Repository<Parcela>,
  ) {}

  async seed() {
    await this.cargarDepartamentos();
    await this.cargarParcelas();
  }

  async cargarDepartamentos() {
    const departamentos = [
      { nombre: 'Departamento A', descripcion: 'Bonito', ubicacion: 'Calle 1' },
      { nombre: 'Departamento B', descripcion: 'Espacioso', ubicacion: 'Calle 2' },
      { nombre: 'Departamento C', descripcion: 'Espacioso', ubicacion: 'Calle 3' },
      { nombre: 'Departamento D', descripcion: 'Bonito', ubicacion: 'Calle 4' },
      { nombre: 'Departamento E', descripcion: 'Espacioso', ubicacion: 'Calle 5' },
    ];

    await this.departamentosRepository.save(departamentos);
  }

  async cargarParcelas() {
    const parcelas = [
      { nombre: 'Parcela 1', descripcion: 'Con vistas al mar', ubicacion: 'Terreno X' },
      { nombre: 'Parcela 2', descripcion: 'Cerca del bosque', ubicacion: 'Terreno Y' },
      { nombre: 'Parcela 3', descripcion: 'En las montañas', ubicacion: 'Terreno X' },
      { nombre: 'Parcela 4', descripcion: 'Con vistas la mar', ubicacion: 'Terreno Y' },
      { nombre: 'Parcela 5', descripcion: 'Cerca del bosque', ubicacion: 'Terreno X' },
      { nombre: 'Parcela 6', descripcion: 'En las montañas', ubicacion: 'Terreno X' },
      { nombre: 'Parcela 7', descripcion: 'Cerca del bosque', ubicacion: 'Terreno Y' },
      { nombre: 'Parcela 8', descripcion: 'Con vistas al mar', ubicacion: 'Terreno X' },
      { nombre: 'Parcela 9', descripcion: 'Cerca del bosque', ubicacion: 'Terreno Y' },
      { nombre: 'Parcela 10', descripcion: 'Con vistas al mar', ubicacion: 'Terreno X' },
    ];

    await this.parcelasRepository.save(parcelas);
  }
}
