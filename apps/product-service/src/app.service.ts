import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ProductCreateRequest } from '@app/protos/product'
import { Product } from './schemas/product';
import { Model } from 'mongoose';

@Injectable()
export class AppService {
  
  constructor(@InjectModel(Product.name) private productModel: Model<Product>) {}
  
  public async create(data: ProductCreateRequest): Promise<boolean> {
    const product = new this.productModel({
      quantity: data.quantity,
      title: data.title
    })
    
    try {
      const result = await product.save();
      console.log(JSON.parse(JSON.stringify(result)))
    } catch(error: unknown) {
      console.error(error);
      
      if(error instanceof Error) {
        console.log(error)
        return false;
      }
    }
    
    return true;
  }
}
