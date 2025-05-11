import { IsOptional, IsString, IsMongoId, IsIn } from 'class-validator';

export class UpdateTaskDto {
  @IsString({ message: 'Title must be a string' })
  @IsOptional()
  title?: string;

  @IsString({ message: 'Description must be a string' })
  @IsOptional()
  description?: string;

  @IsOptional()
  picture?: string;

  @IsMongoId({ message: 'Assignee must be a valid user ID' })
  @IsOptional()
  assignee?: string;

  @IsIn(['Pending', 'In Progress', 'Completed'], {
    message: 'Status must be one of: Pending, In Progress, Completed',
  })
  @IsOptional()
  status?: 'Pending' | 'In Progress' | 'Completed';

  @IsString({ message: 'Reward price must be a string' })
  @IsOptional()
  rewardPrice?: string;
}
