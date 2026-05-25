import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateCourseDto {
  @IsString()
  name!: string;
  @IsString()
  description!: string;
  @IsString()
  lavel!: string;
  @IsNotEmpty()
  @IsNumber()
  price!: number;
}
