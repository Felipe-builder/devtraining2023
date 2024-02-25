import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';

import { Course } from './entities/courses.entity';
import { CreateCourseDTO } from './dto/create-course.dto';
import { UpdateCourseDTO } from './dto/update-course.dto';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CoursesService {

  constructor(
    @InjectRepository(Course)
    private readonly courseRepository: Repository<Course>
  ) { }

  async findAll() {
    return this.courseRepository.find()
  }

  async findOne(id: string) {
    const course = await this.courseRepository.findOne({
      where: { id },
    });
    if (!course) throw new NotFoundException(`Course ID ${id} not found`);
    return course;
  }

  async create(createCourseDTO: CreateCourseDTO) {
    const courseCreated = this.courseRepository.create(createCourseDTO);
    return this.courseRepository.save(courseCreated);
  }

  async update(id: string, updateCourseDTO: UpdateCourseDTO) {
    const course = await this.courseRepository.preload({ ...updateCourseDTO, id })
    if (!course) throw new NotFoundException(`Course ID ${id} not found`);

    return this.courseRepository.save(course);
  }

  async delete(id: string) {
    const course = await this.courseRepository.findOne({
      where: { id },
    });
    if (!course) throw new NotFoundException(`Course ID ${id} not found`);
    return this.courseRepository.remove(course);
  }
}
