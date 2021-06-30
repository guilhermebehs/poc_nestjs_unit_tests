import { RepositoryModule } from './infra/repository.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './product/product.module';

@Module({
  imports: [ProductModule, RepositoryModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
