import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Role } from '../user.typs';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop({ required: true })
  fname!: string;

  @Prop({ required: true })
  lname!: string;

  @Prop({ required: true, unique: true })
  email!: string;

  @Prop({ required: true, select: false })
  password!: string;

  @Prop({ default: Role.STUDENT })
  role!: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
