import { ConflictException, Injectable } from '@nestjs/common';
import { RegisterDto } from '../auth/dto/registerUser.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { Model } from 'mongoose';
@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async createUser(registerUserDto: RegisterDto) {
    try {
      return await this.userModel.create({
        email: registerUserDto.email,
        fname: registerUserDto.fname,
        lname: registerUserDto.lname,
        password: registerUserDto.password,
      });
    } catch (error: unknown) {
      const err = error as { code?: number; keyValue: Record<string, string> };
      console.log({ error });
      const Duplicate_Key_Code = 11000;
      if (err.code === Duplicate_Key_Code) {
        throw new ConflictException(`Email already taken`);
      }
      throw error;
    }
  }
  async checkUserByEmail(email: string): Promise<UserDocument | null> {
    return await this.userModel.findOne({ email }).select('+password').exec();
  }
  async getUserById(id: string): Promise<UserDocument | null> {
    return await this.userModel.findById(id);
  }
}
