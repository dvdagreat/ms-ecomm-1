import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user';
import { Model } from 'mongoose';
import { UserCreateRequest } from '@app/protos/user';
import { ClientRMQ } from '@nestjs/microservices';

@Injectable()
export class AppService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>, 
    @Inject('ANALYTICS_QUEUE_CLIENT') private analyticsQueueClient: ClientRMQ
  ) {}
  
  public async create(data: UserCreateRequest): Promise<boolean> {    
    const user = new this.userModel({
      email: data.email,
      first_name: data.firstName,
      last_name: data.lastName
    })
    
    let result = {}; 
    try {
      result = await user.save();
      console.log(JSON.parse(JSON.stringify(result)))
    } catch(error: unknown) {
      console.error(error);
      
      if(error instanceof Error) {
        console.log(error)
        return false;
      }
    }
    const pattern = 'UserCreated';
    
    this.analyticsQueueClient.send('UserCreated', result).subscribe({
      next: () => console.log(`Event "${pattern}" sent successfully to RabbitMQ.`),
      error: (err) => console.error(`Failed to send event "${pattern}" to RabbitMQ:`, err),
    })
    
    return true;
  }
}
