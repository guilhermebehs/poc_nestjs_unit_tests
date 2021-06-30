import { Module } from '@nestjs/common';
import { RepositoryModule } from 'src/infra/repository.module';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';

@Module({
  providers: [ProductService],
  imports: [RepositoryModule],
  controllers: [ProductController],
})
export class ProductModule {}
