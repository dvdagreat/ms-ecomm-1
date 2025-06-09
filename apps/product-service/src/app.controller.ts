import { Controller } from '@nestjs/common';
import { AppService } from './app.service';
import { GrpcMethod } from '@nestjs/microservices';
import { ProductCreateRequest, ProductCreateResponse } from '@app/protos/product';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
  
  @GrpcMethod('ProductsService', 'Create')
  public async Create(data: ProductCreateRequest): Promise<ProductCreateResponse> {
    const response = await this.appService.create(data);
    return {
      isCreated: response
    }
  }
}
