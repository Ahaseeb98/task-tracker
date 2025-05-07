import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Task, TaskDocument } from './schemas/task.schema';
import { CreateTaskDto } from './dtos/create-task.dto';
import { UpdateTaskDto } from './dtos/update-task.dto';

@Injectable()
export class TasksService {
  constructor(@InjectModel(Task.name) private taskModel: Model<TaskDocument>) {}

  async create(data: CreateTaskDto & { picture?: string; createdBy: string }) {
    const createdTask = new this.taskModel({
      ...data,
      assignee: new Types.ObjectId(data.assignee),
      createdBy: new Types.ObjectId(data.createdBy),
    });
    return createdTask.save();
  }

  async findOne(id: string) {
    return this.taskModel
      .findById(id)
      .populate('assignee', 'name email')
      .populate('createdBy', 'name email');
  }

  async update(id: string, updateTaskDto: UpdateTaskDto) {
    return this.taskModel.findByIdAndUpdate(id, updateTaskDto, {
      new: true,
    });
  }

  async findByCreator(userId: string) {
    console.log(userId, 'OPOPOP');
    return this.taskModel
      .find({ createdBy: new Types.ObjectId(userId) })
      .populate('assignee', 'name email')
      .populate('createdBy', 'name email');
  }
}
