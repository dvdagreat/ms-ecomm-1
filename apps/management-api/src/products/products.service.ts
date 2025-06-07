import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { CreateProductRequest } from './interface';
import { CreateUserResponse } from '../users/interface';
import { Observable } from 'rxjs';
import { ClientGrpc } from '@nestjs/microservices';

interface ProductClientService {
  Create: (req: CreateProductRequest) => Observable<CreateUserResponse>;
}

@Injectable()
export class ProductsService implements OnModuleInit {
  
  private productClientService: ProductClientService;
  
  constructor(@Inject('PRODUCT_PACKAGE') private client: ClientGrpc) {}
  
  onModuleInit() {
    this.productClientService = this.client.getService<ProductClientService>('ProductsService');
  }
  
  create(createProductDto: CreateProductDto) {
    const product = {
      title: createProductDto.title,
      quantity: createProductDto.quantity
    }
    
    return this.productClientService.Create(product)
  }
}
