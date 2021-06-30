import { DataToUpdate } from './../../product/infra/request/DataToUpdate';
import { ProductEntity } from '../entities/product.entity';
import { DataToInsert } from 'src/product/infra/request/DataToInsert';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(ProductEntity)
export class ProductRepository extends Repository<ProductEntity> {
  async getAllProducts(): Promise<ProductEntity[]> {
    try {
      return this.find();
    } catch (e) {
      console.log(e);
    }
  }
  async getProductById(id: number): Promise<ProductEntity> {
    try {
      return this.findOne(id);
    } catch (e) {
      console.log(e);
    }
  }
  async storeProduct(data: DataToInsert): Promise<ProductEntity> {
    try {
      const newData = this.create(data);
      return this.save(newData);
    } catch (e) {
      console.log(e);
    }
  }
  async updateProduct(id: number, data: DataToUpdate): Promise<number> {
    try {
      const result = await this.update({ id }, data);
      return result.affected;
    } catch (e) {
      console.log(e);
    }
  }
  async deleteProduct(id: number): Promise<number> {
    try {
      const result = await this.delete(id);
      return result.affected;
    } catch (e) {
      console.log(e);
    }
  }
}
