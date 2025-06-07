import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { ClientGrpc } from '@nestjs/microservices';
import { CreateUserRequest, CreateUserResponse } from './interface';
import { Observable } from 'rxjs';

interface UserClientService {
  Create: (req: CreateUserRequest) => Observable<CreateUserResponse>;
}

@Injectable()
export class UsersService implements OnModuleInit {
  
  private userClientService: UserClientService;
  
  constructor(@Inject('USER_PACKAGE') private client: ClientGrpc) {}
  
  onModuleInit() {
    this.userClientService = this.client.getService<UserClientService>('UsersService');
  }
  
  create(createUserDto: CreateUserDto) {
    const user = {
      firstName: createUserDto.first_name,
      lastName: createUserDto.last_name,
      email: createUserDto.email
    };
    
    return this.userClientService.Create(user)
  }
}
