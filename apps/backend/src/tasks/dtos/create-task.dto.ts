import {
  IsString,
  IsNotEmpty,
  IsIn,
  IsOptional,
  IsMongoId,
} from 'class-validator';

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsOptional()
  picture?: string;

  @IsOptional()
  @IsMongoId()
  assignee: string;

  @IsOptional()
  @IsMongoId()
  createdBy: string;

  @IsIn(['Pending', 'In Progress', 'Completed'])
  @IsOptional()
  status?: 'Pending' | 'In Progress' | 'Completed';

  @IsString()
  @IsNotEmpty()
  rewardPrice: string;
}
