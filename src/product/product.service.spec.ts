import { DataNotFoundError } from './../utils/errors/DataNotFoundError';
import { DataToUpdate } from './infra/request/DataToUpdate';
import { InvalidBodyError } from './../utils/errors/InvalidBodyError';
import { MissingParamError } from './../utils/errors/MissingParamError';
import { ProductRepository } from './../infra/repositories/product.repository';
import { ProductEntity } from './../infra/entities/product.entity';
import { Test, TestingModule } from '@nestjs/testing';
import { ProductService } from './product.service';
import { DataToInsert } from './infra/request/DataToInsert';

describe('ProductService', () => {
  let service: ProductService;
  const productRepositoryMock = {
    async getAllProducts(): Promise<ProductEntity[]> {
      return [
        {
          id: 1,
          name: 'Beterraba',
          price: 3.9,
        },
        {
          id: 2,
          name: 'Cogumelo',
          price: 10,
        },
        {
          id: 3,
          name: 'Tomate',
          price: 3.3,
        },
      ];
    },
    async storeProduct(data: DataToInsert): Promise<ProductEntity> {
      return { ...data, id: 1 };
    },
    async updateProduct(id: number, data: DataToUpdate): Promise<number> {
      return 1;
    },
    async getProductById(id: number): Promise<ProductEntity> {
      return {
        id: 1,
        name: 'Beterraba',
        price: 3.9,
      };
    },
    async deleteProduct(id: number): Promise<number> {
      return 1;
    },
  };

  beforeEach(async () => {
    jest.restoreAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductService, ProductRepository],
    })
      .overrideProvider(ProductRepository)
      .useValue(productRepositoryMock)
      .compile();

    service = module.get<ProductService>(ProductService);
  });
  it('should be defined', async () => {
    expect(service).toBeDefined();
  });
  it('getAll() should return all products', async () => {
    const products = await service.getAll();
    expect(products.length).toBe(3);
  });
  it('store(data) should throws if no name was provided', async () => {
    const insertedData: DataToInsert = {
      name: undefined,
      price: 20,
    };
    expect(service.store(insertedData)).rejects.toThrow(
      new MissingParamError('name'),
    );
  });
  it('store(data) should throws if no price was provided', async () => {
    const data: DataToInsert = {
      name: 'Tofu',
      price: undefined,
    };
    expect(service.store(data)).rejects.toThrow(new MissingParamError('price'));
  });
  it('store(data) should throws if no data was provided', async () => {
    expect(service.store(null)).rejects.toThrow(new InvalidBodyError());
  });
  it('store(data) should insert and return same data', async () => {
    const insertedData: DataToInsert = {
      name: 'Tofu',
      price: 20,
    };
    const insertedDataResult = await service.store(insertedData);
    expect(insertedDataResult.name).toBe(insertedData.name);
    expect(insertedDataResult.price).toBe(insertedData.price);
  });
  it('update(id,data) should throws if no id was provided', async () => {
    const data: DataToUpdate = { price: 20 };
    expect(service.update(null, data)).rejects.toThrow(
      new MissingParamError('id'),
    );
  });
  it('update(id,data) should throws if no data was provided', async () => {
    expect(service.update(1, null)).rejects.toThrow(
      new MissingParamError('body'),
    );
  });
  it('update(id,data) should throws if id was not found', async () => {
    const nullData = null;
    jest
      .spyOn(productRepositoryMock, 'getProductById')
      .mockImplementation(() => nullData);
    const id = 10;
    const data: DataToUpdate = { price: 20 };
    expect(service.update(id, data)).rejects.toThrow(
      new DataNotFoundError('id', id),
    );
  });
  it('update(id,data) should returns number of updated objects equals to 1 if update succeds', async () => {
    const data: DataToUpdate = { price: 20 };
    const result = await service.update(1, data);
    expect(result).toBe(1);
  });
  it('delete(id) should throws if no id was provided', async () => {
    expect(service.delete(null)).rejects.toThrow(new MissingParamError('id'));
  });
  it('delete(id) should throws if id was not found', async () => {
    const nullData = null;
    jest
      .spyOn(productRepositoryMock, 'getProductById')
      .mockImplementation(() => nullData);
    const id = 10;
    expect(service.delete(id)).rejects.toThrow(new DataNotFoundError('id', id));
  });
  it('delete(id) should return number of deleted objects equals to 1 if delete succeds', async () => {
    const result = await service.delete(1);
    expect(result).toBe(1);
  });
});
