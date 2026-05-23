import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  Request,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/registerUser.dto';
import { LoginDto } from './dto/loginUser.dto';
import { AuthGuard } from './auth.guard';
import { UserService } from '../user/user.service';
import { Request as ExpressRequest } from 'express';

interface JwtPayload {
  sub: string;
}
interface RequestWithUser extends ExpressRequest {
  user: JwtPayload;
}

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}
  @Post('register') //endpoint  auth/register
  async register(@Body() registerUserDto: RegisterDto) {
    return await this.authService.registerUser(registerUserDto);
  }

  @Post('login') //Endpoint auth/login
  async login(@Body() loginUserDto: LoginDto) {
    return await this.authService.loginUser(loginUserDto);
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  async getProfile(@Request() req: RequestWithUser) {
    const userId = req.user.sub;
    const user = await this.userService.getUserById(userId);
    console.log({ user });
    return user;
  }
}
