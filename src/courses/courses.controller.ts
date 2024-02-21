import { CoursesService } from './courses.service';
import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put } from '@nestjs/common';

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
    console.log(id)
    return this.coursesService.findOne(Number(id));
  }

  @Post()
  create(@Body() body) {
    return this.coursesService.create(body);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() body,
  ) {
    console.log(body)
    return this.coursesService.update(Number(id), body)
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  delete(
    @Param('id') id: string,
  ) {
    return this.coursesService.delete(Number(id));
  }

}
