import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schemas/user';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://172.20.240.1/ecommerce-microservices'),
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema
      }
    ])
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
