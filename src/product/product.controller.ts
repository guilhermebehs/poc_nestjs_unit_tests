import { DataToUpdate } from './infra/request/DataToUpdate';
import { DataToInsert } from './infra/request/DataToInsert';
import { HttpInterceptor } from './../utils/interceptors/http.interceptor';
import { ProductService } from './product.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseInterceptors,
} from '@nestjs/common';
import { HttpResponse } from 'src/utils/protocols/http.protocol';

@UseInterceptors(HttpInterceptor)
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}
  @Get()
  async getAll(): Promise<HttpResponse> {
    const result = await this.productService.getAll();
    return { statusCode: 200, body: result };
  }

  @Post()
  async store(@Body() body: DataToInsert): Promise<HttpResponse> {
    const result = await this.productService.store(body);
    return { statusCode: 201, body: result };
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() body: DataToUpdate,
  ): Promise<HttpResponse> {
    await this.productService.update(id, body);
    return { statusCode: 204 };
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<HttpResponse> {
    await this.productService.delete(id);
    return { statusCode: 204 };
  }
}
