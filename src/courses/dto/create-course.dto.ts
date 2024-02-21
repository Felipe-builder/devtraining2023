import { IsBoolean, IsNumber, IsString } from 'class-validator'
export class CreateCourseDTO {

  @IsString()
  readonly name: string;

  @IsString()
  readonly description: string;

  @IsString({each: true})
  readonly tags: string[];

  @IsBoolean()
  readonly is_active: boolean;

  @IsNumber()
  readonly price: number;
  
  @IsNumber()
  readonly duration_in_hours: number;

  @IsString()
  readonly difficulty_level: string;
}
