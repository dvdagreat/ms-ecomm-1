import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user';
import { Model } from 'mongoose';
import { CreateUserRequest } from './interfaces';

@Injectable()
export class AppService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}
  
  public async create(data: CreateUserRequest): Promise<boolean> {
    const user = new this.userModel({
      email: data.email,
      first_name: data.firstName,
      last_name: data.lastName
    })
    
    try {
      const result = await user.save();
      console.log(JSON.parse(JSON.stringify(result)))
    } catch(error: unknown) {
      console.error(error);
      
      if(error instanceof Error) {
        console.log(error)
        return false;
      }
    }
    
    return true;
  }
}
