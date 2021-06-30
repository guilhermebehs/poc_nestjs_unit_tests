import { ProductEntity } from './entities/product.entity';
import { ProductRepository } from './repositories/product.repository';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import dotent from 'dotenv';
dotent.config();

const listOfRepo = TypeOrmModule.forFeature([ProductRepository]);
@Module({
  exports: [listOfRepo],
  imports: [
    listOfRepo,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.TYPEORM_HOST,
      port: Number(process.env.TYPEORM_PORT),
      username: process.env.TYPEORM_USERNAME,
      password: process.env.TYPEORM_PASSWORD,
      database: process.env.TYPEORM_DATABASE,
      entities: [ProductEntity],
      synchronize: false,
    }),
  ],
})
export class RepositoryModule {}
