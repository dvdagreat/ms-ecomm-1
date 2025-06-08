import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
    transport: Transport.RMQ,
    options: {
      urls: ['amqp://dvs:dvs@172.20.240.1:5672/nestjs_vhost'],
      queue: 'analytics_queue',
      queueOptions: {
        durable: true
      }
    },
  });
  await app.listen();
}
bootstrap();
