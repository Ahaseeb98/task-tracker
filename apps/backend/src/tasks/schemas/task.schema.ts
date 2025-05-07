import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type TaskDocument = Task & Document;

@Schema({ timestamps: true })
export class Task {
  @Prop({ required: true })
  title: string;

  @Prop()
  description: string;

  @Prop()
  picture: string;

  @Prop({ type: Types.ObjectId, ref: 'User', required: false, default: null })
  assignee: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'User' })
  createdBy: Types.ObjectId;

  @Prop({ required: true, default: 'Pending' })
  status: 'Pending' | 'In Progress' | 'Completed';

  @Prop({ required: true })
  rewardPrice: string;
}

export const TaskSchema = SchemaFactory.createForClass(Task);
