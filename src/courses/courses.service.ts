import { Injectable, NotFoundException } from '@nestjs/common';
import { Course } from './entity/courses.entity';

import coursesMock from '../mocks/courses';
import { CreateCourseDTO } from './dto/create-course.dto';
import { randomInt } from 'crypto';
import { UpdateCourseDTO } from './dto/update-course.dto';

@Injectable()
export class CoursesService {
  private courses: Course[] = coursesMock.map(course => ({
    ...course,
    created_at: new Date(course.created_at),
    updated_at: new Date(course.updated_at),
  }));

  findAll() {
    return this.courses;
  }

  findOne(id: number) {
    const course = this.courses.find(course => course.id === id);
    if (!course) throw new NotFoundException(`Course ID ${id} not found`);
    return course;
  }

  create(createCourseDTO: CreateCourseDTO) {
    const newCourse: Course = {id: randomInt(8000), ...createCourseDTO, created_at: new Date(), updated_at: new Date()};
    this.courses.push(newCourse)
    return newCourse;
  }

  update(id: number, updateCourseDTO: UpdateCourseDTO) {
    const existingCourse = this.findOne(id);
    if (existingCourse) {
      existingCourse.description = updateCourseDTO.description || existingCourse.description;
      existingCourse.difficulty_level = updateCourseDTO.difficulty_level || existingCourse.difficulty_level;
      existingCourse.duration_in_hours = updateCourseDTO.duration_in_hours || existingCourse.duration_in_hours;
      existingCourse.duration_in_hours = updateCourseDTO.duration_in_hours || existingCourse.duration_in_hours;
      existingCourse.is_active = updateCourseDTO.is_active || existingCourse.is_active;
      existingCourse.name = updateCourseDTO.name || existingCourse.name;
      existingCourse.price = updateCourseDTO.price || existingCourse.price;
      existingCourse.tags = updateCourseDTO.tags || existingCourse.tags;

      const index = this.courses.findIndex(course => course.id === id)
      this.courses[index] = {
        ...existingCourse,
        updated_at: new Date(),
      }
    }
    return this.findOne(id);
  }

  delete(id: number) {
    const index = this.courses.findIndex(course => course.id === id)
    if (index >= 0) {
      this.courses.splice(index, 1);
    }
  }
}
