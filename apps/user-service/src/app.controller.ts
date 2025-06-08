import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { GrpcMethod } from '@nestjs/microservices';

import {
  UserCreateRequest,
  UserCreateResponse
} from '@app/protos/user'

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @GrpcMethod('UsersService', 'Create')
  public async create(data: UserCreateRequest): Promise<UserCreateResponse> {
    const response = await this.appService.create(data);
    return {
      isCreated: response
    }
  }
}
