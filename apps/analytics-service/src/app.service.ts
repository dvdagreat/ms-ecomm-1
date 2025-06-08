import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Event } from './schemas/event';
import { Model } from 'mongoose';
import { EventPattern } from '@nestjs/microservices';

@Injectable()
export class AppService {
  constructor(@InjectModel(Event.name) private eventModel: Model<Event>) {}
  
  @EventPattern('UserCreated')
  public async userCreated(data: any) {
    const event = new this.eventModel({
      message: data,
      type: 'UserCreated'
    })
    
    try {
      const result = await event.save();
      console.log(JSON.parse(JSON.stringify(result)))
    } catch(error: unknown) {
      console.error(error);
      
      if(error instanceof Error) {
        console.log(error)
      }
    }
  }
}
