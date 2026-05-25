import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
export type CourseDocument = HydratedDocument<Course>;
@Schema()
export class Course {
  @Prop({ required: true })
  name!: string;
  @Prop({ required: true })
  decription!: string;
  @Prop({ required: true })
  lavel!: string;
  @Prop({ required: true })
  price!: number;
}
export const CourseSchema = SchemaFactory.createForClass(Course);
