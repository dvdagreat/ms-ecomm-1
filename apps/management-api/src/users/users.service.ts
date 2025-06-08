import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { ClientGrpc } from '@nestjs/microservices';
import { UserCreateRequest, UserCreateResponse} from '@app/protos/user';
import { Observable } from 'rxjs';

interface UserClientService {
  Create: (req: UserCreateRequest) => Observable<UserCreateResponse>;
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
