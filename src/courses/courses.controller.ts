import { CreateCourseDTO } from './dto/create-course.dto';
import { CoursesService } from './courses.service';
import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put } from '@nestjs/common';
import { UpdateCourseDTO } from './dto/update-course.dto';
import { Course } from './entities/courses.entity';

@Controller('courses')
export class CoursesController {

  constructor(
    private readonly coursesService: CoursesService
  ) {}

  @Get()
  findAll(): Promise<Course[]> {
    return this.coursesService.findAll();
  }

  @Get(':id')
  findOne(
    @Param('id') id: string,
  ): Promise<Course> {
    return this.coursesService.findOne(id);
  }

  @Post()
  async create(@Body() createCourseDTO: CreateCourseDTO): Promise<Course> {
    return this.coursesService.create(createCourseDTO);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateCourseDTO: UpdateCourseDTO,
  ): Promise<Course> {
    console.log(updateCourseDTO)
    return this.coursesService.update(id, updateCourseDTO)
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  delete(
    @Param('id') id: string,
  ): Promise<any> {
    return this.coursesService.delete(id);
  }

}
