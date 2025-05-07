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
} from '@nestjs/common';
import { CreateTaskDto } from './dtos/create-task.dto';
import { TasksService } from './tasks.service';
import { AuthGuard } from '@nestjs/passport';
import { AuthRequest } from './../../../../packages/Interfaces/auth-request.interface';
import { FileUploadInterceptor } from 'src/shared/file-upload/file-upload.interceptor';
import { UpdateTaskDto } from './dtos/update-task.dto';
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
    if (file) {
      body.picture = `/uploads/${file.filename}`;
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
    const createdBy = req?.user?.id || '';
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    body.createdBy = createdBy;
    return this.tasksService.create(body);
  }

  @Get()
  async findUserTasks(@Req() req: AuthRequest) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
    const userId = req.user.id;
    return this.tasksService.findByCreator(userId);
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
    @Body() updateTaskDto: UpdateTaskDto,
  ) {
    if (file) {
      updateTaskDto.picture = `/uploads/${file.filename}`;
    }
    return this.tasksService.update(id, updateTaskDto);
  }
}
