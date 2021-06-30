import { DataNotFoundError } from './../utils/errors/DataNotFoundError';
import { InvalidBodyError } from './../utils/errors/InvalidBodyError';
import { MissingParamError } from './../utils/errors/MissingParamError';
import { DataToInsert } from './infra/request/DataToInsert';
import { ProductEntity } from './../infra/entities/product.entity';
import { ProductRepository } from './../infra/repositories/product.repository';
import { Injectable } from '@nestjs/common';
import { DataToUpdate } from './infra/request/DataToUpdate';

@Injectable()
export class ProductService {
  constructor(private readonly productRepository: ProductRepository) {}

  async getAll(): Promise<ProductEntity[]> {
    return this.productRepository.getAllProducts();
  }

  async store(data: DataToInsert): Promise<ProductEntity> {
    if (!data) throw new InvalidBodyError();
    const { name, price } = data;
    if (!name) throw new MissingParamError('name');
    if (!price) throw new MissingParamError('price');
    return this.productRepository.storeProduct(data);
  }

  async update(id: number, data: DataToUpdate): Promise<number> {
    if (!id) throw new MissingParamError('id');
    if (!data) throw new MissingParamError('body');
    const productToUpdate = await this.productRepository.getProductById(id);
    if (!productToUpdate) throw new DataNotFoundError('id', id);
    return this.productRepository.updateProduct(id, data);
  }
  async delete(id: number): Promise<number> {
    if (!id) throw new MissingParamError('id');
    const productToUpdate = await this.productRepository.getProductById(id);
    if (!productToUpdate) throw new DataNotFoundError('id', id);
    return this.productRepository.deleteProduct(id);
  }
}
