import { Controller } from '@nestjs/common';
import { AppService } from './app.service';
import { EventPattern, Payload } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @EventPattern('UserCreated')
  userCreated(@Payload() data: any) {
    this.appService.userCreated(data);
  }
  
  @EventPattern('ProductCreated')
  productCreated(@Payload() data: any) {
    this.appService.productCreated(data);
  }
}
