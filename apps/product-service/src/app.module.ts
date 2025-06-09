import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Product, ProductSchema } from './schemas/product';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://172.20.240.1/ecommerce-microservices'),
    MongooseModule.forFeature([
      {
        name: Product.name,
        schema: ProductSchema
      }
    ]),
    ClientsModule.register([
      {
        name: 'ANALYTICS_QUEUE_CLIENT',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://dvs:dvs@172.20.240.1:5672/nestjs_vhost'],
          queue: 'analytics_queue',
          queueOptions: {
            durable: true
          },
        },
      },
    ]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
