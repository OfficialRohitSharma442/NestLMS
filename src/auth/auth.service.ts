import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from '../user/user.service';
import { RegisterDto } from './dto/registerUser.dto';
import bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/loginUser.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService,
  ) {}
  async registerUser(registerUserDto: RegisterDto) {
    // logic of user register
    const saltRounds: number = 10;
    const hash = await bcrypt.hash(registerUserDto.password, saltRounds);
    const user = await this.userService.createUser({
      ...registerUserDto,
      password: hash,
    });
    const payload = {
      sub: user._id,
    };
    const token = await this.jwtService.signAsync(payload);
    console.log({ token });

    return {
      accessToken: token,
      user,
    };
  }
  async loginUser(loginUserDto: LoginDto) {
    const user = await this.userService.checkUserByEmail(loginUserDto.email);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    const Matched = await bcrypt.compare(loginUserDto.password, user.password);
    if (!Matched) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const payload = {
      sub: user._id,
    };
    const token = await this.jwtService.signAsync(payload);
    return {
      accessToken: token,
    };
  }
}
