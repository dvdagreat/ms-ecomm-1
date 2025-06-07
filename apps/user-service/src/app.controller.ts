import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { GrpcMethod } from '@nestjs/microservices';
import { CreateUserRequest, CreateUserResponse } from './interfaces';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @GrpcMethod('UsersService', 'Create')
  public async create(data: CreateUserRequest): Promise<CreateUserResponse> {
    const response = await this.appService.create(data);
    return {
      isCreated: response
    }
  }
}
