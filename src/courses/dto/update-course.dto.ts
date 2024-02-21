import { IsBoolean, IsNumber, IsString } from "class-validator";
import { PartialType } from '@nestjs/mapped-types'
import { CreateCourseDTO } from "./create-course.dto";

export class UpdateCourseDTO extends PartialType(CreateCourseDTO) {}
