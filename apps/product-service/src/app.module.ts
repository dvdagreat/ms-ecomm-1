import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Product, ProductSchema } from './schemas/product';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://172.20.240.1/ecommerce-microservices'),
    MongooseModule.forFeature([
      {
        name: Product.name,
        schema: ProductSchema
      }
    ])
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
