import {
  IsOptional,
  IsString,
  IsMongoId,
  IsIn,
  IsNotEmpty,
} from 'class-validator';

export class UpdateTaskDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsOptional()
  picture?: string;

  @IsMongoId()
  @IsOptional()
  assignee: string;

  @IsIn(['Pending', 'In Progress', 'Completed'])
  @IsOptional()
  status?: 'Pending' | 'In Progress' | 'Completed';

  @IsString()
  @IsNotEmpty()
  rewardPrice: string;
}
