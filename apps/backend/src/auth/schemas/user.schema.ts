import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true })
  name: string;

  @Prop({ enum: ['employee', 'employer'], required: true })
  role: 'employee' | 'employer';

  @Prop()
  avatar?: string;

  @Prop({ type: Types.ObjectId, ref: 'User', required: false, default: null })
  referredBy: Types.ObjectId;
}

export const UserSchema = SchemaFactory.createForClass(User);
