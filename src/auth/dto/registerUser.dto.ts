import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
export class RegisterDto {
  @IsString()
  @IsNotEmpty()
  fname!: string;
  @IsString()
  lname!: string;
  @IsEmail()
  email!: string;
  @IsString()
  password!: string;
}
