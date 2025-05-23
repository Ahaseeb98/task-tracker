// apps/backend/src/tasks/tasks.controller.ts
import {
  Controller,
  Post,
  Body,
  UploadedFile,
  UseInterceptors,
  UseGuards,
  Req,
  Get,
  Patch,
  Param,
  NotFoundException,
  Delete,
  ForbiddenException,
} from '@nestjs/common';
import { CreateTaskDto } from './dtos/create-task.dto';
import { TasksService } from './tasks.service';
import { AuthGuard } from '@nestjs/passport';
import { AuthRequest } from './../../../../packages/Interfaces/auth-request.interface';
import { FileUploadInterceptor } from 'src/shared/file-upload/file-upload.interceptor';
import { UpdateTaskDto } from './dtos/update-task.dto';
import { UpdateTaskStatusDto } from './dtos/update-task-status.dto';
@Controller('tasks')
@UseGuards(AuthGuard('jwt'))
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  @UseInterceptors(FileUploadInterceptor)
  createTask(
    @UploadedFile() file: Express.Multer.File,
    @Body() body: CreateTaskDto,
    @Req() req: AuthRequest,
  ) {
    const data = body;
    if (file) {
      data.picture = `/uploads/${file.filename}`;
    }
    console.log(req.user, 'req.user');
    const createdBy = req.user._id;

    return this.tasksService.create({ ...data, createdBy });
  }

  @Get()
  async findUserTasks(@Req() req: AuthRequest) {
    const userId = req.user;
    return this.tasksService.findAll(userId);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const task = await this.tasksService.findOne(id);
    if (!task) throw new NotFoundException('Task not found');
    return task;
  }

  @Patch(':id')
  @UseInterceptors(FileUploadInterceptor)
  async update(
    @UploadedFile() file: Express.Multer.File,
    @Param('id') id: string,
    @Body() body: UpdateTaskDto,
    @Req() req: AuthRequest,
  ) {
    console.log('BODY', body, file, id);
    const data = body;
    if (file) {
      data.picture = `/uploads/${file.filename}`;
    }
    const updated = await this.tasksService.update(id, req.user._id, data);
    if (!updated) throw new NotFoundException('Task not found or unauthorized');
    return updated;
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Req() req: AuthRequest) {
    const deleted = await this.tasksService.remove(id, req.user._id);
    if (!deleted) throw new NotFoundException('Task not found or unauthorized');
    return { message: 'Task deleted' };
  }

  @Patch(':id/status')
  async updateStatus(
    @Param('id') id: string,
    @Req() req: AuthRequest,
    @Body() updateStatusDto: UpdateTaskStatusDto,
  ) {
    const updated = await this.tasksService.updateStatus(
      id,
      req.user._id,
      updateStatusDto,
    );
    if (!updated)
      throw new ForbiddenException('Unauthorized or task not found');
    return updated;
  }
}
