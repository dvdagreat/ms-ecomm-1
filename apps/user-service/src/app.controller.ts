import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { GrpcMethod } from '@nestjs/microservices';
import { CreateUserRequest } from './interfaces';
import { User } from './schemas/user';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @GrpcMethod('UsersService', 'Create')
  public async create(data: any): Promise<{isCreated: boolean}> {
    
    console.log('printing data');
    console.log(data)

    const response = await this.appService.create(data);
    
    return {
      isCreated: response
    }
  }
}
