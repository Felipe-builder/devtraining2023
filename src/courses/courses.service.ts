import { Injectable, NotFoundException } from '@nestjs/common';
import { Course } from './courses.entity';

import coursesMock from '../mocks/courses';

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

  create(createCourseDTO: Course) {
    return this.courses.push(createCourseDTO)
  }

  update(id: number, updateCourseDTO: Course) {
    const existingCourse = this.findOne(id);
    if (existingCourse) {
      const index = this.courses.findIndex(course => course.id === id)
      this.courses[index] = {
        id,
        ...updateCourseDTO,
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
