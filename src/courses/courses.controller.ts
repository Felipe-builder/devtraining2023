import { CreateCourseDTO } from './dto/create-course.dto';
import { CoursesService } from './courses.service';
import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put } from '@nestjs/common';
import { UpdateCourseDTO } from './dto/update-course.dto';

@Controller('courses')
export class CoursesController {

  constructor(
    private readonly coursesService: CoursesService
  ) {}

  @Get()
  findAll() {
    return this.coursesService.findAll();
  }

  @Get(':id')
  findOne(
    @Param('id') id: number,
  ) {
    return this.coursesService.findOne(Number(id));
  }

  @Post()
  create(@Body() createCourseDTO: CreateCourseDTO) {
    return this.coursesService.create(createCourseDTO);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateCourseDTO: UpdateCourseDTO,
  ) {
    console.log(updateCourseDTO)
    return this.coursesService.update(Number(id), updateCourseDTO)
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  delete(
    @Param('id') id: string,
  ) {
    return this.coursesService.delete(Number(id));
  }

}
