import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { UserProtoFile } from '@app/protos';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'USER_PACKAGE',
        transport: Transport.GRPC,
        options: {
          package: 'user',
          url: 'localhost:5001',
          protoPath: `node_modules/@app/protos/${UserProtoFile}`
        }
      }
    ])
  ],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
