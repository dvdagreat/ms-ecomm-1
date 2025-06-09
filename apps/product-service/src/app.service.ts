import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ProductCreateRequest } from '@app/protos/product'
import { Product } from './schemas/product';
import { Model } from 'mongoose';
import { ClientRMQ } from '@nestjs/microservices';

@Injectable()
export class AppService {
  
  constructor(
    @InjectModel(Product.name) private productModel: Model<Product>,
    @Inject('ANALYTICS_QUEUE_CLIENT') private analyticsQueueClient: ClientRMQ
  ) {}
  
  public async create(data: ProductCreateRequest): Promise<boolean> {
    const product = new this.productModel({
      quantity: data.quantity,
      title: data.title
    })
    
    let result = {};
    try {
      result = await product.save();
      console.log(JSON.parse(JSON.stringify(result)))
    } catch(error: unknown) {
      console.error(error);
      
      if(error instanceof Error) {
        console.log(error)
        return false;
      }
    }
    
    const pattern = 'ProductCreated';
    this.analyticsQueueClient.send(pattern, result).subscribe({
      complete: () => console.log(`Event "${pattern}" sent successfully to RabbitMQ.`),
      error: (err) => console.error(`Failed to send event "${pattern}" to RabbitMQ:`, err),
    })
    
    return true;
  }
}
