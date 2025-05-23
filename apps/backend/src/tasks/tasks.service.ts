import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Task, TaskDocument } from './schemas/task.schema';
import { CreateTaskDto } from './dtos/create-task.dto';
import { UpdateTaskDto } from './dtos/update-task.dto';
import { USER_TYPE } from '../../../../packages/Types/USERS';
import { UpdateTaskStatusDto } from './dtos/update-task-status.dto';

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
      .populate([
        { path: 'createdBy', select: 'name email' },
        { path: 'assignee', select: 'name email' },
        { path: 'comments.by', select: 'name email' },
      ])
      .exec();
  }

  async update(taskId: string, userId: string, dto: UpdateTaskDto) {
    const task = await this.findOne(taskId);

    if (!task) {
      // Could mean not found, not creator, or already assigned
      return null;
    }

    const updatedDto = { ...dto };

    if (dto.assignee) {
      updatedDto.assignee = new Types.ObjectId(dto.assignee as string);
    }
    console.log(updatedDto, 'dto');

    await this.taskModel
      .findOneAndUpdate({ _id: taskId }, { $set: updatedDto }, { new: true })
      .populate('assignee', 'name email')
      .exec();

    return this.findOne(taskId);
  }

  async findAll(user: USER_TYPE) {
    if (user.role === 'employee') {
      return this.taskModel
        .find({ assignee: new Types.ObjectId(user._id) })
        .populate([
          { path: 'createdBy', select: 'name email' },
          { path: 'assignee', select: 'name email' },
          { path: 'comments.by', select: 'name email' },
        ])
        .exec();
    } else if (user.role === 'employer') {
      return this.taskModel
        .find({ createdBy: new Types.ObjectId(user._id) })
        .populate([
          { path: 'createdBy', select: 'name email' },
          { path: 'assignee', select: 'name email' },
          { path: 'comments.by', select: 'name email' },
        ])
        .exec();
    } else {
      throw new ForbiddenException('Invalid user role');
    }
  }

  async remove(id: string, _userId: string): Promise<boolean> {
    console.log(_userId);
    const task = await this.taskModel
      .findOne({
        _id: new Types.ObjectId(id),
      })
      .populate('assignee')
      .exec();

    if (!task) return false;

    if (task.assignee) {
      throw new BadRequestException(
        'Task cannot be deleted because it has an assignee.',
      );
    }

    const result = await this.taskModel.deleteOne({ _id: id });
    return result.deletedCount > 0;
  }

  async updateStatus(taskId: string, userId: string, dto: UpdateTaskStatusDto) {
    console.log(dto, taskId);
    const task = await this.taskModel.findOne({
      _id: new Types.ObjectId(taskId),
    });

    if (!task || !userId) {
      return null; // not found or unauthorized
    }

    task.status = dto.status;

    if (dto.comment) {
      task.comments = task.comments || [];
      task.comments.push({
        text: dto.comment,
        status: dto.status,
        date: new Date(),
        by: new Types.ObjectId(userId),
      });
    }

    await task.save();

    return this.findOne(taskId);
  }
}
